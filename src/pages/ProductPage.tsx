import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Check, Heart, Package, Shield, ShoppingCart, Truck } from 'lucide-react'
import FeaturedBrands from '../components/FeaturedBrands'
import { getProductBySlug } from '../data/products'
import { useStore } from '../context/StoreContext'

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProductBySlug(slug)
  const { formatPrice, addToCart, toggleWishlist, isWishlisted } = useStore()
  const [qty, setQty] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  if (!product) {
    return (
      <div className="store-container py-20 text-center">
        <h1 className="text-2xl font-semibold text-brand-700">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">
          Back to shop
        </Link>
      </div>
    )
  }

  const wished = isWishlisted(product.id)
  const gallery = product.colorImages?.length
    ? product.colorImages.map((c) => ({ src: c.src, label: c.name }))
    : [{ src: product.image, label: product.name }]
  const current = gallery[Math.min(activeImage, gallery.length - 1)]

  return (
    <>
      <section className="page-hero">
        <div className="store-container py-6">
          <nav className="mb-2 text-xs font-medium text-slate-500">
            <Link to="/" className="hover:text-brand-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-brand-600">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-brand-700">{product.name}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Device detail
          </p>
          <h1 className="mt-1 text-2xl font-bold text-brand-800 sm:text-3xl">{product.name}</h1>
        </div>
      </section>

      <section className="store-container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="panel flex aspect-square items-center justify-center p-6">
              <img
                src={current.src}
                alt={`${product.name} — ${current.label}`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {gallery.map((img, i) => (
                  <button
                    key={img.src + img.label}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-white p-1 ${
                      i === activeImage ? 'border-brand-600 ring-2 ring-brand-500/20' : 'border-slate-200'
                    }`}
                  >
                    <img src={img.src} alt="" className="h-full w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-700">
                {product.brand}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-600">
                {product.category}
              </span>
              {product.cashOnly && (
                <span className="rounded-full bg-accent/20 px-3 py-1 font-medium text-brand-800">
                  Cash only
                </span>
              )}
              <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-500">
                SKU: {product.sku}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-brand-800">{product.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{product.description}</p>
            <p className="mt-4 text-3xl font-extrabold text-brand-700">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 text-sm text-slate-500">Pay via PayNow, EcoCash or swipe in-store.</p>
            <p className="mt-2 text-sm font-semibold text-emerald-600">
              {product.inStock
                ? `In stock${product.stockUnits ? ` · ${product.stockUnits} units` : ''}`
                : 'Out of stock'}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                ['Condition', 'Brand new'],
                ['Warranty', '12 months Authentic care'],
                ['Fulfilment', 'Pick up available'],
                ['Support', 'Authentic assistance'],
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
              <button type="button" onClick={() => toggleWishlist(product.id)} className="btn-secondary">
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
            <h3 className="mb-4 text-lg font-bold text-brand-800">Specifications</h3>
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
            <div key={title} className="panel p-5">
              <Icon className="mb-3 text-accent" size={22} />
              <h4 className="font-semibold text-brand-700">{title}</h4>
              <p className="mt-1 text-sm text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <FeaturedBrands compact />
    </>
  )
}
