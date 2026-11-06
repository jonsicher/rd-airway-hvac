# R.D. Airway HVAC — Website Rebuild Plan

Rebuild of https://rdairwayhvac.com/ (WordPress/Elementor, 2020–2024) as a fast, static, modern site. This document is the spec. Content inventories live in `docs/content/*.md`; images are already in `public/images/` (see `docs/content/images.md`). Business facts (phone, email, address, service area, hours) are in `docs/content/shared.md` and must be loaded from one file: `src/data/site.ts`.

**Non-negotiables**
- Keep real facts exact: name, phone (914) 373-1687, email, PO Box, service area, hours, review text + names, founder name, "over 15 years", policy text (verbatim).
- Never invent certifications, license numbers, awards, star ratings, counts ("500+ installs"), brand logos, or new reviews.
- Marketing copy may be lightly polished; the content files already contain the final wording — use it.
- Do not commit or push; the orchestrator does that.

---

## 1. Stack & repo layout (fixed)

- **Astro** (latest stable, `npm create astro@latest` minimal template, strict TS off → `tsconfig` extends `astro/tsconfigs/base`), `output: 'static'`, `site: 'https://rdairwayhvac.com'`, `trailingSlash: 'always'`, `build.format: 'directory'` (so `/about-us/` → `about-us/index.html`, matching old URLs).
- **Tailwind CSS v4** via `@tailwindcss/vite` (import `tailwindcss` in `src/styles/global.css`; design tokens via `@theme`). If the Astro version in use still ships `@astrojs/tailwind` for v3, v3 is acceptable — tokens then go in `tailwind.config.mjs`. Either way the token names below are the contract.
- **Fonts**: self-hosted via npm `@fontsource-variable/plus-jakarta-sans` (headings) and `@fontsource-variable/inter` (body). Import once in `global.css`. No Google Fonts network calls.
- **Icons**: inline SVG (Lucide icon paths copied into `src/components/icons/*.astro`). No icon font.
- **Images** (updated: photos now live in `src/assets/images/` and render via `src/components/Photo.astro` / `astro:assets` with responsive srcsets; only the logo stays in `public/images/`). Original rule: files in `public/images/` referenced as `/images/<name>.jpg` with explicit `width`/`height`, `loading="lazy"` (except the first hero image: `loading="eager" fetchpriority="high"`), `decoding="async"`. Optional: route hero/grid images through `astro:assets` `<Image>` by importing from `src/assets/` — only if simple; `public/` is the default and fine.
- **JS**: only small vanilla `<script>` blocks in Astro components (mobile nav, carousels, form). No frameworks.
- **Deploy**: GitHub Pages via `.github/workflows/deploy.yml` using `withastro/action@v3` + `actions/deploy-pages@v4` (permissions: `contents: read, pages: write, id-token: write`), on push to `master`. `public/CNAME` containing `rdairwayhvac.com`. `public/.nojekyll` empty file. `public/robots.txt` allowing all + `Sitemap: https://rdairwayhvac.com/sitemap-index.xml`. Add `@astrojs/sitemap`.
- **Env**: `PUBLIC_FORM_ENDPOINT` (optional). Document in `.env.example` and README.

```
/
├─ .github/workflows/deploy.yml
├─ astro.config.mjs
├─ package.json
├─ public/ (CNAME, .nojekyll, robots.txt, favicon.svg, favicon.ico, apple-touch-icon.png, og-default.jpg, images/…)
├─ src/
│  ├─ data/site.ts            ← business facts, nav, social (empty), reviews, services
│  ├─ data/reviews.ts         ← 6 testimonials + photo lists (from docs/content/reviews.md)
│  ├─ data/services.ts        ← 3 services with bullets + carousel images (from hvac.md)
│  ├─ layouts/BaseLayout.astro
│  ├─ components/ (Header, MobileMenu, Footer, Hero, PageHero, Section, CtaBand, ServiceCard,
│  │     ServiceSection, FeatureList, TestimonialCarousel, ImageCarousel, ProjectReview,
│  │     ContactCard, ContactForm, ContactBand, MapEmbed, Seo, JsonLd, Button, Prose, icons/)
│  ├─ pages/ index.astro, about-us.astro, hvac.astro, maintenance.astro, reviews.astro,
│  │     contact-us.astro, privacy-policy.astro, terms-of-service.astro, 404.astro
│  └─ styles/global.css
└─ docs/ (this plan + content)
```

