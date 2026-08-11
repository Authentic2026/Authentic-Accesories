import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, Heart, Package, Shield, ShoppingCart, Truck } from 'lucide-react'
import FeaturedBrands from '../components/FeaturedBrands'
import ColorCycleImage from '../components/ColorCycleImage'
import { getProductBySlug } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProductBySlug(slug)
  const { formatPrice, addToCart, toggleWishlist, isWishlisted } = useStore()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold text-brand-600">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">
          Back to shop
        </Link>
      </div>
    )
  }

  const wished = isWishlisted(product.id)

  return (
    <>
      <section className="border-b border-slate-200 bg-brand-50/60">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Device detail</p>
          <h1 className="mt-2 text-3xl font-bold text-brand-600">{product.name}</h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            Premium devices curated for Authentic customers with reliable delivery and local
            warranty support.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-6">
            {product.colorImages?.length ? (
              <ColorCycleImage
                images={product.colorImages}
                alt={product.name}
                intervalMs={2400}
                imgClassName="max-h-full max-w-full object-contain"
                className="w-full"
              />
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full w-full object-contain"
              />
            )}
          </div>

          <div>
            <div className="mb-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-600">
                {product.brand}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
                {product.category}
              </span>
              {product.cashOnly && (
                <span className="rounded-full bg-accent/20 px-3 py-1 font-medium text-brand-700">
                  Cash Only
                </span>
              )}
              <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-500">
                SKU: {product.sku}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-brand-700">{product.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{product.description}</p>
            <p className="mt-4 text-3xl font-bold text-brand-600">{formatPrice(product.price)}</p>
            <p className="mt-1 text-sm text-slate-500">Pay via PayNow, EcoCash or swipe in-store.</p>
            <p className="mt-2 text-sm font-medium text-emerald-600">
              {product.inStock ? 'In stock' : 'Out of stock'}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                ['Condition', 'Brand new'],
                ['Warranty', '12 months Authentic care'],
                ['Fulfilment', 'Pick up available'],
                ['Support', '24/7 Authentic assistance'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="font-medium text-slate-700">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-3">
              <label className="text-sm">
                <span className="mb-1 block font-medium text-slate-600">Quantity</span>
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
                  className="input-field w-24"
                />
              </label>
              <button
                type="button"
                className="btn-primary"
                onClick={() => addToCart(product.id, qty)}
              >
                <ShoppingCart size={16} />
                Add to cart
              </button>
              <Link to="/cart" className="btn-accent" onClick={() => addToCart(product.id, qty)}>
                Buy it now
              </Link>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="btn-secondary"
              >
                <Heart size={16} className={wished ? 'fill-red-500 text-red-500' : ''} />
                Wishlist
              </button>
            </div>

            <ul className="mt-8 space-y-2 text-sm text-slate-600">
              {[
                'Authentic certified hardware',
                'Includes onboarding & setup support',
                'Compatible with extended warranty',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {product.specs && (
          <div className="mt-12">
            <h3 className="mb-4 text-lg font-semibold text-brand-600">Specifications</h3>
            <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                  <dt className="text-xs text-slate-400">{key}</dt>
                  <dd className="font-medium text-slate-700">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Truck,
              title: 'In-store pickup',
              text: 'Reserve online and collect from participating Authentic stores.',
            },
            {
              icon: Package,
              title: 'Secure packaging',
              text: 'Arrives with tamper-proof seals and insurance.',
            },
            {
              icon: Shield,
              title: 'Dedicated support',
              text: 'Authentic support team on hand throughout the device lifecycle.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-5">
              <Icon className="mb-3 text-accent" size={22} />
              <h4 className="font-semibold text-brand-600">{title}</h4>
              <p className="mt-1 text-sm text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <FeaturedBrands />
    </>
  )
}
