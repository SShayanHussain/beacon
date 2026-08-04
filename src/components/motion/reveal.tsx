'use client'

import { useRef, useCallback } from 'react'
import { motion, useInView } from 'motion/react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'
import type { ReactNode, ElementType } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  as?: ElementType
  className?: string
}

export function Reveal({ children, delay = 0, y = 24, as = 'div', className }: RevealProps) {
  const reduced = useReducedMotion()
  const Component = motion.create(as)

  return (
    <Component
      initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{
        duration: reduced ? 0 : 0.52,
        ease: [0.16, 1, 0.3, 1],
        delay: reduced ? 0 : delay,
      }}
      className={className}
    >
      {children}
    </Component>
  )
}

type StaggerProps = {
  children: ReactNode
  stagger?: number
  className?: string
}

export function Stagger({ children, stagger = 0.06, className }: StaggerProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduced ? 0 : 0.52,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
