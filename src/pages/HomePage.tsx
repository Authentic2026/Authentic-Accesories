import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import FeaturedBrands from '../components/FeaturedBrands'
import ColorCycleImage from '../components/ColorCycleImage'
import { HERO_IMAGE, products } from '../data/products'

const SLIDE2_IMAGE = '/images/slide2-phones.png?v=3'
const ITEL_A100C_IMAGE = '/images/itel-a100c.png?v=2'
const HERO_SAMSUNG = [
  {
    name: 'Hero 1',
    src: '/images/hero-samsung/hero-1.png?v=3',
    swatch: '#c8d6e5',
    className: 'max-h-[480px] w-[130%] max-w-none scale-125 lg:max-h-[560px] lg:scale-[1.35]',
  },
  { name: 'Hero 2', src: '/images/hero-samsung/hero-2.png?v=1', swatch: '#6b4d7a' },
  { name: 'Hero 3', src: '/images/hero-samsung/hero-3.png?v=2', swatch: '#3a3d42' },
]
const itelA90 = products.find((p) => p.id === 'itel-a90')
const galaxyA07 = products.find((p) => p.id === 'samsung-a07-64')

const slides = [
  {
    eyebrow: 'Premium Devices',
    title: 'Upgrade Your Tech Today',
    text: 'Discover the latest smartphones and devices. Premium quality, competitive prices, and reliable Authentic support.',
    image: HERO_SAMSUNG[0].src,
    colorImages: HERO_SAMSUNG,
    alt: 'Samsung Galaxy collection',
    href: '/shop?brand=Samsung',
  },
  {
    eyebrow: 'itel A90',
    title: 'One Phone. Every Colour.',
    text: 'Watch the itel A90 shift through Silver, Mint Green, Charcoal and Pearl Blue — same design, your shade.',
    image: itelA90?.image ?? HERO_IMAGE,
    colorImages: itelA90?.colorImages,
    alt: 'itel A90 colour collection',
    href: '/product/itel-a90',
  },
  {
    eyebrow: 'itel A100c',
    title: 'AI Camera. Three Shades.',
    text: 'Meet the itel A100c in Black, Teal and Silver — everyday performance with Authentic support.',
    image: ITEL_A100C_IMAGE,
    alt: 'itel A100c smartphones',
    href: '/product/itel-a100c',
  },
  {
    eyebrow: 'Samsung Galaxy A07',
    title: 'Big Screen. All-Day Battery.',
    text: '6.7" 90Hz display, 50MP camera, 5000mAh and 25W charging — Galaxy A07 4GB/64GB, ready at Authentic.',
    image: galaxyA07?.image ?? HERO_IMAGE,
    colorImages: galaxyA07?.colorImages,
    alt: 'Samsung Galaxy A07',
    href: '/product/samsung-a07-4-64gb',
  },
  {
    eyebrow: 'New Arrivals',
    title: 'More Colours. More Choice.',
    text: 'Browse the latest smartphones in every shade — blue, black, mint and more — ready for pickup or delivery.',
    image: SLIDE2_IMAGE,
    alt: 'Redmi smartphones collection',
    href: '/shop',
  },
]

export default function HomePage() {
  const [slide, setSlide] = useState(0)
  const current = slides[slide]
  const arrivals = products.slice(0, 8)

  const prev = () => setSlide((s) => (s === 0 ? slides.length - 1 : s - 1))
  const next = () => setSlide((s) => (s === slides.length - 1 ? 0 : s + 1))

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0a1a14]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(212,175,55,0.28),transparent_55%),radial-gradient(ellipse_at_20%_80%,rgba(11,61,46,0.9),transparent_50%)]" />
        <div className="pointer-events-none absolute -right-10 top-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 lg:grid-cols-2 lg:gap-6 lg:py-16">
          <div className="z-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {current.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] text-white sm:text-5xl">
              {current.title}
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 sm:text-base">
              {current.text}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to={current.href}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand-700 transition hover:bg-accent"
              >
                Explore Collection
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-accent hover:text-accent"
              >
                View all categories
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-[320px] items-center justify-center lg:min-h-[420px]">
            <div className="animate-float-glow absolute left-1/2 top-1/2 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
            <div key={slide} className="animate-float relative z-[2] w-full max-w-2xl will-change-transform">
              {current.colorImages?.length ? (
                <ColorCycleImage
                  images={current.colorImages}
                  alt={current.alt}
                  intervalMs={3200}
                  imgClassName="max-h-[360px] w-auto max-w-full object-contain lg:max-h-[420px]"
                  labelClassName="text-white/80"
                />
              ) : (
                <img
                  src={current.image}
                  alt={current.alt}
                  className="mx-auto max-h-[400px] w-auto max-w-full object-contain drop-shadow-2xl lg:max-h-[460px]"
                />
              )}
            </div>
          </div>
        </div>

        {/* carousel navigation */}
        <div className="relative z-10 flex justify-center pb-8">
          <div className="flex items-center gap-4 rounded-full border border-white/20 bg-black/35 px-2.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <button
              type="button"
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_0_18px_rgba(45,133,104,0.75)] transition hover:bg-brand-400"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} strokeWidth={2.25} />
            </button>
            <div className="flex items-center gap-2 px-1">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setSlide(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === slide
                      ? 'h-2.5 w-8 bg-accent shadow-[0_0_12px_rgba(212,175,55,0.8)]'
                      : 'h-2.5 w-2.5 bg-[#3a3f46] hover:bg-[#5a616a]'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent/80 bg-[#1a1d22] text-white shadow-[0_0_14px_rgba(212,175,55,0.35)] transition hover:border-accent hover:shadow-[0_0_18px_rgba(212,175,55,0.55)]"
              aria-label="Next slide"
            >
              <ChevronRight size={20} strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
              <Clock size={22} className="text-brand-600" />
              New Arrivals
            </h2>
            <Link to="/shop" className="text-sm font-semibold text-brand-600 hover:text-accent">
              View All &gt;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {arrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">Shop by Category</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              to="/shop?category=Phones"
              className="group relative min-h-[280px] overflow-hidden rounded-3xl shadow-lg"
            >
              <img
                src={HERO_IMAGE}
                alt="Phones"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/90 via-brand-800/45 to-transparent" />
              <div className="relative flex h-full min-h-[280px] flex-col justify-end p-8">
                <h3 className="text-3xl font-extrabold text-white">Phones</h3>
                <p className="mt-1 text-sm text-white/80">Explore latest models.</p>
                <span className="mt-5 inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-700 transition group-hover:bg-accent">
                  Browse Collection
                </span>
              </div>
            </Link>

            <Link
              to="/shop?category=Accessories"
              className="group relative min-h-[280px] overflow-hidden rounded-3xl shadow-lg"
            >
              <img
                src="/images/category-accessories.png?v=2"
                alt="Accessories"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="relative flex h-full min-h-[280px] flex-col justify-end p-8">
                <h3 className="text-3xl font-extrabold text-white">Accessories</h3>
                <p className="mt-1 text-sm text-white/80">Chargers, cables and cases.</p>
                <span className="mt-5 inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-700 transition group-hover:bg-accent">
                  Browse Collection
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <FeaturedBrands />
    </>
  )
}