---

## 2. Design brief

**Feel**: modern, fresh, trustworthy, "clean install" energy — the thing the reviews praise most is how *clean* the work looks, so the site should feel the same: lots of white, crisp navy type, one confident brand blue, red reserved for the primary action, generous spacing, big real job-site photos (not stock), rounded-but-not-bubbly corners. Think a well-run local trade company, not a national franchise and not a SaaS landing page.

### 2.1 Palette (hex tokens — derived from the logo: logo blue `#3EA6DB`, logo red `#CF534D`; old site navy `#002F54` / `#16163F`, old CTA yellow `#FBD500` refreshed)

| Token | Hex | Use |
|---|---|---|
| `--color-navy-950` | `#0B1F3A` | footer bg, hero overlays, darkest text on light |
| `--color-navy-900` | `#12305A` | headings, dark section bg, nav text |
| `--color-navy-800` | `#1B4275` | hover states on navy, gradient partner |
| `--color-brand-500` | `#2A9BD6` | brand blue — icons, accents, decorative shapes, badges (NOT for body text on white: 3.1:1) |
| `--color-brand-400` | `#3EA6DB` | exact logo blue — gradients, highlights |
| `--color-brand-700` | `#1B6FA3` | links & blue text on white (5.5:1 AA) |
| `--color-brand-100` | `#E3F3FB` | soft blue tint backgrounds, icon chips |
| `--color-brand-50` | `#F2F9FD` | alternating section background |
| `--color-red-500` | `#CF534D` | exact logo red — accents, underline rules, large display text |
| `--color-red-600` | `#B9413B` | **primary button bg** (white text 5.4:1 AA) |
| `--color-red-700` | `#9E342F` | primary button hover |
| `--color-amber-400` | `#F5C518` | tiny highlight only (eyebrow dot, focus ring alt). Refresh of old `#FBD500`. Never as text. |
| `--color-ink-900` | `#1A2332` | body headings on white |
| `--color-ink-600` | `#4B5563` | body text |
| `--color-ink-400` | `#8A94A6` | muted meta text |
| `--color-line-200` | `#E5E9EF` | borders, dividers |
| `--color-surface-50` | `#F7F9FB` | off-white section bg |
| `--color-white` | `#FFFFFF` | |

Gradients: hero/dark bands use `linear-gradient(135deg, #0B1F3A 0%, #12305A 55%, #1B6FA3 100%)`; image overlays use `linear-gradient(to top, rgba(11,31,58,.92), rgba(11,31,58,.45))`.

Focus ring: 2px `#2A9BD6` with 2px white offset, always visible on keyboard focus.

### 2.2 Typography
- Headings: **Plus Jakarta Sans** (variable), weights 700/800, tight tracking (`-0.02em`), line-height 1.1 for display, 1.2 for h2/h3. Colour navy-900 on light, white on dark.
- Body: **Inter** (variable), 400/500/600, 16px base (17px ≥ lg), line-height 1.65, colour ink-600.
- Scale (rem): display 3.5 (lg 4.25) · h1 2.5 (lg 3.25) · h2 2 (lg 2.5) · h3 1.375 · h4 1.125 · eyebrow 0.8125 uppercase tracking `0.12em` semibold brand-700 · small 0.875.
- Eyebrow pattern: short red (`red-500`) 2.5rem × 3px bar OR a brand-500 dot before uppercase label. Pick the bar; use consistently.

### 2.3 Spacing, shape, elevation
- Container `max-w-7xl` (1280px) with `px-4 sm:px-6 lg:px-8` (16px gutter on phones — mandatory).
- Section vertical padding `py-16 lg:py-24`; hero `pt-12 pb-16 lg:pt-20 lg:pb-24`.
- Radius: cards/images `rounded-2xl` (16px), buttons `rounded-full`, chips `rounded-full`, inputs `rounded-xl`.
- Shadow: cards `shadow-[0_8px_30px_rgba(11,31,58,0.08)]`, hover lifts to `0_12px_40px_rgba(11,31,58,0.14)` + `-translate-y-0.5`. No shadows on dark bg.
- Motion: 200ms ease-out transitions; respect `prefers-reduced-motion` (disable carousel autoplay + transforms).

