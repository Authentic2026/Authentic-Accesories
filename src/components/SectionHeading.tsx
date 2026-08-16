import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Props = {
  title: string
  subtitle?: string
  href?: string
  linkLabel?: string
  children?: ReactNode
  className?: string
}

export default function SectionHeading({
  title,
  subtitle,
  href,
  linkLabel = 'View all',
  children,
  className = '',
}: Props) {
  return (
    <div className={`mb-5 flex flex-wrap items-end justify-between gap-3 ${className}`}>
      <div>
        <h2 className="text-xl font-bold text-brand-800 sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        {children}
      </div>
      {href && (
        <Link to={href} className="text-sm font-semibold text-brand-600 hover:text-accent">
          {linkLabel} &gt;
        </Link>
      )}
    </div>
  )
}
