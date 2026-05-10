# Diario de Desarrollo — Tonantzin Cocina Mestiza

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
