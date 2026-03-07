# About Page — Context

## Route: `/about` → `AboutComponent`

## Files
- `src/app/pages/about/about.component.ts`
- `src/app/pages/about/about.component.html`
- `src/app/pages/about/about.component.scss`

## TypeScript
- Simple component, no data arrays
- AOS init, scrollTo(0,0), isPlatformBrowser

## SCSS
```scss
:host {
  display: block;
  width: 100%;
}
```

## HTML Sections (in order)
1. **Hero** — Gradient background (no image), `min-h-[50vh] pt-24 md:pt-32`, "About", "About This Project"
2. **The Concept** — `max-w-3xl mx-auto`, explains: chose classic art, digital art museum, e-magazine format
3. **Justification** — `bg-surface/20`, "Why Classic Art?", 2 paragraphs on foundational art + accessible presentation
4. **Structure (What's Inside)** — 3-column grid with links:
   - Block 1: Introduction → `/introduction`
   - Block 2: Judith & Holofernes → `/judith`
   - Block 3: The Judgment of Paris → `/paris`
5. **Technology Stack** — 4-column grid (2 on mobile): Angular, Tailwind CSS, GSAP, AOS
6. **Credits** — Centered: "Jordan Cazares Elias", "English Class — 2026", "5th Semester Project"
7. **Back Home CTA** — "← Back to Home" → `/`
8. **Footer**

## Design Patterns
- Structure cards: `group p-8 border border-white/5 hover:border-gold/20 bg-surface/20`
- Tech stack: `p-5 border border-white/5 text-center`
- No images on this page, gradient-only hero

---
*Last updated: March 6, 2026*
