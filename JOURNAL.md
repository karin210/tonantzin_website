# Journal

## 2026-05-09

### Project setup
- Initialized from Create Next App (Next.js 16, React 19, TypeScript, Tailwind CSS v4)
- Created `CLAUDE.md` with project description, tech stack, conventions, design guidelines, and planned pages for Tonantzin Cocina Mestiza — a fine-dining Mexican restaurant website

### Removed Tailwind CSS
- Uninstalled `tailwindcss` and `@tailwindcss/postcss`
- Cleared Tailwind plugin from `postcss.config.mjs`
- Removed `@import "tailwindcss"` and `@theme` block from `app/globals.css`; kept CSS custom properties and base body styles
- Stripped Tailwind utility classes from `app/layout.tsx` and `app/page.tsx`
- Replaced boilerplate page content with a minimal placeholder
- Styling convention: global base styles in `app/globals.css`, component styles via CSS Modules (`*.module.css`)
- Updated `CLAUDE.md` to reflect the new styling approach

### Added accessibility, fluid design & semantic HTML conventions
- Updated `CLAUDE.md` project conventions with three new rules: WCAG 2.1 AA accessibility, fluid design via `clamp()` and relative units, and semantic HTML5 elements

### Landing page
- Added Cormorant Garamond (300/400/600, normal/italic) via `next/font/google` in `layout.tsx` as `--font-cormorant`; set `lang="es"` on `<html>`
- Updated `app/globals.css`: added colour custom properties (`--color-terracotta`, `--color-deep-green`, `--color-gold`, etc.), CSS reset, and semantic element base styles
- Created `app/page.tsx`: fixed header with nav (logo + four anchor links), full-viewport hero section
- Created `app/page.module.css`: fluid typography with `clamp()`, responsive image swap — vertical photo below 640 px, horizontal above — achieved with two `<Image fill>` components toggled via CSS media query; dark gradient overlay; animated CTA button with focus-visible ring
