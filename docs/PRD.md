# Product Requirements — Beacon Light Publishing

**Version:** 1.0
**Status:** Approved for build
**Owner:** Hiba

---

## 1. Problem and positioning

Independent and first-time authors finish a manuscript and then hit a wall. Publishing
requires editing, cover design, interior formatting, ISBN and copyright registration,
distribution setup across a dozen retailers, and marketing — none of which they are trained
to do. The existing options are either predatory vanity presses that take rights and
royalties, or a scattered mess of freelancers the author has to project-manage themselves.

**Beacon Light Publishing** is a work-for-hire publishing services company. We do the work;
the author keeps everything — copyright, rights, 100% of royalties.

The website must communicate three things above the fold, in this order:
1. We take you from manuscript to published book.
2. You keep your rights and your royalties.
3. Here is proof — books we've published, authors who'll say so.

### 1.1 Audiences

| Segment | Who | What they need from the site |
|---------|-----|------------------------------|
| **Primary — The Anxious First-Timer** | Finished a first manuscript, never published, afraid of being scammed | Reassurance, clear process, transparent pricing, real testimonials |
| **Secondary — The Indie Veteran** | Has 2+ self-published titles, wants to level up production quality | Specific service depth, distribution reach, portfolio quality |
| **Tertiary — The Researcher** | Not ready to buy; searching "how much does self-publishing cost" | Genuinely useful blog content that earns the eventual visit |

The blog exists for segment 3 and converts them into segments 1 and 2 over time.

### 1.2 Success metrics

| Metric | Target at 90 days |
|--------|-------------------|
| Lead form submissions | ≥ 25/month |
| Call bookings via `/schedule` | ≥ 10/month |
| Blog organic sessions | ≥ 1,500/month |
| Blog → contact conversion | ≥ 1.5% |
| Lighthouse mobile (all four categories) | ≥ 95 |
| Bounce rate on `/` | < 55% |

---

## 2. Information architecture

```
/                                  Home
/about                             About — story, values, team, disclaimer
/services                          Services overview (hub)
  /services/book-publishing        Full publishing service
  /services/book-writing           Ghostwriting
  /services/book-editing           Developmental / line / copy editing
  /services/book-marketing         Launch + ongoing marketing
  /services/audiobooks             Audiobook production + ACX distribution
  /services/cover-design           Cover art and interior design
/packages                          Pricing — tabbed by category, comparison tables, FAQ
/portfolio                         Published books grid, filter by genre
/reviews                           Testimonials + aggregate rating
/blog                              Blog index, paginated
  /blog/[slug]                     Article
  /blog/category/[category]        Category archive
  /blog/tag/[tag]                  Tag archive
  /blog/page/[n]                   Pagination
/authors/[slug]                    Blog author profile + their posts
/contact                           Contact form + details
/schedule                          Book a call (embedded scheduler)
/privacy-policy
/terms-and-conditions
/refund-policy
```

Machine routes: `/sitemap.xml`, `/robots.txt`, `/rss.xml`, `/opengraph-image` (dynamic),
`/blog/[slug]/opengraph-image` (dynamic per post).

### 2.1 Navigation

**Primary nav (desktop):** Home · Services ▾ · Packages · Portfolio · Blog · About · Contact
Plus a persistent amber CTA button: **Book a Call**.
Plus a phone link, mono type, small: `Call +XX XXX XXXXXXX`.

**Services ▾** opens a mega-menu: a two-column panel, each service as a row with icon, name,
and one-line description. Panel background is `--tide` with a hairline `--beam/20` top border.

**Header behaviour:** transparent over the hero on `/`; on scroll past 80px it acquires a
`--ink/80` background with `backdrop-blur-md` and a hairline bottom border. On all other
pages it starts solid. It hides on scroll-down past 400px and reappears on scroll-up.

**Mobile:** hamburger opens a full-screen drawer from the right. Services expands as an
accordion. CTA button pinned to the bottom of the drawer. Focus trapped; body scroll locked.

**Footer:** four columns — Brand + disclaimer + socials · Services · Company · Contact +
addresses. Below: newsletter signup, then copyright bar. The legal disclaimer from
`README.md §7` is mandatory here.

---

## 3. Page specifications

Each section below is a required section, in order, top to bottom. `[M]` marks a section with
a signature motion treatment — cross-reference `MOTION_SPEC.md`.

### 3.1 Home (`/`)

