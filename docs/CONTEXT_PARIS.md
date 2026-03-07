# The Judgment of Paris Page — Context

## Route: `/paris` → `ParisComponent`

## Files
- `src/app/pages/paris/paris.component.ts`
- `src/app/pages/paris/paris.component.html`
- `src/app/pages/paris/paris.component.scss`

## TypeScript
- `paintings` array with 5 objects, each has: `artist`, `year`, `era`, `image`, `description`, `aspect`, optional `featured: true`
- Paintings in order:
  1. **Greek Ceramic** — "c. 500 BC", Classical Era, aspect-square
  2. **Roman Fresco** — "c. 50 AD", Roman Empire, aspect-[4/3]
  3. **Lucas Cranach the Elder** — "c. 1528", Renaissance, aspect-[4/3]
  4. **Peter Paul Rubens** — "c. 1632–1635", Baroque, aspect-[4/3], **featured: true**
  5. **Enrique Simonet** — "1904", Early 20th Century, aspect-[4/3]
- AOS init, scrollTo(0,0), isPlatformBrowser

## SCSS
```scss
:host {
  display: block;
  width: 100%;
}
```

## HTML Sections (in order)
1. **Hero** — Rubens painting background, `min-h-[60vh] pt-24 md:pt-32`, "Block 3 — Story", "The Judgment of Paris"
2. **The Myth** — `max-w-3xl mx-auto`, story of Eris → golden apple → three goddesses (Hera, Athena, Aphrodite), includes 3-card grid with each goddess's offer (power/wisdom/love), Paris chooses Aphrodite → Helen → Trojan War
3. **Paintings Across Time** — `max-w-5xl mx-auto`, same `@for` pattern as Judith, alternating layouts, featured callout for Rubens
4. **Key Insight** — Centered quote: "From clay pots to oil canvases, humans keep retelling the same stories."
5. **Navigation CTA** — "← Judith & Holofernes" + "About This Project →"
6. **Footer**

## Design Patterns
- Three Goddesses cards: `grid-cols-1 md:grid-cols-3 gap-5`, Aphrodite card has `border-gold/20 bg-gold/5` (highlighted)
- Same painting loop pattern as Judith (RTL alternating)
- Featured: Rubens with ring + callout

## Image URLs
1. Greek Ceramic: `upload.wikimedia.org/.../Judgement_of_Paris_Staatliche_Antikensammlungen_837.jpg`
2. Roman Fresco: `upload.wikimedia.org/.../Fresco_-_Wall_Fragment_with_the_Judgment_of_Paris.jpg`
3. Cranach: `upload.wikimedia.org/.../Lucas_Cranach_the_Elder_-_The_Judgment_of_Paris...`
4. Rubens (featured): `upload.wikimedia.org/.../Peter_Paul_Rubens_115.jpg`
5. Simonet: `upload.wikimedia.org/.../Enrique_Simonet_-_El_Juicio_de_Paris_-_1904.jpg`

---
*Last updated: March 6, 2026*
