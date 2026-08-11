import { Headset } from 'lucide-react'
import { Link } from 'react-router-dom'
import { CONTACT } from '../data/products'

export default function SupportFab() {
  return (
    <Link
      to="/support"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/30 transition hover:bg-brand-700 hover:shadow-xl"
      aria-label="Support"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-brand-800">
        <Headset size={16} />
      </span>
      Support
      <span className="sr-only">{CONTACT.phone}</span>
    </Link>
  )
}
