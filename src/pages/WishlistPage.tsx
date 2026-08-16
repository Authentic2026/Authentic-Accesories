import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function WishlistPage() {
  const { wishlist } = useStore()
  const items = products.filter((p) => wishlist.includes(p.id))

  return (
    <section className="store-container py-8">
      <nav className="mb-3 text-xs font-medium text-slate-500">
        <Link to="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-700">Wishlist</span>
      </nav>
      <h1 className="text-2xl font-bold text-brand-800">Wishlist</h1>
      <p className="mt-1 text-sm text-slate-500">
        {items.length} saved {items.length === 1 ? 'item' : 'items'}
      </p>

      {items.length === 0 ? (
        <div className="panel mt-10 border-dashed p-12 text-center">
          <p className="font-medium text-slate-700">Your wishlist is empty</p>
          <Link to="/shop" className="btn-primary mt-6 inline-flex">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  )
}
