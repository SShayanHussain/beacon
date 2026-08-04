'use client'

import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type MarqueeProps = {
  children: ReactNode
  speed?: number
  pauseOnHover?: boolean
  className?: string
}

export function Marquee({ children, speed = 40, pauseOnHover = true, className }: MarqueeProps) {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <div className={cn('flex flex-wrap items-center justify-center gap-8', className)}>
        {children}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        pauseOnHover && 'hover:[&>div]:pause focus-within:[&>div]:pause',
        className
      )}
    >
      <div
        className="flex gap-12 w-max"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        {/* Two copies for seamless loop */}
        <div className="flex gap-12 items-center shrink-0">{children}</div>
        <div className="flex gap-12 items-center shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
