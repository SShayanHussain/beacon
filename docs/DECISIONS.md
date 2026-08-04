# Architecture Decision Records — Beacon Light Publishing

Format: Context → Decision → Consequences → Revisit when.
Status: `Accepted` unless noted.

---

## ADR-001 — Next.js App Router with static generation

**Status:** Accepted

**Context.** This is a marketing site with a content-heavy blog. The requirements are fast
first paint, excellent SEO, cheap hosting, and a simple mental model for someone maintaining
it alone. The realistic alternatives were Astro, plain Vite + React, or Next.js.

**Decision.** Next.js 15 with the App Router, statically generating every content route.

**Why not Astro.** Astro would produce marginally less JavaScript, which matters for a site
this static. But the design calls for a substantial amount of orchestrated motion — the
Passage, the reading rail, layout-animated filters — and that means a large React island on
several pages anyway. At that point Astro's advantage narrows while its ecosystem friction for
Framer Motion, Radix, and React Hook Form grows. Next.js also gives `ImageResponse` OG
generation, first-class Vercel deployment, and a stack the maintainer already ships production
apps on.

**Why not plain Vite + React.** No SSG, so SEO would require a prerender step we'd have to
build and maintain. Rejected.

**Consequences.** Larger baseline JS than Astro. Mitigated by keeping Server Components as
the default and lazy-loading motion components below the fold. Tied to React's release cadence.

**Revisit when.** The blog exceeds ~500 posts (build times) or the site becomes genuinely
static with no interactive sections.

---

## ADR-002 — File-based MDX, not a headless CMS, not Contentlayer

**Status:** Accepted

**Context.** Blog content needs authoring, versioning, and rendering. Options: a headless CMS
(Sanity, Contentful, Payload), file-based MDX, or a database.

**Decision.** MDX files in the repository, compiled with `next-mdx-remote/rsc` and
`gray-matter`, validated with Zod.

**Why not a CMS in v1.** The site has one author who is a developer. A CMS adds a service
dependency, an API key, a schema to keep in sync with the frontend, a monthly cost past the
free tier, and a network call at build time that can fail. It buys non-technical editing that
nobody currently needs.

**Why not Contentlayer.** It is the obvious pick and it is effectively unmaintained — it pins
Next.js versions and has repeatedly broken on major upgrades. Taking a hard dependency on it
would mean being unable to upgrade Next on our own schedule. `next-mdx-remote` is thinner and
we control the pipeline.

**Consequences.** Content changes require a git commit and a deploy. Non-technical editing is
not possible. Build time grows linearly with post count. Custom tooling
(`scripts/validate-content.ts`) has to be written and maintained.

**Revisit when.** A second, non-technical writer joins, or post count passes ~200. The
migration path is deliberately short: `lib/content/posts.ts` is the only module that touches
the filesystem, so swapping to Sanity means rewriting one file, not the whole app.

---

## ADR-003 — Tailwind CSS v4 with CSS-first tokens

**Status:** Accepted

**Context.** The design system is token-heavy: six colours, three font families, a fluid type
scale, and defined easings. It must be impossible for a component to introduce an off-palette
value casually.

**Decision.** Tailwind v4, with all tokens declared in a single `@theme` block in
`globals.css`.

**Why.** v4's CSS-first config means the design tokens live in CSS custom properties that are
simultaneously available as Tailwind utilities (`bg-ink`) and as raw CSS variables (for the
Beam gradient, the spotlight, and view transitions — all of which need real CSS). One source
of truth for both. The v3 approach would have required duplicating the palette in
`tailwind.config.js` and in CSS.

**Consequences.** v4 is newer; some plugins lag. We use almost no plugins, so this is low
risk. Anyone joining needs to know the `@theme` convention rather than the familiar JS config.

**Revisit when.** A required plugin has no v4 support.

---

## ADR-004 — `motion` (Framer Motion) over GSAP or CSS-only

**Status:** Accepted

