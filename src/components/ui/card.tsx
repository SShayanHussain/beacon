import { cn } from '@/lib/utils'
import type { ReactNode, ElementType } from 'react'

type CardProps = {
  surface?: 'dark' | 'light'
  interactive?: boolean
  as?: ElementType
  className?: string
  children: ReactNode
}

export function Card({
  surface = 'dark',
  interactive = false,
  as: Component = 'div',
  className,
  children,
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-lg border overflow-hidden',
        surface === 'dark'
          ? 'bg-tide border-beam/12'
          : 'bg-fog-pure border-ink/8',
        interactive && [
          'transition-all duration-[320ms] ease-[var(--ease-out-expo)]',
          'hover:translate-y-[-4px] hover:shadow-lift',
          'group relative',
        ],
        className
      )}
      style={interactive ? { boxShadow: 'var(--shadow-card)' } : undefined}
    >
      {interactive && (
        <div
          className={cn(
            'absolute top-0 left-0 right-0 h-[1px] bg-beam',
            'origin-left scale-x-0 transition-transform duration-[320ms] ease-[var(--ease-out-expo)]',
            'group-hover:scale-x-100'
          )}
        />
      )}
      {children}
    </Component>
  )
}
