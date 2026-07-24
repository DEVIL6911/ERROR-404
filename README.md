# REEF — One Reef, One Voice

A single-page scroll story about coral reef loss and restoration. No backend, no build step.

## Run locally

```bash
# From this folder — any static server works
npx serve .
# or
python -m http.server 8080
```

Then open the URL shown (e.g. `http://localhost:3000`).

## Sections

1. **Hero** — living reef + CSS light rays + canvas particles  
2. **The Silence** — healthy → bleached crossfade + 0→50% counter  
3. **The Turn** — bleached → planted fragment (same crossfade, reverse story)  
4. **Your Part** — impact calculator, adopt cards, volunteer form  
5. **Join REEF** — closing CTA  

## Images

Place generated art in `assets/images/`:

| File | Use |
|------|-----|
| `hero.jpg` | Hero + OG image |
| `reef-healthy.jpg` | Act 2 frame A |
| `reef-bleached.jpg` | Act 2 frame B / Act 3 frame A |
| `reef-plant.jpg` | Act 3 frame B |
| `bg-soft.jpg` | Impact section texture |
| `closing.jpg` | Final splash |

CSS painterly fallbacks show if images are missing.

## Pitch (2 min)

> Coral reefs support a quarter of all marine life, but over half are already degraded. Most conservation sites just show you statistics. REEF shows you a story — as you scroll, the reef dies in front of you, and then it comes back to life, because of a choice someone makes. That choice is the same one we're asking our visitors to make: adopt a reef, volunteer a dive, or just spread the word. It's built as a single, fast-loading page — no backend, no friction, just impact.
