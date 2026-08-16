import { Link } from 'react-router-dom'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import { CONTACT } from '../data/products'

const faqs = [
  {
    q: 'How do I pay for my order?',
    a: 'You can pay via PayNow, EcoCash, or swipe in-store at Authentic Head Office.',
  },
  {
    q: 'Do you offer store pickup?',
    a: `Yes. Reserve online and collect from ${CONTACT.address}.`,
  },
  {
    q: 'What warranty do devices include?',
    a: 'Most devices include 12 months Authentic care. Check each product page for details.',
  },
  {
    q: 'Can I change currency?',
    a: 'Use the USD / ZWG toggle in the top bar. Prices convert using the live displayed rate.',
  },
]

export default function SupportPage() {
  return (
    <section className="store-container py-10">
      <nav className="mb-3 text-xs font-medium text-slate-500">
        <Link to="/" className="hover:text-brand-600">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-700">Support</span>
      </nav>
      <h1 className="text-3xl font-bold text-brand-800">Support &amp; FAQs</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">
        Need help with an order, device, or pickup? Our Authentic team is ready to assist.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <a href={`tel:${CONTACT.phoneTel}`} className="panel p-5 transition hover:border-brand-300">
          <Phone className="text-accent" size={22} />
          <p className="mt-3 font-semibold text-brand-800">Call us</p>
          <p className="text-sm text-slate-500">{CONTACT.phone}</p>
        </a>
        <a href={`mailto:${CONTACT.email}`} className="panel p-5 transition hover:border-brand-300">
          <Mail className="text-accent" size={22} />
          <p className="mt-3 font-semibold text-brand-800">Email</p>
          <p className="break-all text-sm text-slate-500">{CONTACT.email}</p>
        </a>
        <a
          href={`https://wa.me/${CONTACT.phoneTel.replace('+', '')}`}
          target="_blank"
          rel="noreferrer"
          className="panel p-5 transition hover:border-brand-300"
        >
          <MessageCircle className="text-accent" size={22} />
          <p className="mt-3 font-semibold text-brand-800">WhatsApp</p>
          <p className="text-sm text-slate-500">{CONTACT.phone}</p>
        </a>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((item) => (
          <details key={item.q} className="panel open:shadow-md">
            <summary className="cursor-pointer px-4 py-3.5 font-semibold text-brand-800">
              {item.q}
            </summary>
            <p className="border-t border-slate-100 px-4 py-3 text-sm text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>

      <Link to="/shop" className="btn-primary mt-8 inline-flex">
        Back to shop
      </Link>
    </section>
  )
}
