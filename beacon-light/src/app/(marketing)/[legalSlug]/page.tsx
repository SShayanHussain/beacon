import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'
import { Section, Container } from '@/components/ui'
import { Reveal } from '@/components/motion/reveal'

type PageProps = { params: Promise<{ legalSlug: string }> }

const LEGAL_SLUGS: Record<string, string> = {
  'privacy-policy': 'privacy',
  'terms-and-conditions': 'terms',
  'refund-policy': 'refund',
}

export async function generateStaticParams() {
  return Object.keys(LEGAL_SLUGS).map((legalSlug) => ({ legalSlug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { legalSlug } = await params
  const fileName = LEGAL_SLUGS[legalSlug]
  if (!fileName) return {}

  const filePath = path.join(process.cwd(), '..', 'content', 'legal', `${fileName}.mdx`)
  if (!fs.existsSync(filePath)) return {}

  const source = fs.readFileSync(filePath, 'utf-8')
  const { data } = matter(source)

  return {
    title: `${data.title} | Beacon Light Publishing`,
    alternates: { canonical: `/${legalSlug}` },
  }
}

export default async function LegalPage({ params }: PageProps) {
  const { legalSlug } = await params
  const fileName = LEGAL_SLUGS[legalSlug]
  
  if (!fileName) notFound()

  const filePath = path.join(process.cwd(), '..', 'content', 'legal', `${fileName}.mdx`)
  if (!fs.existsSync(filePath)) notFound()

  const source = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(source)

  return (
    <Section surface="light" hasDivider={false}>
      <Container size="prose">
        <Reveal>
          <div className="prose-article prose prose-lg max-w-none text-ink-soft
            [&>h1]:font-display [&>h1]:text-4xl [&>h1]:font-semibold [&>h1]:text-ink [&>h1]:mb-8 [&>h1]:[font-variation-settings:'WONK'_1]
            [&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-ink [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:[font-variation-settings:'WONK'_0]
            [&>p]:leading-relaxed [&>p]:mb-5
            [&>ul]:space-y-2 [&>ul>li]:text-ink-soft
          ">
            <MDXRemote
              source={content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
          <div className="mt-12 pt-6 border-t border-ink/10">
            <p className="font-mono text-xs text-ink-soft uppercase tracking-wider">
              Last updated: {new Date(data.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  )
}