| # | Section | Content | Notes |
|---|---------|---------|-------|
| 1 | **Hero** `[M]` | Eyebrow: `EST. 2024 — WORK-FOR-HIRE PUBLISHING` (mono). H1: *Every manuscript deserves a light to steer by.* Sub: one sentence on what we do. Two CTAs: **Book a Call** (amber, solid) and **See our work** (ghost). | Full-viewport-minus-header. The Beam rotates behind the type. Hero lines reveal with a clip-path mask, staggered 80ms. |
| 2 | **Trust bar** | Retailer logos: Amazon KDP, Barnes & Noble, Apple Books, Kobo, IngramSpark, Google Books, Smashwords, Draft2Digital, ACX. | Infinite marquee, pauses on hover, grayscale → colour on hover. Duplicated track for seamless loop. |
| 3 | **Proof counters** | 4 stats: Books published · Authors served · Countries distributed · Avg. rating. | Count-up on first intersection, once. Mono numerals, tabular-nums. |
| 4 | **The Passage** `[M]` | The 6-step process as a horizontal scroll-linked sequence: Manuscript → Editorial → Design → Registration → Distribution → Launch. | Numbering is legitimate here (real sequence). Sticky section, horizontal translate driven by vertical scroll. Falls back to a vertical stepper on mobile and under reduced motion. |
| 5 | **Services grid** | 6 service cards, each: icon, title, 2-line description, "Learn more" link. | Card lifts 4px on hover, amber hairline appears on the top edge. |
| 6 | **Rights promise** | Full-bleed dark band. Large statement: *You keep the copyright. You keep the royalties. All of them.* Supporting paragraph + link to Terms. | The single most important differentiator. Give it a full section. |
| 7 | **Portfolio preview** | 8 book covers in a staggered two-row grid. Link: "See all published titles". | Covers tilt slightly toward the cursor (max 6deg). Reduced motion: static. |
| 8 | **Testimonial carousel** | 5 testimonials: quote, name, genre, star rating. | Auto-advance 7s, pause on hover/focus, dot + arrow controls, swipeable. |
| 9 | **Latest from the blog** `[M]` | 3 most recent posts as cards: cover image, category chip, title, excerpt, date + reading time (mono). | Cursor spotlight — a radial amber mask follows the pointer across the card row. |
| 10 | **Newsletter** | "The Lamp Room" — monthly letter for authors. Email input + submit. | Inline success/error, no page reload. |
| 11 | **Final CTA** | Dark band, large heading, Book a Call button, phone number. | |

### 3.2 Services hub (`/services`)

1. Page hero: eyebrow, H1 "Services", one-paragraph intro.
2. Alternating feature rows — one per service. Odd rows image-left, even rows image-right.
   Each: eyebrow (mono), H2, 2-paragraph description, 4-item bullet list of what's included,
   "Explore {service}" link.
3. "Not sure where to start?" band → links to `/packages` and `/schedule`.
4. FAQ accordion (6 questions shared across services).
5. Final CTA.

### 3.3 Service detail (`/services/[slug]`)

A single template driven by MDX. Sections:

1. **Hero** — eyebrow, H1, sub, primary CTA, service illustration.
2. **Stat strip** — 3–4 service-specific numbers.
3. **What's included** — 5-item tab panel (desktop) / accordion (mobile). Each item: heading,
   paragraph, supporting image. *This mirrors Goodspeed's "5 Key Pillars" pattern.*
4. **Process** — numbered steps specific to this service (4–6 steps).
5. **Deliverables** — checklist grid of concrete artifacts the author receives.
6. **Related packages** — 2–3 package cards filtered to this service category.
7. **Testimonials** — 3, filtered to this service.
8. **FAQ** — 5 service-specific questions.
9. **Inline lead form** — name, email, phone, book genre, message. Same component as
   `/contact`.

Services and their slugs:

| Slug | Title | One-liner |
|------|-------|-----------|
| `book-publishing` | Book Publishing | Manuscript to retail shelf, end to end |
| `book-writing` | Ghostwriting | Your story, written in your voice |
| `book-editing` | Editing | Developmental, line, and copy editing |
| `book-marketing` | Book Marketing | Launch strategy and long-tail visibility |
| `audiobooks` | Audiobooks | Narration, mastering, and ACX distribution |
| `cover-design` | Cover & Interior Design | Covers that compete on the shelf |

### 3.4 Packages (`/packages`)

