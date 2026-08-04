import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { ServiceFrontmatterSchema } from '@/lib/schemas'
import type { ServiceFrontmatter } from '@/lib/schemas'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'services')

export type ServiceMeta = {
  slug: string
  url: string
  frontmatter: ServiceFrontmatter
  source: string
}

function getServiceFilePaths(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
}

export function getAllServicesMeta(): ServiceMeta[] {
  const files = getServiceFilePaths()
  const services: ServiceMeta[] = []

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '')
    const filePath = path.join(CONTENT_DIR, file)
    const source = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(source)
    const parsed = ServiceFrontmatterSchema.safeParse({ slug, ...data })

    if (parsed.success) {
      services.push({
        slug,
        url: `/services/${slug}`,
        frontmatter: parsed.data,
        source: content,
      })
    } else {
      console.warn(`⚠ Invalid frontmatter in ${slug}.mdx:`, parsed.error.flatten())
    }
  }

  return services.sort((a, b) => a.frontmatter.order - b.frontmatter.order)
}

export function getServiceMeta(slug: string): ServiceMeta | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const sourceFile = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(sourceFile)
  const parsed = ServiceFrontmatterSchema.safeParse({ slug, ...data })

  if (!parsed.success) {
    console.warn(`⚠ Invalid frontmatter in ${slug}.mdx:`, parsed.error.flatten())
    return null
  }

  return {
    slug,
    url: `/services/${slug}`,
    frontmatter: parsed.data,
    source: content,
  }
}

export function getAllServiceSlugs(): string[] {
  return getServiceFilePaths().map((f) => f.replace(/\.mdx$/, ''))
}
