# Acceptance review — R.D. Airway HVAC rebuild

Reviewer: PM acceptance pass, 2026-11-06. Build: `npm run build` (Astro 7.4.7, Tailwind 4.3.5) — **passes**, 9 pages + sitemap.
Evidence (screenshots, audit JSON, scripts) in `/tmp/claude-0/-home-user-rd-airway-hvac/b1930540-5975-55fb-afa2-8e13bb754d13/scratchpad/review/` (`<page>-desktop.png`, `<page>-mobile.png`, `sheets/*.png` tiled views, `header-<width>.png`, `mobile-header.png`, `mobile-menu-open.png`, `audit.json`).

## Status after fix pass

All P0/P1/P2 items below are marked **[DONE]**. Owner decisions remain open.

## Verdict

**Not ready to ship yet — 2 blocking fixes, then ship.** Content is complete and verbatim, every internal link resolves, carousels / mobile menu / form / skip link / jump links all work, no console errors, no horizontal scroll at 375 px, SEO and JSON-LD are present on every page, and the design is consistent across pages. The blockers are a broken header at phone and 1024–1279 px widths (P0-1) and a 2.8 MB home page on mobile with no responsive images (P0-2).

## What was verified (all pass unless listed below)

| Check | Result |
|---|---|
| Content vs `docs/content/*.md` + live old site | All 6 reviews (quote, name, project type) verbatim; About paragraphs, HVAC intros + 12 bullets, home "About the company" paragraph, policy/terms paragraphs verbatim (old-site paragraph diff: 0 missing). Phone `(914) 373-1687` / `tel:+19143731687`, `rdairway@gmail.com`, `PO BOX 340, Verplanck, NY 10596` on every page. No `917` typo, no second street address, no lorem ipsum, no invented ratings/certs/stats. |
| Links (crawl of `dist/`) | 0 broken internal links, all anchors (`/hvac/#installation|#emergency`) exist, sitemap lists 8 pages (404 excluded), `CNAME`, `.nojekyll`, `robots.txt`, favicons, `og-default.jpg` present. |
| Carousels (26 instances, desktop + mobile) | Next/prev click, ArrowLeft/Right, dots, counter all update; testimonial autoplay advances at 6 s, pause button works, autoplay off under `prefers-reduced-motion`. Chris G. portrait block letterboxes correctly. |
| Lazy images | Blank slides in full-page screenshots are a capture artefact; with real scrolling every visible slide image loads on mobile. No image request 404s. |
| Mobile menu | Opens, focus moves to Close, Tab is trapped, Esc closes and returns focus, backdrop click closes, body scroll locked, `aria-expanded` toggles, `aria-current` on active item. |
| Form | Required-field + email validation with inline errors and focus to first invalid; mailto fallback fires with prefilled subject/body when `PUBLIC_FORM_ENDPOINT` is empty; honeypot present. |
| Jump links / sticky header | `scroll-padding-top` keeps `#installation|#emergency|#routine` 15 px clear of the 113 px header. |
| A11y (axe-core 4.10, WCAG 2.1 AA + best-practice, 18 page/viewport combos) | 1 rule fails (`scrollable-region-focusable`, see P1-2); 0 contrast failures; every `<img>` has `alt` + `width`/`height`; one `h1` per page; `lang`, landmarks, skip link OK. |
| SEO | Unique title/description/canonical/OG/Twitter/theme-color on every page; HVACBusiness JSON-LD site-wide (no ratings/hours invented); Reviews adds `review[]` without ratings. |
| Horizontal scroll | `scrollWidth == 375` on all pages at 375 px; 1440 px fine. |
| Deploy workflow | `.github/workflows/deploy.yml` is sane: Node 22, `npm ci`, build, configure/upload/deploy-pages v5/v3/v4, correct permissions, `concurrency`, `workflow_dispatch`, `vars.PUBLIC_FORM_ENDPOINT` → build env. Lockfile matches `package.json` (astro 7.4.7). |

---

## Fix list (prioritized)

### P0 — must fix before deploy

