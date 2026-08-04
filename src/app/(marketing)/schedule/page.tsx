import type { Metadata } from 'next'
import { Section, Container, Button } from '@/components/ui'
import { Reveal } from '@/components/motion/reveal'
import { siteConfig } from '@/data/site'
import { Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Book a Call',
  description: 'Thirty minutes, video or phone, with someone who will actually work on your book. No pitch, no obligation.',
  alternates: { canonical: '/schedule' },
}

export default function SchedulePage() {
  return (
    <>
      {/* Hero */}
      <Section surface="dark" hasDivider={false}>
        <Container>
          <Reveal>
            <p className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-4">
              ↳ Schedule
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.025em] leading-[1.05] text-fog-pure [font-variation-settings:'WONK'_1] max-w-2xl">
              Book a call
            </h1>
            <p className="mt-6 text-lg text-fog/60 leading-relaxed max-w-xl">
              Thirty minutes, video or phone, with someone who will actually work on your book.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* What to expect */}
      <Section surface="light">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Reveal>
              <div>
                <h2 className="font-display text-2xl font-semibold text-ink [font-variation-settings:'WONK'_1] mb-6">
                  What to expect
                </h2>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="font-mono text-lg font-semibold text-beam mt-0.5 tabular-nums">1.</span>
                    <p className="text-ink-soft leading-relaxed">
                      You describe the book and what you want from it.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono text-lg font-semibold text-beam mt-0.5 tabular-nums">2.</span>
                    <p className="text-ink-soft leading-relaxed">
                      We ask about length, genre, and where the draft stands.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <span className="font-mono text-lg font-semibold text-beam mt-0.5 tabular-nums">3.</span>
                    <p className="text-ink-soft leading-relaxed">
                      You get a scope and a price range on the call, and in writing afterwards.
                    </p>
                  </li>
                </ol>
              </div>
            </Reveal>

            {/* Cal.com placeholder */}
            <Reveal delay={0.15}>
              <div className="bg-fog-pure border border-ink/8 rounded-xl p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-beam/10 flex items-center justify-center mb-4">
                  <Phone className="w-7 h-7 text-beam" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink [font-variation-settings:'WONK'_0]">
                  Calendar loading...
                </h3>
                <p className="text-sm text-ink-soft mt-2 max-w-xs">
                  The Cal.com scheduler will appear here. If it does not load, use the fallback below.
                </p>
                <div className="mt-6 space-y-3">
                  <Button href={`https://cal.com/${process.env.NEXT_PUBLIC_CAL_LINK || 'beaconlight/intro-call'}`} variant="onLight" size="md">
                    Book directly on Cal.com
                  </Button>
                  <p className="text-xs text-ink-soft">
                    or call{' '}
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-ink underline">
                      {siteConfig.phone}
                    </a>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section surface="dark">
        <Container>
          <Reveal>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-fog-pure [font-variation-settings:'WONK'_1]">
                Prefer to write first?
              </h2>
              <p className="mt-4 text-fog/60">
                Send us the details by form and we will come back with a scope and a number
                within one business day.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="primary" size="lg">
                  Send us a message
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
