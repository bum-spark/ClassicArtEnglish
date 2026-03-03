# Classic Art — Proyecto Completo de Angular (Contexto para Continuación)

## 1. Resumen General del Proyecto

**Classic Art** es una revista digital (e-magazine) interactiva sobre historia del arte clásico, creada como proyecto para una clase de inglés de 5to cuatrimestre universitario. Todo el contenido está escrito en **inglés básico/intermedio**. El sitio tiene un diseño visual experimental, oscuro y elegante, inspirado en museos y galerías.

- **Repositorio GitHub**: `bum-spark/ClassicArtEnglish`
- **URL en vivo**: [https://bum-spark.github.io/ClassicArtEnglish/](https://bum-spark.github.io/ClassicArtEnglish/)
- **Autor**: Jordan Cazares Elias — English Class 2026

---

## 2. Stack Tecnológico

| Tecnología | Versión / Detalle |
|---|---|
| **Angular** | ~v19, standalone components, SCSS, zone change detection |
| **Tailwind CSS 4** | Vía `@tailwindcss/postcss`, config en `.postcssrc.json` |
| **GSAP** | Animación de cursor personalizado + animaciones hero |
| **AOS (Animate On Scroll)** | `duration: 800, once: true, offset: 80` |
| **Google Fonts** | Playfair Display (headings) + Inter (body) |
| **GitHub Pages** | Deploy automático via GitHub Actions |

### Configuración PostCSS (`.postcssrc.json`)
```json
{ "plugins": { "@tailwindcss/postcss": {} } }
```

---

## 3. Paleta de Colores (definida en `styles.scss` con `@theme`)

| Nombre | Hex | Uso |
|---|---|---|
| `background` | `#1a1410` | Fondo principal (oscuro cálido) |
| `surface` | `#2a2118` | Tarjetas, secciones alternas |
| `gold` | `#d4a853` | Acentos, bordes, texto destacado |
| `ivory` | `#f5f0e8` | Texto principal claro |
| `renaissance-red` | `#8b2e2e` | Acentos rojos |
| `olive` | `#2d4a3e` | Acentos verdes |
| `parchment` | `#c9b896` | Texto secundario |

---

## 4. Estructura de Archivos

```
ClassicArt/
├── .github/workflows/deploy.yml    ← GitHub Actions deploy
├── angular.json
├── package.json
├── tsconfig.json / tsconfig.app.json / tsconfig.spec.json
├── server.ts
├── public/.nojekyll
├── src/
│   ├── index.html                  ← SPA redirect script para GitHub Pages
│   ├── 404.html                    ← Redireccion SPA para GitHub Pages
│   ├── main.ts / main.server.ts
│   ├── styles.scss                 ← Estilos globales + @theme de Tailwind
│   ├── app/
│   │   ├── app.component.ts/html/scss
│   │   ├── app.config.ts / app.config.server.ts
│   │   ├── app.routes.ts           ← 5 rutas + wildcard
│   │   ├── components/
│   │   │   ├── cursor/             ← Cursor dorado personalizado (GSAP)
│   │   │   └── navbar/             ← Navbar fija con hamburguesa responsive
│   │   └── pages/
│   │       ├── home/               ← Página de inicio
│   │       ├── introduction/       ← Las 6 eras del arte
│   │       ├── judith/             ← Historia de Judith y Holofernes
│   │       ├── paris/              ← Mito del Juicio de Paris
│   │       └── about/              ← Créditos y stack técnico
│   └── assets/
```

---

## 5. Rutas (`app.routes.ts`)

| Ruta | Componente | Descripción |
|---|---|---|
| `''` | `HomeComponent` | Página de inicio con hero, eras, featured stories |
| `'introduction'` | `IntroductionComponent` | Las 6 eras del arte con imágenes |
| `'judith'` | `JudithComponent` | Historia de Judith — 5 pinturas |
| `'paris'` | `ParisComponent` | Mito de Paris — 5 pinturas |
| `'about'` | `AboutComponent` | Créditos, concepto, stack técnico |
| `'**'` | redirect → `''` | Wildcard redirect |

---

## 6. Componentes Compartidos

### Cursor (`components/cursor/`)
- Círculo dorado de 40px con `mix-blend-mode: difference`
- Animado con GSAP (`gsap.to` con `xPercent/yPercent`)
- Se agranda al hacer hover sobre links y headings
- Usa `isPlatformBrowser` check para SSR safety
- Tiene 3 estados CSS: `.custom-cursor`, `.cursor-hover`, `.cursor-click`

### Navbar (`components/navbar/`)
- Posición fija, `mix-blend-exclusion`
- Logo "Classic Art" a la izquierda
- Links: Home, Introduction, Judith, Paris, About
- `routerLinkActive="text-gold"` para resaltar página actual
- Menú hamburguesa en mobile con `backdrop-blur`
- Padding se reduce al hacer scroll (detectado con `@HostListener('window:scroll')`)

---

## 7. Páginas — Detalle de Contenido

### 7.1 Home (`pages/home/`)

**TypeScript**: Contiene array `periods` con 6 eras:
1. Classical Antiquity (800 BCE – 500 CE)
2. Middle Ages (500 – 1400)
3. Renaissance (1400 – 1600)
4. Baroque & Rococo (1600 – 1800)
5. Modern Era (1800 – 1950)
6. Contemporary (1950 – Present)

Cada una tiene: `era`, `years`, `description`, `colorClass` (gradient), `icon` (emoji).

**HTML Secciones**:
1. **Hero**: Mona Lisa como background, título "Classic Art", subtítulo, botón "Begin Your Journey"
2. **Why Art Matters**: 3 tarjetas (Visual History, Cultural Mirror, Timeless Beauty)
3. **The Six Eras**: Grid de 3 columnas con las 6 eras (con gradientes)
4. **Featured Stories**: 2 tarjetas con imágenes (Judith y Paris) que linkan a sus páginas
5. **CTA**: "Ready to Explore?"
6. **Footer**: "Classic Art Magazine © 2026"

### 7.2 Introduction (`pages/introduction/`)

**HTML Secciones**:
1. **Hero**: School of Athens como background
2. **Understanding Time**: Texto introductorio
3. **6 Periodos del arte** (cada uno con layout alternado texto/imagen):
   - Classical Era → Colosseum + Pompeii fresco
   - Middle Ages → Giotto's Lamentation
   - Renaissance → Botticelli's Birth of Venus
   - Baroque → Da Vinci's Last Supper
   - 19th Century → Monet Water Lilies + Van Gogh Starry Night
   - 20th Century → Munch's The Scream
   - Present Day → texto sin imagen
4. **Next Stories CTA**: Links a Judith y Paris

### 7.3 Judith (`pages/judith/`)

**TypeScript**: Array `paintings` con 5 obras:
1. Botticelli — "The Return of Judith to Bethulia" (1472)
2. Michelangelo — "Judith and Holofernes" (Sistine Chapel, 1509)
3. Rubens — "Judith with the Head of Holofernes" (1616)
4. **Artemisia Gentileschi** — "Judith Slaying Holofernes" (1620) ← `featured: true`
5. Goya — "Judith and Holofernes" (1820)

**HTML Secciones**:
1. **Hero**: Imagen de Artemisia como background
2. **The Story**: Narrativa de Judith (3 párrafos)
3. **Why This Story**: Explicación de por qué importa
4. **5 Pinturas**: Loop `@for` con layout alternado (imagen izq/der)
5. **Key Insight**: Cita sobre interpretaciones de género
6. **Next Story CTA**: Link a Paris

### 7.4 Paris (`pages/paris/`)

**TypeScript**: Array `paintings` con 5 obras:
1. Greek Ceramic — "The Judgment of Paris" (c. 550 BCE)
2. Roman Fresco — "The Judgment of Paris" (c. 100 CE)
3. Cranach the Elder — "The Judgment of Paris" (1530)
4. **Rubens** — "The Judgment of Paris" (1639) ← `featured: true`
5. Simonet — "The Judgment of Paris" (1904)

**HTML Secciones**:
1. **Hero**: Imagen de Rubens como background
2. **The Myth**: Narrativa del mito (3 párrafos)
3. **Three Goddesses**: 3 tarjetas (Hera/Athena/Aphrodite) con colores y ofertas
4. **5 Pinturas**: Loop `@for` con layout alternado
5. **Key Insight**: Cita sobre la naturaleza humana
6. **Navigation CTA**: Links a Judith y About

### 7.5 About (`pages/about/`)

**HTML Secciones**:
1. **Hero**: Gradient background (sin imagen)
2. **The Concept**: Por qué elegimos arte clásico
3. **Justification**: 3 párrafos sobre el proyecto
4. **Structure**: 3 tarjetas (Stories, Visual Timeline, About)
5. **Tech Stack**: Grid con Angular, Tailwind, GSAP, AOS, GitHub Pages, Wikimedia Commons
6. **Credits**: Jordan Cazares Elias, English Class 2026
7. **Back Home CTA**

---

## 8. Estilos Globales (`styles.scss`)

### Importaciones y Theme
```scss
@import "tailwindcss";

@theme {
  --color-background: #1a1410;
  --color-surface: #2a2118;
  --color-gold: #d4a853;
  --color-ivory: #f5f0e8;
  --color-renaissance-red: #8b2e2e;
  --color-olive: #2d4a3e;
  --color-parchment: #c9b896;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
}
```

### Estilos Globales Clave
- `cursor: none !important` en todo el documento (cursor personalizado)
- `.custom-cursor`: Círculo dorado 40px, `mix-blend-mode: difference`
- `.text-gradient-gold`: Gradiente dorado para texto
- `.section-divider`: Línea decorativa dorada
- Scrollbar personalizada dorada
- `::selection` con fondo dorado

---

## 9. GitHub Pages Deployment

### Workflow (`.github/workflows/deploy.yml`)
- **Trigger**: Push a `main`
- **Steps**: Checkout → Node 20 setup → `npm ci` → `npx ng build --base-href /ClassicArtEnglish/` → Upload artifact → Deploy to Pages
- **Output**: `dist/classic-art/browser`

### SPA Routing
- **`404.html`**: Captura rutas que no existen y redirige a `index.html` con la ruta como query parameter
- **`index.html`**: Script que lee el query parameter y usa `history.replaceState` para restaurar la URL original
- **`.nojekyll`**: Evita procesamiento Jekyll de GitHub Pages

---

## 10. Patrones de Diseño Consistentes

| Patrón | Valor |
|---|---|
| Padding horizontal | `px-8 sm:px-12` |
| Spacing vertical de secciones | `py-28 md:py-36` |
| Contenedor centrado | `max-w-5xl mx-auto` |
| Gaps en grids | `gap-8` / `gap-16` |
| Secciones alternas | `bg-surface/20` |
| Animaciones scroll | AOS `data-aos="fade-up"` |
| Imágenes | `rounded-lg shadow-2xl object-cover` |
| Texto body | `text-ivory/80` o `text-parchment` |
| Headings | `font-display text-gold` |
| Footer consistente | Misma estructura en todas las páginas |

---

## 11. URLs de Imágenes Verificadas (Todas funcionando)

### Home
- Hero: Mona Lisa → `upload.wikimedia.org/.../Mona_Lisa%2C_by_Leonardo_da_Vinci...`
- Featured Judith: Artemisia Gentileschi → `upload.wikimedia.org/.../Artemisia_Gentileschi_-_Judith...`
- Featured Paris: Rubens → `upload.wikimedia.org/.../Peter_Paul_Rubens_115.jpg`

### Introduction
- School of Athens, Colosseum, Pompeii, Giotto, Botticelli, Da Vinci, Monet, Van Gogh, Munch

### Judith (5 pinturas)
- Botticelli, Michelangelo, Rubens, Artemisia (featured), Goya

### Paris (5 pinturas)
- Greek Ceramic, Roman Fresco, Cranach, Rubens (featured), Simonet

> **Nota**: Todas las URLs de imágenes fueron verificadas individualmente con HTTP requests. Si alguna deja de funcionar en el futuro, es porque Wikimedia cambió la URL.

---

## 12. Comandos Útiles

```bash
# Servir localmente
cd "c:\Users\jorda\OneDrive\Escritorio\Uni\5TO CUATRIMESTRE\Paginas web\Proyecto\ClassicArt"
npx ng serve --open

# Build para GitHub Pages
npx ng build --base-href /ClassicArtEnglish/

# Deploy (automático)
git add -A
git commit -m "descripción del cambio"
git push origin main
# GitHub Actions se encarga del deploy automáticamente
```

---

## 13. Advertencias de Build Conocidas (no bloquean)

1. **Sass @import deprecation**: Causado por Tailwind CSS 4 syntax — ignorar
2. **AOS CommonJS warning**: AOS no tiene ESM build — ignorar
3. **14 selector errors**: Selectores de Tailwind con `&` — no afectan funcionalidad

---

## 14. Restricción Importante

⚠️ **El directorio del proyecto está FUERA del workspace de VS Code.** El workspace apunta a la carpeta "Cosas", pero el proyecto está en:
```
c:\Users\jorda\OneDrive\Escritorio\Uni\5TO CUATRIMESTRE\Paginas web\Proyecto\ClassicArt\
```
Por lo tanto, **toda edición de archivos debe hacerse vía comandos de PowerShell** (`Set-Content -Encoding UTF8`) en la terminal, no con las herramientas de edición de archivos del workspace.

---

## 15. Historial de Commits

1. `0bcfc5c` — Primer commit (proyecto completo)
2. `615b9e0` — Add GitHub Pages deployment workflow + SPA routing
3. `4e23687` — Fix layout spacing, centering, margins + fix all broken image URLs

---

*Documento generado el 2 de marzo de 2026*
