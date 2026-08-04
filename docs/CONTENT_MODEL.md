# Content Model — Beacon Light Publishing

Everything the site renders comes from `src/content/` (MDX) or `src/data/` (typed TS).
Nothing is hardcoded in components. Every shape here has a Zod schema in `src/lib/schemas.ts`
and a matching type in `src/types/index.ts`.

---

## 1. Blog post

**Location:** `src/content/blog/{slug}.mdx`
**Slug:** derived from the filename. Filenames are kebab-case, lowercase, no dates.

### 1.1 Frontmatter

```yaml
---
title: "Why Self-Publishing Isn't Free — And How to Spend Wisely"
deck: "The upload is free. Everything that makes a book sell is not."
excerpt: "A line-by-line look at what independent authors actually spend, where the money earns its keep, and which costs you can defer without hurting the book."
publishedAt: "2026-03-14"
updatedAt: "2026-05-02"        # optional
author: "hiba"                  # must match a file in content/authors/
category: "author-business"     # must be one of the six below
tags: ["budgeting", "self-publishing", "first-time-authors"]
cover: "/images/blog/self-publishing-costs.jpg"
coverAlt: "A desk with a manuscript, a calculator, and a mug"
featured: false
draft: false
seo:                            # optional; falls back to title/excerpt
  title: "What Self-Publishing Actually Costs in 2026"
  description: "A realistic budget breakdown for independent authors."
relatedService: "book-publishing"   # optional; drives the mid-article CTA
---
```

### 1.2 Schema

```ts
export const CATEGORIES = [
  "writing-craft",
  "publishing",
  "editing",
  "marketing",
  "audiobooks",
  "author-business",
] as const

export const PostFrontmatterSchema = z.object({
  title: z.string().min(10).max(90),
  deck: z.string().min(20).max(180),
  excerpt: z.string().min(50).max(220),
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  author: z.string(),
  category: z.enum(CATEGORIES),
  tags: z.array(z.string()).min(1).max(6),
  cover: z.string().startsWith("/images/blog/"),
  coverAlt: z.string().min(10),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  seo: z.object({
    title: z.string().max(60).optional(),
    description: z.string().max(160).optional(),
  }).optional(),
  relatedService: z.string().optional(),
})
```

Length constraints are load-bearing: `title` over 90 chars gets truncated in search results,
`excerpt` over 220 breaks the two-line clamp on cards. Let the build fail on these.

### 1.3 Derived fields

Computed in `lib/content/posts.ts`, never stored in frontmatter:

| Field | How |
|-------|-----|
| `slug` | filename minus `.mdx` |
| `readingTime` | `reading-time` package over the raw body, rounded up |
| `wordCount` | same source |
| `headings` | walked from the compiled AST — `{ id, text, level }[]` for h2/h3 |
| `url` | `/blog/${slug}` |

### 1.4 Category display names

| Key | Display | Description (used on archive pages) |
|-----|---------|-------------------------------------|
| `writing-craft` | Writing Craft | Structure, voice, revision, and getting unstuck |
| `publishing` | Publishing | ISBNs, distribution, formats, and retail |
| `editing` | Editing | What each editing pass actually does |
| `marketing` | Marketing | Launches, reviews, ads, and long-tail visibility |
| `audiobooks` | Audiobooks | Narration, production, and ACX |
| `author-business` | Author Business | Money, rights, contracts, and running the shop |

---

## 2. Author

**Location:** `src/content/authors/{slug}.mdx`

```yaml
---
name: "Hiba"
role: "Founder & Publishing Lead"
avatar: "/images/team/hiba.jpg"
bio: "Two sentences, first person, specific. What she does and why she started this."
links:
  linkedin: "https://linkedin.com/in/..."
  x: "https://x.com/..."
  email: "hiba@beaconlightpublishing.com"
---
```

The MDX body is the long bio shown on `/authors/[slug]`.

---

## 3. MDX component set

These components are available inside any `.mdx` file without importing them. Defined in
`src/components/mdx/index.tsx` and passed to `compileMDX`.

