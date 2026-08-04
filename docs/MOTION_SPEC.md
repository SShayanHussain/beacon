# Motion Specification — Beacon Light Publishing

Every animation on the site is listed here. If it is not in this document, it does not ship.

---

## 1. Motion principles

1. **Motion explains, it does not decorate.** Every animation answers a question: where did
   this come from, what changed, what can I interact with, how far through am I.
2. **One orchestrated moment beats ten scattered effects.** The hero load sequence and the
   Passage scroll are the two set pieces. Everything else is quiet.
3. **Nothing bounces.** No spring overshoot on UI. Springs are used only for the magnetic
   button and the cursor spotlight, where physicality is the point.
4. **Transform and opacity only.** Never animate `width`, `height`, `top`, `left`, `margin`,
   or `box-shadow`. Use `transform`, `opacity`, `clip-path`, and `filter`.
5. **Reveals happen once.** `viewport={{ once: true }}` everywhere. Re-animating on scroll-up
   is disorienting and makes the page feel unstable.
6. **Reduced motion is a first-class path**, not a disabled path. The page must still feel
   designed with all motion off.

---

## 2. Timing and easing

| Token | Value | Used for |
|-------|-------|----------|
| `--dur-instant` | 120ms | Colour change, chip toggle |
| `--dur-fast` | 180ms | Button hover, link underline, icon shift |
| `--dur-base` | 320ms | Card lift, accordion, chip filter |
| `--dur-slow` | 520ms | Scroll reveal, modal open, page transition |
| `--dur-story` | 900ms | Hero line reveal, orchestrated sequences |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | **Default.** Entrances, reveals, lifts. |
| `--ease-in-out-quart` | `cubic-bezier(0.76, 0, 0.24, 1)` | Two-way movement: drawers, tabs, carousels |
| `--ease-linear` | `linear` | Marquee, the Beam rotation, progress bars |

Stagger between siblings: **60ms** for cards, **80ms** for hero lines, **40ms** for list items.
Never more than 8 staggered children — beyond that the last item feels broken.

---

## 3. Page-level motion

### 3.1 Hero load sequence — the set piece

Runs once on first paint of `/`. Total 1.6s.

| t | Element | From → To | Duration | Ease |
|---|---------|-----------|----------|------|
| 0ms | Backdrop glow | `opacity 0 → 1` | 900ms | expo |
| 120ms | The Beam | `opacity 0 → 1`, rotation starts | 1200ms | linear |
| 240ms | Eyebrow | `clip-path inset(0 100% 0 0) → inset(0 0 0 0)` | 620ms | expo |
| 320ms | H1 line 1 | same mask reveal + `y: 12px → 0` | 720ms | expo |
| 400ms | H1 line 2 | same | 720ms | expo |
| 480ms | H1 line 3 | same | 720ms | expo |
| 640ms | Subheading | `opacity 0 → 1`, `y: 16px → 0` | 620ms | expo |
| 760ms | CTA row | `opacity 0 → 1`, `y: 16px → 0` | 520ms | expo |
| 900ms | Scroll cue | `opacity 0 → 1`, then 2s idle bob | 400ms | expo |

The H1 must be split into lines **in the markup** (three `<span>` elements), not by a
JS text-splitting library. Splitting at runtime causes a flash of unsplit text and breaks
screen-reader flow. The whole H1 carries a single `aria-label` with the full sentence.

**Reduced motion:** all of the above collapses to a single 200ms opacity fade of the whole
hero block. The Beam renders as a static radial glow with no rotation.

### 3.2 Route transitions

Use the native **View Transitions API** via Next.js:

```ts
// next.config.ts
experimental: { viewTransition: true }
```

```css
::view-transition-old(root) { animation: fade-out 180ms var(--ease-out-expo) both; }
::view-transition-new(root) { animation: fade-in  320ms var(--ease-out-expo) both; }
```

Blog cards use `view-transition-name` on the cover image so the card image morphs into the
article hero image on navigation. Assign the name dynamically per slug and clear it after
navigation so only one element ever holds a given name.

**Reduced motion:** `::view-transition-*` animations set to `none`.

### 3.3 Scroll reveal (site-wide)

A single `<Reveal>` wrapper, used on every section's content block.

```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
  transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
/>
```

Rules:
- Never reveal the first viewport's content on scroll — it is already visible on load.
- `y` is 24px maximum. Larger travel makes the page feel like it is assembling itself.
- Do not nest `<Reveal>` inside `<Reveal>`. Stagger children with the `delay` prop instead.

**Reduced motion:** `initial={{ opacity: 1, y: 0 }}` — content is simply present.

---

## 4. Component motion

### 4.1 Header

