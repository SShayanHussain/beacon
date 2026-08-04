export type {
  PostFrontmatter,
  AuthorFrontmatter,
  ServiceFrontmatter,
  LeadFormData,
  NewsletterFormData,
  Package,
  PackageCategory,
  Testimonial,
  Book,
  FAQ,
  TeamMember,
  ComparisonRow,
  Category,
  ServiceSlug,
} from '@/lib/schemas'

/* ── Derived post type (frontmatter + computed fields) ── */
export type Post = {
  slug: string
  url: string
  readingTime: number
  wordCount: number
  headings: Heading[]
  frontmatter: import('@/lib/schemas').PostFrontmatter
  content: React.ReactElement
}

export type PostMeta = Omit<Post, 'content'>

export type Heading = {
  id: string
  text: string
  level: 2 | 3
}

/* ── Author with content ──────────────────────────────── */
export type Author = {
  slug: string
  frontmatter: import('@/lib/schemas').AuthorFrontmatter
  content: React.ReactElement
}

/* ── Service with content ─────────────────────────────── */
export type Service = {
  slug: string
  frontmatter: import('@/lib/schemas').ServiceFrontmatter
  content: React.ReactElement
}

/* ── API responses ────────────────────────────────────── */
export type ApiResponse = {
  ok: boolean
  error?: string
}