| Component | Usage | Renders |
|-----------|-------|---------|
| `<Callout type="info\|tip\|warning\|note">` | Highlighted aside | Left amber border, icon, `tide/6` background on light |
| `<Figure src alt caption />` | Image with credit | `next/image` + mono caption below |
| `<Quote author role>` | Pull quote | Fraunces italic, `text-2xl`, amber quote mark |
| `<Steps>` / `<Step title>` | Numbered procedure | Mono numerals in amber circles, connecting rule |
| `<Compare left right />` | Two-column comparison | Side by side on desktop, stacked on mobile |
| `<CTACard service title body />` | Inline conversion | Amber-bordered card with a Book a Call button |
| `<Checklist items={[]} />` | Deliverables list | Amber check icons, two columns ≥768px |
| `<Stat value label />` | Inline number | Mono, `tabular-nums`, amber value |
| `<YouTube id title />` | Video | Click-to-load facade, no third-party JS until clicked |

**Default HTML overrides:**

| Tag | Treatment |
|-----|-----------|
| `h2` | Fraunces, `text-2xl`, `mt-16 mb-4`, anchor link on hover |
| `h3` | Fraunces, `text-lg`, `mt-10 mb-3` |
| `p` | Newsreader 19px/1.72, `mb-6`, `text-wrap: pretty` |
| `a` | `ink` with amber underline, external links get an icon + `rel="noopener noreferrer"` |
| `ul` / `ol` | Custom markers — amber square for `ul`, mono numerals for `ol` |
| `blockquote` | Amber left rule 3px, italic Newsreader, `pl-6` |
| `pre` / `code` | `rehype-pretty-code`, `github-dark-dimmed`, copy button, language chip |
| `table` | Horizontally scrollable wrapper, sticky header, zebra rows in `ink/3` |
| `hr` | Not a line — three centred amber dots, 8px apart |
| `img` | Always routed through `<Figure>` |

---

## 4. Packages

**Location:** `src/data/packages.ts` — this is the file Hiba edits to change pricing.

```ts
export type PackageCategory =
  | "publishing" | "editing" | "ghostwriting" | "marketing" | "childrens"

export type Package = {
  id: string
  category: PackageCategory
  tier: string                  // "Standard Publication"
  audience: string              // "For first-time authors publishing on one retailer"
  price: number                 // 700
  currency: "USD"
  priceNote?: string            // "starting at" | "per project"
  duration?: string             // "3 months" — marketing packages only
  isFeatured: boolean           // exactly one true per category
  featureGroups: {
    heading: string             // "Manuscript Preparation & Editorial"
    items: string[]
  }[]
  ctaLabel: string              // "Get a quote"
}
```

### 4.1 Placeholder tiers to ship with

Prices are placeholders and clearly marked as such in a code comment. Hiba replaces them
before launch.

| Category | Tiers |
|----------|-------|
| Publishing | Standard $700 · **Elite $2,200** · Global $3,800 |
| Editing | Standard $1,499 · **Professional $2,499** · Premium $3,999 |
| Ghostwriting | Standard $2,999 · **Professional $4,499** · Premium $6,499 |
| Marketing | Foundation $3,550 / 3mo · **Growth $5,550 / 6mo** · Authority $9,550 / 12mo |
| Children's | Wonder $1,950 · **Dreamers $3,450** · Bright Minds $5,950 |

Bold = `isFeatured: true`.

### 4.2 Comparison table

```ts
export type ComparisonRow = {
  group: string                 // "Preparing your manuscript"
  label: string                 // "Revisions per draft"
  values: Record<string, boolean | string>   // { "std": "2", "elite": "3", "global": "5" }
}
```

`group` rows render as a spanning subheading. `boolean` values render as ✓/✗ icons; `string`
values render as mono text.

---

## 5. Portfolio

**Location:** `src/data/portfolio.ts`

```ts
export type Book = {
  id: string
  title: string
  author: string
  genre: "fiction" | "non-fiction" | "memoir" | "childrens" | "poetry" | "business"
  cover: string                 // /images/covers/{slug}.jpg — 3:4.5, ≥800px wide
  coverAlt: string
  year: number
  blurb: string                 // 40–200 chars, shown in the lightbox
  formats: ("ebook" | "paperback" | "hardcover" | "audiobook")[]
  retailers: { name: string; url: string }[]
  featured: boolean             // shown in the Home preview
}
```

