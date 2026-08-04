# Beacon Light Publishing — Website Specification

This repository contains the complete specification for **beaconlightpublishing.com**: a
publishing-services company website with a first-class editorial blog, built on Next.js.

These documents are the source of truth. Read them before writing code.

---

## 1. What we are building

Beacon Light Publishing is a **work-for-hire publishing services company** — not a traditional
publishing house. Authors keep 100% of their rights and royalties; we provide editing, cover
design, formatting, ISBN registration, distribution, audiobook production, and marketing.

The website has two jobs, in this order:

| # | Job | Success looks like |
|---|-----|--------------------|
| 1 | **Convert authors into leads** | Visitor books a call or submits the contact form |
| 2 | **Rank and retain via the blog** | Organic search traffic on author/publishing topics that funnels into job #1 |

The blog is not a bolt-on. It is the top-of-funnel engine and gets the same design and
engineering care as the sales pages.

---

## 2. Reading order

Read these in sequence. Each one assumes you have read the ones above it.

| Order | Document | What it settles |
|-------|----------|-----------------|
| 1 | [`CLAUDE.md`](./CLAUDE.md) | Working agreement, conventions, definition of done |
| 2 | [`docs/PRD.md`](./docs/PRD.md) | Every page, every section, every requirement |
| 3 | [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | Stack, folder layout, rendering strategy, data flow |
| 4 | [`docs/DESIGN_SYSTEM.md`](./docs/DESIGN_SYSTEM.md) | Palette, typography, spacing, component styling |
| 5 | [`docs/MOTION_SPEC.md`](./docs/MOTION_SPEC.md) | Every animation, with timings and reduced-motion fallbacks |
| 6 | [`docs/CONTENT_MODEL.md`](./docs/CONTENT_MODEL.md) | MDX frontmatter schemas and typed data shapes |
| 7 | [`docs/COMPONENT_INVENTORY.md`](./docs/COMPONENT_INVENTORY.md) | Every component, its props, and where it is used |
| 8 | [`docs/COPY_DECK.md`](./docs/COPY_DECK.md) | Brand voice, integrity rules, and the actual words for every page |
| 9 | [`docs/DECISIONS.md`](./docs/DECISIONS.md) | Architecture decision records — the *why* |
| 10 | [`docs/SEO_PERFORMANCE.md`](./docs/SEO_PERFORMANCE.md) | Metadata, structured data, budgets, a11y floor |
| 11 | [`docs/ROADMAP.md`](./docs/ROADMAP.md) | Build order, phase by phase, with acceptance criteria |
| — | [`docs/PROMPTS.md`](./docs/PROMPTS.md) | Copy-paste prompts, one per phase, for driving Claude Code |

**If you are Claude Code and about to start work:** read `CLAUDE.md`, then `docs/ROADMAP.md`
Phase 0, then begin. Pull in the other documents as each phase requires them.

Also in the repo: [`.env.example`](./.env.example) (every variable the build expects) and
[`content/blog/`](./content/blog) (a reference post that must validate against the schema in
`CONTENT_MODEL.md` — treat its frontmatter as the canonical example).

---

## 3. Stack at a glance

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 (CSS-first config, `@theme`) |
| Content | MDX files in-repo, compiled with `next-mdx-remote/rsc` |
| Animation | `motion` (Framer Motion v11+) + native View Transitions |
| Forms | React Hook Form + Zod, delivered via Resend |
| Images | `next/image`, AVIF/WebP, all assets local |
| Deploy | Vercel |
| Analytics | Vercel Analytics + Speed Insights |

Full rationale for each is in `docs/DECISIONS.md`. **Do not substitute libraries without
adding an ADR explaining why.**

---

## 4. Brand identity (short form)

- **Name:** Beacon Light Publishing
- **Tagline:** *Every manuscript deserves a light to steer by.*
- **Metaphor:** A lighthouse. The work is guiding a writer through the difficult passage
  between finished manuscript and published book.
- **Voice:** Warm, plain, specific. We talk to a nervous first-time author, not to a marketing
  department. No hype adjectives. No exclamation points in body copy.
- **Palette anchor:** Deep harbour blue-black, lit by a warm lamp amber.
- **Signature:** *The Beam* — a slow rotating light that appears in three places and nowhere
  else. See `docs/DESIGN_SYSTEM.md §6`.

---

## 5. Quickstart (Phase 0)

```bash
npx create-next-app@latest beacon-light --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd beacon-light
npm i motion next-mdx-remote gray-matter rehype-slug rehype-pretty-code remark-gfm \
      reading-time zod react-hook-form @hookform/resolvers resend clsx tailwind-merge lucide-react
npm i -D prettier prettier-plugin-tailwindcss @types/mdx
npm run dev
```

Then follow `docs/ROADMAP.md` Phase 0 to scaffold tokens, fonts, and layout shell before
building any page.

---

## 6. Non-negotiables

These are the things that make this site different from a template. Do not trade them away
for speed.

1. **Reduced motion is respected everywhere.** Every animation in `MOTION_SPEC.md` has a
   documented fallback. Ship both paths.
2. **Lighthouse ≥ 95** on Performance, Accessibility, Best Practices, SEO for `/`, `/blog`,
   and a representative `/blog/[slug]` — on mobile throttling.
3. **Keyboard-complete.** Every interactive element is reachable and has a visible focus ring
   in the amber accent. The mega-menu works with arrow keys and Escape.
4. **No layout shift.** CLS < 0.02. Every image has explicit dimensions; fonts use
   `next/font` with `display: swap` and a tuned fallback metric.
5. **Content is data.** Zero hardcoded copy inside components. Everything comes from `content/`
   or `data/`, typed and Zod-validated at build time.
6. **The Beam appears exactly three times.** Hero, article scroll rail, blog card spotlight.
   Nowhere else. Restraint is the design.

---

## 7. Legal disclaimer that must appear in the footer

> Beacon Light Publishing is a work-for-hire publishing services company, not a traditional
> publishing house. Authors retain 100% ownership of their work, including all publishing
> rights, intellectual property, and royalties. Our role is to guide and support authors
> through the publishing process.

This is a compliance requirement, not marketing copy. It ships in Phase 1.
