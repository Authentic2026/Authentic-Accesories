import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  CircleDollarSign,
  Globe,
  Grip,
  Headphones,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from 'lucide-react'
import { CONTACT, products } from '../data/products'
import { useStore } from '../context/StoreContext'
import Logo from './Logo'

const CURRENCY_OPTIONS = [
  { code: 'USD' as const, label: 'USD | United States ($)' },
  { code: 'ZWG' as const, label: 'ZWG | Zimbabwe (ZWG)' },
]

const HEADER_MAX = 'max-w-[1513px]'

type MenuColumn = { heading?: string; items: { label: string; to?: string }[] }

const categoryMenu = [
  { label: 'All products', to: '/shop' },
  { label: 'Smartphones', to: '/shop?category=Phones' },
  { label: 'Accessories', to: '/shop?category=Accessories' },
  { label: 'Chargers & Power', to: '/shop?q=charger' },
  { label: 'Cables', to: '/shop?q=cable' },
  { label: 'Smartwatch', to: '/shop?q=watch' },
  { label: 'Cases & Pouches', to: '/shop?q=pouch' },
  { label: 'Screen Protection', to: '/shop?q=glass' },
  { label: 'Samsung', to: '/shop?brand=Samsung' },
  { label: 'Bestseller', to: '/shop' },
]

const featuredProducts = products.slice(0, 5)

const navItems: { label: string; to: string; columns?: MenuColumn[] }[] = [
  { label: 'Home', to: '/' },
  {
    label: 'Shop',
    to: '/shop',
    columns: [
      {
        heading: 'SHOP LAYOUT',
        items: [
          { label: 'Shop Default', to: '/shop' },
          { label: 'Shop Phones', to: '/shop?category=Phones' },
          { label: 'Shop Accessories', to: '/shop?category=Accessories' },
          { label: 'Shop Cart', to: '/cart' },
        ],
      },
      {
        heading: 'STORE PAGES',
        items: [
          { label: 'Wishlist', to: '/wishlist' },
          { label: 'Check Out', to: '/checkout' },
          { label: 'My Account', to: '/login' },
          { label: 'Track Your Order', to: '/support' },
        ],
      },
    ],
  },
  {
    label: 'Product',
    to: '/shop',
    columns: [
      {
        heading: 'FEATURED DEVICES',
        items: featuredProducts.map((p) => ({ label: p.name, to: `/product/${p.slug}` })),
      },
      {
        heading: 'BROWSE BY BRAND',
        items: [
          { label: 'Samsung', to: '/shop?brand=Samsung' },
          { label: 'itel', to: '/shop?brand=itel' },
          { label: 'Redmi', to: '/shop?brand=Redmi' },
          { label: 'Tecno', to: '/shop?brand=Tecno' },
          { label: 'Infinix', to: '/shop?brand=Infinix' },
        ],
      },
    ],
  },
  {
    label: 'Blog',
    to: '/support',
    columns: [{ items: [{ label: 'Coming soon' }] }],
  },
  {
    label: 'Page',
    to: '/support',
    columns: [
      {
        items: [
          { label: 'Contact', to: '/support' },
          { label: 'Support', to: '/support' },
          { label: 'FAQs', to: '/support' },
          { label: 'Sign In', to: '/login' },
          { label: 'Register', to: '/register' },
        ],
      },
    ],
  },
]

const popularSearches = [
  { label: 'Galaxy A07', q: 'A07' },
  { label: '45W charger', q: 'charger' },
  { label: 'itel A50', q: 'itel a50' },
  { label: 'Galaxy Watch 8', q: 'watch' },
]

