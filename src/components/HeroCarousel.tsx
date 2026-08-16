import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react'

export type HeroSlide = {
  id: string
  titleLead: string
  titleRest: string
  subtitle: string
  href: string
  cta: string
  image: string
  imageClassName?: string
  specs: { label: string; icon: LucideIcon; lines: string[] }[]
}

const AUTOPLAY_MS = 7000
const SWIPE_THRESHOLD = 50

export default function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback(
    (next: number) => setIndex(((next % slides.length) + slides.length) % slides.length),
    [slides.length],
  )
  const prev = useCallback(() => goTo(index - 1), [goTo, index])
  const next = useCallback(() => goTo(index + 1), [goTo, index])

  useEffect(() => {
    if (paused || slides.length < 2) return
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [paused, slides.length])

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) next()
      else prev()
    }
    touchStartX.current = null
  }

  return (
    <div
      className="group relative min-h-[440px] overflow-hidden rounded-xl bg-[#f4f2ec] ring-4 ring-[#173827] lg:min-h-[470px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX
      }}
      onTouchEnd={onTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured products"
    >
      {/* Dark green panel with the diagonal split */}
      <div
        className="absolute inset-0 bg-[#173827] [clip-path:polygon(0_0,100%_0,100%_38%,0_44%)] lg:[clip-path:polygon(0_0,38%_0,33%_100%,0_100%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-accent [clip-path:polygon(0_45.5%,100%_39.5%,100%_40.5%,0_46.5%)] lg:[clip-path:polygon(39%_0,39.8%_0,34.8%_100%,34%_100%)]"
        aria-hidden
      />

      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className="relative flex h-full w-full shrink-0 flex-col items-center gap-4 p-6 lg:flex-row lg:gap-0 lg:p-8"
            aria-hidden={i !== index}
          >
            <div className="relative flex w-full shrink-0 items-center justify-center lg:w-[34%]">
              <img
                src={slide.image}
                alt={`${slide.titleLead} ${slide.titleRest}`}
                className={`animate-float relative z-[2] w-auto object-contain drop-shadow-2xl ${
                  slide.imageClassName ?? 'max-h-[240px] lg:max-h-[390px]'
                }`}
              />
            </div>

            <div className="z-10 flex min-w-0 flex-1 flex-col items-center text-center lg:px-8">
              <h1 className="text-2xl leading-tight tracking-tight sm:text-3xl lg:text-[2.6rem]">
                <span className="font-bold text-[#173827]">{slide.titleLead}</span>{' '}
                <span className="font-light text-[#b8860b]">{slide.titleRest}</span>
              </h1>
              <p className="mt-2 max-w-[620px] text-sm leading-relaxed text-[#173827]/75 sm:text-[15px]">
                {slide.subtitle}
              </p>

              <div className="mt-7 grid w-full max-w-[640px] grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-y-0">
                {slide.specs.map((spec, si) => {
                  const Icon = spec.icon
                  return (
                    <div
                      key={spec.label}
                      className={`px-3 ${si > 0 ? 'sm:border-l sm:border-slate-300' : ''}`}
                    >
                      <Icon size={26} className="mx-auto text-[#173827]" strokeWidth={1.5} />
                      <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.08em] text-[#b8860b]">
                        {spec.label}
                      </p>
                      <ul className="mt-2 space-y-0.5 text-[11px] leading-snug text-slate-600">
                        {spec.lines.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>

              <Link
                to={slide.href}
                tabIndex={i === index ? 0 : -1}
                className="mt-8 inline-flex items-center gap-4 rounded-full border border-[#b8860b] bg-[#173827] px-8 py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition hover:bg-[#0f2a1c]"
              >
                {slide.cta}
                <ArrowRight size={18} className="text-[#d4af37]" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#b8860b]/60 bg-white/85 text-[#173827] opacity-0 shadow-md transition hover:bg-accent hover:text-white focus:opacity-100 group-hover:opacity-100 lg:left-4"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#b8860b]/60 bg-white/85 text-[#173827] opacity-0 shadow-md transition hover:bg-accent hover:text-white focus:opacity-100 group-hover:opacity-100 lg:right-4"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${slide.titleLead} ${slide.titleRest}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-6 bg-[#b8860b]' : 'w-2 bg-[#173827]/30 hover:bg-[#173827]/60'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
