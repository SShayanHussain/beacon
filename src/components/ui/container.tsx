import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type ContainerProps = {
  size?: 'wide' | 'default' | 'prose'
  className?: string
  children: ReactNode
}

const widths = {
  wide: 'max-w-[1440px]',
  default: 'max-w-[1200px]',
  prose: 'max-w-[68ch]',
}

export function Container({ size = 'default', className, children }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-7 lg:px-10',
        widths[size],
        className
      )}
    >
      {children}
    </div>
  )
}
