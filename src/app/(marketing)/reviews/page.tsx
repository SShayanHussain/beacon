import type { Metadata } from 'next'
import { Section, Container, SectionHeader, Card, Rating, Button } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { testimonials } from '@/data/testimonials'

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'What authors said afterwards. Every review is attributed and, where the platform allows, linked to its source.',
  alternates: { canonical: '/reviews' },
}

export default function ReviewsPage() {
  const avgRating = testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length

  return (
    <>
      {/* Hero */}
      <Section surface="dark" hasDivider={false}>
        <Container>
          <Reveal>
            <p className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-4">
              ↳ Reviews
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.025em] leading-[1.05] text-fog-pure [font-variation-settings:'WONK'_1] max-w-2xl">
              What authors said afterwards
            </h1>
            <p className="mt-6 text-lg text-fog/60 leading-relaxed max-w-xl">
              Every review here is attributed and, where the platform allows, linked to its
              source. We do not publish anything we cannot show you the receipt for.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Rating value={Math.round(avgRating) as 1 | 2 | 3 | 4 | 5} size="lg" />
              <span className="font-mono text-2xl font-semibold text-fog-pure tabular-nums">
                {avgRating.toFixed(1)}
              </span>
              <span className="font-mono text-sm text-fog/50">
                from {testimonials.length} reviews
              </span>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Masonry grid */}
      <Section surface="light">
        <Container>
          <Stagger className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t) => (
              <StaggerItem key={t.id} className="break-inside-avoid">
                <Card surface="light" className="p-6">
                  <Rating value={t.rating as 1 | 2 | 3 | 4 | 5} size="sm" className="mb-4" />
                  <blockquote className="text-sm text-ink-soft leading-relaxed italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-[var(--radius-lens)] bg-tide flex items-center justify-center text-beam font-mono text-xs font-semibold">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-mono text-xs font-medium text-ink">{t.name}</p>
                      <p className="font-mono text-[0.65rem] text-ink-soft">{t.descriptor}</p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* CTA */}
      <Section surface="dark">
        <Container>
          <Reveal>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-fog-pure [font-variation-settings:'WONK'_1]">
                Ready to add your voice?
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button href="/schedule" variant="primary" size="lg">Book a call</Button>
                <Button href="/contact" variant="secondary" size="lg">Send a message</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
