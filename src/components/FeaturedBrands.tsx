import { Link } from 'react-router-dom'

const brands = [
  {
    name: 'Samsung',
    src: '/images/brands/samsung.png?v=2',
    imgClassName: 'h-auto w-full max-h-none scale-125 object-contain',
  },
  { name: 'itel', src: '/images/brands/itel.png' },
  { name: 'Redmi', src: '/images/brands/redmi.png' },
  { name: 'Tecno', src: '/images/brands/tecno.svg' },
  { name: 'Infinix', src: '/images/brands/infinix.svg' },
  { name: 'Oking', src: '/images/brands/oking.png' },
]

export default function FeaturedBrands({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? 'py-8' : 'section-pad border-t border-slate-200 bg-white'}>
      <div className="store-container">
        {!compact && (
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-brand-800">Featured brands</h2>
            <p className="mt-1 text-sm text-slate-500">
              Devices and accessories from trusted Authentic Retailers partners
            </p>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              to={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="flex h-16 w-28 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:border-brand-300 hover:shadow-md sm:h-20 sm:w-36"
            >
              <img
                src={brand.src}
                alt={`${brand.name} logo`}
                className={brand.imgClassName ?? 'max-h-10 max-w-full object-contain sm:max-h-12'}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
