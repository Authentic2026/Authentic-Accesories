import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import FeaturedBrands from '../components/FeaturedBrands'
import { useStore } from '../context/StoreContext'

export default function LoginPage() {
  const { login, user } = useStore()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)

  useEffect(() => {
    if (user) navigate('/', { replace: true })
  }, [user, navigate])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    login(email, password)
    navigate('/')
  }

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Authentic Retailers Customer Portal
          </p>
          <h1 className="mt-3 text-3xl font-bold text-brand-600 sm:text-4xl">
            Manage your Authentic Retailers experience with confidence
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Access device bundles, track your orders, and manage payments all in one secure
            dashboard built for Authentic Retailers customers.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            {[
              'Curated devices and accessories with local warranty',
              'Track orders and pickup readiness in real-time',
              'Enterprise-grade security backed by Authentic Retailers',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <ShieldCheck size={18} className="shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Welcome back</p>
          <h2 className="mt-1 text-xl font-semibold text-brand-600">Sign in to continue</h2>
          <p className="mt-1 text-sm text-slate-500">
            Enter your email and password to access your Authentic Retailers account.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-600">Email Address</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-slate-600">Password</span>
              <input
                type="password"
                required
                minLength={4}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
              />
            </label>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-brand-600"
                />
                Remember me
              </label>
              <span className="cursor-pointer text-brand-600 hover:text-accent">Forgot password?</span>
            </div>
            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            New to Authentic Retailers?{' '}
            <Link to="/register" className="font-semibold text-brand-600 hover:text-accent">
              Create an account
            </Link>
          </p>
          <p className="mt-4 flex items-center justify-center gap-1 text-xs text-slate-400">
            <ShieldCheck size={14} className="text-accent" />
            Protected with Authentic Retailers secure authentication
          </p>
        </div>
      </section>
      <FeaturedBrands />
    </>
  )
}
