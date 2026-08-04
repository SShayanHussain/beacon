import type { Metadata } from 'next'
import { Section, Container, SectionHeader, Card, Chip, Button } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import { getAllPostsMeta, getAllCategories } from '@/lib/content/posts'
import { CATEGORY_DISPLAY } from '@/lib/schemas'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog — The Beacon',
  description: 'Practical writing on editing, design, pricing, and the parts of publishing nobody explains.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  const posts = getAllPostsMeta()
  const categories = getAllCategories()

  return (
    <>
      {/* Hero */}
      <Section surface="dark" hasDivider={false}>
        <Container>
          <Reveal>
            <p className="font-mono text-eyebrow font-medium uppercase tracking-[0.16em] text-beam mb-4">
              ↳ The Beacon
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-[-0.025em] leading-[1.05] text-fog-pure [font-variation-settings:'WONK'_1]">
              Notes from the crossing
            </h1>
            <p className="mt-6 text-lg text-fog/60 leading-relaxed max-w-xl">
              Practical writing on editing, design, pricing, and the parts of publishing nobody
              explains.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Categories */}
      {categories.length > 0 && (
        <Section surface="light" hasDivider={false} className="!py-6">
          <Container>
            <Reveal>
              <div className="flex flex-wrap gap-2">
                <Chip variant="active" surface="light">All</Chip>
                {categories.map((c) => (
                  <Chip key={c.category} surface="light" href={`/blog/category/${c.category}`}>
                    {CATEGORY_DISPLAY[c.category].label} ({c.count})
                  </Chip>
                ))}
              </div>
            </Reveal>
          </Container>
        </Section>
      )}

      {/* Posts grid */}
      <Section surface="light" hasDivider={false}>
        <Container>
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-ink-soft text-lg">
                No posts yet — check back soon.
              </p>
            </div>
          ) : (
            <Stagger className="post-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <StaggerItem key={post.slug}>
                  <Link href={post.url} className="group block h-full">
                    <Card surface="light" interactive className="post-card h-full flex flex-col">
                      <div className="aspect-video bg-gradient-to-br from-fog-pure to-fog border-b border-ink/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-beam/0 group-hover:bg-beam/5 transition-colors" />
                      </div>
                      <div className="p-5 lg:p-6 flex-1 flex flex-col">
                        <Chip surface="light" className="self-start mb-3">
                          {CATEGORY_DISPLAY[post.frontmatter.category]?.label || post.frontmatter.category}
                        </Chip>
                        <h2 className="font-display text-xl font-semibold tracking-[-0.01em] text-ink leading-snug mb-2 [font-variation-settings:'WONK'_0] group-hover:text-beam transition-colors">
                          {post.frontmatter.title}
                        </h2>
                        <p className="text-sm text-ink-soft leading-relaxed line-clamp-2 flex-1">
                          {post.frontmatter.excerpt}
                        </p>
                        <p className="mt-4 font-mono text-xs text-ink-soft/60">
                          {formatDate(post.frontmatter.publishedAt)} · {post.readingTime} min
                        </p>
                      </div>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </Container>
      </Section>

      {/* Newsletter */}
      <Section surface="dark">
        <Container>
          <Reveal>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-fog-pure [font-variation-settings:'WONK'_1]">
                Don&apos;t miss a post
              </h2>
              <p className="mt-4 text-fog/60">
                One email a month. The new posts and the occasional thing we learned the hard way.
              </p>
              <div className="mt-6">
                <Button href="#newsletter-section" variant="primary" size="md">
                  Subscribe
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
