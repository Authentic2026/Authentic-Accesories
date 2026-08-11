import { Link } from 'react-router-dom'

const LOGO_SRC = '/images/logo.png?v=1'

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
  imageClassName = 'h-11 w-11 object-contain sm:h-12 sm:w-12',
  showWordmark = true,
  wordmarkClassName = 'text-brand-600',
  sublabel,
}: LogoProps) {
  const content = (
    <>
      <img src={LOGO_SRC} alt="Authentic" className={imageClassName} />
      {showWordmark && (
        <div className="leading-tight">
          <span className={`block text-lg font-extrabold tracking-tight ${wordmarkClassName}`}>
            Authentic
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