export default function Header() {
  const { cartCount, cartTotal, wishlist, user, logout, currency, setCurrency, formatPrice } =
    useStore()
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [searchCategory, setSearchCategory] = useState('')
  const headerRef = useRef<HTMLElement>(null)
  const currentPath = `${pathname}${search}`

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setCategoriesOpen(false)
        setAccountOpen(false)
        setCurrencyOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const runSearch = (term: string, category = searchCategory) => {
    const params = new URLSearchParams()
    if (term.trim()) params.set('q', term.trim())
    if (category) params.set('category', category)
    navigate(params.toString() ? `/shop?${params}` : '/shop')
    setDrawerOpen(false)
  }

  const onSearch = (e: FormEvent) => {
    e.preventDefault()
    runSearch(query)
  }

  const closeMenus = () => {
    setCategoriesOpen(false)
    setAccountOpen(false)
    setCurrencyOpen(false)
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-40">
      {/* Top Bar */}
      <div className="hidden h-12 w-full border-b border-white/10 bg-brand-800 xl:block">
        <div className={`mx-auto flex h-full w-full ${HEADER_MAX} items-center justify-between px-5`}>
          <div className="flex items-center gap-4 text-sm font-bold leading-[1.2] text-white/70">
            <p className="inline-flex items-center gap-1.5">
              <Headphones size={17} className="shrink-0" />
              <span>
                Call us for free:{' '}
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="font-bold text-accent hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </span>
            </p>
            <p className="inline-flex items-center">
              Free Deliveries for Orders <span className="ml-1 font-bold text-white">$80+</span>
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm font-bold leading-[1.2] text-white/70">
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setCurrencyOpen((v) => !v)
                  setAccountOpen(false)
                }}
                className="inline-flex items-center gap-1.5 text-sm font-bold leading-[1.2] text-white hover:text-accent"
                aria-expanded={currencyOpen}
                aria-haspopup="listbox"
              >
                <CircleDollarSign size={17} className="shrink-0 text-white/70" />
                <span>{currency}</span>
                <ChevronDown
                  size={11}
                  className={`ml-0.5 shrink-0 transition ${currencyOpen ? 'rotate-180' : ''}`}
                  strokeWidth={2.5}
                />
              </button>
              {currencyOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-3 w-[230px] -translate-x-1/2">
                  <span
                    className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-white shadow-[-1px_-1px_2px_rgba(0,0,0,0.06)]"
                    aria-hidden
                  />
                  <ul
                    role="listbox"
                    aria-label="Currency"
                    className="relative overflow-hidden bg-white py-2 text-[13px] font-medium leading-[1.4] text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
                  >
                    {CURRENCY_OPTIONS.map((option) => {
                      const active = currency === option.code
                      return (
                        <li key={option.code}>
                          <button
                            type="button"
                            role="option"
                            aria-selected={active}
                            onClick={() => {
                              setCurrency(option.code)
                              setCurrencyOpen(false)
                            }}
                            className={`block w-full px-5 py-2.5 text-left transition hover:text-accent ${
                              active ? 'text-accent' : 'text-slate-700'
                            }`}
                          >
                            {option.label}
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>

            <label className="inline-flex cursor-pointer items-center gap-1.5 hover:text-white">
              <Globe size={17} className="shrink-0" />
              <select
                className="cursor-pointer appearance-none bg-transparent pr-3.5 text-sm font-bold leading-[1.2] text-white outline-none [&>option]:text-slate-800"
                aria-label="Language"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%23ffffff99' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right center',
                }}
              >
                <option>English</option>
              </select>
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setAccountOpen((v) => !v)
                  setCurrencyOpen(false)
                }}
                className="inline-flex items-center gap-1.5 text-sm font-bold leading-[1.2] text-white hover:text-accent"
              >
                <User size={17} className="shrink-0 text-white/70" />
                <span>My account:</span>
                <ChevronDown size={11} className="ml-1 shrink-0" strokeWidth={2.5} />
              </button>
              {accountOpen && (
                <div className="absolute right-0 top-full z-50 mt-1.5 w-44 overflow-hidden rounded-md bg-white py-1 text-xs leading-[1.2] text-slate-700 shadow-[0_4px_9px_rgba(0,0,0,0.2)]">
                  {user ? (
                    <>
                      <p className="px-4 py-2 font-semibold text-brand-700">{user.name}</p>
                      <Link
                        to="/wishlist"
                        onClick={closeMenus}
                        className="block px-4 py-2 hover:text-accent"
                      >
                        Wishlist
                      </Link>
                      <Link
                        to="/cart"
                        onClick={closeMenus}
                        className="block px-4 py-2 hover:text-accent"
                      >
                        Cart
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          logout()
                          closeMenus()
                        }}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={closeMenus}
                        className="block px-4 py-2 hover:text-accent"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/register"
                        onClick={closeMenus}
                        className="block px-4 py-2 hover:text-accent"
                      >
                        Register
                      </Link>
                      <Link
                        to="/support"
                        onClick={closeMenus}
                        className="block px-4 py-2 hover:text-accent"
                      >
                        Support
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Inner header — white band between top bar and nav */}
      <div className="border-b border-slate-200 bg-white py-[19px]">
        <div className={`mx-auto flex w-full ${HEADER_MAX} items-center gap-4 px-4`}>
          <div className="shrink-0">
            <Logo wordmarkClassName="text-brand-800" />
          </div>

          <div className="mx-auto hidden w-full max-w-[820px] flex-col md:flex">
            <form onSubmit={onSearch} className="relative">
              <div className="flex h-[45px] w-full items-center gap-[15px] rounded-full border border-slate-200 bg-white px-[22px] transition focus-within:border-accent">
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="shrink-0 cursor-pointer bg-transparent text-[13px] font-medium text-slate-700 outline-none"
                  aria-label="Search category"
                >
                  <option value="">All categories</option>
                  <option value="Phones">Phones</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <span className="h-5 w-px shrink-0 bg-slate-200" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for products"
                  className="min-w-0 flex-1 bg-transparent py-[9px] pr-9 text-[13px] leading-[25px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-[5px] top-1/2 flex h-[35px] w-[35px] -translate-y-1/2 items-center justify-center rounded-full bg-accent text-brand-900 transition hover:bg-brand-600 hover:text-white"
                  aria-label="Search"
                >
                  <Search size={17} />
                </button>
              </div>
            </form>
            <p className="mt-2 hidden truncate text-[13px] text-slate-400 xl:block">
              Popular search:{' '}
              {popularSearches.map((item, i) => (
                <span key={item.label}>
                  <button
                    type="button"
                    onClick={() => runSearch(item.q, '')}
                    className="hover:text-accent"
                  >
                    {item.label}
                  </button>
                  {i < popularSearches.length - 1 && ', '}
                </span>
              ))}
            </p>
          </div>

          {/* Desktop wishlist + cart */}
          <div className="ml-auto hidden items-center gap-5 xl:flex">
            <Link
              to="/wishlist"
              className="group flex items-center gap-[14px] border-r border-slate-200 pr-5"
            >
              <span className="relative pr-[17px] pt-1.5">
                <Heart
                  size={34}
                  strokeWidth={1.4}
                  className="text-brand-800 transition group-hover:text-accent"
                />
                <span className="absolute right-[7px] top-0 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-accent text-[14px] font-semibold text-brand-900">
                  {wishlist.length}
                </span>
              </span>
              <span className="hidden flex-col gap-[3px] 2xl:flex">
                <span className="text-[13px] leading-none text-slate-400">wishlist:</span>
                <span className="text-[15px] font-semibold leading-none text-brand-800">
                  {wishlist.length} item
                </span>
              </span>
            </Link>

            <Link to="/cart" className="group flex items-center gap-[14px]">
              <span className="relative pr-[17px] pt-1.5">
                <ShoppingCart
                  size={34}
                  strokeWidth={1.4}
                  className="text-brand-800 transition group-hover:text-accent"
                />
                <span className="absolute right-[7px] top-0 flex h-[26px] w-[26px] items-center justify-center rounded-full bg-accent text-[14px] font-semibold text-brand-900">
                  {cartCount}
                </span>
              </span>
              <span className="hidden flex-col gap-[3px] 2xl:flex">
                <span className="text-[13px] leading-none text-slate-400">Your cart:</span>
                <span className="text-[15px] font-semibold leading-none text-accent">
                  {formatPrice(cartTotal)}
                </span>
              </span>
            </Link>
          </div>

          {/* Mobile icons */}
          <div className="ml-auto flex items-center gap-5 xl:hidden">
            <Link
              to={user ? '/wishlist' : '/login'}
              className="flex flex-col items-center text-brand-800"
            >
              <User size={22} strokeWidth={1.6} />
              <p className="mt-0.5 hidden text-[13px] sm:block">{user ? user.name : 'Sign in'}</p>
            </Link>
            <Link to="/cart" className="relative flex flex-col items-center text-brand-800">
              <ShoppingCart size={24} strokeWidth={1.6} />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-brand-900">
                  {cartCount}
                </span>
              )}
              <p className="mt-0.5 hidden text-[13px] sm:block">Your cart:</p>
            </Link>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="text-brand-800"
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </div>

      {/* Header bottom */}
      <div className="hidden bg-brand-600 xl:block">
        <div className={`relative mx-auto flex w-full ${HEADER_MAX} items-center gap-[30px] px-4`}>
          <div className="relative shrink-0">
            {/* Gold bleed so the bar still reaches the viewport edge */}
            <span
              className="pointer-events-none absolute right-full top-0 h-full w-screen bg-accent"
              aria-hidden
            />
            <button
              type="button"
              onClick={() => setCategoriesOpen((v) => !v)}
              className="relative flex h-[64px] items-center gap-2.5 bg-accent pr-10 text-white transition hover:bg-[#c9a432]"
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%)',
              }}
            >
              <Grip size={20} className="shrink-0" />
              <span className="whitespace-nowrap text-[15px] font-semibold leading-none text-white">
                All Categories
              </span>
            </button>
            {categoriesOpen && (
              <div className="absolute left-0 top-full z-50 min-w-[285px] border border-slate-200 bg-white py-1 shadow-[0_4px_9px_rgba(0,0,0,0.2)]">
                {categoryMenu.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={closeMenus}
                    className="block px-5 py-2.5 text-[15px] text-slate-700 transition hover:text-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <nav className="flex min-w-0 flex-1 items-center gap-[30px]">
            {navItems.map((item) => {
              const active = currentPath === item.to
              return (
                <div key={item.label} className="group relative">
                  <Link
                    to={item.to}
                    className={`relative flex h-[64px] items-center gap-[3px] text-[15px] font-semibold leading-[64px] transition ${
                      active ? 'text-accent' : 'text-white group-hover:text-accent'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.columns && (
                      <ChevronDown size={14} className="transition group-hover:rotate-180" />
                    )}
                    <span
                      className={`absolute bottom-0 left-0 h-px w-full bg-accent transition-transform ${
                        active ? 'scale-100' : 'scale-0 group-hover:scale-100'
                      }`}
                    />
                  </Link>

                  {item.columns && (
                    <div className="invisible absolute left-0 top-full z-50 flex translate-y-2.5 gap-8 rounded-b-md bg-white p-[30px] opacity-0 shadow-[0_4px_9px_rgba(0,0,0,0.2)] transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.columns.map((column, ci) => (
                        <div key={column.heading ?? ci} className="min-w-[200px]">
                          {column.heading && (
                            <p className="mb-2 text-[13px] font-semibold text-slate-400">
                              {column.heading}
                            </p>
                          )}
                          <ul>
                            {column.items.map((sub) => (
                              <li key={sub.label} className="border-b border-slate-100 last:border-0">
                                {sub.to ? (
                                  <Link
                                    to={sub.to}
                                    className="block whitespace-nowrap py-2.5 text-[15px] text-slate-700 transition hover:text-accent"
                                  >
                                    {sub.label}
                                  </Link>
                                ) : (
                                  <span className="block whitespace-nowrap py-2.5 text-[15px] text-slate-400">
                                    {sub.label}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Mobile search strip */}
      <div className="bg-brand-600 py-2 md:hidden">
        <form onSubmit={onSearch} className={`mx-auto w-full ${HEADER_MAX} px-4`}>
          <div className="relative flex h-10 items-center rounded-full bg-white pl-4 pr-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products"
              className="min-w-0 flex-1 bg-transparent text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-brand-900"
              aria-label="Search"
            >
              <Search size={15} />
            </button>
          </div>
        </form>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close"
          />
          <div className="absolute left-0 top-0 flex h-full w-80 max-w-[85%] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between bg-brand-800 px-4 py-4 text-white">
              <span className="font-bold">Authentic Retailers</span>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                <X size={22} />
              </button>
            </div>

            <nav className="scroll-thin flex flex-1 flex-col overflow-y-auto p-2">
              <p className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Menu
              </p>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-50"
                >
                  {item.label}
                </Link>
              ))}

              <p className="mt-3 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Categories
              </p>
              {categoryMenu.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-brand-50"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 border-t border-slate-100 px-3 py-3">
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Currency
                </p>
                <div className="flex gap-2">
                  {(['USD', 'ZWG'] as const).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCurrency(c)}
                      className={`flex-1 rounded-md border px-3 py-2 text-xs font-bold ${
                        currency === c
                          ? 'border-brand-600 bg-brand-600 text-white'
                          : 'border-slate-300 text-slate-600'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto border-t border-slate-100 p-3">
                {user ? (
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setDrawerOpen(false)
                    }}
                    className="btn-secondary w-full"
                  >
                    Logout ({user.name})
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link to="/login" onClick={() => setDrawerOpen(false)} className="btn-primary">
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setDrawerOpen(false)} className="btn-secondary">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
