'use client'

import { useState } from 'react'
import type { Metadata } from 'next'
import { Section, Container, SectionHeader, Card, Button, Chip } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { packages } from '@/data/packages'
import { faqs } from '@/data/faqs'
import { cn } from '@/lib/utils'
import { Check, Shield, Award, ChevronDown } from 'lucide-react'
import type { PackageCategory } from '@/lib/schemas'

const CATEGORY_TABS: { key: PackageCategory; label: string }[] = [
  { key: 'publishing', label: 'Publishing' },
  { key: 'editing', label: 'Editing' },
  { key: 'ghostwriting', label: 'Ghostwriting' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'childrens', label: "Children's Books" },
]

export default function PackagesPage() {
  const [activeCategory, setActiveCategory] = useState<PackageCategory>('publishing')

  const filtered = packages.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* Hero */}
      <Section surface="dark" hasDivider={false}>
        <Container>
          <Reveal>
            <p className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-4">
              ↳ Packages
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.025em] leading-[1.05] text-fog-pure [font-variation-settings:'WONK'_1] max-w-2xl">
              What it costs
            </h1>
            <p className="mt-6 text-lg text-fog/60 leading-relaxed max-w-xl">
              Every price below is a starting point for a typical manuscript. You will have the
              final number before anything begins.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Tabs + cards */}
      <Section surface="light">
        <Container>
          {/* Category tabs */}
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORY_TABS.map((tab) => (
                <Chip
                  key={tab.key}
                  variant={activeCategory === tab.key ? 'active' : 'default'}
                  surface="light"
                  onClick={() => setActiveCategory(tab.key)}
                >
                  {tab.label}
                </Chip>
              ))}
            </div>
          </Reveal>

          {/* Package cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((pkg) => (
              <div key={pkg.id}>
                <Card
                  surface="light"
                  interactive
                  className={cn(
                    'h-full flex flex-col relative',
                    pkg.isFeatured && 'border-beam border-2 ring-2 ring-beam/10'
                  )}
                >
                  {pkg.isFeatured && (
                    <div className="absolute top-0 right-4 -translate-y-1/2 bg-beam text-ink font-mono text-xs font-medium uppercase tracking-wider px-3 py-1 rounded-full">
                      Most chosen
                    </div>
                  )}
                  <div className="p-6 lg:p-8 flex-1 flex flex-col">
                    <h3 className="font-display text-xl font-semibold text-ink [font-variation-settings:'WONK'_0]">
                      {pkg.tier}
                    </h3>
                    <p className="text-sm text-ink-soft mt-1">{pkg.audience}</p>

                    <div className="mt-4 flex items-baseline gap-1.5">
                      {pkg.priceNote && (
                        <span className="font-mono text-xs text-ink-soft">{pkg.priceNote}</span>
                      )}
                      <span className="font-mono text-4xl font-semibold text-ink tabular-nums">
                        ${pkg.price.toLocaleString()}
                      </span>
                      {pkg.duration && (
                        <span className="font-mono text-xs text-ink-soft">/ {pkg.duration}</span>
                      )}
                    </div>

                    <div className="mt-6 space-y-5 flex-1">
                      {pkg.featureGroups.map((group) => (
                        <div key={group.heading}>
                          <p className="font-mono text-xs font-medium uppercase tracking-wider text-beam mb-2">
                            {group.heading}
                          </p>
                          <ul className="space-y-1.5">
                            {group.items.map((item) => (
                              <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                                <Check className="w-4 h-4 text-beam shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-2">
                      <Button
                        href="/contact"
                        variant={pkg.isFeatured ? 'onLight' : 'ghost'}
                        size="md"
                        className={cn('w-full', !pkg.isFeatured && 'text-ink border border-ink/15')}
                      >
                        {pkg.ctaLabel}
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Guarantees */}
      <Section surface="dark">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 text-beam mb-3" />
                <p className="font-mono text-sm font-medium text-fog-pure uppercase tracking-wider">No royalty share</p>
                <p className="text-xs text-fog/50 mt-1">We never take a percentage</p>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-8 h-8 text-beam mb-3" />
                <p className="font-mono text-sm font-medium text-fog-pure uppercase tracking-wider">100% ownership</p>
                <p className="text-xs text-fog/50 mt-1">Rights, IP, and royalties stay with you</p>
              </div>
              <div className="flex flex-col items-center">
                <Check className="w-8 h-8 text-beam mb-3" />
                <p className="font-mono text-sm font-medium text-fog-pure uppercase tracking-wider">Satisfaction guarantee</p>
                <p className="text-xs text-fog/50 mt-1">See our refund policy for details</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Payment terms */}
      <Section surface="light">
        <Container size="prose">
          <Reveal>
            <div className="text-center">
              <SectionHeader
                eyebrow="↳ Payment"
                title="How payment works"
                surface="light"
                align="center"
              />
              <p className="text-ink-soft leading-relaxed">
                50% to begin, the balance in instalments or on delivery of the first three
                chapters — whichever you prefer. Quoted in USD.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section surface="dark">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="↳ Questions"
              title="Frequently asked"
              id="packages-faq-heading"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-2xl space-y-3">
              {faqs.filter(f => f.scope === 'global').map((faq) => (
                <PackageFAQItem key={faq.id} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <Section surface="light">
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold text-ink [font-variation-settings:'WONK'_1]">
                Ready to get a quote?
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button href="/contact" variant="onLight" size="lg">Send us the details</Button>
                <Button href="/schedule" variant="ghost" size="lg" className="text-ink">Book a call</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}

function PackageFAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border border-beam/10 rounded-lg overflow-hidden">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full p-5 text-left cursor-pointer hover:bg-beam/5 transition-colors" aria-expanded={isOpen}>
        <span className="font-display text-base font-medium text-fog-pure pr-4">{question}</span>
        <ChevronDown className={cn('w-5 h-5 text-beam shrink-0 transition-transform', isOpen && 'rotate-180')} />
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-sm text-fog/60 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
