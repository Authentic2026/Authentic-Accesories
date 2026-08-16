import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { products } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function CartPage() {
  const { getCartProducts, updateQty, removeFromCart, formatPrice, clearCart } = useStore()
  const items = getCartProducts(products)
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="store-container py-20 text-center">
        <div className="panel mx-auto max-w-md p-10">
          <h1 className="text-2xl font-semibold text-brand-800">Your cart is empty</h1>
          <p className="mt-2 text-sm text-slate-500">Browse the shop and add devices you love.</p>
          <Link to="/shop" className="btn-primary mt-6 inline-flex">
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <section className="store-container py-8">
      <nav className="mb-3 text-xs font-medium text-slate-500">
        <Link to="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-700">Cart</span>
      </nav>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-brand-800">Shopping cart</h1>
        <button type="button" onClick={clearCart} className="text-sm font-medium text-red-600 hover:underline">
          Clear cart
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="panel flex flex-col gap-4 p-4 sm:flex-row sm:items-center"
            >
              <Link to={`/product/${product.slug}`} className="shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-24 w-24 rounded-lg border border-slate-100 object-contain p-1"
                />
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  to={`/product/${product.slug}`}
                  className="font-semibold text-brand-800 hover:text-brand-600"
                >
                  {product.name}
                </Link>
                <p className="text-sm text-slate-500">{product.brand}</p>
                <p className="mt-1 font-bold text-brand-700">{formatPrice(product.price)}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-md border border-slate-300 bg-white">
                  <button
                    type="button"
                    className="p-2 hover:bg-slate-50"
                    onClick={() => updateQty(product.id, quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                  <button
                    type="button"
                    className="p-2 hover:bg-slate-50"
                    onClick={() => updateQty(product.id, quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                  className="rounded-md p-2 text-red-600 hover:bg-red-50"
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="panel h-fit p-5">
          <h2 className="text-lg font-bold text-brand-800">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-bold text-brand-800">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-primary mt-6 w-full">
            Proceed to checkout
          </Link>
          <Link to="/shop" className="btn-secondary mt-3 w-full">
            Continue shopping
          </Link>
        </aside>
      </div>
    </section>
  )
}
