import path from 'node:path'
import sharp from 'sharp'

// Cuts a product out of a solid-colour studio backdrop. The key colour is
// sampled from the corners, and removal flood-fills inward from the border so
// matching colours *inside* the product (lens glints, wallpaper tints) survive.
const args = process.argv.slice(2)
const src = args[0]
const opt = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`))
  return hit ? Number(hit.split('=')[1]) : fallback
}

const TOL = opt('tol', 60) // colour distance counted as backdrop
const SOFT = opt('soft', 110) // distance where the edge is fully opaque
const PAD = opt('pad', 12)
const SCALE = opt('scale', 1)
const out = args.find((a) => a.startsWith('--out='))?.split('=')[1] ?? src

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info
const total = width * height

const key = [0, 1, 2].map((c) =>
  Math.round(
    [
      data[c],
      data[(width - 1) * channels + c],
      data[(height - 1) * width * channels + c],
      data[(total - 1) * channels + c],
    ].reduce((a, b) => a + b, 0) / 4,
  ),
)

const dist = new Float32Array(total)
for (let p = 0; p < total; p++) {
  const i = p * channels
  dist[p] = Math.hypot(data[i] - key[0], data[i + 1] - key[1], data[i + 2] - key[2])
}

const bg = new Uint8Array(total)
const queue = []
const seed = (x, y) => {
  const p = y * width + x
  if (!bg[p] && dist[p] <= TOL) {
    bg[p] = 1
    queue.push(p)
  }
}
for (let x = 0; x < width; x++) {
  seed(x, 0)
  seed(x, height - 1)
}
for (let y = 0; y < height; y++) {
  seed(0, y)
  seed(width - 1, y)
}
while (queue.length) {
  const p = queue.pop()
  const x = p % width
  const y = (p / width) | 0
  if (x > 0) seed(x - 1, y)
  if (x < width - 1) seed(x + 1, y)
  if (y > 0) seed(x, y - 1)
  if (y < height - 1) seed(x, y + 1)
}

// Soften the halo: pixels adjacent to the cut ramp up over the tolerance band,
// and their colour is unmixed from the key so no blue fringe is left behind.
const ring = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
]
for (let p = 0; p < total; p++) {
  const i = p * channels
  if (!bg[p]) {
    data[i + 3] = 255
    continue
  }
  const x = p % width
  const y = (p / width) | 0
  let touches = false
  for (const [dx, dy] of ring) {
    const nx = x + dx
    const ny = y + dy
    if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
    if (!bg[ny * width + nx]) {
      touches = true
      break
    }
  }
  if (!touches) {
    data[i + 3] = 0
    continue
  }
  const a = Math.max(0, Math.min(1, (dist[p] - TOL * 0.5) / (SOFT - TOL * 0.5)))
  data[i + 3] = Math.round(a * 255)
  if (a > 0) {
    for (let c = 0; c < 3; c++) {
      data[i + c] = Math.max(0, Math.min(255, Math.round((data[i + c] - key[c] * (1 - a)) / a)))
    }
  }
}

// Compression ringing leaves specks of near-backdrop colour that survive the
// key. Drop opaque islands too small to be real content; glyphs and product
// parts are orders of magnitude larger than the noise.
const MIN_ISLAND = opt('despeckle', 40)
if (MIN_ISLAND > 0) {
  const seen = new Uint8Array(total)
  for (let start = 0; start < total; start++) {
    if (seen[start] || data[start * channels + 3] <= 8) continue
    const island = []
    const open = [start]
    seen[start] = 1
    while (open.length) {
      const p = open.pop()
      island.push(p)
      const x = p % width
      const y = (p / width) | 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx
          const ny = y + dy
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
          const n = ny * width + nx
          if (seen[n] || data[n * channels + 3] <= 8) continue
          seen[n] = 1
          open.push(n)
        }
      }
    }
    if (island.length < MIN_ISLAND) {
      for (const p of island) data[p * channels + 3] = 0
    }
  }
}

let pipeline = sharp(data, { raw: { width, height, channels } }).trim({ threshold: 1 })

if (SCALE !== 1) {
  const trimmed = await pipeline.png().toBuffer()
  const meta = await sharp(trimmed).metadata()
  pipeline = sharp(trimmed).resize({
    width: Math.round(meta.width * SCALE),
    height: Math.round(meta.height * SCALE),
    kernel: 'lanczos3',
    fit: 'fill',
  })
}

await pipeline
  .extend({
    top: PAD,
    bottom: PAD,
    left: PAD,
    right: PAD,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(out)

const done = await sharp(out).metadata()
console.log(`${path.basename(out)} -> ${done.width}x${done.height} key=rgb(${key}) alpha=${done.hasAlpha}`)
