import { Link } from 'react-router-dom'
import { Eye, Heart, ShoppingCart } from 'lucide-react'
import type { Product } from '../data/products'
import { useStore } from '../context/StoreContext'
import ColorCycleImage from './ColorCycleImage'

export default function ProductCard({ product }: { product: Product }) {
  const { formatPrice, addToCart, toggleWishlist, isWishlisted } = useStore()
  const wished = isWishlisted(product.id)
  const units = product.stockUnits ?? 24

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-slate-50 to-white p-4">
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.isNew !== false && (
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
              New Arrival
            </span>
          )}
          {product.cashOnly && (
            <span className="rounded bg-brand-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Cash Only
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="rounded-full border border-slate-200 bg-white p-2 shadow-sm hover:border-accent"
            aria-label="Wishlist"
          >
            <Heart size={14} className={wished ? 'fill-red-500 text-red-500' : 'text-slate-500'} />
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="rounded-full border border-slate-200 bg-white p-2 shadow-sm hover:border-accent"
            aria-label="Quick view"
          >
            <Eye size={14} className="text-slate-500" />
          </Link>
        </div>

        <Link to={`/product/${product.slug}`} className="flex h-full items-center justify-center">
          <div className="relative w-full max-w-[220px]">
            {product.colorImages?.length ? (
              <ColorCycleImage
                images={product.colorImages}
                alt={product.name}
                imgClassName="max-h-44 w-auto object-contain"
              />
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="relative z-[1] mx-auto max-h-44 w-auto object-contain drop-shadow-xl transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
            )}
          </div>
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          {product.category === 'Phones' ? 'Smartphones' : product.category}
        </p>
        <Link
          to={`/product/${product.slug}`}
          className="mt-1 line-clamp-2 text-sm font-bold text-slate-900 hover:text-brand-600"
        >
          <span className="mr-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded bg-brand-50 px-1 text-[10px] font-bold uppercase text-brand-600">
            {product.brand.slice(0, 4)}
          </span>
          {product.name}
        </Link>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-xl font-extrabold text-slate-900">{formatPrice(product.price)}</p>
          <span className="rounded-md border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            {units} units
          </span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  )
}
