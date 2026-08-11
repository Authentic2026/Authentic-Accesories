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
    <section className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-600">Support &amp; FAQs</h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600">
        Need help with an order, device, or pickup? Our Authentic team is ready to assist.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <a href={`tel:${CONTACT.phoneTel}`} className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-accent">
          <Phone className="text-accent" size={22} />
          <p className="mt-3 font-semibold text-brand-700">Call us</p>
          <p className="text-sm text-slate-500">{CONTACT.phone}</p>
        </a>
        <a href={`mailto:${CONTACT.email}`} className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-accent">
          <Mail className="text-accent" size={22} />
          <p className="mt-3 font-semibold text-brand-700">Email</p>
          <p className="break-all text-sm text-slate-500">{CONTACT.email}</p>
        </a>
        <a
          href={`https://wa.me/${CONTACT.phoneTel.replace('+', '')}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-accent"
        >
          <MessageCircle className="text-accent" size={22} />
          <p className="mt-3 font-semibold text-brand-700">WhatsApp</p>
          <p className="text-sm text-slate-500">{CONTACT.phone}</p>
        </a>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((item) => (
          <details key={item.q} className="rounded-xl border border-slate-200 bg-white p-4 open:shadow-sm">
            <summary className="cursor-pointer font-semibold text-brand-700">{item.q}</summary>
            <p className="mt-2 text-sm text-slate-600">{item.a}</p>
          </details>
        ))}
      </div>

      <Link to="/shop" className="btn-primary mt-8 inline-flex">
        Back to shop
      </Link>
    </section>
  )
}
