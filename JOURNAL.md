# Diario de Desarrollo — Tonantzin Cocina Mestiza

---

## 2026-05-11

### Hero logo + Servicios refactor

**Hero title → logo image.** Replaced the two `<span>` text lines (*Tonantzin* / *Cocina Mestiza*) inside `<h1>` with a `next/image` `<Image>` pointing to `Tonantzin_logo_black.png`. The image is inverted to white via `filter: brightness(0) invert(1)` and sized with `clamp(14rem, 55vw, 32rem)`. Removed `.heroTitleMain` and `.heroTitleSub` CSS classes; added `.heroLogo`.

**Antonio font.** Added the `Antonio` Google Font (`--font-antonio`, weights 300/400) to `app/layout.tsx` for potential use in display contexts.

**Experiences → Servicios.** Deleted the flat `app/components/Experiences.tsx` / `Experiences.module.css` and replaced them with a dedicated `app/components/Servicios/` folder (`Servicios.tsx` + `Servicios.module.css`). Section heading changed from *Experiencias* to **Servicios**; third card eyebrow/title changed from *Talleres y catas / Experiencias* to **Actividades / Actividades**. The triptych layout, CSS gradient placeholders, and *Próximamente* badges are unchanged.

---

### Header — refactor Nav into Header component with hamburger menu

Replaced the flat `Nav` component (`app/components/Nav.tsx` + `Nav.module.css`) with a dedicated `app/components/Header/` folder containing `Header.tsx` and `Header.module.css`.

**What changed:**
- Added the restaurant logo (`Tonantzin_logo_black.png`) as a linked `<Image>` in the header.
- Added an animated hamburger button for mobile with three-bar ↔ X transition via CSS classes (`barTop`, `barMid`, `barBot`).
- Added a full-screen backdrop overlay when the mobile menu is open; clicking it closes the menu.
- Scroll lock on `document.body` while mobile menu is open (prevents background scroll).
- Renamed the dropdown trigger from *Experiencias* to **Servicios**; third sub-item renamed from *Talleres y Catas* to **Actividades**.
- Added two new top-level nav links: **Reservaciones** and **Contacto**.
- All interactive elements remain accessible: `aria-expanded`, `aria-controls`, `aria-haspopup`, Escape-to-close, click-outside-to-close.
- `app/page.tsx` updated to import `Header` instead of `Nav`.

---

## 2026-05-10

### Experiencias — nav dropdown + triptych section

Added secondary service offerings to the landing page without creating dedicated pages yet.

**Nav:** Extracted the header into `app/components/Nav.tsx` (client component). Added a `Experiencias ▾` dropdown with three sub-items — *Sala de Juntas*, *Eventos Privados*, *Talleres y Catas*. Dropdown is accessible: `aria-haspopup`, `aria-expanded`, Escape-to-close, click-outside-to-close, visible focus rings on all interactive elements.

**Section:** Added `app/components/Experiences.tsx` (server component) immediately after the hero. Three-column triptych on desktop, stacked on mobile. Each card links to its anchor (`#sala-juntas`, `#eventos-privados`, `#talleres`). Images are CSS gradient placeholders (brand palette) until photography is available. Each card carries a *Próximamente* badge.

**Offerings covered:**
- Sala de Juntas — meetings packages with utilities and time slots
- Eventos Privados — full venue rental for special events
- Experiencias — workshops (mezcal tasting, piping/cake decoration)
