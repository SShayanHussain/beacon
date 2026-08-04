'use client'

import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

type BeamProps = {
  intensity?: number
  speed?: number
  className?: string
}

export function Beam({ intensity = 0.22, speed = 22, className }: BeamProps) {
  const reduced = useReducedMotion()

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {/* Static radial glow anchor */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 60%, rgb(245 184 81 / 0.08), transparent 70%)`,
        }}
      />

      {/* Rotating beam */}
      <div
        className={cn('absolute', reduced && 'hidden')}
        style={{
          inset: '-40% -20%',
          background: `conic-gradient(
            from 0deg,
            transparent 0deg,
            rgb(245 184 81 / 0.00) 12deg,
            rgb(245 184 81 / ${intensity}) 26deg,
            rgb(245 184 81 / 0.00) 44deg,
            transparent 360deg
          )`,
          filter: 'blur(48px)',
          animation: `sweep ${speed}s linear infinite`,
          willChange: 'transform',
          contain: 'paint',
        }}
      />

      {/* Noise overlay to prevent banding */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
