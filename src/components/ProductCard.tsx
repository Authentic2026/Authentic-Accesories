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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-brand-300 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-b from-slate-50 to-white p-3">
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1">
          {product.isNew !== false && <span className="badge-new">New</span>}
          {product.cashOnly && <span className="badge-cash">Cash only</span>}
        </div>

        <div className="absolute right-2.5 top-2.5 z-10 flex flex-col gap-1.5 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:border-accent"
            aria-label="Wishlist"
          >
            <Heart size={13} className={wished ? 'fill-red-500 text-red-500' : 'text-slate-500'} />
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="rounded-full border border-slate-200 bg-white p-1.5 shadow-sm hover:border-accent"
            aria-label="Quick view"
          >
            <Eye size={13} className="text-slate-500" />
          </Link>
        </div>

        <Link to={`/product/${product.slug}`} className="flex h-full items-center justify-center">
          {product.colorImages?.length ? (
            <ColorCycleImage
              images={product.colorImages}
              alt={product.name}
              imgClassName="max-h-36 w-auto object-contain sm:max-h-40"
            />
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="max-h-36 w-auto object-contain drop-shadow-md transition duration-300 group-hover:scale-105 sm:max-h-40"
              loading="lazy"
            />
          )}
        </Link>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3 pt-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          {product.category === 'Phones' ? 'Smartphone' : product.category}
          <span className="mx-1 text-slate-300">·</span>
          {product.brand}
        </p>
        <Link
          to={`/product/${product.slug}`}
          className="mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-snug text-slate-900 hover:text-brand-600"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-end justify-between gap-2">
          <p className="text-lg font-extrabold text-brand-700">{formatPrice(product.price)}</p>
          <span className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
            {units} left
          </span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-700"
        >
          <ShoppingCart size={14} />
          Add to cart
        </button>
      </div>
    </article>
  )
}
