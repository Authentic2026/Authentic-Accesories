import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import FeaturedBrands from '../components/FeaturedBrands'
import { brands, categories, products } from '../data/products'

export default function ShopPage() {
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || ''
  const brand = params.get('brand') || ''
  const q = (params.get('q') || '').toLowerCase()

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category && p.category !== category) return false
      if (brand && p.brand.toLowerCase() !== brand.toLowerCase()) return false
      if (
        q &&
        !`${p.name} ${p.brand} ${p.category} ${p.description}`.toLowerCase().includes(q)
      ) {
        return false
      }
      return true
    })
  }, [category, brand, q])

  const setFilter = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next)
  }

  return (
    <>
      <section className="border-b border-slate-200 bg-gradient-to-r from-brand-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-10">
          <h1 className="text-3xl font-bold text-brand-600">Discover the latest Authentic Retailers devices</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Browse smartphones and accessories curated for Authentic Retailers customers. Use
            filters to narrow down by category, price, or brand.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-brand-600">All Products</h2>
          <p className="text-sm text-slate-500">
            Showing {filtered.length} of {products.length} products
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-6 lg:flex-row">
          <aside className="w-full shrink-0 space-y-6 lg:w-56">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Filters</h3>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setFilter('category', '')}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                    !category ? 'bg-brand-600 text-white' : 'hover:bg-brand-50 text-slate-700'
                  }`}
                >
                  All categories
                </button>
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFilter('category', c)}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                      category === c ? 'bg-brand-600 text-white' : 'hover:bg-brand-50 text-slate-700'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-semibold text-slate-700">Brand</h3>
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => setFilter('brand', '')}
                  className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                    !brand ? 'bg-brand-50 text-brand-700 font-medium' : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  All brands
                </button>
                {brands.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setFilter('brand', b)}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                      brand === b ? 'bg-brand-50 text-brand-700 font-medium' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="font-medium text-slate-700">No products match your filters</p>
                <button
                  type="button"
                  className="btn-primary mt-4"
                  onClick={() => setParams({})}
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <FeaturedBrands />
    </>
  )
}
