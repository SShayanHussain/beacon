'use client'

import { Section, Container, SectionHeader } from '@/components/ui'
import { CountUp } from '@/components/motion/count-up'
import { Reveal } from '@/components/motion/reveal'
import { siteConfig } from '@/data/site'

export function ProofCounters() {
  const stats = Object.values(siteConfig.stats)

  return (
    <Section surface="light" hasDivider={false}>
      <Container>
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-4xl font-semibold tracking-[-0.02em] text-ink">
                  <CountUp
                    value={typeof stat.value === 'number' ? stat.value : 0}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.08em] text-ink-soft">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
