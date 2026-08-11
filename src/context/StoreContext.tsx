import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { USD_TO_ZWG, type Product } from '../data/products'

export type Currency = 'USD' | 'ZWG'

type CartItem = { productId: string; quantity: number }
type User = { name: string; email: string }

type StoreContextValue = {
  currency: Currency
  setCurrency: (c: Currency) => void
  formatPrice: (usd: number) => string
  cart: CartItem[]
  wishlist: string[]
  cartCount: number
  cartTotal: number
  addToCart: (productId: string, qty?: number) => void
  removeFromCart: (productId: string) => void
  updateQty: (productId: string, qty: number) => void
  clearCart: () => void
  toggleWishlist: (productId: string) => void
  isWishlisted: (productId: string) => boolean
  user: User | null
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, password: string) => boolean
  logout: () => void
  getCartProducts: (products: Product[]) => Array<{ product: Product; quantity: number }>
}

const StoreContext = createContext<StoreContextValue | null>(null)

const CART_KEY = 'authentic-cart'
const WISH_KEY = 'authentic-wishlist'
const USER_KEY = 'authentic-user'
const CURRENCY_KEY = 'authentic-currency'

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() =>
    loadJson<Currency>(CURRENCY_KEY, 'USD'),
  )
  const [cart, setCart] = useState<CartItem[]>(() => loadJson(CART_KEY, []))
  const [wishlist, setWishlist] = useState<string[]>(() => loadJson(WISH_KEY, []))
  const [user, setUser] = useState<User | null>(() => loadJson(USER_KEY, null))

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem(CURRENCY_KEY, JSON.stringify(currency))
  }, [currency])

  useEffect(() => {
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user))
    else localStorage.removeItem(USER_KEY)
  }, [user])

  const setCurrency = useCallback((c: Currency) => setCurrencyState(c), [])

  const formatPrice = useCallback(
    (usd: number) => {
      if (currency === 'ZWG') {
        return `ZWG ${(usd * USD_TO_ZWG).toLocaleString('en-ZW', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      }
      return `$${usd.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    },
    [currency],
  )

  const addToCart = useCallback((productId: string, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === productId)
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + qty } : i,
        )
      }
      return [...prev, { productId, quantity: qty }]
    })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const updateQty = useCallback((productId: string, qty: number) => {
    if (qty < 1) {
      setCart((prev) => prev.filter((i) => i.productId !== productId))
      return
    }
    setCart((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)),
    )
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }, [])

  const isWishlisted = useCallback(
    (productId: string) => wishlist.includes(productId),
    [wishlist],
  )

  const login = useCallback((email: string, _password: string) => {
    const name = email.split('@')[0] || 'Customer'
    setUser({ name, email })
    return true
  }, [])

  const register = useCallback((name: string, email: string, _password: string) => {
    setUser({ name, email })
    return true
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const getCartProducts = useCallback(
    (all: Product[]) =>
      cart
        .map((item) => {
          const product = all.find((p) => p.id === item.productId)
          return product ? { product, quantity: item.quantity } : null
        })
        .filter(Boolean) as Array<{ product: Product; quantity: number }>,
    [cart],
  )

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.quantity, 0), [cart])

  const value = useMemo<StoreContextValue>(
    () => ({
      currency,
      setCurrency,
      formatPrice,
      cart,
      wishlist,
      cartCount,
      cartTotal: 0,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      user,
      login,
      register,
      logout,
      getCartProducts,
    }),
    [
      currency,
      setCurrency,
      formatPrice,
      cart,
      wishlist,
      cartCount,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      toggleWishlist,
      isWishlisted,
      user,
      login,
      register,
      logout,
      getCartProducts,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
