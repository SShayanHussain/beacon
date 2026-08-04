# Architecture — Beacon Light Publishing

---

## 1. Shape of the system

This is a **statically generated marketing site with an MDX content layer** and two small
server endpoints for form handling. There is no database, no auth, and no runtime CMS in v1.

```
                       build time                          request time
  ┌──────────────┐                                    ┌────────────────────┐
  │ content/*.mdx│──┐                                 │  Visitor (browser) │
  └──────────────┘  │   ┌────────────────────┐        └─────────┬──────────┘
  ┌──────────────┐  ├──▶│  lib/content/*     │                  │
  │ data/*.ts    │──┘   │  read → Zod parse  │                  ▼
  └──────────────┘      │  → typed objects   │        ┌────────────────────┐
                        └─────────┬──────────┘        │  Vercel Edge CDN   │
                                  │                   │  (static HTML/RSC) │
                                  ▼                   └─────────┬──────────┘
                        ┌────────────────────┐                  │
                        │ Next.js SSG        │─────────────────▶│
                        │ generateStaticParams│                 │
                        └────────────────────┘                  │
                                                                ▼
                                                    ┌───────────────────────┐
                                                    │ POST /api/lead        │
                                                    │ Zod → rate limit →    │
                                                    │ Resend → 200          │
                                                    └───────────────────────┘
```

Everything the visitor sees is prerendered HTML. The only dynamic server work is the lead
form endpoint and the newsletter endpoint.

---

## 2. Stack and versions

