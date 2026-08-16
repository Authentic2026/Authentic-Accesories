import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'

export type CategoryTile = {
  label: string
  href: string
  image?: string
  icon?: LucideIcon
  countLabel?: string
  /** Full-bleed photo with text overlaid on the image */
  fillCard?: boolean
}

export default function CategoryTiles({ items }: { items: CategoryTile[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {items.map((item) => {
        const Icon = item.icon

        if (item.fillCard && item.image) {
          return (
            <Link
              key={item.label}
              to={item.href}
              className="group relative min-h-[160px] overflow-hidden rounded-xl border border-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md sm:min-h-[180px]"
            >
              <img
                src={item.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
              <div className="relative flex h-full min-h-[160px] flex-col justify-end p-4 sm:min-h-[180px]">
                <p className="text-base font-bold text-white drop-shadow-sm">{item.label}</p>
                {item.countLabel && (
                  <p className="mt-0.5 text-[11px] font-medium text-white/80">{item.countLabel}</p>
                )}
              </div>
            </Link>
          )
        }

        return (
          <Link
            key={item.label}
            to={item.href}
            className="group panel flex flex-col items-center gap-3 p-4 text-center transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
          >
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-brand-50">
              {item.image ? (
                <img
                  src={item.image}
                  alt=""
                  className="h-12 w-12 object-contain transition group-hover:scale-105"
                />
              ) : Icon ? (
                <Icon className="text-brand-600" size={28} />
              ) : null}
            </div>
            <div>
              <p className="text-sm font-bold text-brand-800 group-hover:text-brand-600">
                {item.label}
              </p>
              {item.countLabel && (
                <p className="mt-0.5 text-[11px] font-medium text-slate-400">{item.countLabel}</p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
