import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { PostFrontmatterSchema, CATEGORIES, type Category } from '@/lib/schemas'
import type { PostMeta, Heading } from '@/types'

const CONTENT_DIR = path.join(process.cwd(), '..', 'content', 'blog')
const POSTS_PER_PAGE = 9

function getPostFilePaths(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
}

function parsePostMeta(slug: string, source: string): PostMeta | null {
  const { data, content } = matter(source)
  const parsed = PostFrontmatterSchema.safeParse(data)

  if (!parsed.success) {
    console.warn(`⚠ Invalid frontmatter in ${slug}.mdx:`, parsed.error.flatten())
    return null
  }

  if (parsed.data.draft) return null

  const stats = readingTime(content)

  // Extract headings
  const headings: Heading[] = []
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1]!.length as 2 | 3
    const text = match[2]!.trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    headings.push({ id, text, level })
  }

  return {
    slug,
    url: `/blog/${slug}`,
    readingTime: Math.ceil(stats.minutes),
    wordCount: stats.words,
    headings,
    frontmatter: parsed.data,
  }
}

export function getAllPostsMeta(): PostMeta[] {
  const files = getPostFilePaths()
  const posts: PostMeta[] = []

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '')
    const source = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
    const meta = parsePostMeta(slug, source)
    if (meta) posts.push(meta)
  }

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  )
}

export function getPostMeta(slug: string): PostMeta | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf-8')
  return parsePostMeta(slug, source)
}

export function getPostSource(slug: string): string | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.frontmatter.category === category)
}

export function getFeaturedPosts(): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.frontmatter.featured)
}

export function getLatestPosts(count: number = 3): PostMeta[] {
  return getAllPostsMeta().slice(0, count)
}

export function getPaginatedPosts(page: number = 1): {
  posts: PostMeta[]
  totalPages: number
  currentPage: number
} {
  const all = getAllPostsMeta()
  const totalPages = Math.ceil(all.length / POSTS_PER_PAGE)
  const start = (page - 1) * POSTS_PER_PAGE
  const posts = all.slice(start, start + POSTS_PER_PAGE)

  return { posts, totalPages, currentPage: page }
}

export function getAllCategories(): { category: Category; count: number }[] {
  const all = getAllPostsMeta()
  return CATEGORIES.map((cat) => ({
    category: cat,
    count: all.filter((p) => p.frontmatter.category === cat).length,
  })).filter((c) => c.count > 0)
}

export function getAllSlugs(): string[] {
  return getPostFilePaths().map((f) => f.replace(/\.mdx$/, ''))
}

export function getAllTags(): string[] {
  const all = getAllPostsMeta()
  const tags = new Set<string>()
  for (const post of all) {
    for (const tag of post.frontmatter.tags) {
      tags.add(tag)
    }
  }
  return Array.from(tags).sort()
}
