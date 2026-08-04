import { Section, Container, SectionHeader, Card } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import {
  BookOpen,
  PenTool,
  FileEdit,
  Megaphone,
  Headphones,
  Palette,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: BookOpen,
    title: 'Book Publishing',
    description: 'Manuscript to listed title: editing, design, ISBN, formatting, and distribution to the stores that matter.',
    href: '/services/book-publishing',
  },
  {
    icon: PenTool,
    title: 'Ghostwriting',
    description: 'Ghostwriting and collaborative writing when the story is clear but the pages are not there yet.',
    href: '/services/book-writing',
  },
  {
    icon: FileEdit,
    title: 'Editing',
    description: 'Developmental, line, and copy editing that sharpens your voice instead of flattening it.',
    href: '/services/book-editing',
  },
  {
    icon: Megaphone,
    title: 'Book Marketing',
    description: 'Launch strategy, author platform, and the slow work of staying discoverable after week one.',
    href: '/services/book-marketing',
  },
  {
    icon: Headphones,
    title: 'Audiobooks',
    description: 'Casting, narration, mastering, and ACX-ready delivery for the readers who listen.',
    href: '/services/audiobooks',
  },
  {
    icon: Palette,
    title: 'Cover & Interior Design',
    description: 'Covers that compete on the shelf and interiors that earn the read.',
    href: '/services/cover-design',
  },
]

export function ServicesGrid() {
  return (
    <Section surface="light" id="services-section" aria-labelledby="services-heading">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="↳ What we do"
            title="Five ways we help, and you can take any one on its own."
            surface="light"
            id="services-heading"
          />
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.href}>
              <Link href={service.href} className="group block h-full">
                <Card surface="light" interactive className="h-full p-6 lg:p-8">
                  <service.icon className="w-8 h-8 text-beam mb-4 transition-transform duration-[var(--dur-fast)] group-hover:translate-x-[3px]" />
                  <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-ink mb-2 [font-variation-settings:'WONK'_0]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-block mt-4 font-mono text-xs uppercase tracking-[0.06em] text-ink group-hover:text-beam transition-colors">
                    Learn more →
                  </span>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  )
}
