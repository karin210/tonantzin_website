# Diario de Desarrollo — Tonantzin Cocina Mestiza

---

## 2026-05-14

### Demo mode — "Página no disponible" toast

Added a lightweight demo-mode behaviour so that non-functional links in the site show a small non-blocking toast rather than navigating or reloading.

**`DemoToast` component.** A `"use client"` component mounted once in `app/layout.tsx`. It listens for a `demo:unavailable` CustomEvent on `document` and renders a fixed-position pill at the bottom-centre of the viewport for 2.5 seconds, then disappears. Rapid repeated clicks reset the timer. Styled to match the site palette: dark warm background (`#1c1712`), cream text, a faint gold border. A subtle fade-in + upward translate animation on mount. Uses `role="status"` and `aria-live="polite"` for screen-reader announcements. `pointer-events: none` so it never blocks interaction.

**Header — intercepted nav links.** Added a `demoClick` handler inside `Header.tsx` that calls `e.preventDefault()`, `closeAll()`, and dispatches `demo:unavailable`. Applied to: **Menú**, **Nosotros**, **Trabaja con nosotros**, and all three Servicios sub-links (**Sala de Juntas**, **Eventos Privados**, **Actividades**). The Servicios dropdown trigger still expands/collapses normally. **Reservaciones** and the logo link are untouched.

**`DemoCtaButton` component.** A minimal `"use client"` wrapper needed because `MenuEstacional` is a Server Component and cannot hold a click handler. Accepts `className` and `children`; on click calls `e.preventDefault()` and dispatches `demo:unavailable`. Replaces the `<a href="/menu">` "Ver Menú Completo" anchor. Added `background: transparent; cursor: pointer` to `.ctaButton` in `MenuEstacional.module.css` to reset browser default button styles.

---

## 2026-05-13

### StepTime — mobile drum fix

Replaced `IntersectionObserver` with `scroll` event listeners and guarded touch events in `useDragScroll` to fix drum behavior on mobile devices.

**Root causes.** Two bugs combined to break the drums on phone: (1) `useDragScroll` called `el.setPointerCapture(e.pointerId)` for all pointer types including `'touch'`, which hijacked the browser's native touch scroll and prevented `scroll-snap-type: y mandatory` from firing; (2) `IntersectionObserver` with `threshold: 1.0` requires an item to be fully within the 44 px center zone — sub-pixel rendering differences on mobile meant items were never exactly 100 % visible, so the active highlight never updated.

**Fix — touch guard.** Added `if (e.pointerType === "touch") return;` at the top of `onPointerDown` in `useDragScroll`. Touch scrolls are now handled entirely by the browser's native scroll-snap; the hook only kicks in for mouse/pen drags.

**Fix — snap on mouse release.** Added `el.scrollTo({ top: Math.round(el.scrollTop / ITEM_HEIGHT) * ITEM_HEIGHT, behavior: "smooth" })` in `onPointerUp` so mouse drags also land on a clean item boundary after release.

**Fix — scroll events replace IntersectionObserver.** Both `useEffect` blocks that created `IntersectionObserver` instances were removed. Replaced with passive `scroll` event listeners that compute the centred index with `Math.round(el.scrollTop / ITEM_HEIGHT)`, clamped to the array bounds. This is reliable on all browsers and pointer types. Removed the now-unused `hourItemRefs` and `minuteItemRefs` refs and their JSX `ref=` callbacks.

**Schedule correction.** `HOURS` extended from `[13..22]` to `[9..22]` and subtitle updated to "9:00 – 22:00" to reflect the actual opening hours.

---

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

### MenuEstacional — featuredBadge responsive scaling

`font-size` ceiling raised from `0.6875rem` to `1rem` and `padding` converted to `clamp()` values so the badge grows proportionally on wide viewports instead of capping out too early.

---

### StepTime — drag-to-scroll on drums

Added a `useDragScroll` hook that attaches `pointerdown / pointermove / pointerup / pointercancel` listeners to each drum `<ul>`. On `pointerdown` the pointer is captured and the start `scrollTop` is recorded; `pointermove` updates `scrollTop` in real time; `pointerup` releases the capture. The cursor switches to `grabbing` during the drag. Scroll-snap still fires on release so the selection behavior is unchanged. CSS updated: `cursor: grab` on `.drum`, `cursor: inherit` on `.drumItem` (previously `default`, which would override the parent).

---

### Reservation flow — round of UX polish

**Mobile progress timeline values.** The horizontal dot bar now shows user-entered values below each node instead of hiding all labels. Completed steps display a short serif-italic value ("Juan", "2 pers.", "13 May", "14:00", "Terraza"); the active step shows its category label in tiny gold as a hint. Two spans per value (`.valueLong` / `.valueShort`) swap visibility via media query — `getShortValue` formatters on `name` (first word only) and `guests` ("N pers.") prevent overflow in the narrow columns. Bar height changed from fixed `48px` to `height: auto` with padding; content `padding-top` on mobile bumped from `+ 96px` to `+ 110px` to compensate.

**"Editar reservación" button on success screen.** `StepSuccess` now accepts an `onEdit` callback. A secondary ghost button sits beside "Volver al inicio" in a flex `.actions` row; clicking it calls `handleEdit()` in `ReservationFlow`, which resets `currentStep` to `"name"` with all previously entered data still in state so the user can walk through and change only what they need.

**Hydration mismatch fix — StepName input.** Removed `autoFocus` from the `<input>` JSX (which caused the server to emit `autofocus=""` while a password-manager extension injected `fdprocessedid` before React hydrated, producing a guaranteed mismatch). Replaced with `useRef` + `useEffect(() => inputRef.current?.focus(), [])` so focus is applied programmatically after hydration. Added `suppressHydrationWarning` on the input to silence any remaining extension-injected attribute warnings.

**StepPlace — responsive card layout.**
- *Large screens (≥ 1024 px):* `flex-wrap: nowrap` forces both cards side by side; `stepWrapper` max-width widened from `520px` to `640px` so each card reaches ~310 px. Image height pinned to `333px` (the exact pixel height the portrait-ratio image had at the old 250 px card width) so the cards grow wider without growing taller.
- *Small screens (≤ 600 px):* Each `.card` is given `height: 55vh` with `.imageWrapper { flex: 1; aspect-ratio: unset }` so the photo fills all space above the fixed-height card body. At 55 vh the first card fills most of the viewport and the second peeks from below, signalling that there is a second option.

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
