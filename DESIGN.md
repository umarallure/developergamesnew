# The Developer Games — Design & Engineering Conventions

Internal reference for everyone implementing sections of this one-page site.
Read this fully before writing any component.

## Product

One-page site for **The Developer Games** — a skill-based hiring competition.
Message: **Build. Compete. Get hired.** Tone: direct, intelligent,
developer-aware, confident, slightly challenging. Never exaggerated
recruitment language, never fake stats/testimonials/prizes.

Feel: dark, precise, technical, editorial, premium, atmospheric
(references: spur.us, trionn.com). NOT: SaaS template, esports, cyberpunk,
hacker clichés, gaming HUD.

## Stack conventions

- Next.js 16 App Router, React 19, strict TS. No `any`.
- Server Components by default. `"use client"` only for GSAP, forms,
  pointer events, WebGL, browser APIs.
- Named exports for all components (no default exports), EXCEPT
  `skill-core-canvas.tsx` which is `export default` (dynamic import target).
- Imports via `@/` alias. Icons: `lucide-react` only. Class merging: `cn`
  from `@/lib/utils`.
- GSAP pattern (client components only):

```tsx
"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger, useGSAP);
// inside component:
useGSAP(() => { /* animations, ScrollTriggers */ }, { scope: sectionRef });
```

- Respect reduced motion in every bespoke animation:
  `usePrefersReducedMotion()` from `@/hooks/use-reduced-motion` — when true,
  show final states immediately, no pinning, no loops.
- Easing: `power3.out` (entrances), `power2.inOut` (movements). Durations
  0.6–1.1s. Staggers 0.06–0.12. NEVER elastic/bounce/back easing. No
  scroll hijacking. No pinned sections (the sticky Skill Core layer is
  already handled centrally).

## Design tokens (globals.css — already defined)

Tailwind color utilities (usable as `bg-*`, `text-*`, `border-*`):
`background` #091413 · `background-deep` #020909 · `surface` #0d1b18 ·
`surface-elevated` #10241f · `brand-dark` #285a48 · `brand-mid` #408a71 ·
`brand-light` #b0e4cc · `foreground` #ecf7f2 (text-primary) · `muted`
#91a8a0 (text-secondary) · `line` rgba(176,228,204,.14) (subtle border) ·
`line-active` rgba(176,228,204,.34) · `energy` #00dfdf · `energy-mid`
#006464 · `energy-deep` #004040 · `energy-text` #e9ffff · `danger` #ffa599.

**Cyan (`energy`) budget: ~2% of the page.** Only: Skill Core, primary CTA
specular highlight, active nav indicator, status dots, focused interaction
feedback, ONE accent in the hero headline. Everything else uses the green
family. Do not add glows to cards.

Fonts (Tailwind utilities): `font-display` (Space Grotesk — display
headings only), `font-sans` (Geist — body/nav), `font-mono` (Geist Mono —
labels/metadata). Body copy is sentence case; uppercase ONLY for eyebrows,
tech labels, metadata, section numbers.

Type scale:
- Hero headline: `font-display text-[clamp(2.9rem,8.5vw,8rem)] font-medium leading-[0.95] tracking-[-0.03em]`
- Section h2: `SectionHeading` component handles it (clamp 2.1→4rem)
- Manifesto statement: `font-display text-[clamp(1.8rem,3.8vw,3.5rem)] leading-[1.12] tracking-[-0.02em]`
- Card titles: `font-display text-xl md:text-2xl font-medium`
- Body: `text-base` / `text-[0.95rem]` `text-muted leading-relaxed`
- Tech labels: class `tech-label` (mono, 11px, uppercase, tracked)

Radii: 4–12px only (`rounded-md`, `rounded-[10px]`). Surfaces mostly flat
`bg-surface`/`bg-surface-elevated` with `border border-line`. No big glass
cards, no heavy shadows, no large rounded SaaS cards.

## Global helpers (globals.css)

- `.container-page` — page container (max-w 88rem + fluid padding). Every
  section wraps content in it.
- `.tech-label` — mono metadata label style.
- `.grid-faint` — 96px background grid lines (combine with masks/low opacity).
- `.corner-marks` — corner tick marks on framed blocks (uses ::after).
- `.marquee-track` — marquee animation (reduced-motion handled).
- `.status-dot` — pulsing cyan status dot (reduced-motion handled).

## Scroll reveals (already built — use, don't reinvent)

`RevealManager` (mounted once in page.tsx) animates every `[data-reveal]`
element: hidden via CSS (only when JS + motion OK), revealed with y+fade
stagger when its `[data-reveal-group]` ancestor enters the viewport.

