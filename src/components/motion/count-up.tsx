'use client'

import { useRef, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type CountUpProps = {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({ value, suffix = '', duration = 1.8, className }: CountUpProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [displayValue, setDisplayValue] = useState(reduced ? value : 0)

  useEffect(() => {
    if (reduced || hasAnimated) return
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasAnimated) return
        setHasAnimated(true)

        const startTime = performance.now()
        const durationMs = duration * 1000

        function animate(currentTime: number) {
          const elapsed = currentTime - startTime
          const progress = Math.min(elapsed / durationMs, 1)
          // Ease out curve
          const eased = 1 - Math.pow(1 - progress, 3)
          const current = Math.round(eased * value)

          if (ref.current) {
            ref.current.textContent = new Intl.NumberFormat('en-US').format(current)
          }

          if (progress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)
      },
      { threshold: 0.2 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration, reduced, hasAnimated])

  return (
    <span className={cn('tabular-nums', className)}>
      <span ref={ref}>
        {reduced
          ? new Intl.NumberFormat('en-US').format(value)
          : '0'}
      </span>
      {suffix && <span>{suffix}</span>}
    </span>
  )
}
