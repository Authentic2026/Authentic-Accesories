import { Mail, Phone, ShieldCheck, Truck } from 'lucide-react'
import { CONTACT } from '../data/products'

export default function TopBar() {
  return (
    <div className="bg-brand-800 text-[11px] text-white sm:text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-2">
        <div className="hidden items-center gap-5 md:flex">
          <span className="inline-flex items-center gap-1.5 text-white/90">
            <ShieldCheck size={13} className="text-accent" />
            Trusted Authentic devices &amp; accessories
          </span>
          <span className="inline-flex items-center gap-1.5 text-white/90">
            <Truck size={13} className="text-accent" />
            Fast delivery nationwide
          </span>
        </div>

        <div className="flex w-full items-center justify-end gap-3 sm:w-auto sm:ml-auto">
          <a
            href={`mailto:${CONTACT.email}`}
            className="hidden items-center gap-1 text-white/90 hover:text-accent lg:inline-flex"
          >
            <Mail size={12} />
            {CONTACT.email}
          </a>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="inline-flex items-center gap-1 text-white/90 hover:text-accent"
          >
            <Phone size={12} />
            {CONTACT.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
