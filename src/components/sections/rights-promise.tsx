import { Section, Container } from '@/components/ui'
import { Reveal } from '@/components/motion/reveal'
import { Button } from '@/components/ui'
import Link from 'next/link'

export function RightsPromise() {
  return (
    <Section surface="dark" id="rights-section" aria-labelledby="rights-heading">
      <Container>
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              id="rights-heading"
              className="font-display text-3xl lg:text-4xl font-semibold tracking-[-0.025em] leading-[1.05] text-fog-pure [font-variation-settings:'WONK'_1]"
            >
              You keep the copyright.{' '}
              <span className="text-beam">You keep the royalties.</span>{' '}
              All of them.
            </h2>
            <p className="mt-6 text-lg text-fog/60 leading-relaxed max-w-[52ch] mx-auto">
              Beacon Light is work-for-hire. We are paid for the services we deliver, once, and
              we never take a share of what your book earns. Your name is on every account, every
              record, and every royalty cheque.
            </p>
            <div className="mt-8">
              <Button href="/about" variant="secondary" size="md">
                Read the full promise
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