1. Hero + retailer logo strip.
2. **Category tabs:** Publishing · Editing · Ghostwriting · Marketing · Children's Books.
   Tab state is in the URL (`?category=editing`) so tabs are shareable and indexable.
3. **Package cards** — 3 per category. Each: tier name, price, "best for" line, grouped
   feature lists with section subheadings, CTA "Get a quote", and a "Talk to us" secondary
   link with phone. One card per category is flagged `isFeatured` — it gets an amber border,
   a "Most chosen" ribbon, and a 4px lift.
4. **Comparison table** — sticky first column and sticky header row. ✓ / ✗ / value cells.
   On mobile it becomes a horizontally scrollable table with a scroll-hint gradient on the
   right edge.
5. **Payment plan callout** — 50% upfront, remainder in installments.
6. **Guarantees strip** — No royalty share · 100% ownership · Satisfaction guarantee.
7. FAQ accordion.
8. Lead form.

> **Content note:** all prices, tiers, and feature lists live in `data/packages.ts`. Hiba edits
> that file, not JSX. Ship with the placeholder tiers defined in `CONTENT_MODEL.md §4`.

### 3.5 Portfolio (`/portfolio`)

1. Hero.
2. Filter bar: All · Fiction · Non-fiction · Memoir · Children's · Poetry · Business.
   Client-side filter with an animated layout transition (`layout` prop on motion elements).
3. Responsive cover grid, 2/3/4 columns. Each card: cover image (3:4.5 aspect), title, author,
   genre chip, and an external "View on Amazon" link.
4. Clicking a cover opens a **lightbox modal** — larger cover, blurb, author bio, retailer
   links. Modal traps focus, closes on Escape and backdrop click.
5. Stat band + CTA.

### 3.6 Reviews (`/reviews`)

1. Hero with aggregate rating (e.g. 4.9 from 214 reviews) rendered with a real
   `AggregateRating` JSON-LD block.
2. Masonry grid of testimonial cards. Each: star rating, quote, author name, genre, optional
   headshot, optional book cover thumbnail.
3. "Leave a review" band linking to Google/Trustpilot.
4. Video testimonial section — 3 slots, lazy-loaded facade (poster image + play button that
   swaps in the iframe on click, so no third-party JS on first load).
5. CTA.

### 3.7 About (`/about`)

1. Hero: H1 + mission statement.
2. **Our story** — two-column: narrative text + a vertical timeline (year, milestone).
3. **What we believe** — 4 value cards: Authors keep everything · Craft over volume ·
   Plain-language contracts · Answer within one business day.
4. **The team** — grid of member cards: photo, name, role, one-line bio, LinkedIn.
   Hover reveals the bio over a duotone-treated photo.
5. **The work-for-hire disclaimer** — expanded, full section, plain language.
6. **By the numbers** — stat band.
7. CTA.

### 3.8 Blog index (`/blog`)

This is the section that gets the most care.

1. **Header** — H1 "The Lamp Room", one-line description, and a live search input
   (client-side fuzzy filter over title/excerpt/tags — no server call).
2. **Category rail** — horizontal pill row: All · Writing Craft · Publishing · Marketing ·
   Editing · Audiobooks · Author Business. Active pill filled amber.
3. **Featured post** — the most recent post flagged `featured: true`, rendered as a wide
   two-column card with a larger image.
4. **Post grid** `[M]` — 9 per page, 3 columns desktop / 2 tablet / 1 mobile. Card contains:
   cover image (16:9), category chip, H3 title, 2-line clamped excerpt, and a mono meta line
   `{date} · {readingTime} min`. Cursor spotlight illuminates cards.
5. **Pagination** — numbered, prev/next, at `/blog/page/[n]`. Not infinite scroll (SEO).
6. **Newsletter band** — inserted after the 6th card in the grid, spanning full width.
7. Empty state for a search with no results: an illustration and "Nothing here yet — try a
   different word, or browse all posts."

### 3.9 Article (`/blog/[slug]`)

1. **Article header** — category chip, H1, deck (one-sentence standfirst), author row (avatar,
   name, publish date, reading time), share buttons (X, LinkedIn, Facebook, copy link).
2. **Hero image** — 16:9, priority-loaded, with caption.
3. **Two-column body**
   - Left rail (desktop ≥1280px only): sticky table of contents generated from `h2`/`h3`,
     with the active section highlighted. `[M]` The Beam scroll rail runs down this edge as a
     reading-progress indicator.
   - Main column: max 68ch, `Newsreader` at 19px/1.7.
