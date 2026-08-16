import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Filter, X } from 'lucide-react'
import FeaturedBrands from '../components/FeaturedBrands'
import ProductCard from '../components/ProductCard'
import { brands, categories, products } from '../data/products'

export default function ShopPage() {
  const [params, setParams] = useSearchParams()
  const [filtersOpen, setFiltersOpen] = useState(false)
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

  const Filters = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Category</h3>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setFilter('category', '')}
            className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
              !category ? 'bg-brand-600 font-semibold text-white' : 'text-slate-700 hover:bg-brand-50'
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
                category === c
                  ? 'bg-brand-600 font-semibold text-white'
                  : 'text-slate-700 hover:bg-brand-50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">Brand</h3>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => setFilter('brand', '')}
            className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
              !brand ? 'bg-brand-50 font-semibold text-brand-700' : 'text-slate-700 hover:bg-slate-50'
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
                brand === b
                  ? 'bg-brand-50 font-semibold text-brand-700'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <>
      <section className="page-hero">
        <div className="store-container py-8">
          <nav className="mb-2 text-xs font-medium text-slate-500">
            <Link to="/" className="hover:text-brand-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brand-700">Shop</span>
          </nav>
          <h1 className="text-3xl font-bold text-brand-800">Shop Authentic devices</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Browse smartphones and accessories curated for Authentic Retailers customers. Filter by
            category or brand to find the right device.
          </p>
          {(category || brand || q) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {category && (
                <span className="rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
                  {category}
                </span>
              )}
              {brand && (
                <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700">
                  {brand}
                </span>
              )}
              {q && (
                <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                  “{q}”
                </span>
              )}
              <button
                type="button"
                onClick={() => setParams({})}
                className="text-xs font-semibold text-brand-600 hover:text-accent"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="store-container py-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-brand-800">All products</h2>
            <p className="text-sm text-slate-500">
              Showing {filtered.length} of {products.length} products
            </p>
          </div>
          <button
            type="button"
            className="btn-secondary lg:hidden"
            onClick={() => setFiltersOpen(true)}
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <aside className="panel hidden h-fit w-56 shrink-0 p-4 lg:block">{Filters}</aside>

          <div className="min-w-0 flex-1">
            {filtered.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="font-medium text-slate-700">No products match your filters</p>
                <button type="button" className="btn-primary mt-4" onClick={() => setParams({})}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setFiltersOpen(false)}
            aria-label="Close filters"
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-brand-800">Filters</h3>
              <button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close">
                <X size={20} />
              </button>
            </div>
            {Filters}
            <button
              type="button"
              className="btn-primary mt-6 w-full"
              onClick={() => setFiltersOpen(false)}
            >
              Show {filtered.length} products
            </button>
          </div>
        </div>
      )}

      <FeaturedBrands compact />
    </>
  )
}
