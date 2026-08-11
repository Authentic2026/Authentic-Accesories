import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingCart, X } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import Logo from './Logo'

const navLinks = [
  { to: '/', label: 'HOME' },
  { to: '/shop', label: 'SHOP' },
  { to: '/shop?category=Phones', label: 'PHONES' },
  { to: '/shop', label: 'PROMOTIONS' },
  { to: '/support', label: 'FAQS' },
  { to: '/support', label: 'SUPPORT' },
]

export default function Header() {
  const { cartCount, wishlist, user, logout } = useStore()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop')
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 shadow-sm">
      {/* White main bar */}
      <div className="bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-6">
          <button
            type="button"
            className="text-brand-600 lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <Logo sublabel="Online Store" />

          <form onSubmit={onSearch} className="relative mx-auto hidden min-w-0 max-w-xl flex-1 md:block">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search devices..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-4 pr-12 text-sm text-slate-800 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand-600 text-white transition hover:bg-brand-700"
              aria-label="Search"
            >
              <Search size={15} />
            </button>
          </form>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link
              to="/wishlist"
              className="relative rounded-full p-2 text-brand-600 transition hover:bg-brand-50"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              className="relative rounded-full p-2 text-brand-600 transition hover:bg-brand-50"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden items-center gap-2 sm:flex">
                <span className="max-w-[90px] truncate text-xs font-medium text-brand-600">{user.name}</span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-brand-600 px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/login"
                  className="rounded-full bg-brand-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-brand-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-full border border-brand-600 px-4 py-1.5 text-xs font-semibold text-brand-600 transition hover:bg-brand-50"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} aria-label="Close" />
          <div className="absolute left-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
              <span className="font-bold text-brand-600">Authentic Menu</span>
              <button type="button" onClick={() => setOpen(false)} className="text-slate-500">
                <X size={22} />
              </button>
            </div>
            <form onSubmit={onSearch} className="border-b border-slate-100 p-4">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search devices..."
                  className="w-full rounded-full border border-slate-200 py-2.5 pl-4 pr-11 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand-600 text-white"
                >
                  <Search size={14} />
                </button>
              </div>
            </form>
            <nav className="flex flex-col p-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50"
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
                Sign Up
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
