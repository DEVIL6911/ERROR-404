# REEF: The Last Coral Guardian — Implementation Plan

## Project Overview

Build a React/Vite single-page interactive comic-book landing page for REEF (environmental organization). The experience is structured as:

```
Landing Page (graphic novel cover) → Cinematic Coral Transition → 5-Chapter Comic → Finale → Action Section → Impact Stats → Footer
```

Emotional arc: Curiosity → Concern → Mystery → Problem → Hope → Action

## Key Decisions (Locked)

| Decision | Value |
|---|---|
| Stack | React + Vite + Tailwind + Motion (framer-motion) + GSAP + ScrollTrigger + Lenis + Lucide React + Three.js + tsparticles + react-countup |
| Chapter images | Full-page composites, 5 PNGs from `comic book/`, no splitting into panels |
| Text in comics | Baked into images; no HTML text overlays on comic panels; use `ariaLabel` for accessibility |
| Landing page | Separate landing page with Three.js 3D coral fragment, cinematic transition into comic |
| Mobile | Simplified — each chapter is one scroll stop, scaled image fits viewport, simplified Three.js, no complex GSAP pinning |
| Plan file | `.kilo/plans/1784893728933-reef-comic-landing-plan.md` |

## File Structure

```
reef/
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Hero/
│   │   │   ├── LandingHero.jsx
│   │   │   └── CoralFragment.jsx (Three.js 3D coral)
│   │   ├── StoryTransition.jsx
│   │   ├── ComicChapter.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── ActionCard.jsx
│   │   ├── ActionSection.jsx
│   │   ├── ImpactStats.jsx
│   │   ├── FinaleSection.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── chapters.js
│   └── hooks/
│       ├── useSmoothScroll.js
│       └── useScrollProgress.js
├── assets/
│   └── chapter-[1-5]-[name].png  (from comic book/)
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Asset Mapping

The 5 chapter PNGs from `comic book/` are full-page composites, not individual panels:

| File | Chapter | Panels (visual sections) | Scroll Stops |
|---|---|---|---|
| Chapter 1.png | Ch1 — The Silent Ocean (3 panels) | 1 composite | 1 |
| Chapter 2.png | Ch2 — The Call (5 panels) | 1 composite | 1 |
| Chapter 3.png | Ch3 — The Journey (6 panels) | 1 composite | 1 |
| Chapter 4.png | Ch4 — Hope Returns (6 panels) | 1 composite | 1 |
| Chapter 5.png | Ch5 — Your Turn (5 panels) | 1 composite | 1 |

- 5 total chapter scroll stops (not 25)
- Each chapter image is a single `<img>` filling the viewport
- Text is baked into the art — no duplicate HTML text on panels
- `ariaLabel` attributes in `chapters.js` provide accessible descriptions per chapter
- The landing page uses the Three.js 3D coral as its visual; it also serves as a visual callback for the glowing coral motif from Ch2 and Ch5

## Chapters Data Structure

```js
// src/data/chapters.js
const chapters = [
  {
    id: "chapter-1",
    name: "The Silent Ocean",
    image: "/assets/chapter-1-silent-ocean.png",
    ariaLabel: "Chapter 1: A vibrant coral reef transitioning to bleaching, fish disappearing, and a lonely ocean",
    mood: "beauty-to-loss",
    keyText: "Once, the ocean was full of color.",
  },
  {
    id: "chapter-2",
    name: "The Call",
    image: "/assets/chapter-2-the-call.png",
    ariaLabel: "Chapter 2: Kai discovers a glowing turquoise coral fragment in a damaged reef",
    mood: "mystery-hope",
    keyText: "The ocean can still heal.",
  },
  // ... etc.
];
```

## Implementation Steps

### Step 1: Project Setup

- `npm create vite@latest reef -- --template react`
- `npm install tailwindcss @tailwindcss/vite`
- `npm install motion`
- `npm install gsap ScrollTrigger`
- `npm install lenis`
- `npm install lucide-react`
- `npm install three`
- `npm install @tsparticles/react tsparticles`
- `npm install react-countup`
- Configure `vite.config.js` with Tailwind plugin
- Configure `tailwind.config.js` with custom theme (colors, fonts, extend)
- Create `src/index.css` with Tailwind directives and custom CSS variables
- Copy 5 chapter PNGs to `public/assets/` with descriptive names

### Step 2: Tailwind Configuration

Design tokens from the spec:

| Token | Value |
|---|---|
| `--deep` (primary bg) | `#021018` |
| `--abyss` (secondary bg) | `#010b12` |
| `--ocean` | `#04344a` |
| `--teal` | `#0a6b7c` |
| `--aqua` (primary accent) | `#2ec4b6` |
| `--glow` | `#5eead4` |
| `--coral` (secondary accent) | `#ff6b8a` |
| `--coral-soft` | `#ff9eb5` |
| `--sand` | `#f0e6d3` |
| `--mist` (primary text) | `rgba(240, 248, 255, 0.88)` |
| `--muted` (secondary text) | `rgba(200, 230, 240, 0.72)` |

