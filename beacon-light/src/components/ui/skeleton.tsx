import { cn } from '@/lib/utils'

type SkeletonProps = {
  variant?: 'card' | 'text' | 'image'
  className?: string
}

export function Skeleton({ variant = 'text', className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-tide/40',
        variant === 'card' && 'h-64 w-full rounded-lg',
        variant === 'text' && 'h-4 w-full',
        variant === 'image' && 'h-48 w-full rounded-lg',
        className
      )}
    />
  )
}
