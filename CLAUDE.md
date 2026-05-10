@AGENTS.md

# Tonantzin Cocina Mestiza — Website

A fine-dining restaurant website for **Tonantzin Cocina Mestiza**, an upscale Mexican restaurant. The site must reflect the restaurant's identity: elegant, warm, and culturally rooted.

## Tech stack

- **Next.js 16** (App Router) — read `node_modules/next/dist/docs/` before writing any Next.js code
- **React 19**
- **TypeScript** — strict mode, no `any`
- **CSS Modules** — one `*.module.css` file per component; global base styles in `app/globals.css`

## Project conventions

- All pages live under `app/` using the App Router file conventions (`page.tsx`, `layout.tsx`, `loading.tsx`, etc.)
- Components go in `app/components/` or a dedicated `components/` folder at the root
- Server Components by default; add `"use client"` only when interactivity requires it
- Images go in `public/` and are served via `next/image`
- Styling: global base styles in `app/globals.css`; component styles in CSS Modules (`*.module.css`); no inline styles
- TypeScript: explicit return types on all exported functions; no `any`
- Accessibility: all UI components must meet WCAG 2.1 AA — semantic HTML elements, descriptive `alt` text, keyboard navigability, visible focus indicators, sufficient colour contrast
- Layout: fluid design using `clamp()`, relative units (`rem`, `%`, `vw`/`vh`), and CSS custom properties; avoid fixed pixel widths for layout containers
- Markup: use semantic HTML5 elements (`header`, `nav`, `main`, `section`, `article`, `footer`, etc.); never use `<div>` where a semantic element fits

## Design guidelines

- Tone: refined, warm, culturally rich — not generic or corporate
- Palette: earthy tones, deep greens, terracotta, warm neutrals — evoke Mexican heritage
- Typography: elegant serif for headings, clean sans-serif for body text
- Imagery: high-quality food and ambiance photography
- Language: English primary; Spanish accents are appropriate for section headings and dish names
- Avoid generic restaurant clichés (clipart food icons, neon colors, busy layouts)

## Key pages (planned)

- Home — hero, brief concept statement, call-to-action (reservations)
- Menu — categorized dishes with descriptions and prices
- About — story of the restaurant and its culinary philosophy
- Reservations — booking form or third-party integration
- Contact — address, hours, map