Fonts: Cormorant Garamond (display) + Outfit (body) via Google Fonts CDN in `index.html`.

### Step 3: Core App Shell

- `App.jsx` — main layout with `<Lenis>` wrapper, `<Header>`, route-less section rendering, `<Footer>`
- `index.html` — minimal shell, loads fonts, meta tags, `main.jsx` entry
- Custom CSS in `src/index.css` for: scrollbar styling, scroll-snap, animation keyframes, glass effects, responsive breakpoints
- `src/main.jsx` — React entry point wrapping `<App />` with `<Lenis>` provider

### Step 4: Header Component

- Fixed navbar, deep navy background with blur
- Logo mark (reef symbol)
- Nav links: silence, turn, impact, join (or chapter links)
- Nav CTA button "Dive In →"
- Scroll state: background solidifies on scroll
- Mobile: hamburger menu, simplified nav

### Step 5: Landing Page (Hero) with Three.js 3D Coral Fragment

- Full-viewport section, deep navy background
- Three.js scene: 3D coral fragment (low-poly, parametric coral geometry)
  - Turquoise/teal emission glow
  - Subtle floating animation
  - Mouse parallax on coral rotation
  - Particles around the coral (small glowing dots)
- Headline: **THE OCEAN'S STORY ISN'T OVER.**
- Supporting text: **Every reef has a story. Some are fading. Some are fighting to survive. And some are waiting for someone to act.**
- Description: **Enter the story of Kai, a young marine explorer who discovers that the ocean can still heal — but it cannot save itself.**
- Primary CTA: **START THE STORY →**
- Secondary link: **EXPLORE OUR MISSION**
- On CTA click:
  1. Coral begins glowing (intensity increase via shader/uniform)
  2. Glow intensifies
  3. Camera slowly zooms toward coral
  4. Fade to black
  5. Transition to Chapter 1
- Use `<motion>` for hero text reveal animations
- `<tsparticles>` for subtle floating particles behind the coral
- On mobile: Three.js coral is simplified (static, no parallax, smaller geometry), or replaced with an animated SVG coral fragment to reduce bundle size and improve performance

### Step 6: Story Transition Component

- `StoryTransition.jsx` — handles the cinematic transition between landing page and comic
- Uses GSAP timeline for:
  - Fade coral glow
  - Zoom effect
  - Screen wipe or fade to black
  - Reveal first chapter
- State management: `isTransitioning`, `currentPhase`
- Triggered by CTA click on landing page

### Step 7: Comic Chapter Component

- `ComicChapter.jsx` — full-screen section per chapter
- Each chapter is one scroll stop (5 total)
- Renders the full chapter PNG as the background image
- Image uses `loading="lazy"` and `decoding="async"`
- Fallback: CSS painterly gradient fallback if image fails to load
- Chapter title card at top (displayed once per chapter, not per panel)
- Uses GSAP ScrollTrigger for:
  - Subtle zoom on the image as user scrolls through the chapter
  - Text reveals (key text captions) — these are HTML overlays since the baked-in text in the image is the primary visual, but we add the mission-critical key quotes as HTML overlays in a tasteful editorial style
  - Parallax effect on foreground elements
- `ariaLabel` from chapters data for accessibility
- Mobile: simplified GSAP animations, no complex pinning, image scales to fit viewport
- Scroll progress indicator at bottom of chapter

### Step 8: Scroll Progress Indicator

- `ScrollProgress.jsx` — thin progress bar at top or bottom of viewport
- Shows overall story progress (landing → chapters → action)
- Uses Lenis scroll progress or IntersectionObserver
- Mobile: simplified, thinner bar

### Step 9: Finale Section

- After all 5 chapters
- **THE STORY ENDS HERE.** — pause
- **THE MISSION DOESN'T.** — cinematic reveal
- Uses Motion for text animation (fade, scale, blur)
- Uses GSAP for the two-line reveal sequence

### Step 10: Action Section

- Title: **YOUR CHAPTER BEGINS NOW.**
- Four action cards in a 2×2 grid (1 column on mobile):

| Card | Description | CTA |
|---|---|---|
| RESTORE | Help restore damaged coral reefs | RESTORE A REEF → |
| CLEAN | Take action against ocean and beach pollution | JOIN A CLEANUP → |
| PROTECT | Help protect marine life and ocean ecosystems | PROTECT MARINE LIFE → |
| SHARE | Spread awareness and inspire others | SPREAD THE WORD → |

- Each card uses `<motion>` hover animations (lift, glow)
- Cards have coral/orange accent borders
- Mobile: stack vertically, full-width cards

