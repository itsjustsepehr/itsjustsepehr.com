# itsjustsepehr — Design system

## Direction

A minimal, text-first personal website for Sepehr: software engineering, banking systems, and learning in public. Spacious layouts, neutral surfaces, restrained typography, and a single action accent. No terminal aesthetic, generated illustrations, decorative gradients, or continuous scroll effects.

## Color tokens

| Token | Value | Role |
| --- | --- | --- |
| `--color-bg` | `#F8FAFC` | Page background |
| `--color-surface` | `#FFFFFF` | Cards and surfaces |
| `--color-ink` | `#1E293B` | Primary text |
| `--color-ink-muted` | `#526176` | Secondary text |
| `--color-ink-disabled` | `#64748B` | Disabled text |
| `--color-border` | `#CBD5E1` | Decorative dividers and card borders |
| `--color-disabled-bg` | `#E2E8F0` | Disabled and placeholder backgrounds |
| `--color-primary` | `#1D4ED8` | Links and primary actions |
| `--color-on-primary` | `#FFFFFF` | Primary action text |
| `--color-focus` | `#1D4ED8` | Focus outline |

Active body text must meet WCAG AA (4.5:1 for ordinary text). Border color is decorative; do not rely on it alone to identify controls or selected states. Selection includes a check mark, heavier border, and `aria-pressed`, not just color. Do not use disabled text tokens for ordinary body copy.

## Typography

- English: self-hosted Inter Variable.
- Persian: self-hosted Vazirmatn Variable.
- Code: platform monospace stack; no third custom family.
- Body: 16px, line-height 1.75; Persian 1.95.
- Reading measure: at most 65ch for prose.
- H1: `clamp(2.5rem,5.5vw,4.5rem)`; article headings use a smaller 2–3.5rem range.
- H2: `clamp(1.75rem,3vw,2.5rem)`.
- Headings: weight 600, compact line-height, balanced wrapping.
- No italics. Emphasis uses weight. Underlines indicate links only.
- Persian articles set `lang="fa" dir="rtl"`; code and navigation retain LTR direction.

## Layout and spacing

Use a 4px spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80. Main container is 1152px wide, with 24px desktop and 20px mobile gutters. Sections have 80px vertical padding, reduced to 48px on narrow screens. Reading pages use a narrower 65ch column.

Homepage order:

1. Simple navigation: circular initial avatar, `itsjustsepehr.`, Writing, Categories, About.
2. Hero: eyebrow, headline, introduction, two CTAs, 4:5 portrait placeholder.
3. Latest writing: two-column cards, 16:9 cover, category/date/language, title, excerpt, read link.
4. Five category cards, each with a dedicated landing page.
5. About/experience summary with résumé and portfolio links.
6. Minimal copyright and navigation footer.

The hero headline is the focal point of the first screen. Later sections each have one clear heading. Cards collapse to a single column on small screens. Avoid truncated titles and fixed-height text areas.

## Components

- Buttons: minimum 48px height, 8px radius, visible text label. Primary button is blue; secondary is white with a border.
- Navigation and standalone text actions: minimum 44px targets.
- Cards: white, 1px neutral border, 12px radius, 24–32px internal spacing. No decorative shadows.
- Portrait: neutral 4:5 frame with initial placeholder. Avatar: circular initial placeholder.
- Article covers: neutral 16:9 SVG placeholders. Replace with owned images; preserve aspect ratio and descriptive alt text.
- Callout: semantic aside, neutral border, visible title, no color-only meaning.
- Language filters: progressive enhancement; all writing remains available without JavaScript.

## Interaction and accessibility

- Visible 3px focus outline with 4px offset.
- Press feedback: `transform: scale(.97)`; removed for reduced-motion users.
- No animation on filtering or other frequent actions.
- Scroll reveal uses IntersectionObserver once per section/card: opacity plus translateY(12px), 240ms, ease-out. No per-frame scroll handler.
- All animations remain below 300ms and use opacity/transform only.
- Content remains visible without JavaScript or IntersectionObserver.
- Respect `prefers-reduced-motion` and avoid revealing via animation in that mode.
- Semantic headings, named navigation regions, skip link, explicit document language, and time elements.
- Test keyboard navigation, zoom to 200%, narrow viewports, long Persian headings, reduced motion, and screen-reader announcements before a public release. These manual checks are not replaced by a successful build.

## Content and iteration

Articles have one primary category and multiple tags. English and Persian articles coexist; a language filter helps browsing. They are not assumed to be translations, so no false alternate-language SEO links are emitted. Résumé and portfolio details remain honest placeholders until supplied.

Start future iterations with real portrait, reviewed writing, verified experience, and real case studies. Preserve the restrained palette and reading-first layout.


## Current glass theme (supersedes the original light visual direction above)

All routes share the dark palette in `src/styles/global.css`; `home.css` owns
homepage layout and reusable glass surfaces, and `site.css` owns reading surfaces
and the shared navigation layout. Prose stays within 65ch.

The homepage has one React island for the approved shader and liquid button.
Retain offscreen/background pause, reduced-motion support, WebGL fallback, and
resource cleanup. Interior pages do not hydrate the hero.

`PostCard.astro` serves the homepage, writing index, and category listings.
`CategoryGrid.astro` serves both the homepage and category index. Placeholder
covers use SVG waves; real covers remain unchanged. Raster article covers are
also passed to social metadata; placeholder and SVG covers use a summary card.

Navigation uses two rows: brand first, then left-aligned links. Navigation stays
English/LTR on Persian pages. Persian typography uses inherited `:lang(fa)`.
Printing hides the site shell and controls while retaining article headers.
