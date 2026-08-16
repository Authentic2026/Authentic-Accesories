import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { CONTACT, products } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function CheckoutPage() {
  const { getCartProducts, formatPrice, clearCart, user } = useStore()
  const items = getCartProducts(products)
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  const [done, setDone] = useState(false)

  if (items.length === 0 && !done) {
    return (
      <div className="store-container py-20 text-center">
        <div className="panel mx-auto max-w-md p-10">
          <h1 className="text-2xl font-semibold text-brand-800">Nothing to checkout</h1>
          <Link to="/shop" className="btn-primary mt-6 inline-flex">
            Browse shop
          </Link>
        </div>
      </div>
    )
  }

  if (done) {
    return (
      <div className="store-container py-20">
        <div className="panel mx-auto max-w-lg p-10 text-center">
          <CheckCircle2 className="mx-auto text-accent" size={48} />
          <h1 className="mt-4 text-2xl font-bold text-brand-800">Order received</h1>
          <p className="mt-2 text-sm text-slate-600">
            Thank you for shopping with Authentic. Our team will contact you on {CONTACT.phone} to
            confirm pickup or delivery.
          </p>
          <Link to="/shop" className="btn-primary mt-8 inline-flex">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    clearCart()
    setDone(true)
  }

  return (
    <section className="store-container py-8">
      <nav className="mb-3 text-xs font-medium text-slate-500">
        <Link to="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/cart" className="hover:text-brand-600">
          Cart
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-700">Checkout</span>
      </nav>
      <h1 className="mb-8 text-2xl font-bold text-brand-800">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <form onSubmit={onSubmit} className="panel space-y-4 p-6">
          <h2 className="font-bold text-brand-800">Contact &amp; fulfilment</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-slate-600">Full name</span>
              <input required defaultValue={user?.name || ''} className="input-field" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-600">Email</span>
              <input type="email" required defaultValue={user?.email || ''} className="input-field" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-600">Phone</span>
              <input required className="input-field" placeholder="+263 ..." />
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-slate-600">Fulfilment</span>
              <select className="input-field" defaultValue="pickup">
                <option value="pickup">In-store pickup — {CONTACT.address}</option>
                <option value="delivery">Delivery</option>
              </select>
            </label>
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-slate-600">Notes</span>
              <textarea className="input-field min-h-[90px]" placeholder="Optional order notes" />
            </label>
          </div>
          <button type="submit" className="btn-primary w-full sm:w-auto">
            Place order · {formatPrice(total)}
          </button>
        </form>

        <aside className="panel h-fit p-5">
          <h2 className="font-bold text-brand-800">Your order</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex justify-between gap-3">
                <span className="text-slate-600">
                  {product.name} × {quantity}
                </span>
                <span className="font-medium text-brand-700">
                  {formatPrice(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-slate-200 pt-3 font-bold text-brand-800">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </section>
  )
}