### Step 11: Impact Stats Section

- Animated counters using `react-countup`:

| Number | Label |
|---|---|
| 12,840+ | VOLUNTEERS |
| 87 | CONSERVATION PROJECTS |
| 2.4M+ | CORAL FRAGMENTS RESTORED |
| 36 | MARINE SPECIES PROTECTED |

- Cards in a 2×2 grid
- Numbers animate when section enters viewport (use `react-countup` with `useInView`)
- Background: dark blue with subtle texture
- Mobile: stack vertically

### Step 12: Footer

- Minimal, editorial
- REEF logo, social links (Lucide icons), copyright
- "One Reef · One Voice" tagline

### Step 13: Mobile Responsiveness

Breakpoints and adaptations:

- **Header**: Hamburger menu, simplified nav links
- **Landing page**: Three.js coral simplified (static SVG fallback on small screens), text sizes adjusted with `clamp()`, fewer hero lines
- **Comic chapters**: Each chapter is 1 scroll stop, image `object-fit: contain` to ensure nothing is cropped, text overlays repositioned for smaller viewports
- **Action cards**: Stack vertically (1 column), full-width
- **Impact stats**: Stack vertically (1 column on mobile, 2×2 on tablet+, 4-column on desktop)
- **GSAP ScrollTrigger**: Simplified on mobile — no pinning, reduced parallax, simpler zoom
- **Lenis**: Still active but with reduced smooth scroll intensity on mobile
- **Touch targets**: All CTAs minimum 44px tap target
- **Images**: `srcset` or responsive `sizes` for chapter images if different resolutions are available
- **CSS**: Responsive utilities throughout Tailwind (`md:`, `lg:` prefixes)

### Step 14: Performance Optimization

- Chapter images: `loading="lazy"`, `decoding="async"`, compressed variants at multiple sizes
- Three.js scene: `dispose()` on unmount, low poly count for coral geometry
- tsparticles: minimal particle count (10-20), subtle only
- Code splitting: `React.lazy()` for heavy components (Three.js scene)
- Bundle analysis with `npm run build` and `vite-bundle-visualizer` if needed
- GSAP plugins registered once

### Step 15: Accessibility

- Semantic HTML: `<section>`, `<nav>`, `<header>`, `<footer>`, `<main>`
- `aria-label` on all chapter sections from data
- `alt` text on all images (descriptive, not identical to visible text)
- Focus management: focus is moved to first focusable element after modal/transition
- Keyboard navigation: all interactive elements are keyboard-accessible
- `prefers-reduced-motion`: disable all animations, show static content
- Color contrast: primary text `--mist` on `--deep` background passes WCAG AA
- Skip link for keyboard users

## Dependencies Summary

| Package | Purpose |
|---|---|
| `react` + `react-dom` | Core UI |
| `vite` + `@vitejs/plugin-react` | Build tool |
| `tailwindcss` + `@tailwindcss/vite` | Styling |
| `motion` (framer-motion) | UI/micro-animations |
| `gsap` + `ScrollTrigger` | Scroll storytelling, complex scroll animations |
| `lenis` | Smooth scrolling |
| `lucide-react` | Icons |
| `three` | 3D coral fragment on landing page |
| `@tsparticles/react` + `tsparticles` | Subtle underwater particles |
| `react-countup` | Animated impact statistics |

## Risk Areas

1. **Three.js bundle size** — ~40KB gzipped + three.js core. Mitigate with code splitting, lazy load the landing page scene only, and provide SVG fallback on mobile.
2. **Large image loading** — 5 chapter images totaling ~38MB. Mitigate with `loading="lazy"`, serve WebP variants if available, and ensure critical content (action section, impact) is early in DOM.
3. **Mobile performance** — GSAP ScrollTrigger + Three.js on mobile can jank. Mitigate with simplified animations on mobile, reduced particle count, and no pinning on small screens.
4. **Baked-in text in chapter images** — If users need to read the comic text, the images must be large enough that text is legible on all screen sizes. The `object-fit: contain` approach ensures full image visibility but may leave empty space on some aspect ratios.

## Validation Steps

1. Run `npm run dev` and verify all sections render correctly
2. Test scroll flow: landing → transition → chapters 1-5 → finale → action → impact → footer
3. Test Three.js coral fragment on landing page (rotation, glow, zoom transition)
4. Verify mobile responsiveness at 375px, 768px, 1024px, 1440px
5. Run `npm run build` and verify production build succeeds
6. Test with images removed (fallback rendering)
7. Verify `prefers-reduced-motion` disables all animations
8. Run Lighthouse audit — target performance > 70 on mobile with lazy images
9. Keyboard navigation test — all interactive elements reachable and operable
10. Screen reader test — all sections have proper aria labels
