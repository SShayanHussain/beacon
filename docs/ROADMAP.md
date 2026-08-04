# Roadmap — Beacon Light Publishing

Seven phases. Build in order — each depends on the ones before it. Do not start a phase until
the previous phase's acceptance criteria pass.

Estimates assume focused sessions with an agent doing the implementation.

| Phase | Name | Estimate | Ships |
|-------|------|----------|-------|
| 0 | Foundation | 0.5 day | Repo, tokens, fonts, layout shell |
| 1 | Design system & chrome | 1.5 days | Primitives, header, footer, nav |
| 2 | Content layer | 1 day | MDX pipeline, schemas, validation |
| 3 | Blog | 2 days | Index, article, archives, RSS |
| 4 | Marketing pages | 3 days | Home, services, packages, portfolio, reviews, about |
| 5 | Conversion | 1 day | Forms, API routes, scheduler, legal |
| 6 | Polish & launch | 1.5 days | Motion pass, SEO, a11y, perf, deploy |
| 7 | Post-launch | ongoing | Content cadence, iteration |

**Total to launch: roughly 10–11 working days.**

---

## Phase 0 — Foundation

**Goal:** a running app with the design tokens in place, so nothing after this is styled ad hoc.

### Tasks
1. `create-next-app` with TypeScript, Tailwind, ESLint, App Router, `src/`, `@/*` alias
2. Install dependencies (see `README.md §5`)
3. Configure `tsconfig.json`: `strict`, `noUncheckedIndexedAccess`
4. Write the full `@theme` block into `src/app/globals.css` from `DESIGN_SYSTEM §2.2`
5. `src/lib/fonts.ts` — Fraunces, Newsreader, IBM Plex Mono via `next/font/google`
6. Wire font variables onto `<html>` in the root layout
7. `src/lib/utils.ts` — `cn()`, `formatDate()`, `slugify()`
8. `src/lib/env.ts` — Zod-validated env, plus `.env.example`
9. `src/data/site.ts` — name, tagline, contact, socials, legal disclaimer
10. Prettier + `prettier-plugin-tailwindcss`; `npm run typecheck` and `lint` scripts
11. Base layer in `globals.css`: `prefers-reduced-motion` override, focus-visible defaults,
    selection colour in amber, noise texture utility
12. Commit and push; connect the repo to Vercel

### Acceptance criteria
- [ ] `npm run dev` renders a page using `bg-ink text-fog font-display` with no config errors
- [ ] All three fonts load with zero network requests to `fonts.googleapis.com`
- [ ] `npm run typecheck` passes
- [ ] A missing env var fails the build with a readable Zod error
- [ ] Vercel preview deploy succeeds

---

## Phase 1 — Design system & chrome

**Goal:** every primitive exists and looks right on both surfaces. After this, no component
should need new base styling.

### Tasks
1. Build every component in `COMPONENT_INVENTORY §1` (`ui/`)
2. Build `Header`, `DesktopNav`, `MegaMenu`, `MobileDrawer`, `Footer`, `Logo`, `SkipLink`
3. `data/navigation.ts` as the single nav source
4. Header scroll behaviour: background swap at 80px, hide/show on direction past 400px
5. Mega-menu with full keyboard support
6. Mobile drawer with focus trap and scroll lock
7. Footer with all four columns and the mandatory legal disclaimer
8. `components/motion/Reveal` and `Stagger`
9. `hooks/use-reduced-motion.ts`, `use-scroll-direction.ts`, `use-media-query.ts`
10. Build a `/kitchen-sink` dev-only route rendering every primitive on both surfaces
11. `app/not-found.tsx` and `app/error.tsx`

### Acceptance criteria
- [ ] `/kitchen-sink` shows every primitive on `ink` and on `fog`, all correct
- [ ] Header transitions smoothly and hides/shows without jitter
- [ ] Mega-menu: opens on click and Enter, arrow keys move between rows, Escape closes and
      returns focus to the trigger
- [ ] Mobile drawer traps focus, locks scroll, and restores focus on close
- [ ] Tab through the whole shell — focus is visible at every stop on both surfaces
- [ ] 404 page is styled and links to Home, Blog, Services
- [ ] Zero hardcoded hex values outside `globals.css`

---

## Phase 2 — Content layer

**Goal:** MDX in, typed objects out, build fails loudly on bad content.

### Tasks
1. `lib/schemas.ts` — every Zod schema from `CONTENT_MODEL`
2. `types/index.ts` — types inferred from the schemas
3. `lib/content/mdx.ts` — shared `compileMDX` config with all remark/rehype plugins
4. `lib/content/posts.ts` — `getAllPosts`, `getPostBySlug`, `getPostsByCategory`,
   `getPostsByTag`, `getRelatedPosts`, `getAdjacentPosts`, memoized with `cache()`
