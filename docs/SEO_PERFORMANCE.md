# SEO, Performance & Accessibility — Beacon Light Publishing

The blog is the acquisition channel. These requirements are not polish; they are the product.

---

## 1. Metadata

### 1.1 Root defaults

```ts
// src/app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Beacon Light Publishing — Publishing services for independent authors",
    template: "%s | Beacon Light Publishing",
  },
  description:
    "Editing, cover design, formatting, distribution, and marketing for independent authors. You keep every right and every royalty.",
  openGraph: {
    type: "website",
    siteName: "Beacon Light Publishing",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  alternates: { canonical: "/" },
}
```

### 1.2 Per-page rules

Every route exports `metadata` or `generateMetadata`. Build a `buildMetadata()` helper in
`lib/seo.ts` so no route assembles this by hand.

| Field | Rule |
|-------|------|
| `title` | ≤ 60 characters including the template suffix. Front-load the keyword. |
| `description` | 140–160 characters. Written for a human, not stuffed. |
| `alternates.canonical` | Always set, always absolute. Paginated pages canonicalise to themselves, not to page 1. |
| `openGraph.images` | 1200×630. Dynamic per post; static per marketing page. |
| `robots` | `noindex` on `/blog/page/[n]` for n > 1? **No** — index them, they carry links. |

### 1.3 Dynamic OG images

`app/blog/[slug]/opengraph-image.tsx` using `ImageResponse` at the edge:

- Background `ink` with the Beam rendered as a static radial glow
- Post title in Fraunces, `text-wrap: balance`, max 3 lines, auto-shrinking at >70 chars
- Category chip in amber, author name and reading time in Plex Mono
- Wordmark bottom-left
- `export const size = { width: 1200, height: 630 }` and `export const alt = post.title`

Fonts must be loaded as ArrayBuffers from `public/fonts/` for `ImageResponse` — `next/font`
is not available in that context.

---

## 2. Structured data (JSON-LD)

Injected via a `<script type="application/ld+json">` in a `<JsonLd>` server component.

| Page | Schema types |
|------|--------------|
| All pages | `Organization` + `WebSite` with `SearchAction` (in root layout) |
| `/` | `ProfessionalService` with `areaServed`, `priceRange` |
| `/services/[slug]` | `Service` with `provider`, `serviceType`, `offers` |
| `/packages` | `OfferCatalog` containing an `Offer` per package |
| `/blog/[slug]` | `BlogPosting` — `headline`, `description`, `image`, `datePublished`, `dateModified`, `author` (`Person`), `publisher`, `mainEntityOfPage`, `wordCount`, `keywords` |
| `/blog` | `Blog` with `blogPost` array |
| `/reviews` | `AggregateRating` on the Organization |
| Any page with an FAQ | `FAQPage` |
| All inner pages | `BreadcrumbList` |

**Rule:** only mark up what is actually visible on the page. An `AggregateRating` with no
visible reviews is a manual-action risk, not a rich-result win.

Validate every template against the Rich Results Test before shipping the phase.

---

## 3. Sitemap, robots, RSS

**`app/sitemap.ts`** — generated from the content layer, not hand-maintained:

| Section | `changeFrequency` | `priority` |
|---------|-------------------|------------|
| `/` | weekly | 1.0 |
| `/services/*`, `/packages` | monthly | 0.9 |
| `/blog` | daily | 0.9 |
| `/blog/[slug]` | monthly | 0.8 (0.9 if `featured`) |
| Category / tag archives | weekly | 0.6 |
| `/about`, `/portfolio`, `/reviews`, `/contact` | monthly | 0.7 |
| Legal | yearly | 0.3 |

`lastModified` uses `updatedAt ?? publishedAt` for posts.

**`app/robots.ts`** — allow everything except `/api/`, and point at the sitemap.

