# Website Improvement & Production-Ready Prompt

## Context
This is a **physiotherapy clinic website** to be optimized and finalized for **production**, targeting **Jhansi-based local SEO**.

---

## 1. Branding
- Add the **logo in the footer**, matching the same logo/style used in the header (same size ratio, same file, proper alt text: e.g. `alt="[Clinic Name] – Physiotherapy Clinic Jhansi Logo"`).

## 2. Services Update
- Add **Wax Therapy** as a new service in the **Services section**.
- Also add relevant mentions/links to Wax Therapy wherever contextually applicable:
  - Homepage service highlights
  - Related services / "you may also need" sections
  - Internal search functionality
  - Site navigation/menu (if services are listed there)
  - Sitemap and SEO metadata

## 3. Forms & WhatsApp Integration
- Fix **all forms** across the website to correctly integrate with WhatsApp:
  - On submit, format the form data into a clean, readable WhatsApp message (e.g. `Name: X%0APhone: Y%0AService: Z%0AMessage: W`) and open `https://wa.me/<CLINIC_WHATSAPP_NUMBER>?text=<encoded_message>`.
  - Also connect each form to **Formspree** as a backup/parallel submission method (insert the Formspree endpoint/link — confirm the actual Formspree form ID before implementing).
  - Store the **WhatsApp number** and **Formspree link** in a **single shared/common config file** (e.g. `config.js` or `siteConfig.json`), and reference that file everywhere instead of hardcoding numbers/links in multiple places.
  - Before implementing, review the existing website/project structure to see where links and shared data are currently managed, and follow that same pattern for consistency.
- Add a **floating WhatsApp chat button** (bottom-right, sticky) on all pages for quick contact.
- Add basic **form validation** (required fields, phone number format, email format) before submission.

## 4. Website Optimization & Responsiveness
- Optimize the overall website performance (image compression, lazy loading, minified CSS/JS, reduce unused code).
- Make **every screen size fully responsive** — mobile, tablet, desktop — with **mobile-first priority** (most users will visit via mobile).
- Test on common breakpoints: 360px, 390px, 768px, 1024px, 1440px.
- Ensure buttons, forms, and click-to-call/WhatsApp icons are easily tappable on mobile (minimum 44x44px touch target).

## 5. Content Rewrite (Polished + Jhansi-Focused)
- Rewrite **all website content** to be more professional, clear, and error-free (proofread for grammar/spelling).
- Localize content to be **Jhansi-based**, so it supports **local SEO**:
  - Mention "Jhansi", nearby localities/landmarks, and service-area language naturally (not keyword-stuffed) throughout homepage, about, services, and contact pages.
  - Add a **service area** section if applicable (e.g. areas within Jhansi served).

## 6. SEO Implementation
- Add proper **meta titles** and **meta descriptions** for every page, optimized with best-fit keywords for **"physiotherapy in Jhansi"**, **"physiotherapist near me Jhansi"**, **"best physiotherapy clinic Jhansi"**, **"wax therapy Jhansi"**, etc. (research real, relevant keyword variations — avoid stuffing).
- Add proper **header tag structure** (single H1 per page, logical H2/H3 hierarchy) with keywords naturally included.
- Add **Open Graph (OG) tags** and **Twitter Card tags** for better link previews on social/WhatsApp shares.
- Add **schema.org structured data** (LocalBusiness / MedicalBusiness / Physiotherapist schema) with NAP (Name, Address, Phone), business hours, and service list — this significantly boosts local SEO.
- Add **canonical tags** to avoid duplicate content issues.
- Ensure all images have descriptive **alt text** with relevant keywords.
- Add internal linking between services, blog/FAQ (if any), and contact pages.
- Set up **Google Business Profile** alignment (same NAP info as website) — mention as a recommendation if not already integrated.

## 7. Sitemap & Robots Files
- Generate a correct **`sitemap.xml`** listing all live pages with proper priority/lastmod values.
- Generate a correct **`robots.txt`** allowing search engines to crawl properly and pointing to the sitemap URL.
- Submit reminder: after deployment, submit sitemap to Google Search Console.

## 8. Image Optimization
- Convert **all images to WebP format** (with proper compression) for faster loading, while keeping a fallback (e.g. `<picture>` tag with original format fallback) if browser support is a concern.
- Update all image references/paths across the codebase after conversion.

## 9. Code & Asset Cleanup
- **Remove all unused images** from the project folder that are no longer referenced anywhere in the code.
- **Remove all unused/dead code** — unused CSS classes, unused JS functions/variables, commented-out old code, unused components/files, and unused npm packages/dependencies.
- Do a final scan to confirm no broken references were left behind after cleanup.

## 10. Ask Before Assuming
- Before implementing anything, **ask me for any required information/inputs** you don't already have — do not assume or use placeholder/dummy values for real content. This includes but is not limited to:
  - Formspree link/form ID
  - WhatsApp business number
  - Social media links (Instagram, Facebook, YouTube, Google Business Profile, etc.)
  - Clinic address, contact number, email, business hours
  - Any images/logo files needed
  - Target keywords, if I have a preferred list
  - Any other missing detail needed to complete the task correctly

## 11. File & Data Management
- Restructure/organize files so that **all shared/common data** (contact number, WhatsApp number, Formspree link, address, business hours, social links) lives in **one central config file**, imported wherever needed — instead of being duplicated across multiple pages/components.

## 12. Final Production Checklist
- Fix any broken links, routes, or 404s.
- Add a proper custom **404 error page**.
- Ensure **favicon** is set correctly across all pages.
- Test all forms (WhatsApp + Formspree) end-to-end before going live.
- Verify HTTPS/SSL is active.
- Run a Lighthouse/PageSpeed audit and fix major performance/accessibility/SEO warnings.
- Confirm the site is fully responsive and functional on real mobile devices before final handover.
- Deliver as a **complete, production-ready build**.
