
# Production Overhaul Plan — Arnav Physiotherapy

This is a large scope. I'll deliver it in **4 sequential batches** so the site stays buildable between steps. Each batch is fully working on its own.

## Before I start — I need 2 quick inputs

1. **Formspree endpoint** — please share your Formspree form ID (looks like `https://formspree.io/f/xxxxxxxx`). Without it, forms can't email you. I'll wire WhatsApp forwarding in parallel using the existing WhatsApp number in `site.ts` — no extra input needed for that.
2. **Doctor photo + real bio details** for Dr. Dushyant Singh (qualifications, years of experience, specializations, awards). If you don't have them handy, I'll use professional placeholders you can swap later.

If you want me to proceed now with placeholders for both, just say "proceed with placeholders" and I'll ship everything.

---

## Batch 1 — Foundation & Data

- **Centralized data layer** (`src/lib/data.ts` expanded, `src/lib/site.ts`): services, treatments, conditions, doctor, FAQs, testimonials, gallery, nav, footer, SEO meta — one source of truth.
- **Header**: sticky with scroll-shrink, active-link states, mobile drawer, dropdowns for Services/Conditions, search icon.
- **Scroll-to-top button**, **breadcrumbs component**, **skeleton loaders**.
- **Fix hero overlay** — reduce gradient opacity, add readable text scrim only behind text, images fully visible.

## Batch 2 — Search (both systems)

- **Header search popup** (⌘K style): default suggestions, live fuzzy search across services/conditions/treatments/doctor/gallery/FAQs/blogs, recent searches (localStorage), popular searches, keyboard nav (↑↓ Enter Esc), card results grouped by type, empty state. Built with `cmdk`.
- **Hero search**: service+condition dual selector, autosuggest dropdown, location chip, popular chips, smart-match → routes to correct detail page.

## Batch 3 — Sections & Detail Pages

- **Home cards redesign**: larger images (aspect 4/3 → 16/10), rounded-3xl, layered shadows, tilt-on-hover, gradient reveal.
- **Conditions carousel** (embla): autoplay, pause-on-hover, prev/next, touch/swipe, dots, responsive slides-per-view.
- **Detail pages** — every service, condition, treatment gets: banner + breadcrumb, hero image, overview, description, benefits, FAQs, related services, sticky CTA, contact block. Route pattern already exists; I'll enrich content and layout.
- **Doctor section** replaces "Physiotherapists Who Listen": profile card, qualifications timeline, specializations grid, philosophy quote, awards row, book-appointment CTA.
- **Gallery redesign**: category filter tabs, masonry layout, lightbox (yet-another-react-lightbox), video support, lazy loading.
- **Additional image sections**: before/after slider, facilities strip, equipment grid on relevant pages.

## Batch 4 — Forms, SEO, Polish, Production

- **Forms**: zod validation, loading/success/error states, Formspree POST + WhatsApp deep-link fallback that opens pre-filled `wa.me` message with all fields. Contact, Booking, and inline CTAs all wired.
- **SEO**: per-route `head()` with title/description/OG/Twitter/canonical, JSON-LD (LocalBusiness on root, MedicalBusiness/Physician for doctor, Service for service pages, FAQPage for FAQ, BreadcrumbList on detail pages), sitemap already exists — verify entries, robots.txt already exists, alt text audit, semantic H1/H2 hierarchy.
- **Cleanup**: remove unused files, consolidate duplicate components, consistent naming, verify no console errors, verify all routes render, run typecheck.
- **A11y**: focus rings, aria-labels on icon buttons, reduced-motion respect.

## Technical notes

- Stack: TanStack Start + Query already wired; embla-carousel-react + cmdk + yet-another-react-lightbox will be added.
- Data lives in `src/lib/data.ts` (single source). Detail pages read via loader → useSuspenseQuery pattern where dynamic.
- All new routes follow file-based routing under `src/routes/`.
- Forms use `react-hook-form` + `zod` (already in deps).

## Deliverable

After batch 4: fully responsive, SEO-optimized, all forms functional (Formspree + WhatsApp), all detail pages live, both search systems working, doctor profile section, gallery with lightbox, no placeholders, clean typecheck.

**Please confirm the two inputs above (or say "proceed with placeholders") and I'll start batch 1 immediately.**
