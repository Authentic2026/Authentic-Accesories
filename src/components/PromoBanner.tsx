import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

type Props = {
  eyebrow?: string
  title: string
  text?: string
  href: string
  cta?: string
  image: string
  tone?: 'dark' | 'brand' | 'light'
  className?: string
}

const tones = {
  dark: 'from-brand-900/95 via-brand-800/75 to-brand-900/40 text-white',
  brand: 'from-brand-700/95 via-brand-600/70 to-brand-800/30 text-white',
  light: 'from-white via-white/90 to-transparent text-brand-800',
}

export default function PromoBanner({
  eyebrow,
  title,
  text,
  href,
  cta = 'Shop now',
  image,
  tone = 'dark',
  className = '',
}: Props) {
  return (
    <Link
      to={href}
      className={`group relative block min-h-[180px] overflow-hidden rounded-xl ${className}`}
    >
      <img
        src={image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <div className={`absolute inset-0 bg-gradient-to-r ${tones[tone]}`} />
      <div className="relative flex h-full min-h-[180px] flex-col justify-center p-6 sm:p-8">
        {eyebrow && (
          <p
            className={`text-[11px] font-bold uppercase tracking-[0.2em] ${
              tone === 'light' ? 'text-accent' : 'text-accent'
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h3 className="mt-2 max-w-md text-2xl font-extrabold leading-tight sm:text-3xl">{title}</h3>
        {text && (
          <p
            className={`mt-2 max-w-sm text-sm ${
              tone === 'light' ? 'text-slate-600' : 'text-white/80'
            }`}
          >
            {text}
          </p>
        )}
        <span
          className={`mt-5 inline-flex w-fit items-center gap-2 rounded-md px-4 py-2 text-sm font-bold transition ${
            tone === 'light'
              ? 'bg-brand-600 text-white group-hover:bg-brand-700'
              : 'bg-white text-brand-700 group-hover:bg-accent'
          }`}
        >
          {cta}
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  )
}
