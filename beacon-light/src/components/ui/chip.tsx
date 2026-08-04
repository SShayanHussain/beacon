import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { ReactNode, ElementType } from 'react'

type ChipProps = {
  variant?: 'default' | 'active'
  as?: ElementType
  href?: string
  surface?: 'dark' | 'light'
  className?: string
  children: ReactNode
  onClick?: () => void
}

export function Chip({
  variant = 'default',
  href,
  surface = 'dark',
  className,
  children,
  onClick,
}: ChipProps) {
  const classes = cn(
    'inline-flex items-center font-mono text-xs font-medium uppercase tracking-[0.08em]',
    'rounded-sm px-3 py-1.5 transition-colors duration-[var(--dur-instant)]',
    variant === 'active'
      ? 'bg-beam text-ink'
      : surface === 'dark'
        ? 'bg-glass/15 text-glass'
        : 'bg-ink/8 text-ink',
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cn(classes, 'cursor-pointer')}>
        {children}
      </button>
    )
  }

  return <span className={classes}>{children}</span>
}
