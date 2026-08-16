import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  CreditCard,
  Headphones,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { CONTACT } from '../data/products'
import Logo from './Logo'

const services = [
  {
    icon: Truck,
    title: 'Store pickup',
    text: 'Reserve online and collect from Head Office',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    text: 'Call or WhatsApp Authentic assistance',
  },
  {
    icon: CreditCard,
    title: 'Flexible payment',
    text: 'PayNow · EcoCash · In-store swipe',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted devices',
    text: 'Authentic certified phones & accessories',
  },
  {
    icon: RefreshCw,
    title: 'Local warranty',
    text: 'Care and after-sales support included',
  },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'ok'>('idle')

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('ok')
    setEmail('')
  }

  return (
    <footer className="mt-auto">
      <div className="border-y border-slate-200 bg-white">
        <div className="store-container grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-5">
          {services.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-sm font-bold text-brand-800">{title}</p>
                <p className="mt-0.5 text-xs text-slate-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-brand-50">
        <div className="store-container flex flex-col items-start justify-between gap-4 py-8 md:flex-row md:items-center">
          <div>
            <p className="text-lg font-bold text-brand-800">Stay ahead of new arrivals</p>
            <p className="mt-1 text-sm text-slate-600">
              Be first to know about phones, accessories and Authentic store offers.
            </p>
          </div>
          <form onSubmit={onSubscribe} className="flex w-full max-w-md gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="input-field"
            />
            <button type="submit" className="btn-primary shrink-0">
              Subscribe
            </button>
          </form>
        </div>
        {status === 'ok' && (
          <p className="store-container pb-4 text-sm font-medium text-brand-700">
            Thanks — you&apos;re on the list.
          </p>
        )}
      </div>

      <div className="bg-brand-800 text-white">
        <div className="store-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3">
              <Logo
                imageClassName="h-12 w-12 rounded-lg bg-white object-contain p-0.5"
                wordmarkClassName="text-white"
                wordmarkSizeClassName="text-[20px]"
                sublabel="Online Store"
              />
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Shop smartphones and accessories from Authentic Retailers — secure payments, store
              pickup and reliable local support.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Shop</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/shop?category=Phones" className="hover:text-accent">
                  Phones
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Accessories" className="hover:text-accent">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-accent">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-accent">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
              Customer care
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link to="/support" className="hover:text-accent">
                  Support &amp; FAQs
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-accent">
                  My account
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-accent">
                  Checkout
                </Link>
              </li>
              <li>PayNow · EcoCash · In-store swipe</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
              Head Office
            </h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                {CONTACT.address}
              </li>
              <li className="flex gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  <a href={`tel:${CONTACT.phoneTel}`} className="hover:text-accent">
                    {CONTACT.phone}
                  </a>
                  <br />
                  <a href="tel:+263776002389" className="hover:text-accent">
                    {CONTACT.phoneAlt}
                  </a>
                </span>
              </li>
              <li className="flex gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-accent" />
                <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-accent">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="store-container flex flex-col gap-2 py-4 text-center text-xs text-white/60 sm:flex-row sm:justify-between sm:text-left">
            <p>
              © {new Date().getFullYear()} {CONTACT.company}. All rights reserved.
            </p>
            <p>Authentic Retailers™ and related marks are trademarks of {CONTACT.company}.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