**[DONE] P0-1. Header is broken at 375 px and at 1024–1279 px.** — `src/components/Header.astro`
- At ≤ 767 px the "Request Service" `<Button class="hidden md:inline-flex">` (line 74) is **not hidden**: `Button.astro` adds `inline-flex` to the base class and in the built CSS `.hidden` (offset 20717) precedes `.inline-flex` (20796), so `inline-flex` wins. Result on every page at 375 px: a 132×74 px two-line red button, and the call icon button is squeezed from 44×44 to 31×44 (oval). See `review/mobile-header.png`.
  - Fix: don't combine `hidden` with Button's own display class. Either wrap: `<div class="hidden md:block"><Button …>…</Button></div>`, or add a `class="max-md:hidden!"`-free approach by rendering the button only inside a wrapper. Also add `shrink-0` to both `<a href={telHref}>` elements and `whitespace-nowrap` to the Button.
- At 1024–1279 px (`lg`, before `xl`) the centre nav wraps ("About / Us", "HVAC / Services" on two lines) and "Request Service" wraps to 74 px tall. See `review/header-1024.png` vs `header-1200.png`.
  - Fix (pick one): show the desktop nav from `xl` instead of `lg` (`hidden xl:block` on `<nav>`, hamburger `xl:hidden`, and the same `lg:`→`xl:` swap in `MobileMenu.astro`'s `lg:hidden` root and its `(min-width: 1024px)` auto-close matcher), **or** keep `lg` but hide the phone number text until `xl` (`<span class="hidden xl:inline whitespace-nowrap">`), add `whitespace-nowrap` to nav `<a>` and the Button, and drop nav `gap`/padding at `lg`.
- Re-verify with Playwright at 375, 390, 768, 1024, 1100, 1279, 1280.

> Done: Desktop nav + hamburger switch moved to `xl` (Header + MobileMenu root + 1280 px matcher); CTA wrapped in `hidden md:block` with `whitespace-nowrap`; `shrink-0` on tel links/menu button. Verified 375/390/768/1024/1100/1279/1280/1440: no wrap, call icon 44×44, CTA 166×49 single line.

**[DONE] P0-2. Page weight: home loads 2.8 MB of JPEG on a 375 px phone before scrolling (target in PLAN §2.6: < 1.2 MB).** — `src/data/images.ts`, `src/components/ImageCarousel.astro`, `Hero.astro`, `Section.astro`, `ContactBand.astro`, `about-us.astro`
- Every photo is served at 1600×1200 (161–800 KB) regardless of the 343 px render width; `sizes` is set but there is **no `srcset`**, so it does nothing. All slides of a horizontal carousel sit inside Chromium's lazy-load margin, so the hero (4) + About carousel (6 of 7) + neighbourhood background all download on first paint. `/reviews/` references 32 full-size images (≈ 9 MB).
- Fix: move `public/images/*.jpg` to `src/assets/images/`, have `images.ts` resolve them with `import.meta.glob('/src/assets/images/*.{jpg,png}', { eager: true })` and render through `astro:assets` `<Picture>`/`<Image>` with `widths={[480, 800, 1200, 1600]}`, `formats={['avif','webp']}` and the existing `sizes` strings (hero `(min-width:1024px) 600px, 100vw`; 3-up carousel `33vw`; backgrounds `100vw`). Keep `loading="lazy"`/`decoding="async"`, and `loading="eager" fetchpriority="high"` for the first hero slide only. `sharp` is already in `node_modules`.
- Also re-encode the 5 files over 400 KB (`condenser-landscaped-arborvitae.jpg` 800 KB, `foil-wrapped-duct-trunk`, `crew-exterior-condenser-ladder`, `twin-condensers-white-house`, `tech-exterior-lineset-rough-in`) to q75–80; and shrink `logo-rd-airway-trimmed.png` (117 KB for a 115 px render) to a 2× PNG (~300 px wide) or an SVG.
- Target after fix: home ≤ 1 MB initial on mobile; verify with the weight probe in `review-interact.cjs`.

> Done: Photos moved to `src/assets/images/`, resolved via `import.meta.glob` in `images.ts`, rendered by new `src/components/Photo.astro` (`<Picture>` AVIF/WebP/JPEG, widths 480–1600, existing `sizes`). 5 large sources re-encoded; logo resized to 400 px (117 KB → 15 KB). Home mobile initial: 513 KB @1x, 855 KB @2x (was 2.8 MB); 714 srcset candidates, 0 missing.

### P1 — should fix before deploy

**[DONE] P1-1. Carousel tracks are scrollable but not keyboard-focusable (axe `scrollable-region-focusable`, serious, on every page with an ImageCarousel).** — `src/components/Carousel.astro`
- Add `tabindex="0"` to `<div data-carousel-track …>` (the keydown handler in `src/scripts/carousel.ts` already lives on the root, so arrows will work once the track can take focus) and give it a visible focus ring (`focus-visible:outline-2 focus-visible:outline-brand-500 rounded-2xl`). Re-run axe; expect 0 violations.

> Done: `tabindex="0"` + focus-visible ring on `[data-carousel-track]`; axe 0 violations ×18.

**[DONE] P1-2. Duplicate HVACBusiness entity on `/reviews/`.** — `src/pages/reviews.astro`, `src/layouts/BaseLayout.astro`
- The page emits two `HVACBusiness` blocks with the same `@id` (site-wide + the review one). Merge: give `BaseLayout` a `business?: Record<string, unknown>` override (default `business`) so Reviews can pass `{ ...business, review: [...] }` and only one entity is emitted. Drop `itemReviewed` from each `Review` when nested (redundant).

> Done: `business` override prop on BaseLayout; Reviews passes `{ ...business, review }`. One HVACBusiness block per page.

**[DONE] P1-3. Meta descriptions over 160 chars get truncated in SERPs.** — page files
- `/` 173, `/about-us/` 178, `/hvac/` 185, `/maintenance/` 189, `/reviews/` 171, `/contact-us/` 167. Trim each to ≤ 160 without dropping the phone number where present. Home `<title>` is 80 chars (PLAN says ≤ 60); consider "HVAC Installation, Repair & Service | Westchester County, NY" + brand suffix. Update `docs/content/*.md` SEO blocks to match.

> Done: All descriptions ≤ 154 chars; home title 60 chars (also shortened HVAC/Maintenance titles). `docs/content/*.md` hold no new descriptions, so nothing to trim there.

**[DONE] P1-4. Home `og:image` is a raw 1600×1200 job photo.** — `src/pages/index.astro`
- Social cards expect 1200×630; the photo is cropped unpredictably. Either drop the `ogImage` prop (falls back to the purpose-built `/og-default.jpg`, which looks good) or add a 1200×630 crop of `tech-mounting-mini-split.jpg`.

> Done: `ogImage` prop dropped; home uses `/og-default.jpg`.

### P2 — polish (can ship without, fix soon after)

**[DONE] P2-1. Terms page starts with a stray `<hr>` directly under the hero.** — `src/pages/terms-of-service.astro` line after `<Prose>`. The content doc's "—-" divider sat between the old h3 and OVERVIEW; with a hero above, it reads as a rendering glitch. Remove it (no text is lost).

> Done: Removed.

**[DONE] P2-2. Maintenance CTA band repeats itself.** — `src/pages/maintenance.astro`: title "Schedule a service maintenance call" + text "Schedule a service maintenance call at (914) 373-1687". Keep the verbatim sentence as the text and use a non-duplicating title (e.g. the default "Ready to get comfortable?" or "Time for a tune up?").

> Done: Title now "Keep your system running right."; verbatim sentence kept as text.

**[DONE] P2-3. Footer year is frozen at build time** (`new Date().getFullYear()` in `Footer.astro`). Fine as long as the site is redeployed each year; otherwise render the year client-side or accept it. Note in README.

> Done: Year refreshed client-side by a one-line script; noted in README.

**[DONE] P2-4. Placeholder contrast.** `ContactForm.astro` input placeholders use `placeholder:text-ink-400` (#8A94A6 on white = 3.0:1). Placeholders are not labels here (labels exist), so this is not a WCAG failure, but `text-ink-600/70` would be safer.

> Done: `placeholder:text-ink-600/80`.

**[DONE] P2-5. `favicon.svg` references `'Plus Jakarta Sans'` which SVG favicons cannot load**, so browsers render "RD" in Arial Black. Either outline the text to paths or accept the fallback. `apple-touch-icon.png` / `favicon.ico` are fine.

> Done: "RD" outlined to paths from Plus Jakarta Sans 800.

**[DONE] P2-6. 404 canonical/og:url is `https://rdairwayhvac.com/404/`.** Harmless (page is `noindex`), but `Seo.astro` could skip the canonical when `noindex` is set.

> Done: Canonical + og:url skipped when `noindex`.

**[DONE] P2-7. Unused asset:** `public/images/logo-rd-airway.png` (untrimmed logo) is referenced nowhere; delete or keep for the owner.

> Done: Deleted.

**[DONE] P2-8. Deploy workflow nice-to-haves.** Add a `pull_request` build job (build only, no deploy) so PRs are checked; README's `www` CNAME placeholder `<github-user-or-org>.github.io` needs the real org name filled in before DNS setup.

> Done: `pull_request` trigger builds only (upload/deploy skipped, separate concurrency group); README CNAME → `jonsicher.github.io` (from git remote).

### Owner decisions (content, not code — flag in the hand-off)

- **Privacy Policy and Terms of Service are Shopify boilerplate** (mentions "online store", "orders", "Shopify", "Returns Policy") and the Terms name another company, **"Sellsvoice"**; Section 18's governing-law clause was corrected to the State of New York (owner-approved). Kept verbatim per the content rule; owner must replace both before relying on them.
- Policy contact email unified to `rdairway@gmail.com` (owner-confirmed).
- No license number, social URLs, or clock hours exist on the old site, so none were added. Supply them if wanted (`src/data/site.ts` already has `social` slots that render only when filled).
- Contact form ships in mailto-fallback mode. To get real submissions, set the `PUBLIC_FORM_ENDPOINT` repository variable (Formspree-style) per README.

### Builder-reported gaps — disposition

| Report | Disposition |
|---|---|
| Header "Request Service" wraps at 375 px (contact-us builder) | Confirmed, root cause found → **P0-1** |
| `ContactCard` has no sticky prop | Not needed; current layout is fine. No action. |
| `global.css` lacks `brand-200/600`, `navy-700` etc. | Tokens are the PLAN contract; builders already switched to defined tokens. No action. Consider a Tailwind `@source` lint later. |
| No `sparkles` / `shield` icons | Acceptable substitutes used (`check-circle`, `shield-check`). No action. |
| `ServiceSection` CTA always links to `/contact-us/` | Intended ("Request service"). No action. |
| `ContactBand` shows "Get in touch" eyebrow not in spec | Harmless; keep for consistency with other sections. |
| Map iframe blank in sandbox | Network-blocked here only; `src`, `title`, `loading=lazy`, `referrerpolicy` and `<noscript>` fallback are all correct. Verify once on the live domain. |
| First `<hr>` on Terms reads oddly | Agreed → **P2-1** |

## Re-test checklist after fixes

1. `npm run build` clean.
2. Playwright: header screenshots at 375 / 390 / 768 / 1024 / 1100 / 1279 / 1280 / 1440 — no wrapping, call icon 44×44, CTA hidden < 768.
3. Home mobile initial transfer ≤ 1 MB; `<img>` elements carry `srcset`; first hero image eager, rest lazy.
4. axe: 0 violations on all 9 pages × 2 viewports.
5. `/reviews/` has exactly one `application/ld+json` HVACBusiness.
6. All descriptions ≤ 160 chars; home title ≤ 60.
7. Spot-check `/terms-of-service/` top and `/maintenance/` CTA copy.
