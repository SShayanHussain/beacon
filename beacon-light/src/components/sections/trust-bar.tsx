'use client'

import { Section, Container } from '@/components/ui'
import { Marquee } from '@/components/motion/marquee'
import { retailers } from '@/data/retailers'
import { cn } from '@/lib/utils'

export function TrustBar() {
  return (
    <Section surface="light" hasDivider={false} className="!py-8 lg:!py-12">
      <Container size="wide">
        <p className="text-center font-mono text-xs uppercase tracking-[0.1em] text-ink-soft mb-6">
          Your book, listed where readers already are
        </p>
        <Marquee speed={35} pauseOnHover>
          {retailers.map((r) => (
            <div
              key={r.name}
              className={cn(
                'flex items-center justify-center h-10 px-6',
                'grayscale opacity-55 hover:grayscale-0 hover:opacity-100',
                'transition-all duration-[240ms] ease-[var(--ease-out-expo)]'
              )}
            >
              <span className="font-mono text-sm font-medium text-ink-soft whitespace-nowrap">
                {r.name}
              </span>
            </div>
          ))}
        </Marquee>
      </Container>
    </Section>
  )
}
