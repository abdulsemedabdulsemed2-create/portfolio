# SIGNAL — Software Engineer Portfolio

A visually ambitious, highly interactive portfolio built with **React 19 + Vite**.
The design concept is an **engineering instrument panel**: deep blueprint navy,
warm "bone" text, signal-amber + blueprint-azure accents, monospace telemetry
labels, and a live oscilloscope waveform woven through the site. Projects are the
centerpiece — each renders a unique, deterministic "signal glyph" and a
case-study detail page with an animated route morph.

Pages: **Home · Projects · Experience · About · Resume** (plus a themed 404).

## Architecture

Content is fully **separated from presentation**. Every component reads from the
data layer in `src/data/` — you should never edit component markup to change
copy. Replace the placeholder data (persona "Alex Rivera") with your real resume
and the whole site updates.

- `src/data/` — the content you edit (see table below)
- `src/lib/` — helpers + hooks (signal math, reduced-motion, media queries, clock)
- `src/components/signal/` — the animated `SignalCanvas` + procedural `ProjectGlyph`
- `src/components/layout/` — the `InstrumentPanel` nav chrome (rail + drawer), footer
- `src/components/ui/` — small composable primitives (Reveal, CountUp, ArrowLink…)
- `src/pages/` — one file per route
- `src/index.css` — design tokens (`:root` vars), global grid, view-transition CSS

## Editing your content

All content lives in plain data files — no need to touch the components. Each
file has header comments documenting every field:

| File | What to edit |
| --- | --- |
| `src/data/profile.js` | Name, handle, rotating roles, intro/bio, principles, stats, availability, timezone |
| `src/data/site.js` | Site title/wordmark, nav order (channel indices), decorative coordinates |
| `src/data/projects.js` | Your projects — give each a unique `seed` (drives its glyph) and `accent` color |
| `src/data/experience.js` | Roles by `channel` (`work` / `education` / `leadership`); reads well with one internship |
| `src/data/skills.js` | Skill bands with a `level` meter and item list |
| `src/data/socials.js` | External links (`key` selects the icon) |

Also update the `<title>` in `index.html` and, optionally, swap the placeholder
resume PDF referenced from the Resume page.

## Accessibility & motion

Keyboard focus states, semantic landmarks, a skip link, and full
`prefers-reduced-motion` support are built in — the oscilloscope renders a static
frame and reveal animations are disabled when reduced motion is requested.

## Run locally

```
npm install
npm run dev
```

## Build for production

```
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to vercel.com, click Add New -> Project, and import the repo.
3. Vercel auto-detects Vite (build: `npm run build`, output: `dist`).
4. Click Deploy. Every push redeploys automatically.
