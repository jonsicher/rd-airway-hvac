# R.D. Airway HVAC — rdairwayhvac.com

Static rebuild of the R.D. Airway HVAC website (previously WordPress/Elementor) using
[Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com). No client-side
framework; only small vanilla scripts for the mobile menu, carousels and contact form.

- Spec: [`docs/PLAN.md`](docs/PLAN.md)
- Content inventory (final copy, verbatim facts): [`docs/content/`](docs/content/)
- Component reference for page builders: [`docs/COMPONENTS.md`](docs/COMPONENTS.md)
- Business facts (phone, email, address, nav): `src/data/site.ts` — the single source of truth.

## Requirements

Node.js 22 (≥ 22.12) and npm.

## Develop

```sh
npm install
npm run dev        # http://localhost:4321
```

## Build & preview

```sh
npm run build      # static output in dist/ (one folder per page, trailing-slash URLs)
npm run preview    # serve dist/ locally
```

## Project layout

```
src/
  data/        site.ts (facts, nav), images.ts (alt text; photos resolved from src/assets/images/), services.ts, reviews.ts
  layouts/     BaseLayout.astro (SEO, Open Graph, JSON-LD, header, footer)
  components/  Header, MobileMenu, Footer, Hero, PageHero, Section, CtaBand, Button,
               ServiceCard, ServiceSection, FeatureList, Carousel, ImageCarousel,
               TestimonialCarousel, ProjectReview, ContactCard, ContactBand,
               ContactForm, MapEmbed, Prose, Seo, JsonLd, icons/Icon
  scripts/     carousel.ts (shared carousel behaviour)
  styles/      global.css (Tailwind + design tokens + fonts)
  pages/       index, about-us, hvac, maintenance, reviews, contact-us,
               privacy-policy, terms-of-service, 404
public/        images/ (logo only), favicons, og-default.jpg, CNAME, robots.txt, .nojekyll
```

## Contact form

GitHub Pages has no server, so the form works in one of two modes:

| `PUBLIC_FORM_ENDPOINT` | Behaviour |
|---|---|
| empty (default) | Submitting opens the visitor's email app with a pre-filled message to rdairway@gmail.com. |
| set (e.g. `https://formspree.io/f/xxxxxxx`) | Submits via `fetch` and shows an inline success / error message. Works with any Formspree-compatible endpoint. |

Locally: copy `.env.example` to `.env` and set the value. In CI: add a repository
**variable** (not a secret — it is public in the built HTML) named `PUBLIC_FORM_ENDPOINT`
under *Settings → Secrets and variables → Actions → Variables*. The deploy workflow passes it
to the build.

## Deploy (GitHub Pages)

`.github/workflows/deploy.yml` builds and deploys on every push to `master` (or manually via
*Actions → Deploy to GitHub Pages → Run workflow*). Pull requests run the build only.

Photos live in `src/assets/images/` and are rendered through `src/components/Photo.astro`
(`astro:assets` `<Picture>`: AVIF/WebP/JPEG at 480–1600 px with `srcset`/`sizes`). Add a new
photo by dropping the file there and adding its alt text to `src/data/images.ts`.

The footer year is set at build time and refreshed client-side by a one-line script, so it
stays current even if the site is not rebuilt for a while.

One-time setup:

1. Repository *Settings → Pages → Build and deployment → Source*: **GitHub Actions**.
2. Custom domain: `public/CNAME` contains `rdairwayhvac.com`. In *Settings → Pages* enter the
   same domain.
3. DNS at the domain registrar:
   - Apex `rdairwayhvac.com`: `A` records → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153` (and optionally `AAAA` → `2606:50c0:8000::153`,
     `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`).
   - `www`: `CNAME` → `jonsicher.github.io`.
4. Once the certificate is issued, tick **Enforce HTTPS**.

## Content rules

Keep the company's real facts exactly as in `docs/content/`. Do not invent certifications,
license numbers, ratings, awards, statistics or reviews. The Privacy Policy and Terms of
Service are kept verbatim from the old site (Shopify boilerplate) and should be replaced by
the owner.
