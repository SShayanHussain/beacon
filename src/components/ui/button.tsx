import Link from 'next/link'
import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentPropsWithoutRef } from 'react'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-mono text-sm font-medium uppercase tracking-[0.06em]',
    'rounded-sm transition-all',
    'focus-visible:outline-2 focus-visible:outline-beam focus-visible:outline-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-beam text-ink border-none',
          'hover:bg-signal hover:translate-y-[-2px]',
          'active:translate-y-0',
        ],
        secondary: [
          'bg-transparent text-fog border border-fog/30',
          'hover:border-beam hover:text-beam',
        ],
        ghost: [
          'bg-transparent text-current border-none',
          'hover:underline hover:decoration-beam hover:decoration-2 hover:underline-offset-4',
        ],
        onLight: [
          'bg-ink text-fog border-none',
          'hover:bg-tide hover:translate-y-[-2px]',
          'active:translate-y-0',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-12 px-7',
        lg: 'h-14 px-9 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  href?: string
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps> & {
    href?: undefined
  }

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof ButtonBaseProps> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

export function Button({ className, variant, size, href, ...props }: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)

  if (href) {
    const isExternal = href.startsWith('http')
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          rel="noopener noreferrer"
          target="_blank"
          {...(props as ComponentPropsWithoutRef<'a'>)}
        />
      )
    }
    return (
      <Link href={href} className={classes} {...(props as ComponentPropsWithoutRef<'a'>)} />
    )
  }

  return <button className={classes} {...(props as ComponentPropsWithoutRef<'button'>)} />
}

export { buttonVariants }
