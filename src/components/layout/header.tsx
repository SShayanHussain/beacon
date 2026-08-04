'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useScrollDirection } from '@/hooks/use-scroll-direction'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Logo } from './logo'
import { navigation } from '@/data/navigation'
import { siteConfig } from '@/data/site'
import { Button } from '@/components/ui'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'

type HeaderProps = {
  variant?: 'transparent' | 'solid'
}

export function Header({ variant = 'solid' }: HeaderProps) {
  const { direction, scrollY } = useScrollDirection()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMegaOpen, setIsMegaOpen] = useState(false)

  const isScrolled = scrollY > 80
  const isHidden = direction === 'down' && scrollY > 400

  // Close drawer on resize to desktop
  useEffect(() => {
    if (isDesktop && isDrawerOpen) setIsDrawerOpen(false)
  }, [isDesktop, isDrawerOpen])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isDrawerOpen])

  const handleMegaKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMegaOpen(false)
      }
    },
    []
  )

  const showSolid = variant === 'solid' || isScrolled

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-[280ms] ease-[var(--ease-out-expo)]',
          isHidden ? '-translate-y-full' : 'translate-y-0',
          showSolid
            ? 'bg-ink/80 backdrop-blur-md border-b border-fog/8'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-7 lg:px-10 lg:h-20">
          <Logo variant="light" />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
            {navigation.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  className="relative"
                  onKeyDown={handleMegaKeyDown}
                >
                  <button
                    type="button"
                    onClick={() => setIsMegaOpen(!isMegaOpen)}
                    className={cn(
                      'flex items-center gap-1 px-3 py-2 font-mono text-sm tracking-[0.04em] text-fog/80',
                      'hover:text-beam transition-colors duration-[var(--dur-fast)]',
                      'focus-visible:outline-2 focus-visible:outline-beam focus-visible:outline-offset-2',
                      'cursor-pointer'
                    )}
                    aria-expanded={isMegaOpen}
                    aria-controls="mega-menu"
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-[var(--dur-fast)]',
                        isMegaOpen && 'rotate-180'
                      )}
                    />
                  </button>

                  {/* Mega-menu panel */}
                  {isMegaOpen && (
                    <div
                      id="mega-menu"
                      className={cn(
                        'absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px]',
                        'rounded-lg bg-tide border-t border-beam/20',
                        'p-6 shadow-lift',
                        'animate-in fade-in slide-in-from-top-2 duration-[240ms]'
                      )}
                      role="menu"
                      onMouseLeave={() => setIsMegaOpen(false)}
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className={cn(
                              'flex items-start gap-3 rounded-md p-3',
                              'hover:bg-beam/6 transition-colors duration-[var(--dur-fast)]',
                              'group/item'
                            )}
                            onClick={() => setIsMegaOpen(false)}
                          >
                            <div className="flex-1">
                              <div className="font-mono text-sm font-medium text-fog group-hover/item:text-beam transition-colors">
                                {child.label}
                              </div>
                              <div className="text-xs text-fog/50 mt-0.5">
                                {child.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 font-mono text-sm tracking-[0.04em] text-fog/80',
                    'hover:text-beam transition-colors duration-[var(--dur-fast)]'
                  )}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right side: phone + CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="hidden xl:flex items-center gap-1.5 font-mono text-xs text-fog/50 hover:text-fog transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {siteConfig.phone}
            </a>
            <Button
              href="/schedule"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Book a Call
            </Button>
            <button
              type="button"
              className="lg:hidden p-2 text-fog hover:text-beam transition-colors cursor-pointer"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={() => setIsDrawerOpen(false)}
          />
          {/* Panel */}
          <div
            className={cn(
              'absolute top-0 right-0 bottom-0 w-full max-w-sm',
              'bg-ink border-l border-fog/10',
              'flex flex-col overflow-y-auto',
              'animate-in slide-in-from-right duration-[380ms] ease-[var(--ease-in-out-quart)]'
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between p-5 border-b border-fog/8">
              <Logo variant="light" size="sm" />
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-fog hover:text-beam transition-colors cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 p-5" aria-label="Mobile navigation">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.label}>
                    {item.children ? (
                      <MobileAccordion item={item} onClose={() => setIsDrawerOpen(false)} />
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-3 px-3 font-mono text-sm tracking-[0.04em] text-fog/80 hover:text-beam transition-colors"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="p-5 border-t border-fog/8">
              <Button
                href="/schedule"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => setIsDrawerOpen(false)}
              >
                Book a Call
              </Button>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                className="flex items-center justify-center gap-2 mt-3 font-mono text-xs text-fog/50 hover:text-fog transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ── Mobile accordion for Services ────────────────────── */
function MobileAccordion({
  item,
  onClose,
}: {
  item: (typeof navigation)[number]
  onClose: () => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full py-3 px-3',
          'font-mono text-sm tracking-[0.04em] text-fog/80 hover:text-beam transition-colors',
          'cursor-pointer'
        )}
        aria-expanded={isOpen}
      >
        {item.label}
        <ChevronDown
          className={cn(
            'w-4 h-4 transition-transform duration-[var(--dur-base)]',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      {isOpen && item.children && (
        <ul className="pl-3 pb-2 space-y-0.5">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                className="block py-2 px-3 text-sm text-fog/60 hover:text-beam transition-colors"
                onClick={onClose}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
