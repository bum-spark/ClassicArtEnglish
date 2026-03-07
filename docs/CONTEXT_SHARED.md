# Shared Components & Global Styles — Context

## Navbar (`src/app/components/navbar/`)
- Fixed position, `mix-blend-exclusion`, z-index 9999
- Logo "Classic Art" left, links right: Home, Introduction, Judith, Paris, About
- `routerLinkActive="text-gold"` highlights active page
- Hamburger menu on mobile with backdrop-blur
- Padding reduces on scroll via `@HostListener('window:scroll')`
- `navbar.component.scss` is empty (all Tailwind)

## Cursor (`src/app/components/cursor/`)
- Custom golden circle (40px), `mix-blend-mode: difference`
- Animated with GSAP (`gsap.to` for position)
- 3 states: default (small), `--active` (hover links/buttons), `--text` (hover headings)
- **Touch device detection**: On mobile/touch, cursor is completely disabled:
  - `ontouchstart` / `maxTouchPoints` check
  - Cursor element hidden (`display: none`)
  - Injects `* { cursor: auto !important; }` to restore native cursor
  - All mousemove/mouseout listeners are skipped
- Uses inline template, no external HTML file

## Global Styles (`src/styles.scss`)
- `@import "tailwindcss"` + Google Fonts (Playfair Display + Inter)
- `@theme` block defines all custom colors and fonts for Tailwind
- Base reset inside `@layer base` (important! so Tailwind utilities like `mx-auto` can override `margin: 0`)
- Custom cursor CSS classes (`.custom-cursor`, `--active`, `--text`)
- Custom scrollbar (gold-themed, 6px)
- `::selection` with gold background
- AOS timing override
- Routed components selector: `app-root, app-home, app-introduction, app-judith, app-paris, app-about { display: block; width: 100%; }`
- Utility classes: `.text-gradient-gold`, `.blend-exclusion`, `.section-divider`

## Color Palette
| Name | Hex | CSS Variable |
|---|---|---|
| background | #1a1410 | --color-background |
| surface | #2a2118 | --color-surface |
| surface-light | #3d3228 | --color-surface-light |
| gold | #d4a853 | --color-gold |
| gold-light | #e8c97a | --color-gold-light |
| gold-dark | #b08930 | --color-gold-dark |
| ivory | #f5f0e8 | --color-ivory |
| ivory-dark | #e0d8c8 | --color-ivory-dark |
| parchment | #c9b896 | --color-parchment |
| renaissance-red | #8b2e2e | --color-renaissance-red |
| renaissance-red-light | #a84040 | --color-renaissance-red-light |
| olive | #2d4a3e | --color-olive |
| olive-light | #3d6553 | --color-olive-light |

## App Component (`src/app/app.component.*`)
- Template: `<app-cursor>` + `<app-navbar>` + `<main class="block w-full"><router-outlet></router-outlet></main>`
- SCSS: `:host { display: block; width: 100%; }`, `main { display: block; width: 100%; min-height: 100vh; }`
- Routes (`app.routes.ts`): `''` → Home, `'introduction'` → Introduction, `'judith'` → Judith, `'paris'` → Paris, `'about'` → About, `'**'` → redirect to `''`

## Consistent Patterns Across All Pages
| Pattern | Value |
|---|---|
| Hero (home) | `min-h-screen flex items-center justify-center` |
| Hero (internal) | `min-h-[60vh] flex items-end pt-24 md:pt-32 pb-20 md:pb-28` |
| Section padding | `py-28 md:py-36 px-8 sm:px-12` |
| Container | `max-w-5xl mx-auto` or `max-w-3xl mx-auto` |
| Alternating bg | `bg-surface/20 border-t border-b border-white/5` |
| AOS | `data-aos="fade-up"` with `data-aos-delay` |
| Images | `opacity-80 hover:opacity-100 transition-opacity duration-500` |
| Footer | Same structure on all pages |

## Known Issues Fixed
1. ✅ AOS CSS was missing from `angular.json` → Added `node_modules/aos/dist/aos.css` to styles array
2. ✅ Centering broken by `* { margin: 0 }` outside layer → Moved to `@layer base`
3. ✅ Routed components had no width → Added global selector in `styles.scss`
4. ✅ Cursor stayed visible on mobile after tap → Added touch device detection, disabled entirely on mobile

---
*Last updated: March 6, 2026*
