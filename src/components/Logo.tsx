import { Link } from 'react-router-dom'

const LOGO_SRC = '/images/logo.png?v=2'

type LogoProps = {
  to?: string
  className?: string
  imageClassName?: string
  showWordmark?: boolean
  wordmarkClassName?: string
  sublabel?: string
}

export default function Logo({
  to = '/',
  className = '',
  imageClassName = 'h-12 w-12 object-contain sm:h-14 sm:w-14',
  showWordmark = true,
  wordmarkClassName = 'text-brand-600',
  sublabel,
}: LogoProps) {
  const content = (
    <>
      <img src={LOGO_SRC} alt="Authentic Retailers" className={imageClassName} />
      {showWordmark && (
        <div className="leading-tight">
          <span className={`block text-[15px] font-extrabold tracking-tight sm:text-lg ${wordmarkClassName}`}>
            Authentic Retailers
          </span>
          {sublabel && (
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-accent sm:block">
              {sublabel}
            </span>
          )}
        </div>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={`flex shrink-0 items-center gap-2 ${className}`}>
        {content}
      </Link>
    )
  }

  return <div className={`flex shrink-0 items-center gap-2 ${className}`}>{content}</div>
}
