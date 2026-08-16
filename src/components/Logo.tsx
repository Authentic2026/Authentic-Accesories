import { Link } from 'react-router-dom'

const LOGO_SRC = '/images/logo.png?v=2'

type LogoProps = {
  to?: string
  className?: string
  imageClassName?: string
  showWordmark?: boolean
  wordmarkClassName?: string
  wordmarkSizeClassName?: string
  sublabel?: string
}

export default function Logo({
  to = '/',
  className = '',
  imageClassName = 'h-11 w-11 object-contain sm:h-12 sm:w-12',
  showWordmark = true,
  wordmarkClassName = 'text-brand-800',
  wordmarkSizeClassName = 'text-[22px] sm:text-[26px]',
  sublabel,
}: LogoProps) {
  const content = (
    <>
      <img src={LOGO_SRC} alt="Authentic Retailers" className={imageClassName} />
      {showWordmark && (
        <div className="leading-none">
          <span className={`block font-extrabold tracking-[-0.02em] ${wordmarkSizeClassName}`}>
            <span className={wordmarkClassName}>Authentic </span>
            <span className={wordmarkClassName}>Ret</span>
            <span className="text-[#b8860b]">ailers</span>
            <span className="text-[#b8860b]">.</span>
          </span>
          {sublabel && (
            <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.18em] text-accent sm:block">
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
