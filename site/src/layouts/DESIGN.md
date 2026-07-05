# Design Brief — The Sepulchre

Site-wide styling lives in `Base.astro` as a single global stylesheet (`<style is:global>`)
since every page's markup is rendered through `<slot />` and needs to share the same
classes (`.card`, `.tag`, `.conflict`, `.filter`, `.prose`, table/iframe styles, etc.).

## Direction

The site is a community archive of Horus Heresy 3rd edition homebrew rules — a reference
tool people dip into before a game to play different missions, rules, or add units. It's not a marketing page. The brief was to move it away from a
generic light "docs site" look and toward something that feels like it belongs next to a
Forge World **Black Book** or **Liber** on the shelf: a leather-bound Imperial tome, not a
sci-fi app.

Explicitly avoided: neon glow, cyberpunk scanlines, rounded "friendly SaaS" corners,
gradient-heavy glassmorphism. Those read as tech/sci-fi rather than gothic/industrial
Imperium.

Chosen instead: Industrial gothic. Restraint matters — the content is dense reference tables and
rules text, so decoration stays at the frame (header, card border, tags) and never
competes with body readability.

## Typography

Triple stack, all serif — no UI sans-serif anywhere:

- **Cinzel** — brand wordmark, nav labels, table headers, tags, section overlines.
  Roman-inscription capitals; reads as carved/engraved, fitting Imperial iconography.
- **Cormorant Garamond** — h1/h2/h3. Elegant, tight leading, "illuminated manuscript"
  chapter-heading feel without sacrificing legibility at heading sizes.
- **Crimson Pro** — body text. A warm, highly readable book serif for long-form rules
  text and dense tables (16–18px range).

Loaded via Google Fonts `<link>` in `Base.astro`'s `<head>`.

## Color

CSS custom properties defined once in `:root` (see `Base.astro`):

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0d0b0a` | page background — near-black, warm not blue |
| `--bg-raised` / `--bg-raised-2` | `#16120f` / `#1b1611` | card/input surfaces |
| `--fg` | `#e6dfd0` | body text — bone/parchment, not pure white |
| `--muted` | `#9c8f7c` | secondary text (bylines, counts) |
| `--line` / `--line-soft` | `#382d21` / rgba | borders, table rules |
| `--brass` | `#a9863f` | structural gilt lines (header rule, brand mark) |
| `--gold` | `#c7a355` | interactive/highlight accent — hover states, table headers, tag text |
| `--accent` | `#d9635a` | links, primary interactive red |
| `--accent-dim` | `#7a2420` | card left-border "chapter marker," decorative-only red |

Contrast was checked against `--bg` (WCAG relative luminance): `--fg` ≈15:1, `--muted`
≈7:1, `--accent` ≈6:1, `--gold` ≈6:1 — all comfortably pass AA for body text at these
sizes. `--accent-dim` is decorative/structural only (borders), never used for text.

Two reds are deliberately kept separate: `--accent-dim` (deep oxblood, low-contrast,
structural) versus `--accent` (brighter, readable) for actual link text — a single
"book cover red" isn't legible enough on near-black to use for text.

## Structural motifs (the "industrial/gothic" part)

- **Square corners everywhere** (`--radius: 0`) — cards, tags, inputs, buttons, the PDF
  iframe. No rounded corners at all; reads as machined/stamped rather than app-like.
- **Header treatment**: a double hairline (brass + shadow line) instead of a single
  border, echoing gilt tooling/fillet lines on a book cover, plus a small rotated-square
  ("◇") mark before the wordmark — a printer's-ornament stand-in for a seal/icon, drawn
  in CSS rather than an image or emoji.
- **Card left border**: a 3px oxblood bar per card, standing in for a chapter/section
  marker in an illuminated manuscript; brightens to gold on hover as the only motion cue.
- **Vignette, not glow**: the body background uses two subtle radial gradients that
  darken toward the edges (like an old scan/photograph), instead of a colored glow bloom
  — glow reads sci-fi, vignette reads print/photographic.
- **Tags** styled as small gold-outlined stamps (Cinzel caps, tight tracking) rather than
  soft pill chips.

## Accessibility / UX baseline

- `prefers-reduced-motion` respected globally (transitions collapse to ~0).
- Visible `:focus-visible` ring (gold, 2px offset) on all interactive elements.
- All color pairings checked for ≥4.5:1 contrast at body-text sizes (see table above).
- `main { overflow-x: auto }` plus `max-width: 100%` on tables/inputs/iframe so dense
  rules tables don't break mobile layout.
- Single global stylesheet in the layout (`is:global`) is intentional: this is a shared
  chrome + content-class system, not component-scoped UI, so scoping would silently fail
  to style slotted page content.

## Open ideas (not yet implemented)

- Subtle paper/leather grain texture (inline SVG `feTurbulence` data URI, very low
  opacity) for extra tactility — held back to avoid adding a texture over dense tables
  before checking it doesn't hurt legibility.
- Corner brackets on cards (heraldic frame corners) — considered too busy for a page
  that may render dozens of cards (e.g. tweaks list); left off but very intrigued.
- Drop caps on the first paragraph of `.prose` (set readme content) for the
  illuminated-manuscript feel on longer-form pages.
