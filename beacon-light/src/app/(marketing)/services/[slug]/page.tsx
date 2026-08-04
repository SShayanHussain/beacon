import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Section, Container, SectionHeader, Button, Card } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { getServiceMeta, getAllServiceSlugs } from '@/lib/content/services'
import { packages } from '@/data/packages'
import { testimonials } from '@/data/testimonials'
import { Check, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { mdxComponents } from '@/components/mdx'


type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const meta = getServiceMeta(slug)
  if (!meta) return {}
  return {
    title: meta.frontmatter.seo?.title || meta.frontmatter.title,
    description: meta.frontmatter.seo?.description || meta.frontmatter.sub,
    alternates: { canonical: `/services/${slug}` },
  }
}

// Simple FAQ component for the server page (using a client wrapper if interactivity is needed, but we can do a simplified one here or use HTML details)
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border border-beam/10 rounded-lg overflow-hidden [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex items-center justify-between w-full p-5 text-left cursor-pointer hover:bg-beam/5 transition-colors">
        <span className="font-display text-base font-medium text-fog-pure pr-4">{q}</span>
        <ChevronDown className="w-5 h-5 text-beam shrink-0 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5">
        <p className="text-sm text-fog/60 leading-relaxed">{a}</p>
      </div>
    </details>
  )
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const meta = getServiceMeta(slug)

  if (!meta) notFound()

  const { frontmatter, source } = meta
  const relatedPackages = packages.filter((p) => frontmatter.relatedPackages.includes(p.category))
  const serviceTestimonials = testimonials.filter((t) => t.service.includes(slug as any))

  return (
    <>
      {/* Hero */}
      <Section surface="dark" hasDivider={false}>
        <Container>
          <Reveal>
            <p className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-4">
              ↳ {frontmatter.eyebrow}
            </p>
            <h1 className="font-display text-4xl lg:text-5xl font-semibold tracking-[-0.025em] leading-[1.05] text-fog-pure [font-variation-settings:'WONK'_1] max-w-3xl">
              {frontmatter.headline}
            </h1>
            <p className="mt-6 text-lg text-fog/60 leading-relaxed max-w-xl">
              {frontmatter.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/schedule" variant="primary" size="lg">Book a call</Button>
              <Button href="#packages" variant="secondary" size="lg">See packages</Button>
            </div>
          </Reveal>

          {frontmatter.stats && frontmatter.stats.length > 0 && (
            <Reveal delay={0.15}>
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-beam/15 pt-8">
                {frontmatter.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="font-mono text-3xl font-semibold text-beam">
                      {stat.value.toLocaleString()}{stat.suffix}
                    </div>
                    <div className="font-mono text-xs uppercase tracking-wider text-fog/50 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* Pillars */}
      {frontmatter.pillars && frontmatter.pillars.length > 0 && (
        <Section surface="light">
          <Container>
            <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {frontmatter.pillars.map((pillar) => (
                <StaggerItem key={pillar.title}>
                  <h3 className="font-display text-xl font-semibold text-ink [font-variation-settings:'WONK'_0] mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">
                    {pillar.body}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </Section>
      )}

      {/* Main MDX Content */}
      {source && source.trim() !== '' && (
        <Section surface="light" hasDivider={false} className="!pt-0">
          <Container size="prose">
            <Reveal>
              <div className="prose-article prose prose-lg max-w-none text-ink-soft
                [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-ink [&>h2]:mt-12 [&>h2]:mb-4
                [&>h3]:font-display [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-ink [&>h3]:mt-8 [&>h3]:mb-3
                [&>p]:leading-relaxed [&>p]:mb-5
                [&>ul]:space-y-1.5 [&>ul>li]:text-ink-soft
              ">
                <MDXRemote
                  source={source}
                  components={mdxComponents}
                  options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                />
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* Process & Deliverables */}
      <Section surface="dark">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <SectionHeader eyebrow="↳ Process" title="How it works" id="process" />
                <div className="mt-8 space-y-6">
                  {frontmatter.process.map((step, i) => (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-beam/10 border border-beam/30 flex items-center justify-center font-mono text-[10px] text-beam">
                          {i + 1}
                        </div>
                        {i < frontmatter.process.length - 1 && (
                          <div className="w-px flex-1 bg-beam/20 mt-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <h4 className="font-display text-lg font-semibold text-fog-pure">{step.title}</h4>
                        <p className="text-sm text-fog/60 mt-1">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div>
                <SectionHeader eyebrow="↳ Deliverables" title="What's included" id="deliverables" />
                <ul className="mt-8 space-y-4">
                  {frontmatter.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3 bg-fog/5 rounded-lg p-4 border border-fog/10">
                      <Check className="w-5 h-5 text-beam shrink-0" />
                      <span className="text-fog/80 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      {serviceTestimonials.length > 0 && (
        <Section surface="light">
          <Container>
            <Reveal>
              <SectionHeader eyebrow="↳ In their words" title="What authors said" surface="light" id="testimonials" />
            </Reveal>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceTestimonials.map((t) => (
                <StaggerItem key={t.id}>
                  <Card surface="light" className="p-6 h-full">
                    <blockquote className="text-sm text-ink-soft leading-relaxed italic mb-4">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3 mt-auto">
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
      )}

      {/* FAQ */}
      {frontmatter.faqs && frontmatter.faqs.length > 0 && (
        <Section surface="dark">
          <Container size="prose">
            <Reveal>
              <SectionHeader eyebrow="↳ Questions" title="Frequently asked" id="faqs" />
              <div className="mt-8 space-y-3">
                {frontmatter.faqs.map((faq) => (
                  <FAQItem key={faq.q} q={faq.q} a={faq.a} />
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* Packages linking */}
      {relatedPackages.length > 0 && (
        <Section surface="light" id="packages">
          <Container>
            <Reveal>
              <div className="text-center max-w-xl mx-auto mb-10">
                <SectionHeader eyebrow="↳ Packages" title="Ready to start?" surface="light" align="center" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                {relatedPackages.map((pkg) => (
                  <Card key={pkg.id} surface="light" className={cn("p-6", pkg.isFeatured && "border-beam border-2")}>
                    <h3 className="font-display text-xl font-semibold text-ink">{pkg.tier}</h3>
                    <p className="text-sm text-ink-soft mt-1">{pkg.audience}</p>
                    <div className="mt-4 font-mono text-2xl font-semibold text-ink tabular-nums">
                      ${pkg.price.toLocaleString()}
                    </div>
                    <Button href="/packages" variant={pkg.isFeatured ? 'primary' : 'ghost'} size="sm" className="mt-6 w-full text-ink border-ink/20">
                      View all details
                    </Button>
                  </Card>
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}
    </>
  )
}
