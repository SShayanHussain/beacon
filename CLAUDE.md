# CLAUDE.md — Working Agreement

Instructions for the agent building this codebase. Read fully before the first commit.

---

## 1. How to work

**Build in the order given by `docs/ROADMAP.md`.** Phases are dependency-ordered. Do not start
Phase 3 pages before the Phase 1 design tokens exist — you will produce inconsistent styling
and rework it.

**Finish one phase before starting the next.** At the end of each phase, verify against that
phase's acceptance criteria in the roadmap and report which criteria pass and which do not.

**When the spec is ambiguous, choose and record.** Do not stall on a clarifying question for
something reversible. Pick the option most consistent with the existing docs, implement it,
and append a one-line entry to `docs/DECISIONS.md` under "Implementation notes". Only stop and
ask when the choice is expensive to reverse (data model, hosting, CMS).

**When the spec is wrong, say so.** If a requirement conflicts with another document or is not
achievable as written, flag it before implementing a workaround.

---

## 2. Code conventions

### TypeScript
- `strict: true`, `noUncheckedIndexedAccess: true`. No `any`. No `@ts-ignore` without a
  comment explaining what is being suppressed and why.
- Prefer `type` over `interface` except when declaration merging is needed.
- All external data (MDX frontmatter, form input, env vars) passes through a **Zod schema**
  before it is used. Parse, don't validate.

### React / Next.js
- **Server Components by default.** Add `"use client"` only when the component needs state,
  effects, refs, browser APIs, or event handlers. Push the directive as far down the tree as
  possible — a page should never be a client component.
- Data fetching happens in Server Components or in `lib/`. No `useEffect` fetching.
- Every route exports `metadata` or `generateMetadata`. No page ships without it.
- Use `next/link` for internal navigation, `next/image` for every image, `next/font` for
  every font. No `<img>`, no `<a href="/...">`, no `<link>` to Google Fonts.

### Styling
- Tailwind utilities in JSX. No CSS modules, no styled-components, no inline `style` except
  for genuinely dynamic values (a computed transform, a CSS custom property being set).
- **Never write a raw hex or rem value in a component.** Use the design tokens from
  `@theme` — `bg-ink`, `text-beam`, `p-section`. If you need a value that does not exist as a
  token, add the token to `globals.css` first.
- Merge classes with `cn()` (`clsx` + `tailwind-merge`) from `lib/utils.ts`.
- Component variants via `cva` (class-variance-authority) when a component has 3+ variants.

### Naming
- Files: `kebab-case.tsx`. Components: `PascalCase`. Hooks: `useCamelCase`.
- Directories are plural for collections (`components/sections/`), singular for concepts
  (`lib/`, `content/`).
- Boolean props read as assertions: `isOpen`, `hasBorder`, `showBeam` — not `open`, `border`.

### Files
- One exported component per file. Co-locate sub-components in the same file only if they are
  never used elsewhere and are under ~30 lines.
- Barrel files (`index.ts`) only for `components/ui/`. Elsewhere, import directly.

---

## 3. Accessibility floor

This is enforced, not aspirational. A phase is not done if any of these fail.

- Semantic landmarks: one `<header>`, one `<nav>` with `aria-label`, one `<main>`, one
  `<footer>` per page. Sections use `<section aria-labelledby>` pointing at their heading.
- Exactly one `<h1>` per page. Heading levels never skip.
- Visible focus ring on every focusable element: `focus-visible:ring-2 ring-beam
  ring-offset-2 ring-offset-ink`. Never `outline: none` without a replacement.
- Dropdown/mega-menu: opens on click and on Enter/Space, navigable with arrow keys, closes on
  Escape, returns focus to the trigger. `aria-expanded` and `aria-controls` wired up.
- Mobile drawer traps focus while open and restores it on close. Body scroll locked.
- All images have meaningful `alt`, or `alt=""` with `aria-hidden="true"` if decorative.
- Colour contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text and UI borders. The amber accent
  on the dark ink background passes; **amber on white does not** — see
  `DESIGN_SYSTEM.md §2.3` for the approved pairings table and use it.
- Every animation checks `prefers-reduced-motion`. See `MOTION_SPEC.md §8`.
- Forms: every input has a `<label>`, errors are announced via `aria-live="polite"` and
  linked with `aria-describedby`.

---

## 4. Definition of done (per component)

A component is done when all of these are true:

- [ ] Renders correctly at 375px, 768px, 1280px, and 1920px
- [ ] Keyboard reachable, with visible focus
- [ ] Motion respects `prefers-reduced-motion`
- [ ] Props are typed; no `any`; optional props have defaults
- [ ] No hardcoded copy — content arrives via props or `content/`
- [ ] Loading and empty states exist where the component can be empty
- [ ] Dark and light surface variants both look correct (this site alternates surfaces)
- [ ] No console warnings, no hydration mismatches

---

## 5. Commit discipline

Conventional commits, scoped to the phase:

```
feat(blog): add MDX pipeline and article layout
fix(nav): restore focus to trigger when mega-menu closes with Escape
chore(tokens): add sea-glass surface token
docs(adr): record choice of file-based MDX over headless CMS
```

Commit at the end of each roadmap task, not at the end of the phase. Small commits.

---

## 6. Things that are explicitly forbidden

| Don't | Why | Do instead |
|-------|-----|------------|
| `localStorage` / `sessionStorage` in the initial render path | Hydration mismatch | Read in `useEffect`, render a stable default first |
| Loading fonts from a Google Fonts `<link>` | Layout shift + third-party request | `next/font/google` |
| A `useEffect` that fetches on mount | Waterfall, no SSR content | Fetch in a Server Component |
| Animating `width`, `height`, `top`, `left` | Triggers layout, drops frames | Animate `transform` and `opacity` only |
| Adding a UI library (MUI, Chakra, Ant) | Fights the design system, ships dead weight | Build on Tailwind + Radix primitives |
| `dangerouslySetInnerHTML` for content | XSS surface | MDX pipeline |
| Placeholder Lorem ipsum in committed code | Ships to production eventually | Use the real draft copy in `content/` |
| Stock-photo URLs from external hosts | Breaks, and hurts LCP | Local assets in `/public`, optimized |

---

## 7. Environment variables

Declare in `.env.example` with a comment. Validate in `lib/env.ts` with Zod at startup — the
build should fail loudly on a missing variable, not silently at runtime.

```
RESEND_API_KEY=          # transactional email for contact + schedule forms
CONTACT_TO_EMAIL=        # inbox that receives lead notifications
NEXT_PUBLIC_SITE_URL=    # canonical origin, used by sitemap/OG/RSS
NEXT_PUBLIC_CAL_LINK=    # Cal.com booking handle for /schedule
```

Never commit `.env.local`. Never read `process.env` outside `lib/env.ts`.

---

## 8. What to do at the end of a session

Write a short `PROGRESS.md` at the repo root (or update it) containing:

1. Which roadmap phase and tasks are complete
2. Which acceptance criteria currently fail, and why
3. Any decision you made that is not yet in `DECISIONS.md`
4. The single next action

This is what the next session reads first.
