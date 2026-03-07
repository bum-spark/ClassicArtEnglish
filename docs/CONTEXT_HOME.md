# Home Page — Context

## Route: `/` → `HomeComponent`

## Files
- `src/app/pages/home/home.component.ts`
- `src/app/pages/home/home.component.html`
- `src/app/pages/home/home.component.scss`

## TypeScript
- Uses GSAP for hero entrance animations (title, subtitle, CTA, divider, scroll indicator)
- Uses AOS for scroll animations on sections below the hero
- `periods` array with 6 eras: Classical Era, Middle Ages, Renaissance & Baroque, 19th Century, 20th Century, Present Day
- Each period has: `era`, `years`, `description`, `color` (gradient), `icon` (emoji)
- `isPlatformBrowser` check for SSR safety

## SCSS
```scss
:host {
  display: block;
  width: 100%;
}
```

## HTML Sections (in order)
1. **Hero Section** — Full-screen, Mona Lisa background (opacity-15), centered text "Classic Art", GSAP animations, "Start the Journey" button → `/introduction`, scroll indicator at bottom
2. **Why Art Matters** — Centered text, `max-w-3xl mx-auto text-center`, explains art as mirror of human expression
3. **Six Eras of Art (Timeline)** — 3-column grid (`lg:grid-cols-3`), loops `periods` array with `@for`, each card has gradient background, emoji, hover gold border animation
4. **Featured Stories** — 2-column grid, Judith card (Artemisia image) → `/judith`, Paris card (Rubens image) → `/paris`, aspect-ratio cards with overlay gradients
5. **CTA Section** — "Begin Your Journey Through Art History", "Start Reading" button → `/introduction`
6. **Footer** — "Classic Art" + "A project by Jordan Cazares Elias"

## Design Patterns
- Hero: `min-h-screen flex items-center justify-center` (full viewport, flexbox centered)
- Sections: `py-28 md:py-36 px-8 sm:px-12`
- Containers: `max-w-5xl mx-auto` (or `max-w-3xl` for text-heavy)
- AOS: `data-aos="fade-up"` with delays
- Alternating background: `bg-surface/30`

## Image URLs
- Hero: `upload.wikimedia.org/.../Mona_Lisa...`
- Judith featured: `upload.wikimedia.org/.../Artemisia_Gentileschi...`
- Paris featured: `upload.wikimedia.org/.../Peter_Paul_Rubens...`

---
*Last updated: March 6, 2026*
