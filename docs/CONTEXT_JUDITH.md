# Judith & Holofernes Page — Context

## Route: `/judith` → `JudithComponent`

## Files
- `src/app/pages/judith/judith.component.ts`
- `src/app/pages/judith/judith.component.html`
- `src/app/pages/judith/judith.component.scss`

## TypeScript
- `paintings` array with 5 objects, each has: `artist`, `year`, `era`, `image`, `description`, `aspect`, optional `featured: true`
- Paintings in order:
  1. **Sandro Botticelli** — "c. 1472", Renaissance, aspect-[3/4]
  2. **Michelangelo (Sistine Chapel)** — "c. 1508–1512", High Renaissance, aspect-square
  3. **Peter Paul Rubens** — "c. 1616", Baroque, aspect-[3/4]
  4. **Artemisia Gentileschi** — "c. 1620", Baroque, aspect-[3/4], **featured: true**
  5. **Francisco de Goya** — "c. 1819–1823", Romanticism, aspect-[3/4]
- AOS init, scrollTo(0,0), isPlatformBrowser

## SCSS
```scss
:host {
  display: block;
  width: 100%;
}
```

## HTML Sections (in order)
1. **Hero** — Artemisia painting background, `min-h-[60vh] pt-24 md:pt-32`, "Block 2 — Story", "Judith & Holofernes"
2. **The Story** — `max-w-3xl mx-auto`, 4 paragraphs telling the story: Holofernes besieges Bethulia → Judith's plan → banquet & decapitation → return & victory
3. **Why This Story?** — Centered text, explains why artists loved it (beauty, danger, courage, violence, surprising hero)
4. **Paintings Across Time** — `max-w-5xl mx-auto`, `@for` loop, alternating layout with `lg:[direction:rtl]`, each painting has: era tag, artist name, year, description, featured callout box
5. **Key Insight** — Centered quote: "Same story, different centuries. Each painting is a mirror of its time."
6. **Next Story CTA** — "Next: The Judgment of Paris" → `/paris`
7. **Footer**

## Design Patterns
- Painting grid: `grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`
- RTL trick for alternating: `i % 2 !== 0 ? 'lg:[direction:rtl]' : ''`
- Featured painting: `ring-2 ring-gold/30` on image, callout box with `border-l-2 border-gold/40 bg-gold/5`
- Era tags: `w-8 h-px bg-gold/40` line + text
- Spacing between paintings: `mb-28 last:mb-0`

## Image URLs
1. Botticelli: `upload.wikimedia.org/.../Sandro_Botticelli_-_Retour_de_Judith_1.JPG`
2. Michelangelo: `upload.wikimedia.org/.../Michelangelo%2C_Judith_and_Holofernes_01.jpg`
3. Rubens: `upload.wikimedia.org/.../Peter_Paul_Rubens_-_Judith_with_the_Head_of_Holofernes.jpg`
4. Artemisia (featured): `upload.wikimedia.org/.../Artemisia_Gentileschi_-_Judith_Beheading_Holofernes_-_WGA8563.jpg`
5. Goya: `upload.wikimedia.org/.../Judith_y_Holofernes_%28Goya%29.jpg`

---
*Last updated: March 6, 2026*