### 2.4 Buttons (`Button.astro`, props: `variant`, `href`, `size`)
- `primary`: bg red-600, text white, `font-semibold`, `px-6 py-3` (lg `px-7 py-3.5`), rounded-full, hover red-700, arrow icon optional.
- `secondary`: bg white, text navy-900, 1px line-200 border, hover bg surface-50. On dark bg: `bg-white/10 text-white border-white/30 hover:bg-white/20`.
- `ghost`: text brand-700, underline on hover, with phone/arrow icon.
- `call` (header): phone icon + number, text navy-900 semibold; on mobile collapses to a 44×44 round brand-500 icon button labelled "Call (914) 373-1687" (aria-label).

### 2.5 Imagery treatment
- Real job-site photos only. Always `object-cover`, `rounded-2xl`, 4:3 in carousels/grids, 16:9 for wide banners. Hero carousel: 5:4 on desktop, 4:3 mobile.
- Dark overlay bands (About company, Service area, Contact band): background image `object-cover` + navy overlay gradient; text white; keep contrast ≥ 4.5:1 (overlay opacity ≥ .85 behind text).
- Logo on dark backgrounds: place `logo-rd-airway-trimmed.png` inside a white `rounded-xl` card with `p-3` (the logo is colour-on-transparent and the red/blue do not read on navy).
- Favicon: generate `public/favicon.svg` — a rounded square `#12305A` with a white "RD" in Plus Jakarta Sans 800, plus a small red (`#CF534D`) swoosh under it; also export `favicon.ico` (32px) and `apple-touch-icon.png` (180px) from it (Playwright screenshot of the SVG is fine). `og-default.jpg` 1200×630: navy gradient, white logo card, headline "HVAC Installation · Repair · Service — Westchester County, NY", phone.

### 2.6 Accessibility & performance bar
- Semantic landmarks (`header/nav/main/footer`), one `h1` per page, skip link, visible focus, `aria-current="page"` on nav.
- Mobile menu: `<button aria-expanded aria-controls>`, closes on Esc and outside click, focus trapped while open, body scroll locked.
- Carousels: `role="region" aria-roledescription="carousel" aria-label`, slides `role="group" aria-roledescription="slide" aria-label="n of N"`, prev/next buttons (44px targets), keyboard arrows, dots optional; autoplay only for the testimonial carousel (6s, pauses on hover/focus, off with reduced-motion). Implementation: CSS scroll-snap track + buttons that `scrollBy` one slide; no library.
- No horizontal scroll at 375px (test with Playwright: `document.documentElement.scrollWidth <= 375`).
- Lighthouse targets: Perf ≥ 95, A11y 100, SEO 100 on mobile. Total page weight home < 1.2 MB (lazy images).

---

## 3. Information architecture

```
Header: [Logo→/]  About Us · HVAC Services · Maintenance · Reviews · Contact   [(914) 373-1687] [Request Service]
/                 Home
/about-us/        About Us
/hvac/            HVAC Services  (#installation, #emergency, #routine)
/maintenance/     Routine Maintenance
/reviews/         Customer Testimonials
/contact-us/      Contact / Request Your Appointment
/privacy-policy/  Privacy Policy
/terms-of-service/ Terms of Service
/404              Not found (logo, "Page not found", links home + call)
```
Dropped: `/privacy-policy-2/` (duplicate), `/service-offer/` (orphan Typeform), blog post, "Blog"/"News" footer links (dead).

`src/data/site.ts` shape:
```ts
export const site = {
  name: 'R.D. Airway HVAC', legalName: 'R.D. Airway HVAC, LLC', domain: 'https://rdairwayhvac.com',
  phoneDisplay: '(914) 373-1687', phoneTel: '+19143731687', email: 'rdairway@gmail.com',
  address: { poBox: 'PO BOX 340', city: 'Verplanck', state: 'NY', zip: '10596' },
  serviceAreas: ['Westchester County', 'Putnam County', 'Connecticut'],
  serviceAreaSentence: 'Proudly serving Westchester County, NY and the Greater Hudson Valley',
  hours: 'Available weekdays and weekends', founded: 'over 15 years', founder: 'Rafael Da Silva',
  social: { facebook: '', instagram: '', yelp: '' }, // render only if non-empty
  mapEmbed: 'https://maps.google.com/maps?q=Verplanck%2C%20NY&t=m&z=10&output=embed&iwloc=near',
  nav: [...], footerNav: {...}
}
```