5. `lib/content/services.ts` and `lib/content/authors.ts`
6. Heading extraction from the compiled AST for the TOC
7. Reading time and word count
8. `components/mdx/` — every component and HTML override from `CONTENT_MODEL §3`
9. `scripts/validate-content.ts` and a `validate:content` npm script
10. Write 3 real blog posts, 2 service pages, and 1 author file as the working set
11. Populate `data/packages.ts`, `portfolio.ts`, `testimonials.ts`, `faqs.ts`, `retailers.ts`

### Acceptance criteria
- [ ] A post with a missing required field fails the build naming the file and the field
- [ ] A post with a 250-char excerpt fails validation
- [ ] A post referencing a nonexistent author fails validation
- [ ] `getRelatedPosts` returns category matches first, then tag matches, never the post itself
- [ ] Every MDX component renders correctly in a test post that uses all of them
- [ ] Drafts appear in dev and are absent from a production build
- [ ] `npm run validate:content` passes on the working set

---

## Phase 3 — Blog

**Goal:** the acquisition engine, complete. This is the highest-value phase — do not rush it.

### Tasks
1. `(content)` route group layout
2. `/blog` — header, search, category rail, featured post, grid, newsletter band, pagination
3. `PostCard` in all three variants; `PostGrid` owning the spotlight pointer handler
4. Client-side search with 180ms debounce and an empty state
5. `/blog/page/[n]` with `generateStaticParams`
6. `/blog/category/[category]` and `/blog/tag/[tag]` with their own metadata
7. `/blog/[slug]` — article header, hero image, two-column body, MDX render
8. `TableOfContents` with the active-heading observer and the `layoutId` marker
9. `MobileTOC` bottom sheet
10. `ReadingProgress` / the Beam scroll rail
11. `ShareRow`, `AuthorCard`, `PrevNextNav`, `RelatedPosts`, `MidArticleCTA` injection
12. `/authors/[slug]`
13. `app/rss.xml/route.ts`
14. `app/blog/[slug]/opengraph-image.tsx`
15. Skeleton `loading.tsx` for the index and the article

### Acceptance criteria
- [ ] All post routes are statically generated — check the build output for `●` (SSG)
- [ ] TOC highlights the correct heading while scrolling, on a long post with nested h3s
- [ ] Reading rail reaches exactly 100% at the end of the article body, not the footer
- [ ] The spotlight uses **one** pointer listener for the whole grid
- [ ] Search filters instantly, and the empty state appears for a nonsense query
- [ ] Category and tag archives have unique titles, descriptions, and canonicals
- [ ] Pagination links are real `<a>` elements and are crawlable
- [ ] RSS validates
- [ ] OG image renders correctly for a 90-character title and a 20-character title
- [ ] Article reads comfortably at 375px — measure, leading, and TOC fallback all correct
- [ ] Lighthouse ≥ 95 on `/blog` and a sample article

---

## Phase 4 — Marketing pages

**Goal:** the conversion surface.

### Tasks

**Home** (build in section order from `PRD §3.1`)
1. Hero with the Beam and the orchestrated load sequence
2. Trust bar marquee
3. Proof counters
4. The Passage — sticky horizontal scroll, with the mobile/reduced-motion vertical fallback
5. Services grid
6. Rights promise band
7. Portfolio preview with tilt
8. Testimonial carousel
9. Latest posts with spotlight
10. Newsletter band
11. Final CTA

**Services**
12. `/services` hub with alternating feature rows
13. `/services/[slug]` template: hero, stats, pillar tabs, process, deliverables, related
    packages, testimonials, FAQ, inline form
14. Write the remaining four service MDX files

**Packages**
15. Category tabs synced to the URL
16. `PackageCard` with the featured treatment
17. `ComparisonTable` with sticky header and first column, mobile scroll hint
18. Payment plan, guarantees, FAQ

**Portfolio / Reviews / About**
19. `/portfolio` with URL-synced filter and layout animation
20. `BookLightbox`
21. `/reviews` masonry, aggregate rating, video facades
22. `/about` — story, timeline, values, team, expanded disclaimer, stats

### Acceptance criteria
- [ ] Hero sequence completes in under 1.6s and does not block the CTA from being clicked
- [ ] The Passage works on desktop, and renders the vertical stepper (not a hidden horizontal
      track) below `lg` and under reduced motion
- [ ] Counters animate once, on first view, and do not re-render React per frame
- [ ] Marquee loops seamlessly with no visible seam, and pauses on hover
- [ ] Comparison table is readable at 375px with the scroll affordance visible
- [ ] Portfolio filter animates layout and updates the URL; back button restores the filter
- [ ] Lightbox traps focus and returns it to the correct cover on close
- [ ] Every section alternates surface correctly — no three the same in a row
- [ ] Every page has metadata and its JSON-LD block
- [ ] Full page passes the design review checklist (`DESIGN_SYSTEM §10`)

---

## Phase 5 — Conversion

**Goal:** leads actually arrive in the inbox.

