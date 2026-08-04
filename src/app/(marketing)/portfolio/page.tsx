'use client'

import { useState } from 'react'
import { Section, Container, SectionHeader, Chip, Button } from '@/components/ui'
import { Reveal } from '@/components/motion/reveal'
import { portfolio } from '@/data/portfolio'
import { cn } from '@/lib/utils'

const GENRES = ['all', 'fiction', 'non-fiction', 'memoir', 'childrens', 'poetry', 'business'] as const

const GENRE_LABELS: Record<string, string> = {
  all: 'All',
  fiction: 'Fiction',
  'non-fiction': 'Non-fiction',
  memoir: 'Memoir',
  childrens: "Children's",
  poetry: 'Poetry',
  business: 'Business',
}

export default function PortfolioPage() {
  const [genre, setGenre] = useState<string>('all')

  const filtered = genre === 'all'
    ? portfolio
    : portfolio.filter((b) => b.genre === genre)

  return (
    <>
      {/* Hero */}
      <Section surface="dark" hasDivider={false}>
        <Container>
          <Reveal>
            <p className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-4">
              ↳ Portfolio
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.025em] leading-[1.05] text-fog-pure [font-variation-settings:'WONK'_1]">
              The shelf
            </h1>
            <p className="mt-6 text-lg text-fog/60 leading-relaxed max-w-xl">
              Books we edited, designed, or published. Covers link to where you can buy them.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Filter + grid */}
      <Section surface="light">
        <Container>
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-8">
              {GENRES.map((g) => (
                <Chip
                  key={g}
                  variant={genre === g ? 'active' : 'default'}
                  surface="light"
                  onClick={() => setGenre(g)}
                >
                  {GENRE_LABELS[g]}
                </Chip>
              ))}
            </div>
          </Reveal>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-ink-soft">
                No titles in that genre yet. Try another, or see everything.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {filtered.map((book) => (
                <div
                  key={book.id}
                  className={cn(
                    'group relative aspect-[3/4.5] rounded-lg overflow-hidden cursor-pointer',
                    'bg-gradient-to-br from-tide to-ink shadow-card',
                    'transition-all duration-[320ms] ease-[var(--ease-out-expo)]',
                    'hover:shadow-lift hover:translate-y-[-4px]'
                  )}
                >
                  <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
                    <span className="inline-flex items-center font-mono text-[0.6rem] uppercase tracking-wider text-glass bg-glass/15 rounded-sm px-2 py-0.5 mb-2">
                      {GENRE_LABELS[book.genre]}
                    </span>
                    <p className="font-display text-sm font-semibold text-fog-pure leading-tight">
                      {book.title}
                    </p>
                    <p className="font-mono text-[0.6rem] text-fog/50 mt-0.5 uppercase tracking-wider">
                      {book.author}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-beam/0 group-hover:bg-beam/8 transition-colors duration-[320ms]" />
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section surface="dark">
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold text-fog-pure [font-variation-settings:'WONK'_1]">
                Want your book on this shelf?
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button href="/schedule" variant="primary" size="lg">Book a call</Button>
                <Button href="/packages" variant="secondary" size="lg">See packages</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