| Trigger | Behaviour | Timing |
|---------|-----------|--------|
| Scroll past 80px | Background `transparent → ink/80`, `backdrop-blur-md`, hairline border in | 280ms expo |
| Scroll down past 400px | `translateY(-100%)` | 320ms quart |
| Scroll up (any position) | `translateY(0)` | 320ms quart |
| Logo hover | Lamp glyph brightens, `filter: drop-shadow(0 0 8px beam/40)` | 240ms |

Direction detection is throttled to one check per animation frame. Do not run it on every
scroll event.

### 4.2 Mega-menu

- Open: panel `opacity 0 → 1`, `y: -8px → 0`, `scaleY 0.98 → 1` (transform-origin top),
  240ms expo. Rows stagger in at 30ms.
- Close: 160ms, no stagger — closing should feel immediate.
- Row hover: background `beam/6`, icon shifts `x: 0 → 3px`, 180ms.
- Keyboard: arrow keys move focus between rows, Escape closes and returns focus to trigger.

### 4.3 Magnetic button (primary CTAs only)

On pointer move within 80px of the button, translate the button toward the cursor by
`delta * 0.18`, capped at 8px. The label translates by `delta * 0.28` for a slight parallax.
Spring: `{ stiffness: 260, damping: 22, mass: 0.6 }`. Snap back to 0 on pointer leave.

Apply to: hero primary CTA, final CTA band button. **Nowhere else.** Only on devices with
`(pointer: fine)`.

**Reduced motion / touch:** disabled entirely; the button gets a plain background transition.

### 4.4 Cards

- Hover: `y: -4px`, shadow `card → lift`, 320ms expo
- Top hairline: a 1px `beam` line with `scaleX 0 → 1`, `transform-origin: left`, 320ms expo
- Cover images inside cards: `scale 1 → 1.04` over 520ms expo, with `overflow-hidden` on the
  parent

**Reduced motion:** border colour change only.

### 4.5 Marquee (retailer logos)

Two identical tracks side by side, translated `-50%` over 40s linear infinite. Pause on hover
and on focus-within. Logos are grayscale at 55% opacity, going to full colour and opacity on
individual hover over 240ms.

**Reduced motion:** static, wrapped, centred grid of logos. No scroll.

### 4.6 Count-up stats

On first intersection, animate from 0 to target over 1.8s with an ease-out curve. Use
`useInView` + a `motion` `animate()` on a `MotionValue`, writing to `textContent` — do not
re-render React 60 times per second.

Format with `Intl.NumberFormat`. Suffixes (`k+`, `+`) are separate static elements so the
animated numeral stays `tabular-nums` and does not reflow.

**Reduced motion:** render the final value immediately.

### 4.7 The Passage (Home §4) — the second set piece

A sticky section, `height: 400vh`. Inside, a horizontally translating track of 6 step panels.

```ts
const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.33%"])  // 5/6 of the track
```

Each panel additionally fades its content in as it approaches centre, driven by the same
progress value. A thin amber progress line runs along the bottom of the sticky viewport.

**Below `lg`, and under reduced motion:** the section becomes a vertical stepper — numbered
steps stacked, each revealed with the standard `<Reveal>`, sticky container removed entirely.
The horizontal track must not be rendered at all in that case (not just hidden), so the DOM
stays light on mobile.

### 4.8 Accordion / tabs

Height animation via `motion`'s `height: "auto"` with `overflow: hidden`, 320ms quart.
Chevron rotates 180deg over the same duration. Tab indicator uses `layoutId` so it slides
between tabs rather than fading.

**Reduced motion:** instant open/close, no chevron rotation, indicator jumps.

### 4.9 Testimonial carousel

Slides translate with `x` spring `{ stiffness: 200, damping: 30 }`. Auto-advance every 7s,
paused on hover, focus-within, and when the tab is hidden (`document.visibilityState`).
Swipe via `drag="x"` with `dragConstraints` and a 40px velocity threshold to commit.

**Reduced motion:** crossfade instead of slide, auto-advance disabled, arrows only.

### 4.10 Portfolio filter

`<motion.div layout>` on each card with `AnimatePresence` for entering/exiting. Layout
transition: 420ms expo. Cards exiting fade and scale to 0.96.

**Reduced motion:** no layout animation — filtered results appear immediately.

### 4.11 Modal / lightbox

- Backdrop: `opacity 0 → 1`, `backdrop-blur-sm`, 240ms
- Panel: `opacity 0 → 1`, `scale 0.96 → 1`, `y: 12px → 0`, 320ms expo
- Close: 180ms, reverse
- Focus trapped, Escape closes, body scroll locked, focus restored to the trigger

**Reduced motion:** opacity only, no scale or translate.

### 4.12 Mobile drawer

`x: 100% → 0`, 380ms quart. Backdrop fades in over 240ms. Nav items stagger in at 40ms after
the panel settles. Focus trapped, scroll locked.

**Reduced motion:** instant appearance, backdrop fade only.

---

## 5. Blog-specific motion

### 5.1 Reading progress rail (Beam use #2)