Usage in sections: put `data-reveal-group` on the `<section>` root and
`data-reveal` on each child block that should stagger in (eyebrow, heading,
paragraphs, cards). No GSAP needed for plain entrances. Write bespoke GSAP
only for: hero entrance timeline, process line drawing, marquee (CSS), and
Skill Core.

## Section pattern

```tsx
<section
  id="tracks"                     // required anchor id
  aria-labelledby="tracks-title"  // ties to SectionHeading titleId
  data-reveal-group
  data-core-phase="2"             // ONLY hero=0, manifesto=1, tracks=2, process=3
  className="relative py-24 md:py-36"
>
  <div className="container-page">
    <SectionHeading index="02" label="THE TRACKS" titleId="tracks-title" title={...} />
    ...
  </div>
</section>
```

Section ids + numbering:
1. hero — inside `<main id="home">`, no own id needed, `data-core-phase="0"`
2. marquee — no id, thin transition band
3. `#about` manifesto — index "01 / THE IDEA", `data-core-phase="1"`
4. `#tracks` — "02 / THE TRACKS", `data-core-phase="2"`
5. `#process` — "03 / THE FORMAT", `data-core-phase="3"`
6. `#challenges` — "04 / SAMPLE CHALLENGES"
7. `#projects` — "05 / PROJECTS" (project index: title, stack, goal only;
   outside the story wrapper, solid background)
8. `#evaluation` — "06 / EVALUATION"
9. `#apply` — "07 / ENTRY"

**Sections inside the story wrapper (hero, marquee, manifesto, tracks,
process) must have TRANSPARENT backgrounds** — the WebGL core lives on a
sticky layer behind them. Sections after (challenges, evaluation, apply)
sit on the normal body background and may use `bg-background-deep` bands
and `border-t border-line` dividers.

Nav offset: fixed nav height is `var(--nav-height)` (4.25rem);
`scroll-padding-top` is already set globally — plain `<a href="#id">`
anchors scroll correctly and smoothly. No JS scrolling code.

## Shared components (already built)

- `SpecularButton` (`@/components/ui/specular-button`) — primary CTA
  (OGL shader highlight). Props: `children, href?, type?, size?
  ("sm"|"md"|"lg"), className?, disabled?, onClick?, onEnergizeStart?,
  onEnergizeEnd?`. With `href` renders an anchor. Client-only.
- `SecondaryButton` (`@/components/ui/secondary-button`) — bordered anchor
  with arrow. Props: `href, children, className?`. Server-safe.
- `SectionHeading` (`@/components/ui/section-heading`) — eyebrow row
  (index + rule + label) and optional h2. Props: `index, label, title?,
  titleId?, className?, titleClassName?`. Server-safe. Includes its own
  `data-reveal`s.

## Skill Core interaction channel

`@/components/skill-core/core-state.ts` exports a mutable `coreState`
(read by the scene every frame — never causes React renders) plus:
- `triggerCorePulse()` — hero CTA calls on hover/focus start
- `setCtaHover(bool)` — hero CTA hover state
- `setActiveTrack(index)` — tracks section on card hover/focus (0..3),
  -1 on leave

`SkillCoreStory` (already built) writes `phaseIndex/phaseProgress/storyT`
(0=hero → 3=process) and `pointerX/pointerY/pointerActive` (fine pointers,
normalized -1..1, +y up). The canvas layer: sticky full-viewport behind
content on md+, absolute hero-only at 60% opacity on mobile; it fades out
after the process section. It is `aria-hidden` + `pointer-events-none`.

## Data (import from `@/lib/constants`)

`NAV_LINKS, ORBIT_TRACKS, MARQUEE_ITEMS, TRACKS, PROCESS_STEPS, CHALLENGES,
CRITERIA, SKILL_SUGGESTIONS, EXPERIENCE_OPTIONS, SITE_NAME`. Copy lives
there — do not re-type content into components. Types in `@/types`.

## Brand

Wordmark: `THE DEVELOPER GAMES` (nav can use compact `DG_` mark +
full name). Treat as a technical system label. Status detail: `● SEASON 01`
(use `.status-dot`). No shields, mascots, trophies, controllers.

## Accessibility & quality bar

- Semantic landmarks; one h1 (hero headline); correct heading order after it.
- Keyboard operability everywhere; `:focus-visible` ring is global (cyan).
- Errors/status never color-only (icon + text).
- Canvas/decorative SVGs `aria-hidden`.
- No horizontal overflow at 320px+. Mobile layouts intentionally
  redesigned, not just stacked.
- No console errors, no hydration mismatches (no `Math.random()`/dates in
  render paths).
- Copy: use the provided content verbatim from constants; never invent
  stats, prizes, testimonials, or claims. Challenge cards are labeled as
  examples.
