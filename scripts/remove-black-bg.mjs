import { readdirSync, renameSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

// Studio packshots ship on a solid black backdrop. The products are often dark
// themselves (graphite phones, black AMOLED screens), so a plain luminance
// threshold eats them. Instead: seed the product from clearly-lit pixels, grow
// into its darker edges, then keep any enclosed dark region that the backdrop
// cannot reach — that preserves screens, lenses and sensor glass.
const args = process.argv.slice(2)
const dir = args[0]
const opt = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`))
  return hit ? Number(hit.split('=')[1]) : fallback
}

const SEED = opt('seed', 32) // definitely product
const GROW = opt('grow', 16) // grow product down to this luminance
const PAD = opt('pad', 12) // transparent breathing room, in output pixels
const SCALE = opt('scale', 1) // upscale factor for crisper rendering

for (const file of readdirSync(dir).filter(
  (f) => f.endsWith('.png') && !f.includes('-raw') && !f.startsWith('_'),
)) {
  const src = path.join(dir, file)
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  const total = width * height

  const lum = new Uint8Array(total)
  for (let p = 0; p < total; p++) {
    const i = p * channels
    lum[p] = Math.max(data[i], data[i + 1], data[i + 2])
  }

  const product = new Uint8Array(total)
  const stack = []
  for (let p = 0; p < total; p++) {
    if (lum[p] >= SEED) {
      product[p] = 1
      stack.push(p)
    }
  }
  while (stack.length) {
    const p = stack.pop()
    const x = p % width
    const y = (p / width) | 0
    const neighbours = []
    if (x > 0) neighbours.push(p - 1)
    if (x < width - 1) neighbours.push(p + 1)
    if (y > 0) neighbours.push(p - width)
    if (y < height - 1) neighbours.push(p + width)
    for (const n of neighbours) {
      if (!product[n] && lum[n] >= GROW) {
        product[n] = 1
        stack.push(n)
      }
    }
  }

  const outside = new Uint8Array(total)
  const queue = []
  const seedOutside = (x, y) => {
    const p = y * width + x
    if (!outside[p] && !product[p]) {
      outside[p] = 1
      queue.push(p)
    }
  }
  for (let x = 0; x < width; x++) {
    seedOutside(x, 0)
    seedOutside(x, height - 1)
  }
  for (let y = 0; y < height; y++) {
    seedOutside(0, y)
    seedOutside(width - 1, y)
  }
  while (queue.length) {
    const p = queue.pop()
    const x = p % width
    const y = (p / width) | 0
    if (x > 0) seedOutside(x - 1, y)
    if (x < width - 1) seedOutside(x + 1, y)
    if (y > 0) seedOutside(x, y - 1)
    if (y < height - 1) seedOutside(x, y + 1)
  }

  // Feather only the single ring touching the product so edges stay smooth.
  const ring = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ]
  for (let p = 0; p < total; p++) {
    if (!outside[p]) {
      data[p * channels + 3] = 255
      continue
    }
    const x = p % width
    const y = (p / width) | 0
    let touchesProduct = false
    for (const [dx, dy] of ring) {
      const nx = x + dx
      const ny = y + dy
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
      if (!outside[ny * width + nx]) {
        touchesProduct = true
        break
      }
    }
    data[p * channels + 3] = touchesProduct && lum[p] > 2 ? Math.min(255, lum[p] * 10) : 0
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

  const out = `${src}.tmp.png`
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

  renameSync(out, src)
  const done = await sharp(src).metadata()
  console.log(`${file} -> ${done.width}x${done.height} alpha=${done.hasAlpha}`)
}
