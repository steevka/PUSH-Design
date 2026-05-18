# Working Notes

Internal scratch for building this site out. README is the overview; this is the day-to-day reference. Update as we learn things.

---

## Design tokens

All defined as CSS custom properties in `src/app/globals.css` and re-exposed via Tailwind v4's `@theme inline`. Use the Tailwind class (`bg-bg`, `text-fg-muted`, `border-line`) over raw values.

| Token             | Value                          | Notes                                  |
|-------------------|--------------------------------|----------------------------------------|
| `--bg`            | `#050505`                      | Page background. Also baked into shader fade-in (`BG_COLOR` constant in `displaced-plate.tsx`) — keep in sync. |
| `--bg-elev`       | `#0c0c0c`                      | Cards, lightbox, browser-frame chrome. |
| `--fg`            | `#f4ebf5`                      | Primary text. Slightly warm white.     |
| `--fg-muted`      | `#a89bb5`                      | Secondary text, section labels.        |
| `--fg-dim`        | `#4a3f5e`                      | Tertiary, metadata, "v0.1.0" line.     |
| `--accent`        | `#ff89cc`                      | Pink. Used sparingly — `§` glyphs, hover states, active-row strip. |
| `--accent-soft`   | `#89cfff`                      | Blue. Currently unused. Reserved.      |
| `--line`          | `rgba(244, 235, 245, 0.08)`    | Subtle borders.                        |
| `--line-strong`   | `rgba(244, 235, 245, 0.18)`    | Lightbox border, browser-frame chrome. |

### Type
- `--font-sans`: Geist
- `--font-mono`: Geist Mono — used at `10–11px` with `tracking-[0.22em]` uppercase for everything labelly
- `--font-serif`: Instrument Serif (italic only, for emphasis inside headlines)

The Instrument Serif italic-inside-sans-headline pattern is the studio voice. Use it sparingly — once or twice per section max.

### Spacing rhythm
- Section pad: `pt-24 pb-24` mobile → `pt-32 pb-32` desktop (sometimes `pt-40 pb-40` for marquee sections)
- Side gutters: `px-6` mobile → `px-10` desktop
- Grid: 12-col, `gap-6`
- Case study body content max width: `56rem` (see `.case-prose section`)

---

## Hero shader knobs

`src/components/displaced-plate.tsx`. Fragment shader is the source of truth. Knobs in order of how much they change the feel:

| Effect            | Variable / line                                    | Current | Range that reads as… |
|-------------------|----------------------------------------------------|---------|----------------------|
| Disp amplitude    | `disp = vec2(...) * 0.012 * uIntensity`            | 0.012   | 0.008 subtle · 0.018 medium · 0.04 loud |
| Disp speed        | `uTime * 0.06` / `uTime * 0.09`                    | 0.06/0.09 | Lower = slower drift |
| Ripple amplitude  | `* 0.05 * uHover`                                  | 0.05    | 0.05 main · 0.12 obvious |
| Ripple decay      | `exp(-md * 5.0)`                                   | 5.0     | Lower = wider ripple |
| Ripple smoothing  | `ndc.x += (target - ndc.x) * 0.06` (useFrame lerp) | 0.06    | Higher = snappier follow |
| Chromatic aberration | `ca = 0.003 * uIntensity`                       | 0.003   | 0.003 cast · 0.008 visible fringe · 0.012 loud |
| Grain             | `* 0.08`                                           | 0.08    | 0.06 calm · 0.14 sensor |
| Vignette          | `0.55 + 0.45 * vig`                                | —       | First number = corner darkness floor |
| Desat             | `mix(vec3(lum), color, 0.92)`                      | 0.92    | 1.0 = full color · 0.5 = half desat |
| Fade-in           | `FADE_IN_SECONDS = 1.0`                            | 1.0s    | First-load fade from `BG_COLOR` |

**Important:** `intensity` prop on `<HeroCanvas>` (currently `1`) multiplies both `disp` and `ca`. Easiest single-knob volume control.

**Pointer events:** Canvas needs to receive mouse events for ripple. Any full-bleed overlay in `hero.tsx` must use `pointer-events-none` with `pointer-events-auto` on individual interactive children. Easy to regress — see commit `4076c44`.

---

## Content model

