import type { Metadata } from 'next'
import { Section, Container, SectionHeader, Card, Button } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import Link from 'next/link'
import {
  BookOpen,
  PenTool,
  FileEdit,
  Megaphone,
  Headphones,
  Palette,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Publishing services, taken one at a time or all together. Editing, cover design, ghostwriting, marketing, and audiobook production for independent authors.',
  alternates: { canonical: '/services' },
}

const services = [
  {
    icon: BookOpen,
    title: 'Book Publishing',
    slug: 'book-publishing',
    eyebrow: 'Manuscript to shelf',
    headline: 'From finished manuscript to listed book',
    description: 'Editing, cover, interior, ISBN, and distribution — handled end to end, with your name on every account and every royalty.',
    features: [
      'Professional editing (developmental, line, copy)',
      'Custom cover and interior design',
      'ISBN registration and copyright filing',
      'Multi-platform distribution to major retailers',
    ],
  },
  {
    icon: PenTool,
    title: 'Ghostwriting',
    slug: 'book-writing',
    eyebrow: 'Your story, your voice',
    headline: 'When the story is ready and the pages are not',
    description: 'Ghostwriting and collaborative writing that sounds like you on your best day, built from interviews, notes, and drafts.',
    features: [
      'In-depth interviews and voice matching',
      'Chapter outline and synopsis',
      'Multiple draft rounds with your feedback',
      'Publication-ready manuscript',
    ],
  },
  {
    icon: FileEdit,
    title: 'Editing',
    slug: 'book-editing',
    eyebrow: 'Sharp, not flat',
    headline: 'Editing that sharpens your voice, not ours',
    description: 'Developmental, line, and copy editing in separate passes, so you can see exactly what changed and why.',
    features: [
      'Developmental assessment and structural notes',
      'Line editing for voice and rhythm',
      'Copyediting and proofreading',
      'Detailed style sheet and editorial letter',
    ],
  },
  {
    icon: Megaphone,
    title: 'Book Marketing',
    slug: 'book-marketing',
    eyebrow: 'The long game',
    headline: 'Getting found after launch week',
    description: 'Positioning, metadata, platform, and campaigns built for the long tail — because most books sell after month one, or not at all.',
    features: [
      'Launch strategy and pre-order campaign',
      'Amazon category and keyword optimisation',
      'Author platform and social media setup',
      'Ongoing ad management and analytics',
    ],
  },
  {
    icon: Headphones,
    title: 'Audiobooks',
    slug: 'audiobooks',
    eyebrow: 'For listeners',
    headline: 'For the readers who listen',
    description: 'Narrator casting, studio production, mastering, and ACX-ready delivery, from a manuscript you have already finished.',
    features: [
      'Professional narrator casting and auditions',
      'Studio recording and mastering',
      'ACX-compliant delivery',
      'Multi-platform audiobook distribution',
    ],
  },
  {
    icon: Palette,
    title: 'Cover & Interior Design',
    slug: 'cover-design',
    eyebrow: 'Shelf-ready',
    headline: 'Covers that compete on the shelf',
    description: 'Cover design built for thumbnail legibility and genre signalling, plus interior typesetting for print and ebook.',
    features: [
      'Genre-appropriate custom cover design',
      'Back cover and spine design',
      'Interior typesetting for print and ebook',
      'Print-ready and digital-ready file delivery',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <Section surface="dark" hasDivider={false}>
        <Container>
          <Reveal>
            <p className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-4">
              ↳ Services
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.025em] leading-[1.05] text-fog-pure [font-variation-settings:'WONK'_1] max-w-2xl">
              Publishing services, taken one at a time or all together.
            </h1>
            <p className="mt-6 text-lg text-fog/60 leading-relaxed max-w-xl">
              Every service below can be bought on its own. Nothing is bundled to force a bigger
              number.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Service rows — alternating */}
      {services.map((service, i) => (
        <Section
          key={service.slug}
          surface={i % 2 === 0 ? 'light' : 'dark'}
          id={`${service.slug}-section`}
          aria-labelledby={`${service.slug}-heading`}
        >
          <Container>
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <Reveal>
                <div>
                  <p className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-3">
                    ↳ {service.eyebrow}
                  </p>
                  <h2
                    id={`${service.slug}-heading`}
                    className={`font-display text-3xl font-semibold tracking-[-0.02em] leading-[1.1] [font-variation-settings:'WONK'_1] ${
                      i % 2 === 0 ? 'text-ink' : 'text-fog-pure'
                    }`}
                  >
                    {service.headline}
                  </h2>
                  <p className={`mt-4 text-base leading-relaxed ${i % 2 === 0 ? 'text-ink-soft' : 'text-fog/60'}`}>
                    {service.description}
                  </p>
                  <ul className="mt-6 space-y-2.5">
                    {service.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2.5 text-sm ${i % 2 === 0 ? 'text-ink-soft' : 'text-fog/60'}`}>
                        <span className="w-1.5 h-1.5 bg-beam rounded-full mt-1.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      href={`/services/${service.slug}`}
                      className="font-mono text-sm uppercase tracking-[0.06em] hover:text-beam transition-colors inline-flex items-center gap-2"
                    >
                      Explore {service.title} →
                    </Link>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.15}>
                <div className={`aspect-[4/3] rounded-xl ${i % 2 === 0 ? 'bg-gradient-to-br from-fog-pure to-fog border border-ink/5' : 'bg-gradient-to-br from-tide to-ink border border-beam/10'} flex items-center justify-center`}>
                  <service.icon className="w-16 h-16 text-beam/40" />
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      ))}

      {/* Not sure CTA */}
      <Section surface="dark">
        <Container>
          <Reveal>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-fog-pure [font-variation-settings:'WONK'_1]">
                Not sure where to start?
              </h2>
              <p className="mt-4 text-fog/60">
                See the packages page for bundled options, or book a call and we will help you
                figure out what your book needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Button href="/packages" variant="primary" size="lg">
                  See packages
                </Button>
                <Button href="/schedule" variant="secondary" size="lg">
                  Book a call
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
