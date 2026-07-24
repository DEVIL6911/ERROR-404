# REEF — Project Context

## Overview

A React/Vite single-page interactive comic-book landing page for REEF (environmental organization). The experience follows an emotional arc: **Curiosity → Concern → Mystery → Problem → Hope → Action**.

**Live dev server:** `http://localhost:5173`  
**Production build:** `npm run build` → outputs to `dist/`

---

## Stack

| Layer | Choice |
|---|---|
| Build | Vite 8 (`reef/`) |
| UI | React 19 + JSX |
| Styling | Tailwind v4 via `@tailwindcss/vite` plugin |
| Animations | Motion (`motion/react`) — **not** `framer-motion` |
| Scroll | Lenis smooth scroll + GSAP ScrollTrigger |
| 3D | Three.js (code-split via `React.lazy`) |
| Icons | Lucide React |
| Counters | react-countup |

---

## Project Structure

```
reef/
├── index.html                  # Minimal shell, Google Fonts (Cormorant Garamond + Outfit)
├── vite.config.js              # plugins: react + tailwindcss
├── package.json
└── src/
    ├── main.jsx                # React entry point (StrictMode)
    ├── index.css               # Tailwind import + @theme tokens + component classes + keyframes
    ├── App.jsx                 # Main layout, story state machine, global composition
    ├── data/
    │   └── chapters.js         # 5 chapter entries (id, image, ariaLabel, mood, keyText)
    ├── hooks/
    │   ├── useSmoothScroll.js  # Lenis instance + rAF loop
    │   ├── useScrollProgress.js # window.scrollY progress 0→1
    │   └── useReducedMotion.js # Centralized prefers-reduced-motion listener
    └── components/
        ├── Header.jsx
        ├── Footer.jsx
        ├── ScrollProgress.jsx
        ├── StoryTransition.jsx
        ├── ActionSection.jsx
        ├── ActionCard.jsx
        ├── ImpactStats.jsx
        ├── FinaleSection.jsx
        ├── ComicChapter.jsx
        ├── OceanParticles.jsx     # Canvas particle fallback
        ├── ParticlesBackground.jsx # Stub (tsparticles removed)
        └── Hero/
            ├── LandingHero.jsx
            └── CoralFragment.jsx   # Three.js low-poly coral + mobile SVG fallback
```

---

## Assets

- Chapter PNGs: `reef/public/assets/chapter-1-silent-ocean.png` through `chapter-5-your-turn.png`
- Source: `D:\hack-ocean\comic book\Chapter 1.png` → `Chapter 5.png`
- These are the primary assets; heavy (~7–8 MB each), loaded `lazy` after index 2

---

## State Machine (App.jsx)

1. **Landing** (`!storyStarted`) → Shows `LandingHero` with Three.js coral + intro text
2. **Transitioning** (`transitioning === true`) → `StoryTransition` overlay runs fade-to-black
3. **Comic** (`storyStarted`) → Renders `chapters.map(...)` → `FinaleSection`
4. **Action + Impact** → Always rendered below comic (not mutually exclusive)

`Header` CTA calls `handleStartStory`, which sets `transitioning = true`, then `StoryTransition` calls `onComplete`, which sets `storyStarted = true`.

---

## Design Tokens (index.css `@theme`)

All 16 original CSS custom properties are mapped here:

