import Link from 'next/link'
import { cn } from '@/lib/utils'

type LogoProps = {
  variant?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ variant = 'light', size = 'md', className }: LogoProps) {
  const sizes = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
  }

  return (
    <Link
      href="/"
      className={cn('inline-flex items-center gap-2.5 group', className)}
      aria-label="Beacon Light Publishing — Home"
    >
      {/* Lamp glyph */}
      <svg
        className={cn(
          sizes[size],
          'aspect-square transition-all duration-[240ms]',
          'group-hover:[filter:drop-shadow(0_0_8px_rgb(245_184_81_/0.4))]'
        )}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        {/* Lighthouse body */}
        <rect
          x="15"
          y="14"
          width="10"
          height="22"
          rx="1"
          className={variant === 'light' ? 'fill-fog-pure' : 'fill-ink'}
        />
        {/* Stripe */}
        <rect
          x="15"
          y="24"
          width="10"
          height="3"
          className="fill-signal/60"
        />
        {/* Light housing */}
        <rect
          x="13"
          y="10"
          width="14"
          height="6"
          rx="2"
          className="fill-beam"
        />
        {/* Beam of light */}
        <path
          d="M20 8 L10 2 L30 2 Z"
          className="fill-beam/40"
        />
        {/* Lamp glow */}
        <circle cx="20" cy="13" r="2" className="fill-beam" />
        {/* Base */}
        <rect
          x="12"
          y="36"
          width="16"
          height="2"
          rx="1"
          className={variant === 'light' ? 'fill-fog/60' : 'fill-ink-soft'}
        />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-base font-semibold tracking-[-0.01em]',
            '[font-variation-settings:"WONK"_1]',
            variant === 'light' ? 'text-fog-pure' : 'text-ink'
          )}
        >
          Beacon Light
        </span>
        <span
          className={cn(
            'font-mono text-[0.6rem] uppercase tracking-[0.14em] mt-0.5',
            variant === 'light' ? 'text-fog/50' : 'text-ink-soft'
          )}
        >
          Publishing
        </span>
      </div>
    </Link>
  )
}
