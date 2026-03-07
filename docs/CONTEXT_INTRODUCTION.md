# Introduction Page — Context

## Route: `/introduction` → `IntroductionComponent`

## Files
- `src/app/pages/introduction/introduction.component.ts`
- `src/app/pages/introduction/introduction.component.html`
- `src/app/pages/introduction/introduction.component.scss`

## TypeScript
- Simple component, no arrays or data logic
- AOS init with `duration: 800, once: true, offset: 80`
- `window.scrollTo(0, 0)` on init
- `isPlatformBrowser` check

## SCSS
```scss
:host {
  display: block;
  width: 100%;
}
```

## HTML Sections (in order)
1. **Hero** — School of Athens background, `min-h-[60vh] pt-24 md:pt-32`, "Block 1", "Introduction to Art History"
2. **Understanding Time** — `max-w-3xl mx-auto`, explains BC/AD, what "classical" means, influence of Greece and Rome
3. **Classical Era (800 BC – 476 AD)** — 2-column grid, text left / images right (Colosseum + Pompeii fresco), tags: Mythology, Philosophy, Sculpture
4. **Middle Ages (500 – 1400)** — 2-column grid reversed, image left (Giotto Lamentation) / text right, tags: Christianity, Romanesque, Gothic
5. **Renaissance, Baroque & Neoclassicism (1400 – 1800)** — 2-column grid, text left / images right (Botticelli Venus + Da Vinci Last Supper), explains perspective, proportion, light
6. **19th Century (1800 – 1899)** — 2-column reversed, images left (Monet + Van Gogh) / text right, Industrial Revolution, Impressionism, Realism
7. **20th Century (1900 – 1999)** — 2-column grid, text left / image right (Munch Scream), camera, Expressionism, Surrealism, Postmodern art, Duchamp
8. **Present Day (2000 – Today)** — Centered text, `max-w-3xl`, 3D worlds, AI, NFTs
9. **Next Stories CTA** — Links to `/judith` and `/paris`
10. **Footer**

## Design Patterns
- Alternating sections: bg-surface/20 with border-t border-b border-white/5
- Alternating grid layouts: `order-1/order-2` for reversed layouts on desktop
- Tags: `px-3 py-1.5 text-xs border uppercase tracking-wider`
- Images: `aspect-video` or `aspect-[4/3]`, `opacity-80 hover:opacity-100`

## Image URLs (all verified working)
- Hero: School of Athens by Raphael
- Classical: Colosseum + Pompeii fresco (Casa dei Vettii)
- Middle Ages: Giotto's Lamentation
- Renaissance: Botticelli Birth of Venus + Da Vinci Last Supper
- 19th Century: Monet Impression Sunrise + Van Gogh Starry Night
- 20th Century: Munch The Scream

---
*Last updated: March 6, 2026*
