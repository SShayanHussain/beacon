import { z } from 'zod'

/* ── Blog categories ──────────────────────────────────── */
export const CATEGORIES = [
  'writing-craft',
  'publishing',
  'editing',
  'marketing',
  'audiobooks',
  'author-business',
] as const

export type Category = (typeof CATEGORIES)[number]

export const CATEGORY_DISPLAY: Record<Category, { label: string; description: string }> = {
  'writing-craft': { label: 'Writing Craft', description: 'Structure, voice, revision, and getting unstuck' },
  publishing: { label: 'Publishing', description: 'ISBNs, distribution, formats, and retail' },
  editing: { label: 'Editing', description: 'What each editing pass actually does' },
  marketing: { label: 'Marketing', description: 'Launches, reviews, ads, and long-tail visibility' },
  audiobooks: { label: 'Audiobooks', description: 'Narration, production, and ACX' },
  'author-business': { label: 'Author Business', description: 'Money, rights, contracts, and running the shop' },
}

/* ── Post frontmatter ─────────────────────────────────── */
export const PostFrontmatterSchema = z.object({
  title: z.string().min(10).max(90),
  deck: z.string().min(20).max(180),
  excerpt: z.string().min(50).max(220),
  publishedAt: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()]).transform(d => d instanceof Date ? d.toISOString().split('T')[0] : d),
  updatedAt: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()]).optional().transform(d => d instanceof Date ? d.toISOString().split('T')[0] : d),
  author: z.string(),
  category: z.enum(CATEGORIES),
  tags: z.array(z.string()).min(1).max(6),
  cover: z.string().startsWith('/images/blog/'),
  coverAlt: z.string().min(10),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  seo: z
    .object({
      title: z.string().max(70).optional(),
      description: z.string().max(160).optional(),
    })
    .optional(),
  relatedService: z.string().optional(),
})

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>

/* ── Author frontmatter ───────────────────────────────── */
export const AuthorFrontmatterSchema = z.object({
  name: z.string(),
  role: z.string(),
  avatar: z.string(),
  bio: z.string(),
  links: z
    .object({
      linkedin: z.string().url().optional(),
      x: z.string().url().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
})

export type AuthorFrontmatter = z.infer<typeof AuthorFrontmatterSchema>

/* ── Service frontmatter ──────────────────────────────── */
export const ServiceFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  eyebrow: z.string(),
  headline: z.string(),
  sub: z.string(),
  icon: z.string(),
  order: z.number(),
  heroImage: z.string().optional(),
  stats: z.array(
    z.object({
      value: z.number(),
      suffix: z.string(),
      label: z.string(),
    })
  ),
  pillars: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
      image: z.string().optional(),
    })
  ),
  process: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
    })
  ),
  deliverables: z.array(z.string()),
  relatedPackages: z.array(z.string()),
  faqs: z.array(
    z.object({
      q: z.string(),
      a: z.string(),
    })
  ),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
    })
    .optional(),
})

export type ServiceFrontmatter = z.infer<typeof ServiceFrontmatterSchema>

/* ── Lead form ────────────────────────────────────────── */
export const LeadFormSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  service: z.string().optional(),
  manuscriptStatus: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, 'Please tell us a bit more about your project'),
  consent: z.boolean().refine((val) => val === true, 'Please agree to the privacy policy'),
  company_website: z.string().max(0).optional(), // honeypot
})

export type LeadFormData = z.infer<typeof LeadFormSchema>

/* ── Newsletter form ──────────────────────────────────── */
export const NewsletterSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  company_website: z.string().max(0).optional(), // honeypot
})

export type NewsletterFormData = z.infer<typeof NewsletterSchema>

/* ── Service slugs ────────────────────────────────────── */
export const SERVICE_SLUGS = [
  'book-publishing',
  'book-writing',
  'book-editing',
  'book-marketing',
  'audiobooks',
  'cover-design',
] as const

export type ServiceSlug = (typeof SERVICE_SLUGS)[number]

/* ── Package types ────────────────────────────────────── */
export type PackageCategory =
  | 'publishing'
  | 'editing'
  | 'ghostwriting'
  | 'marketing'
  | 'childrens'

export const PackageSchema = z.object({
  id: z.string(),
  category: z.enum(['publishing', 'editing', 'ghostwriting', 'marketing', 'childrens']),
  tier: z.string(),
  audience: z.string(),
  price: z.number(),
  currency: z.literal('USD'),
  priceNote: z.string().optional(),
  duration: z.string().optional(),
  isFeatured: z.boolean(),
  featureGroups: z.array(
    z.object({
      heading: z.string(),
      items: z.array(z.string()),
    })
  ),
  ctaLabel: z.string(),
})

export type Package = z.infer<typeof PackageSchema>

/* ── Testimonial ──────────────────────────────────────── */
export const TestimonialSchema = z.object({
  id: z.string(),
  quote: z.string().min(80).max(420),
  name: z.string(),
  descriptor: z.string(),
  rating: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  avatar: z.string().optional(),
  bookTitle: z.string().optional(),
  bookCover: z.string().optional(),
  service: z.array(z.string()),
  featured: z.boolean(),
  isPlaceholder: z.boolean().optional(),
  video: z
    .object({
      poster: z.string(),
      youtubeId: z.string(),
    })
    .optional(),
})

export type Testimonial = z.infer<typeof TestimonialSchema>

/* ── Portfolio book ───────────────────────────────────── */
export const BookSchema = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string(),
  genre: z.enum(['fiction', 'non-fiction', 'memoir', 'childrens', 'poetry', 'business']),
  cover: z.string(),
  coverAlt: z.string(),
  year: z.number(),
  blurb: z.string().min(40).max(200),
  formats: z.array(z.enum(['ebook', 'paperback', 'hardcover', 'audiobook'])),
  retailers: z.array(z.object({ name: z.string(), url: z.string() })),
  featured: z.boolean(),
  isPlaceholder: z.boolean().optional(),
})

export type Book = z.infer<typeof BookSchema>

/* ── FAQ ──────────────────────────────────────────────── */
export const FAQSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
  scope: z.string(), // 'global' or a service slug
})

export type FAQ = z.infer<typeof FAQSchema>

/* ── Team member ──────────────────────────────────────── */
export const TeamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  photo: z.string(),
  links: z
    .object({
      linkedin: z.string().url().optional(),
      x: z.string().url().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
})

export type TeamMember = z.infer<typeof TeamMemberSchema>

/* ── Comparison row ───────────────────────────────────── */
export type ComparisonRow = {
  group: string
  label: string
  values: Record<string, boolean | string>
}
