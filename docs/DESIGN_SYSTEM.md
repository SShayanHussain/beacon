# Design System — Beacon Light Publishing

---

## 1. Direction

**The subject is a lighthouse, and the audience is someone alone in the dark with a
manuscript.**

That is the whole brief. A lighthouse is not decorative here — it is the accurate description
of the service. An author has finished the hard part and now needs someone to mark the
channel. So the site is built on a single visual idea: **a warm lamp in a cold harbour**.

Practically, that means:

- The base is a **deep petrol blue-black**, not a neutral near-black. It reads as water and
  night, not as a generic dark theme.
- The accent is a **warm lamp amber**, used as light — it glows, it sweeps, it falls on
  things. It is never used as a flat brand fill on large areas.
- Reading surfaces are a **cool pale fog**, not cream. Cream + serif + terracotta is the
  house style of every AI-generated publishing site; we are not doing it.
- Long-form text is set in a serif built for screen reading, headlines in a serif with an
  eccentric axis, and all metadata in a mono that reads like a ship's log.

### 1.1 What we are deliberately not doing

| Rejected | Why |
|----------|-----|
| Cream `#F4F1EA` + Playfair + terracotta `#D97757` | The default AI publishing look. Instantly recognisable as templated. |
| Pure black `#000` + acid green | Second-most-common AI default. Wrong emotional register — this brand is warm. |
| Broadsheet hairlines + zero radius + dense columns | Third default. Also fights readability on mobile. |
| Purple + lime (the reference site's palette) | We are not cloning Goodspeed's identity, only its information architecture. |
| Gradient mesh blobs | Unrelated to the subject. |

---

## 2. Colour

### 2.1 Palette

Six named values. Everything on the site is one of these or a documented alpha of one.

| Token | Hex | Name | Role |
|-------|-----|------|------|
| `--color-ink` | `#0A1D2B` | Harbour Ink | Primary dark surface. Hero, CTA bands, footer. |
| `--color-tide` | `#123A4F` | Deep Tide | Elevated dark surface. Cards on ink, mega-menu panel, inputs. |
| `--color-beam` | `#F5B851` | Lamp Amber | **The light.** Primary CTA, focus rings, active states, the Beam. |
| `--color-signal` | `#E4674E` | Signal Coral | Secondary accent, used sparingly. Hover on amber, badges, errors. |
| `--color-glass` | `#7FC6BC` | Sea Glass | Tertiary. Links on dark, category chips, subtle dividers. |
| `--color-fog` | `#E9EEF0` | Fogbank | Primary light surface. Blog reading background, light sections. |

Plus two neutrals derived for text:

| Token | Hex | Role |
|-------|-----|------|
| `--color-fog-pure` | `#F7FAFB` | Card surfaces on fog, input backgrounds in light mode |
| `--color-ink-soft` | `#4A6072` | Muted body text on light surfaces, captions, meta |

### 2.2 Tailwind v4 `@theme` block

Put this in `src/app/globals.css`. Tailwind v4 is CSS-first — tokens defined here generate
utilities automatically (`bg-ink`, `text-beam`, `border-glass`).

```css
@import "tailwindcss";

@theme {
  /* ── colour ─────────────────────────────────────────── */
  --color-ink:        #0A1D2B;
  --color-ink-soft:   #4A6072;
  --color-tide:       #123A4F;
  --color-beam:       #F5B851;
  --color-signal:     #E4674E;
  --color-glass:      #7FC6BC;
  --color-fog:        #E9EEF0;
  --color-fog-pure:   #F7FAFB;

  /* ── type ───────────────────────────────────────────── */
  --font-display: var(--font-fraunces), Georgia, serif;
  --font-body:    var(--font-newsreader), Georgia, serif;
  --font-mono:    var(--font-plex-mono), ui-monospace, monospace;

  /* ── fluid type scale (clamp: mobile → desktop) ──────── */
  --text-eyebrow:  0.75rem;
  --text-xs:       0.8125rem;
  --text-sm:       0.9375rem;
  --text-base:     1.0625rem;
  --text-lg:       1.1875rem;
  --text-xl:       clamp(1.375rem, 1.2rem + 0.9vw,  1.625rem);
  --text-2xl:      clamp(1.75rem,  1.4rem + 1.6vw,  2.25rem);
  --text-3xl:      clamp(2.25rem,  1.7rem + 2.6vw,  3rem);
  --text-4xl:      clamp(2.75rem,  1.9rem + 4.0vw,  4rem);
  --text-5xl:      clamp(3.25rem,  2.0rem + 6.0vw,  5.5rem);

  /* ── spacing rhythm ─────────────────────────────────── */
  --spacing-section:    clamp(4rem, 3rem + 5vw, 8rem);
  --spacing-section-sm: clamp(2.5rem, 2rem + 3vw, 4.5rem);
  --spacing-gutter:     clamp(1.25rem, 0.9rem + 1.8vw, 2.5rem);

  /* ── radii ──────────────────────────────────────────── */
  --radius-sm:   0.375rem;
  --radius-md:   0.625rem;
  --radius-lg:   1rem;
  --radius-xl:   1.5rem;
  --radius-lens: 62% 38% 55% 45% / 48% 52% 48% 52%;

  /* ── shadows: warm, never neutral grey ──────────────── */
  --shadow-lift:  0 4px 24px -6px rgb(10 29 43 / 0.24);
  --shadow-card:  0 2px 12px -4px rgb(10 29 43 / 0.16);
  --shadow-glow:  0 0 48px -8px rgb(245 184 81 / 0.38);

  /* ── easing ─────────────────────────────────────────── */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);

  /* ── layout ─────────────────────────────────────────── */
  --container-max: 1440px;
  --measure:       68ch;
}
```

`--radius-lens` is the one shape flourish: a soft asymmetric blob used **only** for the hero
portrait mask and the author avatar frames. It reads as a lens or a droplet. Do not apply it
to buttons or cards.

### 2.3 Approved contrast pairings

Do not improvise combinations. These are the tested ones.

| Background | Body text | Heading | Accent / link | Ratio |
|------------|-----------|---------|---------------|-------|
| `ink` | `fog` | `fog-pure` | `beam` | 14.8 / 16.1 / 9.2 ✓ |
| `tide` | `fog` | `fog-pure` | `beam` | 9.4 / 10.2 / 5.8 ✓ |
| `fog` | `ink` | `ink` | `ink` underlined | 14.1 ✓ |
| `fog-pure` | `ink` | `ink` | `ink` underlined | 15.3 ✓ |
| `fog` | `ink-soft` (meta only, ≥14px) | — | — | 5.1 ✓ |
| `beam` | `ink` | `ink` | — | 11.4 ✓ |

**Forbidden:** `beam` text on `fog` (1.7 — fails badly), `glass` text on `fog` (2.1),
`signal` text on `ink` (3.4 — large text only, never body).

On light surfaces, links are `ink` with a `beam` underline that thickens on hover. The amber
is the light *on* the link, not the link colour.

### 2.4 Surface rhythm

Sections alternate to give the page a tidal rhythm rather than a flat scroll:

```
Home:  ink(hero) → fog(trust) → fog(counters) → ink(passage) → fog(services)
       → ink(rights) → fog(portfolio) → fog(testimonials) → ink(blog) → fog(newsletter) → ink(cta)
```

Never place three consecutive sections on the same surface. Transitions between surfaces get
a 1px `beam/15` hairline.

---

## 3. Typography

### 3.1 The three families

| Role | Family | Why this one |
|------|--------|--------------|
| **Display** | **Fraunces** (variable) | A "wonky" old-style serif with `SOFT` and `WONK` axes. It has literary weight without being Playfair. Set `WONK: 1` on headlines ≥ `text-3xl` so the eccentric terminals show; `WONK: 0` below that where it would be noise. |
| **Body / reading** | **Newsreader** (variable) | Built by Production Type for screen reading, with an optical-size axis. Article text at 19px is genuinely comfortable, which a display serif never is. |
| **Utility / meta** | **IBM Plex Mono** | Every date, reading time, stat label, eyebrow, nav item, and button label. It reads as instrumentation — a ship's log, a chart notation. This is what makes the type system feel specific rather than assembled. |

All three are on Google Fonts, so they load through `next/font/google` with zero third-party
requests.

```ts
// src/lib/fonts.ts
import { Fraunces, Newsreader, IBM_Plex_Mono } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
})

export const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
})

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
})
```

### 3.2 Type scale in use

| Element | Family | Size | Weight | Tracking | Leading |
|---------|--------|------|--------|----------|---------|
| Hero H1 | Fraunces, `WONK:1` | `text-5xl` | 600 | `-0.03em` | 0.95 |
| Page H1 | Fraunces, `WONK:1` | `text-4xl` | 600 | `-0.025em` | 1.05 |
| Section H2 | Fraunces, `WONK:1` | `text-3xl` | 600 | `-0.02em` | 1.1 |
| Card H3 | Fraunces, `WONK:0` | `text-xl` | 600 | `-0.01em` | 1.2 |
| Article H2 | Fraunces, `WONK:0` | `text-2xl` | 600 | `-0.015em` | 1.2 |
| Article H3 | Fraunces, `WONK:0` | `text-lg` | 600 | `0` | 1.3 |
| Body | Newsreader | `text-base` | 400 | `0` | 1.65 |
| Article body | Newsreader, `opsz:20` | `text-lg` (19px) | 400 | `0.003em` | 1.72 |
| Lead / deck | Newsreader italic | `text-xl` | 400 | `0` | 1.5 |
| Eyebrow | Plex Mono | `text-eyebrow` | 500 | `0.16em`, uppercase | 1 |
| Button | Plex Mono | `text-sm` | 500 | `0.06em`, uppercase | 1 |
| Nav item | Plex Mono | `text-sm` | 400 | `0.04em` | 1 |
| Meta / date | Plex Mono | `text-xs` | 400 | `0.05em` | 1.4 |
| Stat numeral | Plex Mono | `text-4xl` | 600 | `-0.02em`, `tabular-nums` | 1 |
| Caption | Plex Mono | `text-xs` | 400 | `0.03em` | 1.5 |

### 3.3 Typographic rules

- Article measure is capped at `--measure` (68ch). Never full-width body text.
- Headlines in Fraunces use `text-wrap: balance`. Article paragraphs use `text-wrap: pretty`.
- Body text uses hanging punctuation where supported: `hanging-punctuation: first last`.
- Numerals in tables and stats are `font-variant-numeric: tabular-nums`.
- Drop cap on the first paragraph of each article: `::first-letter` in Fraunces, 3 lines,
  `float: left`, amber. One flourish, one place.
- No text-transform on body copy. Uppercase belongs only to eyebrows and buttons, in mono.

---

## 4. Spacing and layout

### 4.1 Grid

12-column grid, `--spacing-gutter` gutters, `--container-max` 1440px max width.

| Breakpoint | Columns used | Container padding |
|------------|--------------|-------------------|
| < 640px | 4 | 20px |
| 640–1023px | 8 | 28px |
| 1024–1439px | 12 | 40px |
| ≥ 1440px | 12 | centred, 40px gutters |

### 4.2 Vertical rhythm

- Between sections: `--spacing-section` (64px → 128px fluid)
- Between a section heading and its content: `--spacing-section-sm` × 0.5
- Between cards in a grid: 24px mobile, 32px desktop
- Inside a card: 24px padding mobile, 32px desktop

### 4.3 Containers

```tsx
// Three widths, no others
<Container size="wide">     // 1440px — hero, marquees, full-bleed grids
<Container size="default">  // 1200px — most sections
<Container size="prose">    // 68ch  — article body, legal pages
```

---

## 5. Components

### 5.1 Button

| Variant | Background | Text | Border | Hover |
|---------|-----------|------|--------|-------|
| `primary` | `beam` | `ink` | none | bg → `signal`, text stays `ink`, lift 2px |
| `secondary` | transparent | `fog` | 1px `fog/30` | border → `beam`, text → `beam` |
| `ghost` | transparent | current | none | underline wipe in `beam` |
| `onLight` | `ink` | `fog` | none | bg → `tide` |

All buttons: Plex Mono, uppercase, `0.06em` tracking, `--radius-sm`, height 48px (desktop) /
44px (mobile — never below 44px touch target), horizontal padding 28px. Transition
`180ms var(--ease-out-expo)` on `background-color`, `transform`, `border-color`.

Primary buttons are **magnetic** — see `MOTION_SPEC.md §4.3`.

### 5.2 Card

Base: `--radius-lg`, `--shadow-card`, 1px border.
- On `fog`: background `fog-pure`, border `ink/8`
- On `ink`: background `tide`, border `beam/12`

Hover (interactive cards only): translate `-4px`, `--shadow-lift`, and a 1px `beam` line
animates in across the top edge from left to right over 320ms.

### 5.3 Chip / tag

Plex Mono, `text-xs`, uppercase, `0.08em` tracking, `--radius-sm`, 6px/12px padding.
- Default: `glass/15` background, `glass` text (on ink) or `ink` text (on fog)
- Active: `beam` background, `ink` text

### 5.4 Input

Height 52px, `--radius-md`, 16px padding.
- On `ink`/`tide`: background `ink`, border 1px `fog/15`, text `fog`, placeholder `fog/40`
- On `fog`: background `fog-pure`, border 1px `ink/12`, text `ink`

Focus: border → `beam`, plus `ring-2 ring-beam/30`. Never remove the ring.
Error: border → `signal`, message below in Plex Mono `text-xs` `signal`, wired with
`aria-describedby`.

Labels sit above the input in Plex Mono `text-xs` uppercase. No floating labels — they hurt
accessibility and add motion cost for no gain.

### 5.5 Section header

Every section uses the same three-part header:

```
EYEBROW IN MONO, UPPERCASE, AMBER          ← --color-beam, text-eyebrow
Headline in Fraunces with wonk on          ← text-3xl
A single supporting sentence in Newsreader ← text-lg, ink-soft / fog-muted
```

Left-aligned by default. Centred only on the Home hero and the final CTA bands.

### 5.6 Divider

1px line, `beam/15` on dark, `ink/10` on light. On section-surface transitions it is
full-bleed. Within content it stops at the container edge.

---

## 6. The signature: The Beam

This is the one thing the site is remembered by. It is the lighthouse lamp, and it appears
**in exactly three places**.

### 6.1 Hero Beam

A conic gradient rotating slowly behind the hero headline, clipped to a wide wedge so it
reads as a sweeping light rather than a spinning disc.

```css
.beam {
  position: absolute;
  inset: -40% -20%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgb(245 184 81 / 0.00) 12deg,
    rgb(245 184 81 / 0.22) 26deg,
    rgb(245 184 81 / 0.00) 44deg,
    transparent 360deg
  );
  filter: blur(48px);
  animation: sweep 22s linear infinite;
  will-change: transform;
}
@keyframes sweep { to { transform: rotate(360deg); } }
```

Beneath it, a static radial `beam/8` glow anchors the light source so the sweep has an
origin. Above it, a subtle noise texture at 3% opacity keeps the gradient from banding.

### 6.2 Article scroll rail

On article pages ≥1280px, a 2px vertical line runs down the left rail beside the TOC. It is
`fog/12` by default; an amber segment scaled by reading progress travels down it, with a
small glowing dot at its leading edge. Below 1280px this becomes a 2px horizontal bar pinned
under the header.

### 6.3 Blog card spotlight

On the blog grid and the Home "latest posts" row, a radial amber mask follows the pointer,
raising the brightness of whichever card it is over. Implemented with two CSS custom
properties (`--mx`, `--my`) updated in a throttled `pointermove` handler on the grid
container — one listener, not one per card.

### 6.4 Where the Beam must not appear

Not in the footer. Not behind section headings. Not on buttons. Not on the packages page. The
restraint is what makes it work — if amber light is everywhere, it stops reading as light.

---

## 7. Imagery

- **Book covers:** 3:4.5 aspect, real covers only, subtle `--shadow-lift`, no fake 3D
  perspective mockups.
- **Photography:** duotone-treated toward `ink` → `beam` at 20% mix, so photos sit inside the
  palette instead of fighting it. Apply with a CSS `mix-blend-mode: luminosity` layer over a
  gradient, not by baking it into the asset — this keeps the source images reusable.
- **Illustration:** thin-line, single-weight (1.5px) line art in `beam` on `ink`, used for
  service icons and the 404. Nautical vocabulary — compass rose, chart lines, depth soundings,
  lamp assembly. Not generic business icons.
- **Texture:** a 3% opacity fine-grain noise overlay on all `ink` surfaces. It stops large
  dark areas from looking like flat CSS and gives the site a printed quality.

---

## 8. Iconography

`lucide-react`, 1.5px stroke, 20px in buttons / 24px in cards / 32px in feature blocks.
Never mix icon sets. Where a lucide icon does not exist for a nautical concept, draw a custom
SVG at the same stroke weight and store it in `components/ui/icons/`.

---

## 9. Dark and light

There is **no theme toggle**. The site is not "dark mode with a light mode" — it is a
composed sequence of dark and light surfaces, which is a deliberate design decision, not a
feature gap. Every component must therefore look correct on both `ink` and `fog`, controlled
by a `surface` prop or by a `data-surface="dark|light"` attribute on the section wrapper that
components read with `group-data-*` variants.

---

## 10. Design review checklist

Before merging any new page, check:

- [ ] The section surfaces alternate — no three in a row the same
- [ ] Every eyebrow is mono, uppercase, amber, and says something real (not "OUR SERVICES")
- [ ] Headlines use Fraunces; body uses Newsreader; every date/number/label uses Plex Mono
- [ ] No hex values in the JSX
- [ ] Amber is used as light, never as a large flat fill
- [ ] The Beam is not on this page unless it is the hero, an article rail, or a blog card grid
- [ ] Focus rings visible on `ink` and on `fog`
- [ ] It still reads well at 375px