---

## 4. Shared components (contract)

| Component | Props / behaviour |
|---|---|
| `BaseLayout` | `title, description, ogImage?, jsonLd?, noindex?`; renders `<Seo>`, skip link, `<Header>`, `<main id="main">`, `<Footer>`, global `JsonLd` HVACBusiness on every page (+ page-specific if passed). |
| `Seo` | `<title>` (≤ 60 chars, pattern "Page | R.D. Airway HVAC"), meta description, canonical (`Astro.url` + site), OG (`og:type website`, `og:site_name`, `og:title`, `og:description`, `og:image` absolute, `og:url`), Twitter `summary_large_image`, `theme-color #12305A`, favicons. |
| `JsonLd` | `@type: "HVACBusiness"`, `name` legalName, `url`, `telephone "+1-914-373-1687"`, `email`, `image` logo URL, `address` (PostalAddress with `postOfficeBoxNumber "340"`, `addressLocality "Verplanck"`, `addressRegion "NY"`, `postalCode "10596"`, `addressCountry "US"`), `areaServed` [Westchester County NY, Putnam County NY, Connecticut, Hudson Valley NY], `description`, `founder` Person "Rafael Da Silva", `priceRange` omitted, `openingHours` omitted (no clock hours exist). Reviews page adds `review[]` with `author`, `reviewBody` — no `reviewRating`, no `aggregateRating`. |
| `Header` | Sticky (`sticky top-0 z-50`), white with `backdrop-blur` + bottom border on scroll (toggle class via tiny script using `scrollY > 8`). Top strip (desktop only, navy-950, 32px): email mailto + "Available weekdays and weekends" left; "Serving Westchester County, NY & the Hudson Valley" right. Main bar 72px (lg 80px): logo (height 44/52px, `logo-rd-airway-trimmed.png`, alt "R.D. Airway HVAC"), centre nav (hidden < lg), right: call button + primary "Request Service". Hamburger < lg. |
| `MobileMenu` | Full-height panel sliding from right (max-w 20rem), nav links large (text-lg), then "Call (914) 373-1687" primary-looking full-width button and "Request Service". Backdrop. |
| `Footer` | Navy-950. 4 columns as in `shared.md` (logo card, Company, Services, Service area). Bottom bar: © year legalName · Privacy Policy · Terms of Service. Social icons only when URLs set (none shipped). |
| `Hero` (home) | Two-column ≥ lg: text left (eyebrow, h1, sub, 2 buttons, trust row of 3 small check items: "Fully licensed and insured" · "Over 15 years of experience" · "Weekdays & weekends"), right: `ImageCarousel` 4 slides, first eager. Background: white with a soft brand-50 blob/radial glow top-right and faint grid pattern. Under lg: text then carousel. |
| `PageHero` | Compact navy gradient band: eyebrow, h1, sub (max-w-2xl). Optional breadcrumb "Home / Page". |
| `Section` | `id?, bg: 'white'|'soft'|'brand'|'navy'|'image'`, `image?`, `eyebrow?, title?, intro?`, `align: 'left'|'center'`, slot. Handles container + padding + overlay. |
| `CtaBand` | Navy gradient band with heading, paragraph, primary + call buttons; decorative red/blue swoosh SVG (echo of the logo) bottom-left at low opacity. Used at the bottom of every content page. |
| `ServiceCard` | icon chip (brand-100 bg, brand-700 icon), h3, text, "Learn more →". Hover lift. |
| `ServiceSection` | `id, icon, title, intro, bullets[{label,text}], images[], flip?`. Grid 2-col ≥ lg; `FeatureList` with check icons, labels bold navy-900; `ImageCarousel`. |
| `TestimonialCarousel` | Scroll-snap track, 1 slide visible (≥ md: 1 centred with peeking neighbours optional — keep simple: 1 per view, max-w-3xl). Slide: big quote mark in brand-100, quote (text-xl lg:text-2xl, Plus Jakarta 500), "— Name" + project type pill. Prev/next + dots. Autoplay 6s with pause rules. |
| `ImageCarousel` | `images[{src,alt,width,height}], aspect='4/3', ariaLabel, eagerFirst?`. Scroll-snap, 1 slide/view (home About carousel: 1 on mobile, 2 on md, 3 on lg), rounded, prev/next overlay buttons (white circle, navy icon), counter "2 / 7". Pure CSS + ~40 lines JS. |
| `ProjectReview` | `quote, name, project, images[], flip?` — quote card + ImageCarousel. |
| `ContactCard` | Facts list with icons (phone, mail, map-pin, map, clock). |
| `ContactBand` | Image bg (`service-area-map-hudson-valley.jpg`) + navy overlay; white card with legal name, PO Box, phone, service area sentence, hours, "Contact Us" button. Used on About, HVAC, Maintenance, Reviews. |
| `ContactForm` | See §6. |
| `MapEmbed` | Lazy iframe + noscript image (see contact-us.md). |
| `Prose` | `max-w-prose mx-auto` typographic wrapper for policy pages (h2 spacing, links brand-700 underline). |

