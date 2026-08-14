import sharp from 'sharp'

// Some brand logos were saved from stock sites with a fake "transparency"
// checkerboard baked into the pixels, plus wide empty margins. That makes the
// wordmark render tiny inside its tile no matter how the CSS is sized. This
// keys a dark monochrome wordmark off any light backdrop and trims to the ink.
const args = process.argv.slice(2)
const src = args[0]
const opt = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`))
  return hit ? Number(hit.split('=')[1]) : fallback
}

const INK = opt('ink', 60) // at/below this luminance is fully opaque
const BG = opt('bg', 200) // at/above this luminance is fully transparent
const out = args.find((a) => a.startsWith('--out='))?.split('=')[1] ?? src

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info

for (let p = 0; p < width * height; p++) {
  const i = p * channels
  const lum = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114
  const a = Math.max(0, Math.min(1, (BG - lum) / (BG - INK)))
  // Force the ink to a flat colour so the checkerboard leaves no grey fringe.
  data[i] = 0
  data[i + 1] = 0
  data[i + 2] = 0
  data[i + 3] = Math.round(a * 255)
}

await sharp(data, { raw: { width, height, channels } })
  .trim({ threshold: 1 })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(out)

const done = await sharp(out).metadata()
console.log(
  `${out} -> ${done.width}x${done.height} (was ${width}x${height}) aspect ${(done.width / done.height).toFixed(2)}`,
)
