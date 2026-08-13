import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { CONTACT } from '../data/products'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="mt-auto bg-brand-800 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="mb-3">
            <Logo
              imageClassName="h-12 w-12 rounded-lg bg-white object-contain p-0.5"
              wordmarkClassName="text-white"
              sublabel="Online Store"
            />
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Shop smartphones and accessories from Authentic Retailers — secure payments,
            store pickup and reliable local support.
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

        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Support</h3>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <Link to="/login" className="hover:text-accent">
                Customer portal
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-accent">
                Track your cart
              </Link>
            </li>
            <li>PayNow · EcoCash · In-store swipe</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 text-center text-xs text-white/60 sm:flex-row sm:justify-between sm:text-left">
          <p>
            © {new Date().getFullYear()} {CONTACT.company}. All rights reserved.
          </p>
          <p>Authentic Retailers™ and related marks are trademarks of {CONTACT.company}.</p>
        </div>
      </div>
    </footer>
  )
}
