import type { Metadata } from 'next'
import { Section, Container, SectionHeader, Card, Button } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { siteConfig } from '@/data/site'
import { team } from '@/data/team'
import { Shield, Users, FileText, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'A small crew, pointed at one problem. Independent authors are sold packages they can\'t evaluate by companies they can\'t reach. We built the opposite.',
  alternates: { canonical: '/about' },
}

const values = [
  {
    icon: Shield,
    title: 'Authors keep everything',
    body: 'Rights, royalties, intellectual property. We are work-for-hire — we never take a share of what your book earns.',
  },
  {
    icon: Users,
    title: 'Craft over volume',
    body: 'We take on the number of projects our team can handle with care. No production line, no cut corners.',
  },
  {
    icon: FileText,
    title: 'Plain-language contracts',
    body: 'Every agreement says what it means. No legalese designed to obscure what you are agreeing to.',
  },
  {
    icon: Clock,
    title: 'Answer within one business day',
    body: 'Every enquiry gets a real reply within 24 hours, including the ones that turn out not to be a fit.',
  },
]

const timeline = [
  { year: '2024', milestone: 'Founded with one editor and a conviction about author rights' },
  { year: '2024', milestone: 'First 50 books published and listed on major retailers' },
  { year: '2025', milestone: 'Expanded to cover design, audiobook production, and marketing' },
  { year: '2025', milestone: 'Distribution network reaches 40+ countries' },
  { year: '2026', milestone: 'Serving 200+ authors across fiction, non-fiction, and children\'s books' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section surface="dark" hasDivider={false}>
        <Container>
          <Reveal>
            <p className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-4">
              ↳ About
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.025em] leading-[1.05] text-fog-pure [font-variation-settings:'WONK'_1] max-w-2xl">
              A small crew, pointed at one problem
            </h1>
            <p className="mt-6 text-lg text-fog/60 leading-relaxed max-w-xl">
              Independent authors are sold packages they cannot evaluate by companies they cannot
              reach. We built the opposite.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Our story + timeline */}
      <Section surface="light" id="story-section" aria-labelledby="story-heading">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <Reveal>
              <SectionHeader
                eyebrow="↳ Our story"
                title="How it started"
                surface="light"
                id="story-heading"
              />
              <div className="space-y-4 text-ink-soft leading-relaxed">
                <p>
                  Beacon Light started because too many first-time authors were finishing
                  manuscripts and then falling into one of two traps: a vanity press that took
                  their rights, or a scattered collection of freelancers nobody was
                  project-managing.
                </p>
                <p>
                  We built a single team that handles the whole route from manuscript to retail
                  shelf — editing, cover design, interior formatting, ISBN registration,
                  distribution, and marketing — on a fixed scope and a fixed price. The author
                  keeps every right and every royalty, because we are work-for-hire.
                </p>
                <p>
                  That is the whole idea. No hedge, no asterisk. Everything we build, every
                  process we design, is built around that promise.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="space-y-6">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-beam shrink-0 mt-1.5" />
                      {i < timeline.length - 1 && (
                        <div className="w-px flex-1 bg-beam/20 mt-1" />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className="font-mono text-xs font-medium text-beam uppercase tracking-wider">
                        {item.year}
                      </p>
                      <p className="text-sm text-ink-soft mt-1">{item.milestone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section surface="dark" id="values-section" aria-labelledby="values-heading">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="↳ What we believe"
              title="Four things we will not trade away."
              id="values-heading"
            />
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <Card surface="dark" className="p-6 lg:p-8 h-full">
                  <v.icon className="w-8 h-8 text-beam mb-4" />
                  <h3 className="font-display text-xl font-semibold text-fog-pure mb-2 [font-variation-settings:'WONK'_0]">
                    {v.title}
                  </h3>
                  <p className="text-sm text-fog/60 leading-relaxed">{v.body}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Team */}
      <Section surface="light" id="team-section" aria-labelledby="team-heading">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="↳ The team"
              title="The people doing the work."
              surface="light"
              id="team-heading"
            />
          </Reveal>
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <Card surface="light" className="p-6 text-center">
                  <div className="w-20 h-20 rounded-[var(--radius-lens)] bg-tide mx-auto mb-4 flex items-center justify-center text-beam font-display text-2xl font-semibold">
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-ink [font-variation-settings:'WONK'_0]">
                    {member.name}
                  </h3>
                  <p className="font-mono text-xs text-ink-soft uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                  <p className="text-sm text-ink-soft mt-3 leading-relaxed">{member.bio}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Disclaimer */}
      <Section surface="dark" id="disclaimer-section" aria-labelledby="disclaimer-heading">
        <Container size="prose">
          <Reveal>
            <SectionHeader
              eyebrow="↳ What you keep"
              title="The work-for-hire promise, in full."
              id="disclaimer-heading"
              align="center"
            />
            <p className="text-fog/60 leading-relaxed text-center">
              {siteConfig.disclaimer}
            </p>
            <p className="text-fog/60 leading-relaxed text-center mt-4">
              Retail accounts are opened in your name and stay in your control. If you ever
              move on from Beacon Light, the accounts stay with you. We are paid for the work
              we do, once, and never take a share of what your book earns.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* CTA */}
      <Section surface="light">
        <Container>
          <Reveal>
            <div className="text-center">
              <h2 className="font-display text-3xl font-semibold text-ink [font-variation-settings:'WONK'_1]">
                Ready to start?
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button href="/schedule" variant="onLight" size="lg">
                  Book a free call
                </Button>
                <Button href="/contact" variant="ghost" size="lg" className="text-ink">
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
