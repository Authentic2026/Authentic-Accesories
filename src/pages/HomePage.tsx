import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import CategoryTiles from '../components/CategoryTiles'
import FeaturedBrands from '../components/FeaturedBrands'
import HeroCarousel from '../components/HeroCarousel'
import ProductShelf from '../components/ProductShelf'
import PromoBanner from '../components/PromoBanner'
import SectionHeading from '../components/SectionHeading'
import {
  accessoriesShelf,
  bestSellers,
  featuredDeals,
  homeCategories,
  homeHeroSlides,
  homeSidePromos,
  midPromos,
  newArrivals,
  phonesShelf,
  wideBanner,
} from '../data/home'
import { useStore } from '../context/StoreContext'

export default function HomePage() {
  const { formatPrice } = useStore()

  return (
    <>
      {/* Hero + side promos */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-[1513px] px-4 py-5 lg:py-7">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,2.6fr)_minmax(260px,1fr)]">
            <HeroCarousel slides={homeHeroSlides} />

            <div className="grid gap-4 sm:grid-cols-2 lg:min-h-[420px] lg:grid-cols-1">
              {homeSidePromos.map((promo) => (
                <Link
                  key={promo.title}
                  to={promo.href}
                  className="group relative min-h-[200px] overflow-hidden rounded-xl bg-brand-800 text-white lg:min-h-0 lg:flex-1"
                >
                  <img
                    src={promo.image}
                    alt=""
                    className="absolute -right-1 top-1/2 h-44 w-auto -translate-y-1/2 object-contain drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)] transition duration-500 group-hover:scale-110 sm:right-1 sm:h-48 lg:h-[11.5rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/70 to-transparent" />
                  <div className="relative flex h-full min-h-[200px] flex-col justify-center p-5 pr-36 sm:pr-40 lg:min-h-0 lg:pr-44">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                      {promo.eyebrow}
                    </p>
                    <h2 className="mt-1 text-xl font-extrabold uppercase leading-tight sm:text-2xl">
                      {promo.title}
                    </h2>
                    <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">
                      {promo.subtitle}
                    </p>
                    {promo.price !== undefined && (
                      <p className="mt-2 text-sm text-white/70">
                        {promo.priceLabel}{' '}
                        <span className="text-lg font-extrabold text-accent">
                          {formatPrice(promo.price)}
                        </span>
                      </p>
                    )}
                    <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-brand-800 transition group-hover:bg-accent">
                      {promo.cta}
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-slate-50 py-8">
        <div className="store-container">
          <SectionHeading
            title="Top categories"
            subtitle="Shop phones, charging, wearables and everyday accessories"
            href="/shop"
          />
          <CategoryTiles items={homeCategories} />
        </div>
      </section>

      <div className="bg-white">
        <ProductShelf
          title="Featured picks"
          subtitle="Curated devices from the Authentic Retailers catalogue"
          href="/shop"
          products={featuredDeals}
        />
      </div>

      <section className="bg-slate-50 py-8">
        <div className="store-container grid gap-4 lg:grid-cols-3">
          {midPromos.map((promo) => (
            <PromoBanner key={promo.title} {...promo} />
          ))}
        </div>
      </section>

      <div className="bg-white">
        <ProductShelf
          title="Best sellers"
          subtitle="Popular phones and essentials customers pick up most"
          href="/shop"
          products={bestSellers}
        />
      </div>

      <section className="bg-slate-50 py-8">
        <div className="store-container">
          <Link
            to={wideBanner.href}
            className="group relative mx-auto block max-w-[1024px] overflow-hidden rounded-xl border border-slate-200 shadow-sm transition hover:shadow-md"
          >
            <img
              src={wideBanner.image}
              alt="Shop at Authentic Retailers and save big on Redmi 15C"
              width={1024}
              height={341}
              className="block h-auto w-full"
            />
            <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-[#173827] px-5 py-2.5 text-sm font-bold text-white shadow-lg transition group-hover:bg-accent group-hover:text-brand-900 sm:bottom-6 sm:left-6 sm:px-6 sm:py-3">
              {wideBanner.cta}
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </section>

      <div className="bg-white">
        <ProductShelf
          title="New arrivals"
          subtitle="Fresh stock added to the Authentic store"
          href="/shop"
          products={newArrivals}
        />
      </div>

      <div className="bg-slate-50">
        <ProductShelf
          title="Smartphones"
          href="/shop?category=Phones"
          products={phonesShelf}
        />
      </div>

      <div className="bg-white">
        <ProductShelf
          title="Accessories"
          href="/shop?category=Accessories"
          products={accessoriesShelf}
        />
      </div>

      <FeaturedBrands />
    </>
  )
}
