import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type SectionProps = {
  surface?: 'dark' | 'light'
  id?: string
  'aria-labelledby'?: string
  className?: string
  children: ReactNode
  hasDivider?: boolean
}

export function Section({
  surface = 'dark',
  id,
  'aria-labelledby': ariaLabelledby,
  className,
  children,
  hasDivider = true,
}: SectionProps) {
  return (
    <>
      {hasDivider && <div className="section-divider" data-surface={surface} />}
      <section
        data-surface={surface}
        id={id}
        aria-labelledby={ariaLabelledby}
        className={cn(
          'py-section relative',
          surface === 'dark' ? 'bg-ink text-fog' : 'bg-fog text-ink',
          className
        )}
      >
        {surface === 'dark' && <div className="noise pointer-events-none absolute inset-0" />}
        <div className="relative z-[2]">{children}</div>
      </section>
    </>
  )
}
