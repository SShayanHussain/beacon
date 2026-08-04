# Component Inventory — Beacon Light Publishing

Every component to be built, with its props and where it appears. `C` = client component
(`"use client"`), `S` = server component. **Default to `S`.**

---

## 1. `components/ui/` — primitives

| Component | Type | Key props | Notes |
|-----------|------|-----------|-------|
| `Button` | S | `variant: primary\|secondary\|ghost\|onLight`, `size: sm\|md\|lg`, `href?`, `magnetic?` | Renders `<Link>` when `href` given, else `<button>`. `magnetic` wraps in the client `Magnetic` component. |
| `Container` | S | `size: wide\|default\|prose` | Only three widths exist. |
| `Section` | S | `surface: dark\|light`, `id`, `aria-labelledby` | Sets `data-surface`, applies `py-section`, renders the hairline divider. |
| `SectionHeader` | S | `eyebrow`, `title`, `sub?`, `align?` | The three-part header from `DESIGN_SYSTEM §5.5`. |
| `Card` | S | `surface`, `interactive?`, `as?` | Base card. `interactive` adds hover lift + top hairline. |
| `Chip` | S | `variant: default\|active`, `as?`, `href?` | Categories, tags, filters. |
| `Input` / `Textarea` / `Select` | C | `label`, `error?`, `hint?`, RHF-compatible ref forwarding | Always has a visible `<label>`. |
| `Checkbox` | C | `label`, `error?` | Consent checkbox on forms. |
| `Accordion` | C | `items: {id,q,a}[]`, `allowMultiple?` | Radix Accordion + height animation. |
| `Tabs` | C | `tabs`, `value`, `onChange`, `syncToUrl?` | Radix Tabs; `syncToUrl` writes a search param. |
| `Dialog` | C | `open`, `onOpenChange`, `title` | Radix Dialog; focus trap, Escape, scroll lock. |
| `Rating` | S | `value: 1-5`, `size?` | Amber stars, `aria-label="4 out of 5"`. |
| `Avatar` | S | `src`, `alt`, `size` | Uses `--radius-lens` frame. |
| `Icon` | S | `name`, `size` | Wraps lucide + custom nautical SVGs. |
| `Skeleton` | S | `variant: card\|text\|image` | Shimmer via a CSS gradient, not JS. |
| `Prose` | S | `children` | The `.prose` wrapper for MDX and legal pages. |

---

## 2. `components/layout/`

| Component | Type | Props | Notes |
|-----------|------|-------|-------|
| `Header` | C | `variant: transparent\|solid` | Scroll direction, background swap, holds nav state. |
| `DesktopNav` | C | `items` | Radix NavigationMenu; opens the mega-menu. |
| `MegaMenu` | C | `services` | Two-column panel, keyboard navigable. |
| `MobileDrawer` | C | `open`, `onClose`, `items` | Full-screen, focus-trapped, scroll-locked. |
| `Footer` | S | — | Four columns + newsletter + legal disclaimer + copyright. |
| `Logo` | S | `variant: light\|dark`, `size` | SVG lamp glyph + wordmark. |
| `SkipLink` | S | — | First focusable element on the page, jumps to `#main`. |

---

## 3. `components/motion/`

All client components. Each must implement its reduced-motion path.

| Component | Props | Used by |
|-----------|-------|---------|
| `Beam` | `intensity?`, `speed?` | Hero only |
| `Reveal` | `delay?`, `y?`, `as?` | Every section |
| `Stagger` | `delay?`, `stagger?` | Card grids |
| `Magnetic` | `strength?`, `max?` | Primary CTAs (2 places) |
| `CountUp` | `value`, `suffix?`, `duration?` | Stat bands |
| `Marquee` | `speed?`, `pauseOnHover?` | Retailer logos |
| `Spotlight` | `radius?` | Blog grid container |
| `ScrollRail` | `targetRef` | Article pages |
| `HorizontalScroll` | `panels` | The Passage (Home) |
| `TiltCard` | `maxTilt?` | Portfolio preview covers |

---

## 4. `components/sections/`

Home page, in order:

