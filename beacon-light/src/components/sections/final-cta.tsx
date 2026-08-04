import { Section, Container, Button } from '@/components/ui'
import { Reveal } from '@/components/motion/reveal'
import { siteConfig } from '@/data/site'
import { Phone } from 'lucide-react'

export function FinalCTA() {
  return (
    <Section surface="dark" id="cta-section" aria-labelledby="cta-heading" className="noise">
      <Container>
        <Reveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2
              id="cta-heading"
              className="font-display text-3xl lg:text-4xl font-semibold tracking-[-0.025em] text-fog-pure [font-variation-settings:'WONK'_1]"
            >
              Tell us about the book.
            </h2>
            <p className="mt-4 text-lg text-fog/60 leading-relaxed">
              A thirty-minute call, no pitch deck. You describe what you have written and what you
              want from it; we tell you what it would take and what it would cost.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Button href="/schedule" variant="primary" size="lg">
                Book a free call
              </Button>
              <Button href="/packages" variant="secondary" size="lg">
                See packages
              </Button>
            </div>
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 mt-6 font-mono text-xs text-fog/40 hover:text-fog transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {siteConfig.phone}
            </a>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