```ts
const { scrollYProgress } = useScroll({
  target: articleRef,
  offset: ["start start", "end end"],
})
const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
```

Applied to a 2px vertical track with `transform-origin: top`. A 6px amber dot with
`box-shadow: var(--shadow-glow)` sits at the leading edge. Below 1280px, the same value drives
a 2px horizontal bar pinned under the header.

**Reduced motion:** the bar still tracks progress — this is information, not decoration — but
the spring is replaced with the raw value (no smoothing) and the glow is removed.

### 5.2 TOC active section

`IntersectionObserver` with `rootMargin: "-20% 0px -70% 0px"` marks the heading nearest the
top of the reading area. The active item's text goes `ink-soft → beam` and a 2px amber marker
slides between items via `layoutId`, 280ms expo.

**Reduced motion:** colour change only, marker jumps.

### 5.3 Card spotlight (Beam use #3)

One `pointermove` listener on the grid container, throttled with `requestAnimationFrame`,
writing `--mx` / `--my` as percentages on the container.

```css
.post-grid { --mx: 50%; --my: 50%; }
.post-card::before {
  content: "";
  position: absolute; inset: 0;
  background: radial-gradient(
    280px circle at var(--mx) var(--my),
    rgb(245 184 81 / 0.10), transparent 70%
  );
  opacity: 0; transition: opacity 260ms var(--ease-out-expo);
  pointer-events: none;
}
.post-grid:hover .post-card::before { opacity: 1; }
```

Because `--mx`/`--my` live on the shared container, all cards read the same pointer position
and only the one under the cursor lights up — with zero per-card listeners.

**Reduced motion / touch:** the `::before` layer is never shown.

### 5.4 Drop cap

The article's first paragraph drop cap fades in 300ms after the hero image loads. A single
`opacity` transition, nothing more.

---

## 6. Micro-interactions

| Element | Interaction |
|---------|-------------|
| Text link (light surface) | Amber underline grows `scaleX 0 → 1` from left, 180ms |
| Text link (dark surface) | Colour `glass → beam`, 180ms |
| Icon button | `scale 1 → 1.08`, 180ms, plus `beam/10` circle backdrop fading in |
| Form input | Border colour + ring, 180ms. **No label float.** |
| Submit button pending | Label crossfades to a 16px amber spinner, button width locked to prevent shift |
| Submit success | Checkmark draws via `pathLength 0 → 1`, 420ms, then panel swap after 600ms |
| Copy-link button | Icon swaps to a check, reverts after 1.6s |
| Code block copy | Same pattern |
| Scroll cue (hero) | 6px vertical bob, 2s ease-in-out infinite |
| 404 lighthouse | Its lamp sweeps on the same 22s cycle as the hero Beam |

---

## 7. Performance rules for motion

- Add `will-change: transform` **only** to the Beam and the Passage track — the two elements
  that animate continuously. Everywhere else it wastes memory.
- Every continuously animating element gets `contain: paint`.
- Pause the Beam and the marquee when `document.visibilityState === "hidden"`.
- `IntersectionObserver` for all reveal triggers. No scroll listeners for visibility.
- The only two scroll listeners on the site are the header direction check and the spotlight
  pointer handler, both rAF-throttled.
- Lazy-import `motion` for below-the-fold decorative components:
  `const Passage = dynamic(() => import("@/components/sections/passage"), { ssr: false })`
- Target: no long task > 50ms during the hero sequence. Verify in the Performance panel.

---

## 8. Reduced motion — implementation

Two layers, both required.

**CSS layer** (catches everything, including CSS-only animation):

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  ::view-transition-old(root),
  ::view-transition-new(root) { animation: none; }
}
```

**JS layer** (lets components render a different, better-designed variant rather than a
broken instant version):

```ts
// src/hooks/use-reduced-motion.ts
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])
  return reduced
}
```

Note the initial state is `false` and only updates in `useEffect` — this avoids a hydration
mismatch. The CSS layer covers the brief window before hydration.

**Components that must branch on the JS value, not just inherit the CSS override:**
The Passage (renders a different DOM tree), the marquee (renders a grid instead of a track),
the count-up (renders the final number), the magnetic button (skips the listener), the
spotlight (skips the listener), and the carousel (disables auto-advance).

---

## 9. Motion QA checklist

Before shipping any animated component:

- [ ] Only `transform`, `opacity`, `clip-path`, or `filter` are animated
- [ ] There is a documented reduced-motion path and it looks intentional, not broken
- [ ] Reveals use `once: true`
- [ ] No animation blocks interaction — buttons are clickable during their entrance
- [ ] Nothing animates on a hidden tab
- [ ] Tested at 6× CPU throttling in DevTools without frame drops
- [ ] Tested with a keyboard: focus is never lost mid-animation
- [ ] Tested on a touch device: no hover-only affordance is required to use the feature