| Component | Type | Data source |
|-----------|------|-------------|
| `Hero` | C | `data/site.ts` |
| `TrustBar` | C | `data/retailers.ts` |
| `ProofCounters` | C | `data/site.ts` |
| `ThePassage` | C | `data/process.ts` |
| `ServicesGrid` | S | `lib/content/services.ts` |
| `RightsPromise` | S | `data/site.ts` |
| `PortfolioPreview` | C | `data/portfolio.ts` (featured) |
| `TestimonialCarousel` | C | `data/testimonials.ts` (featured) |
| `LatestPosts` | S (grid) + C (spotlight) | `lib/content/posts.ts` |
| `NewsletterBand` | C | — |
| `FinalCTA` | S | `data/site.ts` |

Shared across pages:

| Component | Type | Used on |
|-----------|------|---------|
| `PageHero` | S | Every non-home page |
| `FeatureRow` | S | `/services`, `/about` |
| `StatBand` | C | Service pages, `/about`, `/portfolio` |
| `FAQSection` | C | Most pages |
| `PillarTabs` | C | Service detail pages |
| `ProcessSteps` | S | Service detail pages |
| `PackageCard` | S | `/packages`, service pages |
| `ComparisonTable` | C | `/packages` |
| `GuaranteeStrip` | S | `/packages` |
| `TeamGrid` | S | `/about` |
| `Timeline` | S | `/about` |
| `BookGrid` | C | `/portfolio` |
| `BookLightbox` | C | `/portfolio` |
| `TestimonialMasonry` | S | `/reviews` |
| `VideoTestimonials` | C | `/reviews` |
| `ContactDetails` | S | `/contact` |
| `SchedulerEmbed` | C | `/schedule` |

---

## 5. `components/blog/`

| Component | Type | Props | Notes |
|-----------|------|-------|-------|
| `PostCard` | S | `post`, `variant: default\|featured\|compact` | Card markup only; the spotlight lives on the parent grid. |
| `PostGrid` | C | `posts` | Owns the pointer listener that drives `--mx`/`--my`. |
| `FeaturedPost` | S | `post` | Wide two-column card. |
| `CategoryRail` | C | `active`, `categories` | Pills; writes to the URL. |
| `BlogSearch` | C | `posts`, `onFilter` | Client-side filter over title/excerpt/tags. Debounced 180ms. |
| `Pagination` | S | `current`, `total`, `basePath` | Real links — must be crawlable. |
| `ArticleHeader` | S | `post`, `author` | Chip, H1, deck, author row, share. |
| `TableOfContents` | C | `headings` | Sticky, active-heading observer, `layoutId` marker. |
| `MobileTOC` | C | `headings` | Bottom sheet triggered by a floating button. |
| `ReadingProgress` | C | `targetRef` | Wraps `ScrollRail`. |
| `ShareRow` | C | `url`, `title` | X, LinkedIn, Facebook, copy link with confirm state. |
| `AuthorCard` | S | `author` | Below the article body. |
| `RelatedPosts` | S | `posts` | Three cards, matched by category then tags. |
| `PrevNextNav` | S | `prev?`, `next?` | Bottom of the article. |
| `MidArticleCTA` | S | `service` | Auto-injected after the 3rd h2. |

---

## 6. `components/forms/`

| Component | Type | Notes |
|-----------|------|-------|
| `LeadForm` | C | `variant: full\|compact\|inline`. RHF + Zod. Honeypot. Pending/success/error states. |
| `NewsletterForm` | C | Email only. Inline result, no redirect. |
| `FormField` | C | Label + control + error + hint, wired with `aria-describedby`. |
| `SubmitButton` | C | Width-locked during pending to prevent layout shift. |

---

## 7. Build order within a phase

When building any new page, work outward from the primitives:

1. Add any missing token to `globals.css`
2. Build/extend the `ui/` primitives the page needs
3. Build the page's `sections/` components with real content from `content/` or `data/`
4. Assemble the page route and add `generateMetadata`
5. Add the JSON-LD block
6. Run the design review checklist (`DESIGN_SYSTEM §10`) and the motion QA checklist
   (`MOTION_SPEC §9`)

Never build a page top-to-bottom in one file and refactor later. It produces duplicated
styling that then has to be reconciled.
