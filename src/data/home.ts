import {
  BatteryCharging,
  BatteryFull,
  Briefcase,
  Cable,
  Camera,
  Cpu,
  GraduationCap,
  Palette,
  Shield,
  ShieldCheck,
  Smartphone,
  Tag,
  Watch,
} from 'lucide-react'
import { products, type Product } from './products'
import type { CategoryTile } from '../components/CategoryTiles'
import type { HeroSlide } from '../components/HeroCarousel'

function byId(...ids: string[]) {
  return ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as Product[]
}

function byCategory(category: Product['category'], limit = 6) {
  return products.filter((p) => p.category === category).slice(0, limit)
}

export const homeHeroSlides: HeroSlide[] = [
  {
    id: 'iphone-16-pro-max',
    titleLead: 'iPhone 16',
    titleRest: 'Pro Max',
    subtitle: 'Built for Apple Intelligence.',
    href: '/shop?category=Phones',
    cta: 'Now available',
    image: '/images/iphone-16-pro-max/phone.png',
    specs: [
      {
        label: 'Camera',
        icon: Camera,
        lines: ['48MP Fusion Main', '48MP Ultra Wide', '12MP 5x Telephoto', 'LiDAR Scanner'],
      },
      {
        label: 'Chip',
        icon: Cpu,
        lines: ['A18 Pro chip', '6-core CPU', '6-core GPU', '16-core Neural Engine'],
      },
      {
        label: 'Display',
        icon: Smartphone,
        lines: ['6.9-inch Super Retina XDR', 'ProMotion up to 120Hz', 'Always-On display'],
      },
      {
        label: 'Battery',
        icon: BatteryFull,
        lines: ['Up to 33 hours', 'video playback', 'USB-C', 'Fast charging'],
      },
    ],
  },
  {
    id: 'iphone-17-pro-max',
    titleLead: 'iPhone 17',
    titleRest: 'Pro Max',
    subtitle: 'Powered by A19. Built for Apple Intelligence.',
    href: '/shop?category=Phones',
    cta: 'Now available',
    image: '/images/iphone-17-pro-max/phone.png',
    specs: [
      {
        label: 'Camera',
        icon: Camera,
        lines: ['48MP Fusion Main', '48MP Fusion Ultra Wide', '18MP Center Stage front', '4K HDR Dolby Vision'],
      },
      {
        label: 'Chip',
        icon: Cpu,
        lines: ['Apple A19', '6-core CPU', '5-core GPU', '16-core Neural Engine'],
      },
      {
        label: 'Display',
        icon: Smartphone,
        lines: ['6.3" Super Retina XDR', 'ProMotion up to 120Hz', 'Always-On display'],
      },
      {
        label: 'Battery',
        icon: BatteryFull,
        lines: ['Up to 30 hours video', '50% in ~20 min', 'MagSafe up to 25W', 'USB-C'],
      },
    ],
  },
  {
    id: 'laptops',
    titleLead: 'Power Your Work.',
    titleRest: 'Elevate Your Everyday.',
    subtitle:
      'Quality laptops for business, study, creativity and everyday life — carefully selected by Authentic Retailers to deliver the performance, reliability and value you can count on.',
    href: '/shop?q=laptop',
    cta: 'Shop laptops',
    image: '/images/laptops/hero.png',
    imageClassName: 'max-h-[270px] lg:max-h-[400px]',
    specs: [
      {
        label: 'Business',
        icon: Briefcase,
        lines: ['Reliable daily drivers', 'Long battery life', 'Ready to work'],
      },
      {
        label: 'Study',
        icon: GraduationCap,
        lines: ['Lightweight builds', 'All-day battery', 'Student friendly'],
      },
      {
        label: 'Creativity',
        icon: Palette,
        lines: ['Sharp colour displays', 'Fast SSD storage', 'Smooth multitasking'],
      },
      {
        label: 'Everyday',
        icon: ShieldCheck,
        lines: ['Trusted brands', 'Warranty backed', 'Local support'],
      },
    ],
  },
]

