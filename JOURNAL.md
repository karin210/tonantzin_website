# Diario de Desarrollo — Tonantzin Cocina Mestiza

---

## 2026-05-13

### MenuEstacional — gradient background + responsive layout

**Warm burnt-ochre gradient.** Replaced the flat `background: #1c1712` on `.section` with a `radial-gradient` centered above the section (`ellipse 130% 60% at 50% 0%`). The gradient sweeps from `#4a2410` (dark burnt ochre) through `#251309` to the existing near-black base, giving the section a candlelit warmth without altering any text or card styles.

**Responsive `.body` padding.** Replaced `padding: 10%` with `clamp()`-based shorthand (`clamp(1rem, 5vw, 3rem) clamp(1.5rem, 10vw, 8rem)`) so horizontal and vertical padding both scale fluidly with the viewport.

**Fluid stacking layout.** Added `flex-wrap: wrap`, `gap: clamp(1.5rem, 4vw, 3rem)`, and `align-items: flex-start` to `.body`. Added `flex: 1 1 min(100%, 22rem)` to both `.featuredCard` and `.favorites`. The two asides now sit side by side when combined content width allows (~44 rem+) and stack to full width on smaller screens — no breakpoint needed.

---

### Reservation flow — `/reservar`

Added a complete multi-step reservation experience at the `/reservar` route, inspired by the scroll-drum and progress-line patterns from the Pink project, adapted to Tonantzin's dark fine-dining aesthetic.

**Route & orchestrator.** `app/reservar/page.tsx` is a server component that renders the `Header` and the `"use client"` `ReservationFlow` orchestrator. All step state (`name`, `guests`, `date`, `time`, `place`) lives in the orchestrator; each step receives only its slice of data plus an `onComplete` callback. A `key={currentStep}` on the step wrapper triggers a CSS slide-in animation (`stepEnter`) on every transition without a JS animation library.

**Vertical progress timeline** (`ProgressTimeline`). Fixed to the right edge on desktop (200 px wide); uses `flex-direction: row-reverse` so node circles sit flush to the edge with right-aligned labels extending inward. Connector lines between nodes fill with gold as steps are completed. Node states: dim ring (pending) → gold ring + ambient glow (active) → filled gold + animated checkmark SVG (completed). Completed nodes are clickable — users can jump back and edit any earlier step. On ≤768 px the timeline collapses to a horizontal dot bar that sits below the fixed header.

**Step 1 — Nombre** (`StepName`). Minimal underline text input styled in Cormorant Garamond; border turns gold on focus. Continue button disabled until the field is non-empty; Enter key submits.

**Step 2 — Comensales** (`StepGuests`). Circular ±1 buttons with gold hover fill. Count displayed in a large Cormorant numeral. Maximum enforced at 8; minimum at 1.

**Step 3 — Fecha** (`StepCalendar`). Proper Monday-first 7-column grid; offset calculated from `(getDay() + 6) % 7`. Past days disabled and dimmed; today highlighted with a gold border; the currently selected day fills gold. Month navigation prevents going before the current month. Clicking a date auto-advances to the next step.

**Step 4 — Hora** (`StepTime`). Dual scroll drums (hours 13–22, minutes 00/15/30/45) built with `scroll-snap-type: y mandatory` + IntersectionObserver, mirroring the Pink project's approach. A CSS mask gradient fades items at the drum edges so only the centred item reads clearly. A `useLayoutEffect` pre-scrolls each drum to a previously selected time on re-entry. A live `aria-live` preview shows the current selection; a Continuar button confirms.

**Step 5 — Lugar** (`StepPlace`). Two full-bleed image cards — *Terraza* (`Tonantzin_terraza_1_horizontal.jpg`) and *Interior* (`adobe_wall_1.jpg`) — each with a darkening overlay and an "Elegir" pill that fills gold on hover. Clicking either card auto-advances.

**Step 6 — Confirmación** (`StepSuccess`). Animated SVG draw-on circle and checkmark (CSS `stroke-dashoffset` animation). Full reservation summary rendered as a `<dl>`. "Volver al inicio" link styled as the shared ghost-gold CTA button.

**Navigation updates.** "Reservaciones" in the `Header` nav and "Reservar Mesa" in the homepage hero CTA both now route to `/reservar` instead of `#reservaciones`.

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
