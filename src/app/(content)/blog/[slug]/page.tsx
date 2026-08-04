import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { Section, Container, Chip, Button } from '@/components/ui'
import { Reveal } from '@/components/motion/reveal'
import { getPostMeta, getPostSource, getAllSlugs } from '@/lib/content/posts'
import { CATEGORY_DISPLAY } from '@/lib/schemas'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { mdxComponents } from '@/components/mdx'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const meta = getPostMeta(slug)
  if (!meta) return {}
  return {
    title: meta.frontmatter.seo?.title || meta.frontmatter.title,
    description: meta.frontmatter.seo?.description || meta.frontmatter.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      publishedTime: meta.frontmatter.publishedAt,
      modifiedTime: meta.frontmatter.updatedAt,
      tags: meta.frontmatter.tags,
    },
  }
}



export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const meta = getPostMeta(slug)
  const source = getPostSource(slug)

  if (!meta || !source) notFound()

  const { content } = matter(source)

  return (
    <>
      {/* Article header */}
      <Section surface="light" hasDivider={false} className="!pb-0">
        <Container size="prose">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.06em] text-ink-soft hover:text-ink transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to blog
            </Link>

            <Chip surface="light" href={`/blog/category/${meta.frontmatter.category}`} className="mb-4">
              {CATEGORY_DISPLAY[meta.frontmatter.category]?.label || meta.frontmatter.category}
            </Chip>

            <h1 className="font-display text-3xl lg:text-4xl font-semibold tracking-[-0.025em] leading-[1.08] text-ink [font-variation-settings:'WONK'_1]">
              {meta.frontmatter.title}
            </h1>

            {meta.frontmatter.deck && (
              <p className="mt-4 text-lg text-ink-soft/80 leading-relaxed italic font-body">
                {meta.frontmatter.deck}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-6 font-mono text-xs text-ink-soft">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(meta.frontmatter.publishedAt)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {meta.readingTime} min read
              </span>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Article body */}
      <Section surface="light" hasDivider={false} className="!pt-8">
        <Container size="prose">
          <Reveal>
            <article className="prose-article prose prose-lg max-w-none text-ink-soft
              [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-ink [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:[font-variation-settings:'WONK'_0]
              [&>h3]:font-display [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-ink [&>h3]:mt-8 [&>h3]:mb-3
              [&>p]:leading-relaxed [&>p]:mb-5
              [&>ul]:space-y-1.5 [&>ul>li]:text-ink-soft
              [&>ol]:space-y-1.5 [&>ol>li]:text-ink-soft
              [&>a]:text-beam [&>a]:underline [&>a]:decoration-beam/40 [&>a]:underline-offset-2
              [&>a:hover]:decoration-beam
              [&>code]:font-mono [&>code]:text-sm [&>code]:bg-ink/5 [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded
              [&>pre]:bg-ink [&>pre]:rounded-lg [&>pre]:p-5 [&>pre]:overflow-x-auto [&>pre]:text-fog [&>pre>code]:bg-transparent [&>pre>code]:p-0
              [&>blockquote]:border-l-2 [&>blockquote]:border-beam [&>blockquote]:pl-5 [&>blockquote]:italic [&>blockquote]:text-ink [&>blockquote]:not-italic
            ">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypeSlug],
                  },
                }}
              />
            </article>
          </Reveal>
        </Container>
      </Section>

      {/* Tags */}
      {meta.frontmatter.tags.length > 0 && (
        <Section surface="light" hasDivider={false} className="!py-0 !pb-8">
          <Container size="prose">
            <div className="flex flex-wrap gap-2 border-t border-ink/8 pt-6">
              {meta.frontmatter.tags.map((tag) => (
                <Chip key={tag} surface="light">
                  {tag}
                </Chip>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section surface="dark">
        <Container>
          <Reveal>
            <div className="text-center max-w-xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-fog-pure [font-variation-settings:'WONK'_1]">
                Ready to publish your book?
              </h2>
              <p className="mt-4 text-fog/60">
                A thirty-minute call, no obligation. You tell us about the manuscript, we tell you what it would take.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Button href="/schedule" variant="primary" size="lg">Book a call</Button>
                <Button href="/blog" variant="secondary" size="lg">More posts</Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