type SidePromo = {
  eyebrow: string
  title: string
  subtitle: string
  href: string
  image: string
  cta: string
  priceLabel?: string
  price?: number
}

export const homeSidePromos: SidePromo[] = [
  {
    eyebrow: 'Exclusive',
    title: 'Galaxy Watch',
    subtitle: 'Series 8',
    href: '/product/samsung-galaxy-watch-8',
    image: '/images/galaxy-watch-8/front-angle.png',
    cta: 'Now available',
  },
  {
    eyebrow: 'New arrival',
    title: 'Fast charger',
    subtitle: "Today's super offer",
    priceLabel: 'From',
    price: 25,
    href: '/product/samsung-45w-head-charger',
    image: '/images/samsung-45w/adapter-with-cable.png?v=2',
    cta: 'Order now',
  },
]

export const homeCategories: CategoryTile[] = [
  {
    label: 'Phones',
    href: '/shop?category=Phones',
    image: '/images/poco/category.png',
    fillCard: true,
    countLabel: `${products.filter((p) => p.category === 'Phones').length} models`,
  },
  {
    label: 'Chargers',
    href: '/shop?q=charger',
    image: '/images/chargers/category.png',
    fillCard: true,
    countLabel: 'Fast charge',
  },
  {
    label: 'Wearables',
    href: '/shop?q=watch',
    image: '/images/wearables/category.png',
    fillCard: true,
    countLabel: 'Galaxy Watch',
  },
  {
    label: 'Cases',
    href: '/shop?q=pouch',
    image: '/images/cases/category.png',
    fillCard: true,
    countLabel: 'Protection',
  },
  {
    label: 'Cables',
    href: '/shop?q=cable',
    image: '/images/cables/category.png',
    fillCard: true,
    countLabel: 'USB-C ready',
  },
  {
    label: 'Accessories',
    href: '/shop?category=Accessories',
    image: '/images/accessories/category.png',
    fillCard: true,
    countLabel: `${products.filter((p) => p.category === 'Accessories').length} items`,
  },
]

export const featuredDeals = byId(
  'samsung-galaxy-z-fold8-ultra',
  'samsung-s26-ultra',
  'itel-super-26-ultra',
  'redmi-14c',
  'tecno-spark-40',
  'samsung-galaxy-watch-8',
)

export const newArrivals = products.filter((p) => p.isNew !== false).slice(0, 6)

export const bestSellers = byId(
  'samsung-a07-64',
  'redmi-a5',
  'infinix-hot-60',
  'tecno-spark-go-3',
  'samsung-45w',
  'itel-a90',
)

export const phonesShelf = byCategory('Phones', 6)
export const accessoriesShelf = byCategory('Accessories', 6)

export const midPromos = [
  {
    eyebrow: 'Cash discount',
    title: 'Pay cash. Save more.',
    text: 'Enjoy exclusive cash discounts on selected phones and accessories — straightforward savings when you settle in full at Authentic Retailers.',
    href: '/shop',
    cta: 'Shop now',
    image: '/images/oppo-find-x9-ultra/pair.png',
  },
  {
    eyebrow: 'Product loan',
    title: 'Elevate your experience with Authentic financing',
    text: 'Choose any product valued at $60 or more and enjoy it now while you repay at competitive low interest rates.',
    href: '/shop',
    cta: 'Shop now',
    image: '/images/itel-super-26-ultra/sapphire-black-blue.png',
  },
  {
    eyebrow: 'Essential power',
    title: 'Official Samsung charging',
    text: '45W Super Fast Charging with C to C cable.',
    href: '/product/samsung-45w-head-charger',
    image: '/images/samsung-45w/adapter-with-cable.png?v=2',
  },
]

export const wideBanner = {
  href: '/shop?q=redmi',
  cta: 'Shop now',
  image: '/images/redmi-15c/promo-banner.png',
}
