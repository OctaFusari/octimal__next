# OCTIMAL — Next.js Website

Sito web completo per OCTIMAL, studio di Human Factors Engineering e UX/UI Design.

## Stack

- **Next.js 14** (App Router)
- **Three.js** + `@react-three/fiber` — anelli 3D animati interattivi
- **Framer Motion** — motion design, animazioni scroll bidirezionali, page transitions
- **Lenis** — smooth scroll
- **Tailwind CSS** — utility classes
- **Montserrat** (titoli) + **Outfit** (corpo testo) — Google Fonts

## Setup

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

## Struttura

```
src/
├── app/
│   ├── layout.tsx          # Root layout (font, cursor, smooth scroll)
│   ├── page.tsx            # Home
│   ├── about/page.tsx      # Chi siamo
│   ├── sectors/page.tsx    # Settori
│   └── services/page.tsx   # Servizi
├── components/
│   ├── three/
│   │   └── ThreeRings.tsx  # Anelli 3D Three.js interattivi
│   ├── ui/
│   │   ├── AnimateInView.tsx   # Scroll animations (up & down)
│   │   ├── SplitText.tsx       # Word-by-word text reveal
│   │   ├── CustomCursor.tsx    # Cursore personalizzato
│   │   ├── SmoothScroll.tsx    # Lenis wrapper
│   │   └── PageTransition.tsx  # Transizioni tra pagine
│   ├── sections/
│   │   ├── HomeHero.tsx
│   │   ├── HomePreview.tsx
│   │   └── HomeTips.tsx
│   └── layout/
│       └── Navbar.tsx
├── lib/
│   └── motionVariants.ts   # Framer Motion variants riutilizzabili
└── styles/
    └── globals.css
```

## Caratteristiche principali

- **Anelli 3D Three.js**: flottano, ruotano, reagiscono al mouse e al touch
- **Animazioni bidirezionali**: si attivano sia scrollando giù che su (once: false)
- **SplitText**: ogni parola appare con animazione word-by-word
- **Page transitions**: fade smooth tra pagine con AnimatePresence
- **Cursore custom**: punto + ring con lag effect, si trasforma su elementi interattivi
- **Marquee animato**: testo scorrevole nella homepage
- **Tab interattivi**: settori e servizi con AnimatePresence per switch content
- **Timeline**: storia dello studio con linea verticale animata
- **Noise texture overlay**: grain sottile su tutto il sito

## Pagine

| Pagina | Percorso | Contenuto |
|--------|----------|-----------|
| Home | `/` | Hero, anteprima servizi, focus Africa, UX Tips |
| Chi siamo | `/about` | Storia, valori, timeline, team, focus Africa |
| Settori | `/sectors` | 6 settori con metriche di impatto, tab interattivi |
| Servizi | `/services` | UI/UX Design, UX Audit & Research, UX Consultancy |

## Personalizzazione

### Colori (globals.css)
```css
:root {
  --teal: #00C9A7;
  --purple: #7B4FD8;
  --dark: #0A0A0A;
}
```

### Anelli Three.js
Ogni pagina ha la propria configurazione rings in cima al file, modificabile:
```ts
const RINGS = [
  { position: [4, 1.8, -1], rotation: [-0.3, 0.2, -0.4], scale: 1.5, ... }
]
```