**Rights note:** only include covers Beacon Light actually produced and has permission to
display. Do not populate with stock or third-party covers, even as placeholders — build with
6–8 simple generated placeholder covers in the brand palette instead, clearly labelled in the
data file as `PLACEHOLDER — replace before launch`.

---

## 6. Testimonials

**Location:** `src/data/testimonials.ts`

```ts
export type Testimonial = {
  id: string
  quote: string                 // 80–420 chars
  name: string
  descriptor: string            // "Historical fiction author" | "First-time novelist"
  rating: 1 | 2 | 3 | 4 | 5
  avatar?: string
  bookTitle?: string
  bookCover?: string
  service: ServiceSlug[]        // which service pages this appears on
  featured: boolean             // Home carousel
  video?: { poster: string; youtubeId: string }
}
```

Only real testimonials ship to production. During the build, use clearly fictional ones with a
`isPlaceholder: true` flag and a build-time warning if any remain when
`NODE_ENV === "production"`.

---

## 7. Services

**Location:** `src/content/services/{slug}.mdx`

```yaml
---
slug: "book-publishing"
title: "Book Publishing"
eyebrow: "Manuscript to shelf"
headline: "We take it from finished draft to available worldwide."
sub: "One team, one timeline, and you keep every right and every royalty."
icon: "lighthouse"
order: 1
heroImage: "/images/services/publishing-hero.jpg"
stats:
  - { value: 20000, suffix: "+", label: "Books published" }
  - { value: 40,    suffix: "k",  label: "Authors served" }
  - { value: 40000, suffix: "+", label: "Retail channels" }
pillars:
  - title: "Manuscript quality"
    body: "Two sentences on what this actually means in practice."
    image: "/images/services/pillar-manuscript.jpg"
process:
  - { title: "Manuscript submission", body: "..." }
  - { title: "Editing & proofreading", body: "..." }
deliverables:
  - "Print-ready interior PDF"
  - "Cover files for print and ebook"
  - "Registered ISBN and barcode"
relatedPackages: ["publishing"]
faqs:
  - { q: "How long does publishing take?", a: "..." }
seo:
  title: "Book Publishing Services | Beacon Light Publishing"
  description: "..."
---
```

The MDX body renders as the long-form section between "What's included" and "Process".

---

## 8. Shared data files

| File | Shape | Notes |
|------|-------|-------|
| `data/navigation.ts` | `NavItem[]` with nested `children` | Single source for header, footer, mobile drawer, and sitemap |
| `data/retailers.ts` | `{ name, logo, url, invertOnDark }[]` | Marquee + packages logo strip |
| `data/faqs.ts` | `{ id, question, answer, scope }[]` | `scope` = `global` or a service slug |
| `data/team.ts` | `{ name, role, bio, photo, links }[]` | About page |
| `data/site.ts` | Name, tagline, email, phone, addresses, socials, disclaimer | Every layout reads from here |

---

## 9. Content validation

`scripts/validate-content.ts` runs in CI and as a pre-build step. It:

1. Parses every MDX file's frontmatter against its schema
2. Verifies every `author` resolves to a file in `content/authors/`
3. Verifies every `cover` and `image` path exists on disk
4. Verifies every `relatedService` resolves to a service slug
5. Verifies exactly one `isFeatured` package per category
6. Warns if any `isPlaceholder` content remains in a production build
7. Warns on duplicate slugs, duplicate titles, and empty tags

Failures print `file:field — message` and exit 1. A broken post fails the build rather than
rendering a broken page.

---

## 10. Adding a new blog post — the workflow

```bash
# 1. Create the file
touch src/content/blog/how-to-choose-an-editor.mdx

# 2. Paste the frontmatter template from §1.1, fill it in
# 3. Add the cover image to public/images/blog/ (1600×900, AVIF or JPG)
# 4. Write the body in MDX
# 5. Validate
npm run validate:content

# 6. Preview
npm run dev   # drafts are visible in dev, excluded from production builds
```

No CMS login, no database migration, no rebuild pipeline to learn. Write a file, commit, and
Vercel deploys it.
