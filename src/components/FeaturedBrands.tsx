import { Link } from 'react-router-dom'

const brands = [
  { name: 'Samsung', src: '/images/brands/samsung.png' },
  { name: 'itel', src: '/images/brands/itel.png' },
  { name: 'Redmi', src: '/images/brands/redmi.png' },
  { name: 'Oking', src: '/images/brands/oking.png' },
]

export default function FeaturedBrands() {
  return (
    <section className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-brand-600">Featured Brands</h2>
          <p className="mt-1 text-sm text-slate-500">
            Explore devices and accessories from trusted Authentic partners
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="flex h-20 w-36 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-accent hover:shadow-md"
            >
              <img
                src={brand.src}
                alt={`${brand.name} logo`}
                className="max-h-12 max-w-full object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
