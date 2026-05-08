# PUSH Design

Portfolio + playground site for PUSH, an independent design studio working at the seam of design and engineering. Live at [workwithpush.com](https://workwithpush.com).

The site doubles as a place to try out experimental web ideas — WebGL displacement, custom cursors, case-study lightboxes — that don't always belong on client work.

---

## Stack

- **Next.js 16** (App Router, React Server Components, Turbopack)
- **React 19** + TypeScript
- **Tailwind CSS v4** (CSS-first config via `@theme inline` in `globals.css`)
- **react-three-fiber** + **drei** + **three** for the hero displacement shader
- **motion** (Framer Motion successor) for cursor + lightbox animation
- **Geist Sans / Mono** + **Instrument Serif** via `next/font/google`
- Hosted on **Vercel**

> ⚠️ This is Next.js 16 — APIs, file conventions, and defaults differ from older versions. See `AGENTS.md`. Always check `node_modules/next/dist/docs/` before assuming an API.

---

## Local development

```bash
pnpm install
pnpm dev          # next dev on http://localhost:3000
pnpm build        # production build
pnpm start        # serve production build
pnpm lint         # eslint
```

Node + pnpm. No env vars required for the marketing site.

---

## Structure

```
src/
  app/
    layout.tsx              # fonts, <CustomCursor />, metadata
    page.tsx                # home: TopBar / Hero / About / SelectedWork / Footer
    globals.css             # CSS vars, Tailwind theme, .case-prose styles
    work/[slug]/page.tsx    # case study detail route
  components/
    hero.tsx                # PUSH wordmark over displaced video
    hero-canvas.tsx         # r3f Canvas wrapper
    displaced-plate.tsx     # GLSL shader: displacement + ripple + chromatic aberration + grain + vignette
    custom-cursor.tsx       # mix-blend-difference dot + ring, hover-aware
    selected-work.tsx       # work index + lightbox + cursor-preview state
    work-row.tsx            # one row in the work table
    work-cursor-preview.tsx # follows cursor while hovering a work row
    work-lightbox.tsx       # modal preview, opens to full case study
    browser-frame.tsx       # mac-style chrome around screenshots
    about.tsx, footer.tsx, top-bar.tsx, push-stencil.tsx
  content/
    work/
      types.ts              # WorkMetadata interface
      index.ts              # registers all entries, exports works + helpers
      yardeni-research.tsx  # case study: metadata + default-export Body
      yardeni-quicktakes.tsx
      zion-law.tsx
  lib/
    works.ts                # re-export shim for components
public/
  hero.mp4                  # ~7.2MB Handbrake-encoded hero loop
  push-mask.svg             # PUSH wordmark used as backdrop-filter mask
  cases/<slug>/             # case-study screenshots
```

---

## Notable details

### Hero
`src/components/displaced-plate.tsx` is the meat of the hero: a full-viewport plane with a custom shader that:

- `cover`-fits a video texture to the viewport (no CSS, all UV math).
- Applies low-frequency simplex noise for a slow drift.
- Adds a cursor-tracked exponential ripple.
- Splits R/G/B with a small chromatic-aberration offset.
- Layers a film-grain hash and radial vignette.
- Fades in over `FADE_IN_SECONDS` from the page background to avoid a flash on load.

The PUSH wordmark on top is a `backdrop-filter: blur + brightness + saturate` masked through `/push-mask.svg` — not a foreground image. It's lensing whatever the shader is showing underneath.

### Custom cursor
`mix-blend-difference` dot + spring-damped ring. Disabled on coarse pointers (touch). Cursor hidden globally via `cursor: none` in `@media (pointer: fine)` so the rendered cursor is the only one.

### Case studies
Each case study is a TSX file under `src/content/work/` that exports both a `metadata: WorkMetadata` named export and a default `Body` component (the prose). `index.ts` registers them; everything else (route generation, lightbox, "next case study" link, work table) reads from that one source.

`metadata.hasCaseStudy` gates whether the row links to a full `/work/<slug>` route or only opens the lightbox.

The `.case-prose` styles in `globals.css` handle case-study typography (mono small-caps `<h2>`s, accent dashes on `<li>`, centered figures with mono captions).

---

## Deployment

Deploys on Vercel on push to `main`. Nothing special — no edge functions, no env vars, no custom build commands. The hero video (`public/hero.mp4`) is the largest asset and was already Handbrake-encoded down to ~7.2MB; if it grows, re-encode rather than hot-link.

`apple-icon.png` + `icon.png` in `src/app/` are picked up by Next's metadata file conventions.

---

## License

All rights reserved. Code and content © PUSH Design.