Case studies live under `src/content/work/<slug>.tsx`. Each file:
- Named export `metadata: WorkMetadata` (see `types.ts`)
- Default export = the `<Body>` component (case-study prose)

Registration is in `src/content/work/index.ts`. Order in the `entries` array = display order on the homepage and case-study "next →" cycle.

`metadata.hasCaseStudy` gates the full `/work/<slug>` route. Falsy → row only opens the lightbox.

Body components are styled by `.case-prose` in `globals.css`. Use `<section>`, `<h2>`, `<p>`, `<ul>`, `<figure>`. Wrap screenshots in `<BrowserFrame>`.

### Image conventions
- Hero screenshot: `public/cases/<slug>/hero.png` at 3006×1844 (referenced in metadata + the case-study route)
- Inline shots: `public/cases/<slug>/screen-XX.png` or descriptive names — wrap in `BrowserFrame` with the relevant URL
- Use `unoptimized` on `<Image>` for case-study shots — full PNG quality matters more than the optimizer here

---

## Known gotchas

- **Next.js 16.** APIs and conventions differ from training data. Heed `AGENTS.md` — read `node_modules/next/dist/docs/` before assuming an API. Notable: `params` is a Promise in route handlers; metadata file conventions for `icon.png` / `apple-icon.png`.
- **`cursor: none` is global** (under `@media (pointer: fine)`). If you add an iframe / embed / shadow DOM that needs the OS cursor, scope the rule.
- **Hero video weight.** `public/hero.mp4` is ~7.2 MB. Don't drop in a fresh Handbrake-less export — see commit `ff30d22`. Re-encode through Handbrake at the same preset if replacing.
- **`mix-blend-difference` on TopBar.** The top nav inverts against whatever is underneath. Looks great on the hero, fine on dark sections. If we add a light section, the top bar will get hard to read — plan for it.
- **Shader BG color.** `BG_COLOR` in `displaced-plate.tsx` must match `--bg`. Hardcoded to `#050505`. If we ever theme the site, lift this into a prop.
- **`useVideoTexture` + autoplay.** Works because the video is muted. Don't unmute or autoplay breaks in Safari/iOS.
- **`generateStaticParams` lives on the route, not the content module.** When we add MDX or remote sources, this is where the loader has to plug in.

---

## Deploy

- Hosted on Vercel, auto-deploys from `main`. No preview workflow yet.
- No env vars required. If we add any (analytics, CMS, contact form), wire through Vercel project settings and document them here.
- Largest asset = hero video. Watch Vercel bandwidth if traffic ramps up. Consider moving to Vercel Blob or a CDN if we exceed Hobby limits.
- The Geist + Instrument Serif fonts come from `next/font/google` — cached at build time, no runtime fetch.
- Icons: `src/app/icon.png` + `src/app/apple-icon.png` are picked up by Next's metadata file conventions. No `manifest.json` yet.

---

## Things we've considered / queued ideas

Loose list. Promote items into commits when we tackle them; delete when shipped or rejected.

- [ ] Light mode (or a paper-cream variant for case studies)
- [ ] Case-study transitions (page-to-page morph rather than hard cut)
- [ ] Hero shader: optional image fallback for reduced-motion users — currently the noise + ripple ignore `prefers-reduced-motion`
- [ ] Mobile cursor — touch users get no cursor at all and no hover-affordance on work rows; maybe a tap-and-hold preview
- [ ] OG image generation for each case study via `opengraph-image` route
- [ ] `sitemap.ts` + `robots.ts`
- [ ] Replace `picsum.photos` / `images.unsplash.com` allowlist in `next.config.ts` if we never use them — currently dead config
- [ ] Real favicon set beyond the auto-generated icon.png
- [ ] Studio process / capabilities section beyond the current 5-item list

---

## Conventions

- TS strict, no `any`. If something needs an escape hatch, use `unknown` + narrow.
- `"use client"` only where actually needed — hero canvas, custom cursor, lightbox-aware work index. Server components by default.
- Don't pull in component libraries. Everything in `src/components` is bespoke. Tailwind utility classes carry the styling; one-off CSS lives in `globals.css` under `@layer components`.
- Mono small-caps `<p className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg-muted">` with leading `§` is the section-label pattern. Keep it consistent.
- Index numbers (`01`, `02`, …) are written as strings in metadata, not computed from array position. We may eventually want to skip numbers (`00`, `04`, etc) for taste reasons.