### Tasks
1. `LeadForm` with all three variants, RHF + Zod, honeypot
2. `NewsletterForm`
3. `POST /api/lead` — parse, honeypot, rate limit, Resend, typed responses
4. `POST /api/newsletter`
5. `lib/rate-limit.ts` with a single `check(key)` interface
6. Pending / success / error states, including the phone-number fallback on API failure
7. `/contact` — form, details, addresses, map, FAQ
8. `/schedule` — Cal.com embed with lazy load, skeleton, and fallback panel
9. Legal pages from MDX: privacy, terms, refund
10. Analytics events wired

### Acceptance criteria
- [ ] Submitting the form delivers an email to the real inbox with all fields
- [ ] Server-side validation rejects a request that bypasses the client
- [ ] Filling the honeypot returns 200 and sends nothing
- [ ] The 6th submission from one IP within an hour returns 429
- [ ] Breaking the Resend key produces an inline error showing the phone number — no crash,
      no silent failure
- [ ] Submit button does not change width during the pending state
- [ ] Errors are announced to a screen reader
- [ ] Cal.com does not load until the section is near the viewport
- [ ] Blocking the Cal.com domain shows the fallback panel

---

## Phase 6 — Polish & launch

**Goal:** hit every number in `SEO_PERFORMANCE`.

### Tasks
1. Motion pass — walk `MOTION_SPEC §9` for every animated component
2. Full reduced-motion pass with the OS setting on
3. Full keyboard pass across every page
4. axe run on the five key routes; fix everything
5. Screen-reader pass on Home and one article
6. Bundle analysis; lazy-load anything over budget
7. Image audit — formats, dimensions, `sizes`, `priority`, blur placeholders
8. `sitemap.ts`, `robots.ts`, all JSON-LD templates
9. Rich Results Test on every template
10. Security headers in `next.config.ts`
11. Lighthouse CI in GitHub Actions with budget assertions
12. Playwright: 4 critical paths + axe integration
13. Responsive pass at 320/375/768/1280/1920
14. Cross-browser: Chrome, Safari, Firefox, iOS Safari, Android Chrome
15. Custom domain, SSL, `NEXT_PUBLIC_SITE_URL`
16. Search Console verification, sitemap submission
17. Replace all placeholder content; validator reports zero placeholders
18. Walk the pre-launch checklist (`SEO_PERFORMANCE §8`)

### Acceptance criteria
- [ ] Every box in `SEO_PERFORMANCE §8` is ticked
- [ ] Lighthouse mobile ≥ 95/100/95/100 on the five key routes
- [ ] Zero axe violations
- [ ] Playwright suite green
- [ ] CI blocks a PR that breaks a budget
- [ ] Site works with JavaScript disabled for reading content (nav degrades to links, article
      is fully readable)
- [ ] Reduced motion enabled: the site still looks deliberately designed

---

## Phase 7 — Post-launch

Not a build phase. The site's value compounds only if the blog does.

### Content cadence
- 2 posts per month minimum, alternating funnel positions:
  one top-of-funnel ("what does self-publishing cost"), one bottom-of-funnel
  ("how to choose a developmental editor")
- Every post links to at least one service page and one other post
- Refresh the three best-performing posts every quarter and bump `updatedAt`

### Measure monthly
Organic sessions, top landing pages, blog → contact conversion, form submissions, call
bookings, Core Web Vitals in Search Console.

### Backlog — candidates, in rough priority order

| Item | Trigger to build it |
|------|---------------------|
| Author resource library (gated PDFs) | Newsletter list passes 200 |
| Manuscript evaluation quiz → lead magnet | Conversion rate plateaus |
| Case studies with before/after covers | 3+ clients agree to be featured |
| Headless CMS migration (ADR-002) | A non-technical writer joins |
| Comments or a community (ADR-013) | Real, repeated reader demand |
| Multi-currency pricing | Meaningful non-US traffic |
| Client portal / manuscript upload | Manual file handling becomes the bottleneck |
| Spanish or Urdu localisation | Regional demand appears in analytics |

---

## Risk register

| Risk | Impact | Mitigation |
|------|--------|-----------|
| The Passage section is heavy on low-end mobile | Poor INP, bad first impression | It does not render on mobile at all — the vertical stepper is a different DOM tree, not a hidden one |
| Real content never arrives, launch slips | No launch | Ship with the drafted placeholder content (ADR-014); the site is presentable from day one |
| Book covers have rights issues | Legal exposure | Only display covers Beacon Light produced; generated placeholders until then |
| Motion pushes JS over budget | Lighthouse target missed | Three most-visible effects are pure CSS; motion sections are lazy-imported; budget is asserted in CI |
| Blog has no traffic for 6 months | Primary channel fails | Expected. SEO compounds slowly. Judge at 6 months, not 6 weeks; run the paid/social channel in parallel |
| Scope creep into a client portal | Launch never happens | Explicit out-of-scope list in `PRD §4.4`; anything new goes to the Phase 7 backlog |
