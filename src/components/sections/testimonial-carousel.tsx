'use client'

import { useState, useCallback } from 'react'
import { Section, Container, SectionHeader, Rating } from '@/components/ui'
import { Reveal } from '@/components/motion/reveal'
import { testimonials } from '@/data/testimonials'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function TestimonialCarousel() {
  const featured = testimonials.filter((t) => t.featured)
  const [active, setActive] = useState(0)

  const prev = useCallback(() => {
    setActive((i) => (i === 0 ? featured.length - 1 : i - 1))
  }, [featured.length])

  const next = useCallback(() => {
    setActive((i) => (i === featured.length - 1 ? 0 : i + 1))
  }, [featured.length])

  if (featured.length === 0) return null

  const t = featured[active]
  if (!t) return null

  return (
    <Section surface="light" id="testimonials-section" aria-labelledby="testimonials-heading">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="↳ In their words"
            title="What authors said afterwards."
            surface="light"
            id="testimonials-heading"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-fog-pure rounded-xl p-8 lg:p-12 shadow-card border border-ink/5">
              <Rating value={t.rating as 1 | 2 | 3 | 4 | 5} size="md" className="mb-6" />
              <blockquote className="font-body text-lg lg:text-xl text-ink leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-[var(--radius-lens)] bg-tide flex items-center justify-center text-beam font-mono text-sm font-semibold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-mono text-sm font-medium text-ink">{t.name}</p>
                  <p className="font-mono text-xs text-ink-soft">{t.descriptor}</p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={prev}
                className="p-2 rounded-full border border-ink/10 text-ink-soft hover:text-ink hover:border-beam transition-all cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {featured.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      'w-2 h-2 rounded-full transition-all duration-[var(--dur-fast)] cursor-pointer',
                      i === active ? 'bg-beam w-6' : 'bg-ink/20 hover:bg-ink/40'
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                className="p-2 rounded-full border border-ink/10 text-ink-soft hover:text-ink hover:border-beam transition-all cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
