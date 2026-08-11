import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function WishlistPage() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold text-brand-600">Wishlist</h1>
      <p className="mt-1 text-sm text-slate-500">
        {items.length} saved {items.length === 1 ? 'item' : 'items'}
      </p>

      {items.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-medium text-slate-700">Your wishlist is empty</p>
          <Link to="/shop" className="btn-primary mt-6 inline-flex">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}