4. **MDX component set** — see `CONTENT_MODEL.md §3`. Includes: styled blockquote, callout
   box (info/warning/tip variants), code block with copy button, image with caption,
   comparison table, and an inline `<CTACard>`.
5. **Mid-article CTA** — auto-injected after the 3rd `h2`: a compact card offering the related
   service.
6. **Author bio card** — avatar, name, bio, link to `/authors/[slug]`.
7. **Tag list**.
8. **Prev / next post** navigation.
9. **Related posts** — 3, matched by shared category then shared tags.
10. **Newsletter band**.
11. **Comments: out of scope for v1.** Revisit in Phase 6.

**Mobile:** TOC collapses into a sticky "Contents" button at the bottom-right that opens a
sheet. Reading progress becomes a 2px amber bar under the header.

### 3.10 Contact (`/contact`)

Two-column layout.
- **Left:** form — Full name*, Email*, Phone, Book genre (select), Service interested in
  (select), Message*, consent checkbox. Client-side Zod validation with inline errors, a
  honeypot field, and a submit button with pending/success/error states.
- **Right:** direct contact card (email, phone, hours in the visitor's local time), office
  address, mailing addresses with the "not staffed, no walk-ins" note, social links, and an
  embedded map.
- Below: FAQ (5 items) + response-time promise.

On success: replace the form with a confirmation panel (no redirect), fire an analytics
event, and send the notification email via Resend.

### 3.11 Schedule (`/schedule`)

1. Hero: "Book a 30-minute call. No pitch, no obligation."
2. What to expect — 3 bullets.
3. Embedded Cal.com inline widget, lazy-loaded below the fold with a skeleton placeholder.
4. Fallback: if the embed fails to load, show the direct booking link and the phone number.
5. Testimonial + CTA.

### 3.12 Legal pages

`/privacy-policy`, `/terms-and-conditions`, `/refund-policy`. Rendered from MDX with a
`prose` container and an auto-generated TOC. Simple, no motion.

---

## 4. Global requirements

### 4.1 Responsive breakpoints

| Token | Width | Layout change |
|-------|-------|---------------|
| `sm` | 640px | Two-column cards begin |
| `md` | 768px | Mobile drawer → still drawer; grids to 2 col |
| `lg` | 1024px | Desktop nav appears; grids to 3 col |
| `xl` | 1280px | Article TOC rail appears; grids to 4 col |
| `2xl` | 1536px | Max container 1440px, gutters grow |

Design mobile-first. Test at 375px (iPhone SE) as the floor.

### 4.2 Forms

All forms share one `<LeadForm>` component with a `variant` prop (`full` | `compact` |
`inline`). Behaviour:
- Validation on blur, re-validation on change once an error exists
- Honeypot field named `company_website`, visually hidden, must be empty
- Rate limit: 5 submissions per IP per hour, enforced in the Route Handler
- Submissions POST to `/api/lead`, which validates server-side with the same Zod schema and
  sends via Resend
- Never trust client validation — the schema runs on both sides

### 4.3 Error and loading states

- `app/not-found.tsx` — custom 404 with a lighthouse illustration, search box, and links to
  Home / Blog / Services
- `app/error.tsx` — client error boundary with a retry button
- `app/loading.tsx` and per-route `loading.tsx` — skeleton screens matching the real layout,
  not spinners
- Blog index and portfolio have skeleton card grids

### 4.4 Out of scope for v1

Explicitly not building: user accounts, author dashboards, e-commerce checkout, live chat,
comments, multi-language, a headless CMS, and a manuscript upload portal. Several of these
appear in `ROADMAP.md` Phase 6 as candidates.

---

## 5. Content required before launch

Hiba must supply, or approve AI-drafted versions of:

- [ ] Logo (SVG, light and dark variants) and favicon set
- [ ] 12 blog posts (1,200–2,000 words each), 2 per category
- [ ] 6 service page bodies
- [ ] Real package tiers and prices
- [ ] 12–24 book covers with title/author/genre/retailer link
- [ ] 8–12 testimonials with names and genres
- [ ] Team photos and bios, or a decision to omit the team section for v1
- [ ] Business email, phone, and legal address
- [ ] Privacy policy, terms, refund policy (review by a professional recommended)

Until real content exists, use the drafted placeholder content in `content/` — but it must be
plausible, specific, on-brand prose. **No Lorem ipsum.**