**`app/rss.xml/route.ts`** — RSS 2.0 with the 20 most recent posts, full excerpt (not full
body), `<atom:link rel="self">`, and correct `pubDate` formatting. Link it from `<head>` with
`<link rel="alternate" type="application/rss+xml">`.

---

## 4. Content SEO rules

- **One `<h1>` per page.** The article H1 is the post title, never the site name.
- **Heading hierarchy never skips.** h1 → h2 → h3.
- **Internal linking:** every blog post links to at least one service page and one other post.
  Enforce it in the content review, not in code.
- **Descriptive anchor text.** Never "click here" or "read more" as the only link text — the
  blog card's "Read more" is `aria-label`-ed with the post title.
- **Image alt text** describes the image, not the keyword. Decorative images get `alt=""`.
- **URLs are stable.** Once a post is published its slug never changes. If it must, add a
  permanent redirect in `next.config.ts`.
- **No date in blog URLs** — it makes evergreen posts look stale.
- **`dateModified`** updates when a post is materially revised, which signals freshness on
  evergreen content.

---

## 5. Performance budgets

Enforced by Lighthouse CI. A PR that breaks a budget does not merge.

| Metric | Budget | Measured on |
|--------|--------|-------------|
| LCP | < 2.0s | Mobile, Slow 4G, 4× CPU throttle |
| CLS | < 0.02 | Same |
| INP | < 150ms | Same |
| TTFB | < 400ms | Vercel edge |
| Total JS (initial, gzipped) | < 120KB on `/`, < 100KB on `/blog/[slug]` | Bundle analyzer |
| Total page weight | < 900KB on `/` | Network panel |
| Lighthouse Performance | ≥ 95 | `/`, `/blog`, `/blog/[slug]`, `/packages` |
| Lighthouse Accessibility | 100 | Same |
| Lighthouse Best Practices | ≥ 95 | Same |
| Lighthouse SEO | 100 | Same |

### 5.1 How the budgets are met

**LCP.** The hero H1 is the LCP element on `/` — it is text, server-rendered, with the font
preloaded, so it paints immediately. The Beam is `position: absolute` behind it and does not
block. On `/blog/[slug]` the LCP is the hero image: `priority`, AVIF, correct `sizes`, and a
blur placeholder.

**CLS.** Every image has explicit `width`/`height`. Fonts use `next/font` with a size-adjusted
fallback so the swap does not reflow. The header's scroll state changes `background` and
`transform` only. The submit button locks its width during the pending state. Nothing is
inserted above existing content after load.

**INP.** No long tasks during the hero sequence. Scroll and pointer handlers are
rAF-throttled. Blog search is debounced at 180ms and filters an array of ~50 objects, which is
instant. Heavy components (`ComparisonTable`, `BookLightbox`, `TestimonialCarousel`) are
`next/dynamic` and load on interaction or intersection.

**JS budget.** Server Components everywhere except the list in `COMPONENT_INVENTORY §3`.
`motion` lazy-loaded for the Passage and the carousel. Three of the most visible effects —
the Beam, the marquee, and the card spotlight — are pure CSS and cost zero JS.

### 5.2 Image pipeline

| Asset | Format | Dimensions | Loading |
|-------|--------|-----------|---------|
| Hero background | AVIF + WebP | 2400×1600 | `priority` |
| Blog cover (card) | AVIF + WebP | 800×450 | lazy, `sizes="(max-width:768px) 100vw, 33vw"` |
| Blog cover (hero) | AVIF + WebP | 1600×900 | `priority`, blur placeholder |
| Book cover | AVIF + WebP | 800×1200 | lazy, blur placeholder |
| Team photo | AVIF + WebP | 600×600 | lazy |
| Retailer logo | SVG | — | eager (tiny) |
| OG image | PNG via `ImageResponse` | 1200×630 | edge-generated |

`next.config.ts`: `images: { formats: ['image/avif', 'image/webp'] }`. All images are local —
no remote patterns, so nothing external can break or slow a page.

