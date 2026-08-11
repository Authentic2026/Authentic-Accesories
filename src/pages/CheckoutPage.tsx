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
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold text-brand-600">Nothing to checkout</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">
          Browse shop
        </Link>
      </div>
    )
  }

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto text-accent" size={48} />
        <h1 className="mt-4 text-2xl font-bold text-brand-600">Order received</h1>
        <p className="mt-2 text-sm text-slate-600">
          Thank you for shopping with Authentic. Our team will contact you on {CONTACT.phone} to
          confirm pickup or delivery.
        </p>
        <Link to="/shop" className="btn-primary mt-8 inline-flex">
          Continue shopping
        </Link>
      </div>
    )
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    clearCart()
    setDone(true)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold text-brand-600">Checkout</h1>
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-brand-700">Contact &amp; fulfilment</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm sm:col-span-2">
              <span className="mb-1 block font-medium text-slate-600">Full name</span>
              <input required defaultValue={user?.name || ''} className="input-field" />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-600">Email</span>
              <input
                type="email"
                required
                defaultValue={user?.email || ''}
                className="input-field"
              />
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

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-brand-600">Your order</h2>
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
          <div className="mt-4 flex justify-between border-t border-slate-200 pt-3 font-bold text-brand-700">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </aside>
      </div>
    </section>
  )
}
