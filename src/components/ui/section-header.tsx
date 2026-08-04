import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  sub?: string
  align?: 'left' | 'center'
  surface?: 'dark' | 'light'
  id?: string
  className?: string
  children?: ReactNode
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  align = 'left',
  surface = 'dark',
  id,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-section-sm',
        align === 'center' && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'font-mono text-eyebrow font-medium uppercase tracking-[0.16em] mb-4',
            surface === 'dark' ? 'text-beam' : 'text-beam'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          'font-display text-3xl font-semibold tracking-[-0.02em] leading-[1.1]',
          surface === 'dark' ? 'text-fog-pure' : 'text-ink',
          '[font-variation-settings:"WONK"_1]'
        )}
      >
        {title}
      </h2>
      {sub && (
        <p
          className={cn(
            'mt-4 font-body text-lg leading-relaxed max-w-[52ch]',
            align === 'center' && 'mx-auto',
            surface === 'dark' ? 'text-fog/70' : 'text-ink-soft'
          )}
        >
          {sub}
        </p>
      )}
    </div>
  )
}