---

## 6. Accessibility

Target: **WCAG 2.2 AA**, verified with axe on `/`, `/blog`, `/blog/[slug]`, `/packages`, and
`/contact`.

### 6.1 Structural

- Skip link as the first focusable element, jumping to `#main`
- One `<main id="main">` per page
- `<nav aria-label="Primary">` and `<nav aria-label="Footer">`
- Sections use `<section aria-labelledby="...">` referencing their heading's `id`
- Lists are real `<ul>`/`<ol>`; card grids are lists where the cards are peers

### 6.2 Interactive

| Pattern | Requirement |
|---------|-------------|
| Mega-menu | `aria-expanded`, `aria-controls`, arrow-key navigation, Escape closes and restores focus |
| Mobile drawer | Focus trapped, `aria-modal="true"`, body scroll locked, Escape closes |
| Tabs | Radix roving tabindex, `aria-selected`, arrow keys |
| Accordion | `aria-expanded` on the trigger, `region` role on the panel |
| Carousel | Pause on hover and focus, arrow buttons with labels, `aria-live="polite"` on slide change |
| Lightbox | Focus trapped, Escape closes, focus returns to the cover that opened it |
| Forms | Every field labelled, errors in `aria-live="polite"`, linked with `aria-describedby`, `aria-invalid` on the field |
| Copy button | Announces "Copied" via a visually hidden `aria-live` region |

### 6.3 Visual

- Focus ring: 2px `beam` with a 2px offset in the surface colour. Visible on both `ink` and
  `fog`. Never removed.
- Contrast per the approved pairings table in `DESIGN_SYSTEM §2.3`. No improvised pairs.
- Touch targets ≥ 44×44px.
- Text resizes to 200% without loss of content or horizontal scroll.
- The site is fully usable at 320px width.
- No information conveyed by colour alone — the featured package has a ribbon *and* a border;
  form errors have an icon *and* text *and* colour.

### 6.4 Motion

Every animation has a `prefers-reduced-motion` path per `MOTION_SPEC §8`. Nothing flashes more
than three times per second. Auto-advancing content (the carousel, the marquee) pauses on
hover, on focus, and when the tab is hidden.

---

## 7. Analytics

- `@vercel/analytics` and `@vercel/speed-insights` in the root layout — both cookieless, so no
  consent banner is required under GDPR for these alone.
- Custom events: `lead_form_submit`, `newsletter_signup`, `schedule_call_click`,
  `package_quote_click`, `blog_post_read_75` (fires at 75% reading progress).
- No Google Analytics in v1 — it would require a consent banner, adding a layout-shift risk and
  a third-party script on first load, for data Vercel Analytics already covers.

---

## 8. Pre-launch checklist

- [ ] Every page has a unique title ≤ 60 chars and a description 140–160 chars
- [ ] Every page has a canonical URL
- [ ] `sitemap.xml` includes every published route and no drafts
- [ ] `robots.txt` allows crawling and points at the sitemap
- [ ] RSS validates against the W3C feed validator
- [ ] Every JSON-LD template passes the Rich Results Test
- [ ] OG images render correctly for the home page and three sample posts
- [ ] Lighthouse ≥ budget on all four categories, on mobile, for the five key routes
- [ ] axe reports zero violations on the five key routes
- [ ] Full keyboard pass: nav, drawer, forms, lightbox, carousel, TOC
- [ ] Screen-reader pass on the home page and one article (VoiceOver or NVDA)
- [ ] Tested at 320px, 375px, 768px, 1280px, 1920px
- [ ] Tested with reduced motion enabled — the site still looks designed
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] No `console.log` in production output
- [ ] Security headers present and verified
- [ ] 404 and 500 pages render correctly and are styled
- [ ] Forms deliver mail to the real inbox; the fallback path is tested by breaking the API key
- [ ] Google Search Console verified and the sitemap submitted