| Concern | Choice | Version | ADR |
|---------|--------|---------|-----|
| Framework | Next.js, App Router | ^15 | ADR-001 |
| Language | TypeScript, strict | ^5.5 | — |
| UI | React | ^19 | — |
| Styling | Tailwind CSS | ^4 | ADR-003 |
| Headless primitives | Radix UI (Dialog, Tabs, Accordion, NavigationMenu, Popover) | latest | ADR-008 |
| Animation | `motion` | ^11 | ADR-004 |
| Content | MDX via `next-mdx-remote/rsc` + `gray-matter` | latest | ADR-002 |
| Schema validation | Zod | ^3 | — |
| Forms | React Hook Form + `@hookform/resolvers` | latest | — |
| Email | Resend | latest | ADR-009 |
| Scheduling | Cal.com embed | — | ADR-010 |
| Icons | `lucide-react` | latest | — |
| Class utils | `clsx` + `tailwind-merge` + `class-variance-authority` | latest | — |
| Hosting | Vercel | — | ADR-011 |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` | latest | — |

**No `contentlayer`** — it is effectively unmaintained and pins Next versions. See ADR-002.

---

## 3. Folder structure

```
beacon-light/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # root: fonts, <html>, providers, analytics
│   │   ├── globals.css                 # Tailwind v4 @theme tokens + base layer
│   │   ├── page.tsx                    # Home
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── opengraph-image.tsx         # default OG, ImageResponse
│   │   │
│   │   ├── (marketing)/                # shared header/footer, no URL segment
│   │   │   ├── layout.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── schedule/page.tsx
│   │   │   ├── packages/page.tsx
│   │   │   ├── portfolio/page.tsx
│   │   │   ├── reviews/page.tsx
│   │   │   └── services/
│   │   │       ├── page.tsx
│   │   │       └── [slug]/page.tsx
│   │   │
│   │   ├── (content)/                  # narrower container, article typography
│   │   │   ├── layout.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── page/[page]/page.tsx
│   │   │   │   ├── category/[category]/page.tsx
│   │   │   │   ├── tag/[tag]/page.tsx
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── opengraph-image.tsx
│   │   │   ├── authors/[slug]/page.tsx
│   │   │   └── legal/[slug]/page.tsx
│   │   │
│   │   ├── rss.xml/route.ts
│   │   └── api/
│   │       ├── lead/route.ts
│   │       └── newsletter/route.ts
│   │
│   ├── components/
│   │   ├── ui/                         # primitives: Button, Input, Chip, Card, Dialog…
│   │   │   └── index.ts                # the only barrel file
│   │   ├── layout/                     # Header, Nav, MegaMenu, MobileDrawer, Footer
│   │   ├── sections/                   # page sections: Hero, ThePassage, ServicesGrid…
│   │   ├── blog/                       # PostCard, PostGrid, TOC, ReadingProgress, Share
│   │   ├── mdx/                        # MDX component overrides + Callout, CodeBlock…
│   │   └── motion/                     # Beam, Reveal, Marquee, CountUp, Spotlight, Magnetic
│   │
│   ├── content/
│   │   ├── blog/*.mdx
│   │   ├── services/*.mdx
│   │   ├── authors/*.mdx
│   │   └── legal/*.mdx
│   │
│   ├── data/
│   │   ├── packages.ts
│   │   ├── portfolio.ts
│   │   ├── testimonials.ts
│   │   ├── team.ts
│   │   ├── faqs.ts
│   │   ├── retailers.ts
│   │   └── navigation.ts
│   │
│   ├── lib/
│   │   ├── content/
│   │   │   ├── posts.ts                # getAllPosts, getPostBySlug, getRelated…
│   │   │   ├── services.ts
│   │   │   ├── authors.ts
│   │   │   └── mdx.ts                  # shared compile config
│   │   ├── schemas.ts                  # Zod: frontmatter, lead form, newsletter
│   │   ├── env.ts                      # Zod-validated process.env
│   │   ├── seo.ts                      # buildMetadata(), JSON-LD builders
│   │   ├── fonts.ts                    # next/font declarations
│   │   ├── rate-limit.ts
│   │   └── utils.ts                    # cn(), formatDate(), slugify()
│   │
│   ├── hooks/
│   │   ├── use-reduced-motion.ts
│   │   ├── use-scroll-direction.ts
│   │   ├── use-active-heading.ts
│   │   └── use-media-query.ts
│   │
│   └── types/
│       └── index.ts
│
├── public/
│   ├── images/{covers,team,services,blog,og}/
│   ├── logos/retailers/
│   └── fonts/                          # only if self-hosting a non-Google face
│
├── docs/                               # this specification
├── .env.example
├── next.config.ts
├── tailwind.config.ts                  # minimal — tokens live in globals.css
└── tsconfig.json
```

### 3.1 Route groups

`(marketing)` and `(content)` exist to give the blog a different container width and
typography scale without duplicating the header/footer. Both layouts render the same
`<Header>` and `<Footer>`; they differ only in the `<main>` wrapper.

---

## 4. Rendering strategy

| Route | Strategy | Reason |
|-------|----------|--------|
| `/`, `/about`, `/services/*`, `/packages`, `/portfolio`, `/reviews` | **SSG** | Content changes only on deploy |
| `/blog`, `/blog/[slug]`, archives | **SSG** with `generateStaticParams` | Same |
| `/contact`, `/schedule` | **SSG** shell + client form | Form is interactive, page is static |
| `/api/lead`, `/api/newsletter` | **Node runtime, dynamic** | Needs the Resend SDK and rate limiting |
| `/sitemap.xml`, `/rss.xml`, `/robots.txt` | **SSG** | Regenerated per deploy |
| OG images | **Edge, `ImageResponse`** | Generated once, cached at the edge |

Set `export const dynamic = 'force-static'` on content routes to make the intent explicit and
catch accidental dynamic APIs at build time.

---

## 5. Content pipeline

```
content/blog/post.mdx
   │
   ├─ gray-matter ──▶ { data: frontmatter, content: body }
   │                       │
   │                       └──▶ PostFrontmatterSchema.parse()  ← Zod, throws on bad data
   │
   └─ compileMDX({ source, components, options })
          ├─ remarkGfm            tables, strikethrough, task lists
          ├─ remarkReadingTime    injects readingTime into frontmatter
          ├─ rehypeSlug           id on every heading
          ├─ rehypeAutolinkHeadings  anchor links
          └─ rehypePrettyCode     syntax highlighting, theme: github-dark-dimmed
```

Key rules:

- **Frontmatter is parsed, not trusted.** A malformed post fails the build with a readable
  error naming the file and the field. This is intentional — a broken post should never reach
  production.
- `lib/content/posts.ts` reads the directory once and memoizes with React `cache()` so a
  single build pass does not re-read the filesystem per page.
- Posts with `draft: true` are excluded in production and included in development.
- Reading time is computed at build time, never at render.
- The TOC is extracted by walking the compiled AST for `h2`/`h3` nodes — not by regex over
  the raw markdown.

---

## 6. Data flow for forms

```
<LeadForm> (client)
   │  react-hook-form + zodResolver(LeadSchema)
   ▼
POST /api/lead
   │  1. LeadSchema.parse(body)        → 400 on failure
   │  2. honeypot check                → 200 silently, do not send
   │  3. rateLimit(ip, 5/hour)         → 429 on exceed
   │  4. resend.emails.send(...)       → 502 on failure
   ▼
{ ok: true }  →  client swaps form for confirmation panel
```

Rate limiting in v1 uses an in-memory `Map` with a sliding window. This resets on cold start,
which is acceptable for the expected volume. If spam becomes a problem, swap to Upstash Redis
— the interface in `lib/rate-limit.ts` is written so only that file changes.

---

## 7. Performance architecture

- **Server Components carry the payload.** Only `motion/`, form, carousel, filter, and menu
  components are client components. Target: initial JS < 120KB gzipped on `/`.
- **`motion` is imported lazily** on heavy sections via `dynamic(() => import(...), { ssr:
  false })` where the animation is purely decorative and below the fold.
- **Fonts** via `next/font/google` with `display: 'swap'`, subset `latin`, and only the weights
  actually used. Variable fonts where available, so one file covers the whole weight range.
- **Images** are local, converted to AVIF+WebP, sized with explicit `width`/`height`, and
  given `sizes` matching their grid. Only the hero image and the article hero use `priority`.
- **Book covers** use `placeholder="blur"` with a generated `blurDataURL`.
- **No third-party scripts on first load.** Cal.com and video embeds use click-to-load facades.
- **`next/dynamic` for the lightbox, the carousel, and the comparison table** — all below the
  fold or behind interaction.

---

## 8. State management

There is no global state library and none is needed.

| State | Where it lives |
|-------|----------------|
| Mobile drawer open | `useState` in `<Header>` |
| Mega-menu open | Radix `NavigationMenu` internal |
| Blog search query | `useState` in `<BlogIndex>` |
| Active blog category | URL search param, read with `useSearchParams` |
| Packages active tab | URL search param |
| Portfolio filter | URL search param |
| Form state | React Hook Form |
| Reading progress | `useScroll` from `motion` |

Filter and tab state goes in the URL so it survives refresh, is shareable, and stays
crawlable.

---

## 9. Error handling

| Failure | Behaviour |
|---------|-----------|
| MDX frontmatter invalid | **Build fails** with file + field name |
| Post slug not found | `notFound()` → custom 404 |
| Lead API down | Form shows an inline error with the phone number as a fallback |
| Cal.com embed blocked | Fallback panel with direct link |
| Image missing | Build fails (`next/image` on a missing local path errors at build) |
| Runtime render error | `error.tsx` boundary, retry button, error reported to Vercel |

---

## 10. Security

- Zod validation on both sides of every form. Server-side is authoritative.
- Honeypot + rate limiting on all public endpoints.
- CSP headers via `next.config.ts` `headers()`: `default-src 'self'`, with explicit
  allowances for Vercel Analytics and the Cal.com embed frame.
- `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying
  camera/microphone/geolocation.
- No secrets in `NEXT_PUBLIC_*` variables. `RESEND_API_KEY` is server-only.
- All external links carry `rel="noopener noreferrer"`.

---

## 11. Testing

Lightweight and targeted — this is a marketing site, not a bank.

| Layer | Tool | What it covers |
|-------|------|----------------|
| Type safety | `tsc --noEmit` | Everything, in CI |
| Content integrity | Zod parse in a `scripts/validate-content.ts` | Every MDX file, run in CI |
| Unit | Vitest | `lib/` pure functions: slugify, related-posts, reading time, date format |
| Component | Vitest + Testing Library | `<LeadForm>` validation, `<TOC>` active state, nav keyboard behaviour |
| E2E | Playwright | 4 critical paths: nav opens/closes, blog post loads with TOC, lead form submits, mobile drawer traps focus |
| a11y | `@axe-core/playwright` | Run against `/`, `/blog`, `/blog/[slug]`, `/contact` |
| Perf | Lighthouse CI | Budget assertions in CI, blocks merge below 95 |

---

## 12. CI/CD

```yaml
on: [pull_request, push to main]
jobs:
  verify:
    - npm ci
    - npm run typecheck        # tsc --noEmit
    - npm run lint
    - npm run validate:content # Zod over all MDX
    - npm run test
    - npm run build
    - npx lhci autorun         # Lighthouse budgets
```

Vercel handles preview deployments per PR and production on merge to `main`. Every PR gets a
preview URL; run the Lighthouse check against that URL, not against localhost.
