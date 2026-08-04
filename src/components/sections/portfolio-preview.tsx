'use client'

import { Section, Container, SectionHeader } from '@/components/ui'
import { Reveal } from '@/components/motion/reveal'
import { portfolio } from '@/data/portfolio'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function PortfolioPreview() {
  const featured = portfolio.filter((b) => b.featured).slice(0, 8)

  return (
    <Section surface="light" id="portfolio-section" aria-labelledby="portfolio-heading">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="↳ Recent work"
            title="Books we helped into the world."
            surface="light"
            id="portfolio-heading"
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {featured.map((book) => (
              <div
                key={book.id}
                className={cn(
                  'group relative aspect-[3/4.5] rounded-lg overflow-hidden',
                  'bg-tide shadow-card transition-all duration-[320ms] ease-[var(--ease-out-expo)]',
                  'hover:shadow-lift hover:translate-y-[-4px]'
                )}
              >
                {/* Placeholder cover — amber gradient with title */}
                <div className="absolute inset-0 bg-gradient-to-br from-tide to-ink flex items-end p-4">
                  <div>
                    <p className="font-display text-sm font-semibold text-fog-pure leading-tight">
                      {book.title}
                    </p>
                    <p className="font-mono text-[0.6rem] text-fog/50 mt-1 uppercase tracking-wider">
                      {book.author}
                    </p>
                  </div>
                </div>
                {/* Amber glow on hover */}
                <div className="absolute inset-0 bg-beam/0 group-hover:bg-beam/5 transition-colors duration-[320ms]" />
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8 text-center">
            <Link
              href="/portfolio"
              className="font-mono text-sm uppercase tracking-[0.06em] text-ink hover:text-beam transition-colors inline-flex items-center gap-2"
            >
              See the full shelf →
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