**Context.** The brief explicitly asks for transitions and a site that feels more alive than
the reference. Required capabilities: scroll-linked progress, layout animations for the
portfolio filter, shared-element transitions, gesture-driven carousel, and springs.

**Decision.** `motion` v11+.

**Why not GSAP.** GSAP's ScrollTrigger is more powerful for complex scroll choreography, but
it is imperative, larger, requires manual cleanup in React, and its licensing has historically
been a consideration for commercial work. We need one genuinely complex scroll section (the
Passage), which `useScroll` + `useTransform` handles cleanly.

**Why not CSS-only.** CSS cannot do layout animations (`layoutId`), scroll-linked springs, or
drag gestures. We'd end up writing them by hand.

**Consequences.** ~35KB gzipped where used. Mitigated by lazy-importing motion sections that
are below the fold, and by using pure CSS for the Beam rotation, the marquee, and the
spotlight — three of the most visible effects — which need no JS at all.

**Revisit when.** Bundle analysis shows motion in the critical path on a page that doesn't
need it.

---

## ADR-005 — Alternating dark/light surfaces, no theme toggle

**Status:** Accepted

**Context.** Users expect a dark-mode switch on modern sites. Building one doubles the visual
QA surface and constrains the palette to values that work in both modes.

**Decision.** No toggle. The site is a composed sequence of dark (`ink`) and light (`fog`)
sections.

**Why.** The design idea is *a lamp in a dark harbour*. That only works if there is darkness
for the light to fall into. A user-toggled all-light mode would make the amber accent fail
contrast (`beam` on `fog` is 1.7:1) and destroy the central metaphor. Meanwhile the blog —
where people actually read for ten minutes — is on the light surface, which is where dark mode
is most often wanted anyway.

**Consequences.** Every component needs both surface variants, controlled by
`data-surface`. Some users will want a toggle and not have one. Accept it as a design
position, and state it in `DESIGN_SYSTEM §9` so it reads as intentional.

**Revisit when.** Analytics or feedback show real friction, or a full-site light variant is
requested. The `data-surface` architecture means a toggle could be added later without a
rewrite.

---

## ADR-006 — URL as the store for filter and tab state

**Status:** Accepted

**Context.** Blog categories, package tabs, and portfolio filters all have selectable state.

**Decision.** All of it lives in the URL — path segments for blog categories
(`/blog/category/marketing`), search params for tabs and filters (`?category=editing`).

**Why.** State survives refresh and back-navigation, links are shareable, and — critically —
category archives become real indexable pages with their own metadata rather than a client-only
view Google never sees. Search-param tabs are a deliberate middle ground: shareable without
generating thin duplicate pages.

**Consequences.** Slightly more code than `useState`. Route segments for categories mean six
extra prerendered pages. Both are worth it.

---

## ADR-007 — Pagination, not infinite scroll, on the blog

**Status:** Accepted

**Context.** Blog index needs a way to reach older posts.

**Decision.** Numbered pagination at `/blog/page/[n]`, 9 posts per page.

**Why.** Infinite scroll hides content from crawlers unless it is carefully progressively
enhanced, makes the footer unreachable, breaks the browser's back button, and has no stable
"where was I". Pagination gives crawlable links and a footer that works. The blog's job is
organic search; that argument settles it.

---

## ADR-008 — Radix UI primitives, no component library

**Status:** Accepted

**Context.** Dialogs, tabs, accordions, and navigation menus have hard accessibility
requirements — focus trapping, roving tabindex, `aria-expanded` wiring, Escape handling.
Writing these by hand reliably produces subtle bugs.

**Decision.** Radix UI unstyled primitives for those five behaviours. No MUI, Chakra, Ant, or
shadcn/ui as a whole.

**Why not shadcn/ui.** It is Radix plus a default visual style. We have our own visual style,
so we'd be deleting most of what it adds. Take the Radix dependency directly.

**Consequences.** Every primitive is styled from scratch. That is the point — the design
should not look like anyone's default.