- Backgrounds: `--deep` (#021018), `--abyss` (#010b12), `--ocean` (#04344a)
- Tones: `--teal` (#0a6b7c), `--aqua` (#2ec4b6), `--glow` (#5eead4)
- Accents: `--coral` (#ff6b8a), `--coral-soft` (#ff9eb5), `--sand` (#f0e6d3)
- Text: `--mist` (rgba white), `--muted` (rgba blue-white)
- Glass: `--glass`, `--glass-border`
- Fonts: `--font-display`, `--font-body`

---

## Key Components & Logic

### LandingHero
- Full-viewport intro with headline, supporting text, two CTAs
- `<Suspense>` boundary wraps `CoralFragment` with a skeleton fallback
- `OceanParticles` renders a light canvas particle layer
- CTA click triggers `StoryTransition`

### CoralFragment
- Desktop: low-poly Three.js coral with branch geometry (8 × displaced cylinder) + icosahedron core + point lights + mouse parallax
- Mobile (`< 768px`): returns an animated SVG coral fragment instead
- Cleanup: stores all created geometries in an array and disposes them properly

### StoryTransition
- Drives a fade-to-black sequence using `motion` + `setTimeout`
- Respects `prefers-reduced-motion` by skipping straight to `onComplete`
- Fixed: dependency array uses `[isActive, onComplete, prefersReducedMotion]`

### ComicChapter
- Renders a single `<img>` per chapter PNG with `object-contain`, `lazy` loading, and `ariaLabel`
- Painterly CSS fallback (`reef-fallback` classes mapped from `mood`):
  - `beauty-to-loss` / `mystery-hope` → `.healthy`
  - `renewal` → `.planted`
  - default → `.bleached`
- Chapter title and `keyText` overlay at bottom via Motion `whileInView`

### ActionSection / ActionCard
- 2×2 grid (1 col on mobile) with glass-card hover animations
- Icons: 🪸 🌊 🐠 📢

### ImpactStats
- 4 animated counters via `react-countup` + `useInView`
- Numbers: 12,840+ volunteers, 87 projects, 2.4M+ fragments, 36 species

### FinaleSection
- "THE STORY ENDS HERE." → "THE MISSION DOESN'T." reveal sequence

---

## Hooks

| Hook | Purpose |
|---|---|
| `useSmoothScroll` | Creates single Lenis instance + rAF loop; `destroy()` on unmount |
| `useScrollProgress` | Calculates `window.scrollY` / docHeight ratio |
| `useReducedMotion` | Reads `prefers-reduced-motion: reduce` + listens for changes |

---

## Important Caveats & Known Issues

1. **tsparticles removed** — `ParticlesBackground.jsx` is a no-op stub. `OceanParticles.jsx` provides a lightweight canvas particle fallback instead.
2. **ScrollTrigger not actually wired** — The plan specified GSAP + ScrollTrigger integration, but the current build relies on Motion + Lenis + manual scroll progress only. If complex scroll timelines are needed later, they must be installed and integrated.
3. **Images are huge** — 5 PNGs total ~38 MB. On production, serve WebP variants with `srcset`. Current code uses `loading="lazy"` and `decoding="async"` as mitigation.
4. **Dev server required** — Do NOT open `reef/index.html` directly in a browser. The React app can only run through `npm run dev` or `npm run preview`.
5. **Mobile Three.js** — Replaced with SVG fallback on `window.innerWidth < 768` via `isMobile` state.
6. **Dependency tree** — Vite 8 + React 19 + @vitejs/plugin-react v4 have peer conflicts in some tooling, but the app itself builds and runs. Avoid heavy peer-deps surgery unless necessary.

---

## How to Run

```powershell
cd D:\hack-ocean\reef
npm run dev
# Open http://localhost:5173
```

## How to Build

```powershell
cd D:\hack-ocean\reef
npm run build
# Output: reef/dist/
npm run preview
```

---

## Future Change Guide

- **New section?** Append to `App.jsx` return tree. Use `motion` for reveals and `section` for scroll-snap.
- **New color/spacing?** Add to `@theme` in `src/index.css`.
- **New chapter?** Add entry to `src/data/chapters.js` + drop image into `public/assets/`.
- **Bug in Three.js?** Edit `src/components/Hero/CoralFragment.jsx`. Watch the cleanup arrays (`geometriesToDispose`, `materialsToDispose`).
- **Bug in transitions?** Edit `src/components/StoryTransition.jsx`.
- **Smooth scroll issues?** Edit `src/hooks/useSmoothScroll.js`.
- **Accessibility?** All chapter sections use `ariaLabel` from data; `StoryTransition` is `aria-hidden`; buttons have `aria-label` where needed.
