# Prompt Pack — driving the build with Claude Code

One prompt per roadmap phase. Paste them **in order**, one session per phase, and let each
phase finish and pass its acceptance criteria before starting the next.

---

## How to use this

**Session hygiene that actually matters:**

- One phase per session. Long sessions drift from the spec.
- Start every session with the priming block below — Claude Code does not remember the last one.
- End every session by having it update `docs/PROGRESS.md` with what shipped and what it
  deviated from. Deviations that aren't written down become mysteries in week three.
- If it proposes a library that isn't in `DECISIONS.md`, make it write the ADR first.

**Priming block — prepend to every prompt below:**

```
Read CLAUDE.md, then docs/ROADMAP.md (Phase N only), then the documents that phase
references. These specs are the source of truth — if something is underspecified, ask me
rather than inventing it. If you disagree with a spec, say so before coding, not after.
```

---

## Phase 0 — Foundation

```
Execute Phase 0 from docs/ROADMAP.md.

Scaffold the Next.js 15 App Router project per docs/ARCHITECTURE.md §2 (folder structure)
and §9 (environment variables). TypeScript strict, Tailwind v4 CSS-first, ESLint, Prettier
with the Tailwind plugin, pnpm.

Do not build any page yet beyond a placeholder `/` that renders "Beacon Light Publishing"
in the correct display font. The goal of this phase is that `pnpm build`, `pnpm lint`, and
`pnpm typecheck` all pass on an empty shell.

Then show me the full file tree you created and stop.
```

---

## Phase 1 — Design system & chrome

```
Execute Phase 1 from docs/ROADMAP.md.

Implement docs/DESIGN_SYSTEM.md exactly: the @theme token block, the four font roles via
next/font, the type scale, spacing, radii, shadows, and the base component styles.

Then build the global chrome — header with mega-menu, footer with the rights notice from
README §7, and the shared CTA band — per docs/PRD.md §2.1 and docs/COMPONENT_INVENTORY.md.

Constraints:
- Every colour and size comes from a token. Zero arbitrary values like `text-[17px]` or
  `bg-[#0A1D2B]`. If you need a value that isn't tokenised, add the token.
- The mega-menu is keyboard-operable: arrow keys, Escape closes, focus returns to trigger.
- Build a `/styleguide` route (dev-only, excluded from sitemap and robots) rendering every
  token and component state. This is how I review the phase.

Do not implement the Beam yet — that's Phase 4.
```

---

## Phase 2 — Content layer

```
Execute Phase 2 from docs/ROADMAP.md.

Implement docs/CONTENT_MODEL.md: the Zod schemas, the MDX pipeline
(next-mdx-remote/rsc + gray-matter + remark-gfm + rehype-slug + rehype-pretty-code), the
derived fields, and the typed query helpers in lib/content/.

Validation runs at build time and a schema failure fails the build with a message naming the
file and the offending field. Do not silently coerce or default around bad frontmatter.

content/blog/what-a-book-cover-is-actually-doing.mdx is the reference post — it must parse
and validate. Add two more seed posts in different categories, written to the voice rules in
docs/COPY_DECK.md §Brand voice.

No UI in this phase. Prove it works with a temporary route that dumps the parsed objects
as JSON.
```

---

## Phase 3 — Blog

```
Execute Phase 3 from docs/ROADMAP.md.

Build /blog, /blog/[slug], /blog/category/[category], /blog/tag/[tag], and the author pages,
per docs/PRD.md §3.8–3.9.

The article page is the most important page on this site — treat it as such:
- Reading measure capped at 68ch, body in the body serif at the reading size from the scale.
- Sticky table of contents on desktop from derived `headings`, current section highlighted.
- The Beam scroll rail per docs/MOTION_SPEC.md — this is one of its three permitted uses.
- Typography for every MDX element: blockquote, callout, figure + caption, code block,
  ordered and unordered lists, tables, footnotes.
- Related posts by shared category then shared tags, and the relatedService CTA if present.

Then stop and let me read a full article on mobile and desktop before you touch anything else.
```

---

## Phase 4 — Marketing pages

```
Execute Phase 4 from docs/ROADMAP.md.

Build /, /services, /services/[slug] for all five services, /packages, /portfolio, /reviews,
and /about, per docs/PRD.md §3.1–3.7. Use docs/COPY_DECK.md verbatim for all copy.

Implement the remaining two Beam appearances (hero, blog card spotlight) and the scroll
choreography from docs/MOTION_SPEC.md. Every animation ships with its reduced-motion path in
the same commit — not as a follow-up.

Integrity rules from docs/COPY_DECK.md are hard requirements: any stat, logo, award, or
testimonial without verified data renders as a dev-only placeholder, and data-driven sections
return null when empty. Never invent a client name, a number, or a retailer relationship.

The packages comparison table must be readable on a 375px viewport. Solve that properly —
a horizontally scrolling table with a pinned first column, not a shrunk font.
```

---

## Phase 5 — Conversion

```
Execute Phase 5 from docs/ROADMAP.md.

Build the contact form, quote request, Cal.com scheduling embed, and /thank-you, per
docs/PRD.md §3.10–3.11 and §4.2.

- React Hook Form + Zod, with the same schema validating on client and server.
- Server action handles submission; Resend delivers; Turnstile and a honeypot guard it;
  Upstash rate-limits by IP.
- Every field has a visible label. Errors are specific and sit next to the field.
- Success and failure states are both designed — read docs/COPY_DECK.md §Errors and empty
  states.
- Never log or email the raw payload anywhere it isn't needed.

Show me the failure path first, then the success path.
```

---

## Phase 6 — Polish & launch

```
Execute Phase 6 from docs/ROADMAP.md.

Work through docs/SEO_PERFORMANCE.md end to end: metadata on every route, OG image
generation, JSON-LD (Organization, Service, Article, BreadcrumbList, FAQPage), sitemap,
robots, RSS.

Then run the full acceptance pass in docs/ROADMAP.md and report results as a table —
Lighthouse scores on mobile throttling for /, /blog, and an article; CLS; keyboard walkthrough;
reduced-motion walkthrough; 375px and 1440px screenshots of every route.

List everything that fails before you fix anything. I want to see the honest state first.
```

---

## Phase 7 — Post-launch

```
Read docs/ROADMAP.md Phase 7 and propose the two highest-value items given what we now know
from analytics, with an estimate for each. Do not start work until I pick one.
```

---

## Prompts for when things go sideways

**Spec drift:**
```
Audit the codebase against docs/DESIGN_SYSTEM.md and docs/COMPONENT_INVENTORY.md. List every
place the implementation diverges from the spec, as a table: file, what the spec says, what
the code does. Don't fix anything yet.
```

**Performance regression:**
```
/blog/[slug] dropped below the budget in docs/SEO_PERFORMANCE.md. Profile it, identify the
regression, and propose fixes ranked by impact-to-effort. Bundle analysis first, guesses last.
```

**Adding a page later:**
```
I want to add <page>. Before writing code: add its route to docs/PRD.md §2, write its section
spec in the style of §3, and add any new components to docs/COMPONENT_INVENTORY.md. Show me
the spec diff, then build it.
```

**Any new dependency:**
```
You proposed <library>. Write an ADR in docs/DECISIONS.md in the existing format — context,
decision, alternatives considered, consequences — and wait for my approval before installing.
```