---

## ADR-009 — Resend for transactional email

**Status:** Accepted

**Context.** The lead form and newsletter signup need to deliver mail.

**Decision.** Resend, called from a Node-runtime Route Handler.

**Why.** Simple SDK, good deliverability, generous free tier, React Email support if we later
want designed notification templates. SMTP via Nodemailer would require credentials management
and has worse deliverability from serverless IPs.

**Consequences.** A third-party dependency in the lead path. Mitigated by showing the phone
number as a fallback whenever the API returns an error, so a Resend outage never loses a lead
silently.

---

## ADR-010 — Cal.com embed for scheduling, click-to-load

**Status:** Accepted

**Context.** `/schedule` needs a booking interface. Building one means calendar sync, timezone
handling, availability rules, and reminder emails — weeks of work with ongoing maintenance.

**Decision.** Embed Cal.com, loaded lazily below the fold with a skeleton, plus a fallback
panel with a direct link and phone number if the embed fails.

**Why.** It is a solved problem. Cal.com is open-source with a free tier, and the embed can be
self-hosted later without changing the URL structure.

**Consequences.** Third-party iframe with its own CSP allowance. Never loads on first paint,
so it costs nothing on Lighthouse.

---

## ADR-011 — Vercel hosting

**Status:** Accepted

**Context.** Needs to host a Next.js app with SSG, edge OG generation, and preview deploys.

**Decision.** Vercel.

**Why.** Zero-config for Next.js, per-PR preview URLs (which the Lighthouse CI step runs
against), edge caching for static output, and built-in Analytics/Speed Insights. The
maintainer already deploys here.

**Consequences.** Platform coupling on `ImageResponse` and the image optimizer. Both have
self-hosted equivalents; migration would be a day's work, not a rewrite.

---

## ADR-012 — In-memory rate limiting for v1

**Status:** Accepted, expected to change

**Context.** Public form endpoints need abuse protection. Options: Upstash Redis, a database
table, or in-memory.

**Decision.** An in-memory sliding window in `lib/rate-limit.ts`, 5 requests per IP per hour.

**Why.** Expected volume is low. Redis adds a service, a key, and a cost for a problem we do
not yet have. The honeypot field catches most naive bots before rate limiting matters.

**Consequences.** The window resets on cold start, so a determined attacker can exceed the
limit by spacing requests across instances. Acceptable for a contact form that sends email to
one inbox.

**Revisit when.** Spam appears in the inbox. `lib/rate-limit.ts` exposes a single
`check(key)` function so swapping to Upstash touches only that file.

---

## ADR-013 — No comments on blog posts in v1

**Status:** Accepted

**Context.** Comments could build community around the blog.

**Decision.** Not in v1.

**Why.** Every option costs something real: self-hosted needs moderation infrastructure;
Disqus loads heavy third-party tracking and would sink the Lighthouse target; Giscus requires
readers to have GitHub accounts, which authors do not. And an unmoderated comment section on a
site selling to nervous first-time authors is a reputational risk, not an asset.

**Revisit when.** There is a real audience asking for it. The newsletter is the v1 answer to
"how do readers stay in touch".

---

## ADR-014 — Placeholder content is written, never Lorem ipsum

**Status:** Accepted

**Context.** Real copy, covers, and testimonials will not exist during the build.

**Decision.** Ship plausible, specific, on-brand draft copy in `content/`, flagged with
`isPlaceholder: true` where the data model allows it. The content validator warns on any
remaining placeholder in a production build.

**Why.** Lorem ipsum hides layout problems — it has uniform word length, no long titles, no
awkward line breaks, no empty states. Real-length draft copy exposes those during the build
rather than at launch. It also means the site is presentable to a client on day one.

**Consequences.** Slower to build. Some drafted copy will be thrown away. Worth it.

---

## Implementation notes

Append one line here for any small decision made during the build that is not covered above.
Format: `YYYY-MM-DD — decision — one-line reason.`

- _(none yet)_