---

## 5. Page specs (section order is binding)

### 5.1 Home `/`
1. `Hero` — copy from `content/home.md` ("We keep your home running right." as h1; eyebrow with service areas; sub mentions licensed/insured). Carousel images: tech-mounting-mini-split (eager), twin-condensers-white-house, tech-attic-install, living-room-mini-split.
2. `Section bg=soft` "What we do" — eyebrow "Services", h2 "Installation, repairs and service — done right the first time." 3 `ServiceCard`s (HVAC Installation → /hvac/#installation, Emergency Repairs → /hvac/#emergency, Routine Service → /maintenance/) with the intros from home.md.
3. `Section bg=image` (hero-suburban-neighborhood.jpg + overlay) "About the company." — lead line, verbatim paragraph, 3 fact chips (licensed & insured · over 15 years · weekdays & weekends), `ImageCarousel` with the 7 old slides (3-up on lg), button "More About Us".
4. `Section bg=white` "What Customers Say." — `TestimonialCarousel` with the 3 home testimonials (Nancy O., Joe L., Chris G.) + project types from reviews.md; button "All Reviews".
5. `Section bg=image` (service-area-map-hudson-valley.jpg + overlay, text left on a navy-950/80 card) "Proudly serving your neighborhood." — red bar, 3 area chips (map-pin icon), sentence, small text "Based in Verplanck, NY".
6. `CtaBand` — "Ready to get comfortable?"

### 5.2 About `/about-us/` — `PageHero` → Story (2 verbatim paragraphs + 2×2 photo grid) → "What sets us apart" 3 cards → brands sentence (plain text) → `ContactBand` → `CtaBand`. (Details: content/about-us.md.)

### 5.3 HVAC `/hvac/` — `PageHero` → jump-link pills → 3 `ServiceSection`s (installation / emergency / routine; alternate flip) → guarantee callout → `ContactBand` → `CtaBand`. (content/hvac.md — apply only the listed typo fixes.)

### 5.4 Maintenance `/maintenance/` — `PageHero` → 4 benefit cards → "When to schedule" 2 season cards → guarantee callout → `ImageCarousel` (5 images) → link card to /hvac/ → `ContactBand` → `CtaBand`. (content/maintenance.md.)

### 5.5 Reviews `/reviews/` — `PageHero` → 6 `ProjectReview` blocks in the old order (alternate flip) → `CtaBand`. JSON-LD `review[]` without ratings. (content/reviews.md.)

### 5.6 Contact `/contact-us/` — `PageHero` → 2-col `ContactCard` + `ContactForm` → `MapEmbed` → (no CtaBand; the page is the CTA).

### 5.7 Privacy / Terms — `PageHero` (small) → `Prose` with verbatim text from the content files. Headings as described there. `noindex` NOT set (keep indexable like the old site).

### 5.8 404 — logo, "Page not found", buttons Home + Call.

---

## 6. Contact form (static site)

Old form: Elementor Pro form posting to WordPress `admin-ajax.php` (server-side email). Fields: Name, Email, Phone (number input), Select ("I am a potential customer." / "I am a current customer." / "I'm neither."), Message. That backend does not exist on GitHub Pages.

New behaviour (`ContactForm.astro` + ≤ 80 lines vanilla JS):
- Markup: `<form method="POST" action={endpoint || '#'} novalidate data-endpoint={endpoint}>` with fields `name` (required), `email` (required, type=email), `phone` (type=tel, `inputmode=tel`, `autocomplete=tel`), `customer_type` (select, same 3 options, first selected), `message` (required textarea), hidden `_subject` = "Website request from {name}" (Formspree convention), honeypot `<input type="text" name="_gotcha" class="hidden" tabindex="-1" autocomplete="off">`.
- `endpoint = import.meta.env.PUBLIC_FORM_ENDPOINT` (e.g. `https://formspree.io/f/xxxx`). When set: on submit, `fetch(endpoint, { method:'POST', headers:{Accept:'application/json'}, body: new FormData(form) })`; show inline success/error states (`aria-live="polite"`); disable the button while sending. If JS is unavailable, the native POST to the endpoint still works (Formspree handles it).
- **Update:** the shipped form defaults to FormSubmit (`https://formsubmit.co/ajax/rdairway@gmail.com`, honeypot `_honey`) — see README "Contact form".
- When NOT set (fallback): submit handler builds `mailto:rdairway@gmail.com?subject=Website%20request%20from%20{name}&body={encoded fields}` and sets `window.location`; show note under the form: "This opens your email app. Prefer to call? (914) 373-1687."
- Client validation with helpful inline messages; never block on phone.
- `.env.example`: `PUBLIC_FORM_ENDPOINT=` with a comment. README documents setting it in GitHub Actions as a repository variable (`vars.PUBLIC_FORM_ENDPOINT`) passed to the build env in deploy.yml.

---

## 7. Deploy workflow (`.github/workflows/deploy.yml`)
```yaml
name: Deploy to GitHub Pages
on: { push: { branches: [master] }, workflow_dispatch: {} }
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    env: { PUBLIC_FORM_ENDPOINT: ${{ vars.PUBLIC_FORM_ENDPOINT }} }
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v3   # node 22, npm ci, astro build → dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```
Plus `public/CNAME` = `rdairwayhvac.com`. README: point the domain's A/ALIAS records at GitHub Pages and enable "Enforce HTTPS".

---

## 8. Build order for implementers
1. Scaffold Astro + Tailwind + fonts + tokens + `site.ts`, `BaseLayout`, `Seo`, `JsonLd`, `Header`, `MobileMenu`, `Footer`, `Button`, `Section`, `CtaBand`. Verify `npm run build` passes and `/` renders at 375px with no horizontal scroll.
2. `ImageCarousel`, `TestimonialCarousel` (shared scroll-snap script), `ServiceCard`, `ContactBand`.
3. Pages: Home → HVAC → Maintenance → About → Reviews → Contact (+ `ContactForm`, `MapEmbed`) → Privacy/Terms → 404.
4. Favicons + `og-default.jpg`, sitemap, robots, CNAME, `.nojekyll`, deploy workflow, `.env.example`, README.
5. QA: Playwright screenshots of every page at 375 / 768 / 1366; check `scrollWidth`, h1 count, alt text present on all `<img>`, tel/mailto links, carousel keyboard nav, form fallback (no env) and endpoint mode (mock), Lighthouse on home.

---

## 9. Known issues on the old site (for the summary / owner)
- Home service cards contained **Lorem ipsum** → replaced with real intros from the HVAC page.
- `/maintenance/` was an exact duplicate of `/hvac/` → rebuilt as a real maintenance page from existing Routine Service copy.
- Phone typo **917**-373-1687 in 3 places (should be 914). Header email link and all social icons had **no href**.
- Owner confirmed (Nov 2026): the only address is PO BOX 340, Verplanck, NY 10596; the only email is rdairway@gmail.com; maps centre on Verplanck, NY.
- Privacy Policy and Terms are **Shopify boilerplate**; Terms names another company ("Sellsvoice") and an online store. Kept verbatim per the content rule; owner should replace.
- Orphan `/service-offer/` Typeform quiz and default "Hello world!" blog post → dropped. "Blog"/"News" footer links → dropped.
- No favicon, no meta descriptions, no Open Graph, no structured data on the old site.
- No license number, no ratings, no social URLs available — nothing fabricated.
