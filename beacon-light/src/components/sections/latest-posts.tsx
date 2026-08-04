import { Section, Container, SectionHeader, Card } from '@/components/ui'
import { Reveal, Stagger, StaggerItem } from '@/components/motion/reveal'
import Link from 'next/link'

// Placeholder latest posts until the content layer is wired up
const placeholderPosts = [
  {
    slug: 'what-a-book-cover-is-actually-doing',
    title: 'What a Book Cover Is Actually Doing',
    excerpt: 'A cover is not artwork. It is a compression algorithm for genre, tone, and quality, and it has about one second to run.',
    category: 'Publishing',
    date: '14 Aug 2026',
    readingTime: 6,
  },
  {
    slug: 'self-publishing-costs',
    title: 'Why Self-Publishing Isn\'t Free — And How to Spend Wisely',
    excerpt: 'A line-by-line look at what independent authors actually spend, where the money earns its keep, and which costs you can defer.',
    category: 'Author Business',
    date: '10 Aug 2026',
    readingTime: 8,
  },
  {
    slug: 'developmental-editing-explained',
    title: 'What a Developmental Edit Actually Does to Your Manuscript',
    excerpt: 'Developmental editing is not about commas. It is the edit that asks whether the book works — and shows you how to fix it when it does not.',
    category: 'Editing',
    date: '5 Aug 2026',
    readingTime: 7,
  },
]

export function LatestPosts() {
  return (
    <Section surface="dark" id="blog-section" aria-labelledby="blog-heading">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="↳ The Beacon"
            title="Notes from the crossing."
            sub="Practical writing on editing, design, pricing, and the parts of publishing nobody explains."
            id="blog-heading"
          />
        </Reveal>

        <Stagger className="post-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderPosts.map((post) => (
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <Card surface="dark" interactive className="post-card h-full flex flex-col">
                  {/* Image placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-tide to-ink relative overflow-hidden">
                    <div className="absolute inset-0 bg-beam/5 group-hover:bg-beam/10 transition-colors" />
                  </div>
                  <div className="p-5 lg:p-6 flex-1 flex flex-col">
                    <span className="inline-flex items-center font-mono text-xs font-medium uppercase tracking-[0.08em] text-glass bg-glass/15 rounded-sm px-2.5 py-1 self-start mb-3">
                      {post.category}
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-fog-pure leading-snug mb-2 [font-variation-settings:'WONK'_0] group-hover:text-beam transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-fog/50 leading-relaxed line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>
                    <p className="mt-4 font-mono text-xs text-fog/30">
                      {post.date} · {post.readingTime} min
                    </p>
                  </div>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.25}>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="font-mono text-sm uppercase tracking-[0.06em] text-fog/60 hover:text-beam transition-colors inline-flex items-center gap-2"
            >
              Read the blog →
            </Link>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
