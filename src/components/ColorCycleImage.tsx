import { useEffect, useState } from 'react'

type ColorImage = { name: string; src: string; swatch: string; className?: string }

type Props = {
  images: ColorImage[]
  alt: string
  intervalMs?: number
  className?: string
  imgClassName?: string
  showSwatches?: boolean
  labelClassName?: string
}

export default function ColorCycleImage({
  images,
  alt,
  intervalMs = 2200,
  className = '',
  imgClassName = 'max-h-44 w-auto object-contain',
  showSwatches = false,
  labelClassName = 'text-slate-500',
}: Props) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [images.length, intervalMs])

  return (
    <div className={`relative ${className}`}>
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={`${alt} — ${img.name}`}
          className={`${imgClassName} ${img.className ?? ''} mx-auto drop-shadow-xl transition-opacity duration-700 ${
            i === 0 ? 'relative' : 'absolute inset-0 m-auto'
          } ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      {showSwatches && images.length > 1 && (
        <p className={`mt-2 text-center text-[11px] font-medium ${labelClassName}`}>
          {images[index].name}
        </p>
      )}
    </div>
  )
}
