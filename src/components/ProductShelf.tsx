import type { Product } from '../data/products'
import ProductCard from './ProductCard'
import SectionHeading from './SectionHeading'

type Props = {
  title: string
  subtitle?: string
  href?: string
  products: Product[]
  columns?: string
}

export default function ProductShelf({
  title,
  subtitle,
  href,
  products,
  columns = 'grid-cols-2 md:grid-cols-3 xl:grid-cols-6',
}: Props) {
  if (products.length === 0) return null

  return (
    <section className="section-pad">
      <div className="store-container">
        <SectionHeading title={title} subtitle={subtitle} href={href} />
        <div className={`grid gap-3 sm:gap-4 ${columns}`}>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
