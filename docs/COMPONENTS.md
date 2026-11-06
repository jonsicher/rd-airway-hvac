# Component reference

All components live in `src/components/`. **Reuse these, don't invent new ones.** If a page needs
something not covered here, extend the existing component (new optional prop) rather than forking it.

Data helpers (import from `src/data/`):

| Module | Exports |
|---|---|
| `jsonld.ts` | `business` (HVACBusiness JSON-LD object), `businessId` |
| `site.ts` | `site` (name, legalName, phoneDisplay, phoneTel, email, address, serviceAreas, serviceAreaSentence, hours, founder, social, mapEmbed, logo, nav, footerNav, cta), `telHref`, `mailHref`, `addressLine` |
| `images.ts` | `img(name, alt?)` → `{src, alt, width, height}`; `imgs(...names)` → `Img[]`; type `Img`. Names = filenames in `public/images/` without extension. Throws on unknown names. |
| `services.ts` | `services` (3 × `{id, title, icon, href, intro, bullets[{label,text}], images}` — verbatim HVAC copy), `guarantee` |
| `reviews.ts` | `reviews` (6 × `{id, name, project, quote, images, portrait?}` — verbatim, old order), `homeReviews` (Nancy O., Joe L., Chris G.) |

Design tokens (Tailwind utilities from `src/styles/global.css`): colours `navy-950/900/800`,
`brand-50/100/400/500/700`, `red-500/600/700`, `amber-400`, `ink-900/600/400`, `line-200`,
`surface-50`; fonts `font-display` (Plus Jakarta Sans) / `font-sans` (Inter); shadows
`shadow-card`, `shadow-card-hover`. Helper classes: `container-site` (max-w-7xl + 16/24/32px
gutters), `eyebrow` (red bar + uppercase label; add `eyebrow-on-dark` on navy), `display`
(hero h1 size), `card` (white, rounded-2xl, shadow), `card-hover` (lift on hover),
`bg-navy-gradient`, `bg-image-overlay`. Use `text-brand-700` (not brand-500) for blue text on white.

---

## BaseLayout — `src/layouts/BaseLayout.astro`

Wraps every page: SEO head, site-wide HVACBusiness JSON-LD, skip link, sticky `Header`,
`<main id="main">`, `Footer`.

| Prop | Type | Notes |
|---|---|---|
| `title` | string, required | "` | R.D. Airway HVAC`" is appended unless the title already contains "R.D. Airway HVAC". |
| `description` | string, required | Meta + OG description (use the SEO block in `docs/content/<page>.md`). |
| `ogImage` | string | Root-relative path; default `/og-default.jpg`. |
| `jsonLd` | object \| object[] | Extra page-specific JSON-LD (emitted after the business entity). |
| `noindex` | boolean | Only the 404 uses this. |

Slot `head` → extra `<head>` tags.

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { businessId } from '../data/jsonld';
import { reviews } from '../data/reviews';
const jsonLd = {
  '@context': 'https://schema.org', '@type': 'HVACBusiness', '@id': businessId,
  review: reviews.map((r) => ({ '@type': 'Review', author: { '@type': 'Person', name: r.name }, reviewBody: r.quote })),
}; // no ratings — none exist
---
<BaseLayout title="Customer Reviews & Project Photos | R.D. Airway HVAC" description="…" jsonLd={jsonLd}>
  …
</BaseLayout>
```

`Seo.astro` and `JsonLd.astro` are used by the layout; you normally don't import them.
`src/data/jsonld.ts` exports `business` (the entity object) and `businessId` (`@id` to reference it).

## Header / MobileMenu / Footer

No props — driven by `site.nav`, `site.cta`, `site.footerNav`, `site.social`. Header is sticky,
gets a border/shadow after scrolling, shows a desktop top strip (email, hours, service area),
click-to-call (number ≥ sm, round icon button on phones) and "Request Service". MobileMenu
(< lg) is a right-side dialog: focus trap, Esc/backdrop close, scroll lock, `aria-expanded`.
Active link gets `aria-current="page"`. Social icons render only for non-empty URLs.

## Button

| Prop | Type | Default |
|---|---|---|
| `href` | string | renders `<a>`; omit for `<button>` |
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `primary` (red-600) |
| `size` | `'md' \| 'lg'` | `md` |
| `onDark` | boolean | false — use for secondary/ghost on navy/image backgrounds |
| `icon` / `iconRight` | `IconName` | leading / trailing icon |
| `type` | `'button' \| 'submit' \| 'reset'` | `button` |
| `block` | boolean | full width |
| `ariaLabel`, `class`, any `data-*` | | passed through |

```astro
<Button href="/contact-us/" size="lg" iconRight="arrow-right">Request Service</Button>
<Button href={telHref} variant="secondary" onDark icon="phone">{site.phoneDisplay}</Button>
```

## Icon — `src/components/icons/Icon.astro`

`name` (IconName), `size` (px, 20), `class`, `strokeWidth` (2), `label` (makes it non-decorative).
Names: `phone mail map-pin map clock check check-circle arrow-right chevron-left chevron-right
menu x snowflake wrench truck shield-check calendar sun leaf piggy-bank alert-triangle users home
thermometer pause play send facebook instagram yelp`. Add more Lucide paths to the `paths` map if needed.

## Hero (home only)

Two columns ≥ lg (text left, `ImageCarousel` right, 5:4 desktop / 4:3 mobile, first image eager);
soft glow + grid background.

| Prop | Type | Default |
|---|---|---|
| `eyebrow`, `title` (h1), `subtitle` | string | |
| `primary` | `{label, href}` | `site.cta` (Request Service) |
| `secondary` | `{label, href} \| null` | "Call (914) 373-1687" |
| `trust` | string[] | `['Fully licensed and insured', 'Over 15 years of experience', 'Weekdays & weekends']` |
| `images` | `Img[]`, required | |
| `carouselLabel` | string | "Recent installation photos" |

```astro
<Hero eyebrow="Westchester County, NY · Putnam County · Connecticut"
  title="We keep your home running right."
  subtitle="Fully licensed and insured. Expert HVAC installation, …"
  images={imgs('tech-mounting-mini-split', 'twin-condensers-white-house', 'tech-attic-install', 'living-room-mini-split')} />
```

## PageHero (inner pages)

Navy gradient band with the page `h1`. Props: `title` (required, h1), `eyebrow`, `subtitle`,
`breadcrumb` (default true → "Home / title"), `size` (`'md'` | `'sm'` for policy pages). Default slot
renders under the subtitle (e.g. jump-link pills on /hvac/).

```astro
<PageHero eyebrow="Services" title="HVAC Services" subtitle="Installation, emergency repairs and routine service — …">
  <ul class="mt-8 flex flex-wrap gap-3">…pills…</ul>
</PageHero>
```

## Section

Container + vertical padding + optional heading block + background variants.

| Prop | Type | Default |
|---|---|---|
| `id` | string | |
| `bg` | `'white' \| 'soft' \| 'brand' \| 'navy' \| 'image'` | `white` |
| `image` | `Img` | background photo for `bg="image"` |
| `overlay` | `'strong' \| 'soft'` | `strong` (navy 88% — text directly on it). `soft` = gradient; put text in a card. |
| `eyebrow`, `title`, `intro` | string | header block |
| `as` | `'h1' \| 'h2' \| 'h3'` | `h2` |
| `align` | `'left' \| 'center'` | `left` |
| `pad` | `'default' \| 'sm' \| 'none'` | `py-16 lg:py-24` |
| `class`, `containerClass` | string | |

Slots: default (body), `header` (extra content inside the header block). On `navy`/`image` the
section gets class `on-dark`; use white text and `onDark` on children.

```astro
<Section bg="image" image={img('hero-suburban-neighborhood')} eyebrow="About" title="About the company."
         intro="Located in Westchester County, NY and the Greater Hudson Valley, NY.">
  <p class="max-w-3xl text-white/85">R.D. Airway was founded with one vision in mind. …</p>
  <ImageCarousel class="mt-10" onDark perView={{ base: 1, md: 2, lg: 3 }} images={imgs(…)} ariaLabel="Our recent work" />
  <Button href="/about-us/" class="mt-10" iconRight="arrow-right">More About Us</Button>
</Section>
```

## CtaBand

Rounded navy-gradient call-to-action with the logo swoosh; goes at the bottom of every content page
(not Contact). Props: `title` (default "Ready to get comfortable?"), `text` (default
"Available weekdays and weekends. Call or send a request and we'll get back to you."),
`primary` (`{label, href}`, default Request Service), `showCall` (default true), `id`. Default slot
renders under the text.

```astro
<CtaBand title="Want work like this in your home?" />
```

## ServiceCard

Icon chip + h3 + text + "Learn more →"; whole card is clickable when `href` is set.
Props: `icon` (IconName, required), `title`, `text` (required), `href`, `linkLabel` ("Learn more"),
`as` (`h3`), `class`.

```astro
<div class="grid gap-6 md:grid-cols-3">
  {services.map((s) => <ServiceCard icon={s.icon} title={s.title} text={s.intro} href={s.href} />)}
</div>
```
Without `href` it's a static info card (use for About "What sets us apart", Maintenance benefits).

## FeatureList

Check-icon list with bold labels. Props: `items` (`{label, text}[]`), `onDark`, `class`.

```astro
<FeatureList items={services[2].bullets} />
```

## ServiceSection

One service block for /hvac/: icon, h2, intro, FeatureList, "Request service →" link, ImageCarousel
(sticky on desktop). Props: `id`, `icon`, `title`, `intro`, `bullets`, `images` (all required), `flip`
(carousel left on desktop), `bg` (`'white' | 'soft'`), `ctaHref` ('/contact-us/'), `ctaLabel`.
`services.ts` objects spread straight in:

```astro
{services.map((s, i) => <ServiceSection {...s} flip={i % 2 === 1} bg={i % 2 ? 'soft' : 'white'} />)}
```

## Carousel (generic)

Accessible scroll-snap carousel; **every direct child of the slot is one slide**. Native touch/swipe,
prev/next buttons (44px), optional dots + "n / N" counter, ←/→ keys, slide `role="group"` labels
added by script, autoplay with pause on hover/focus/touch/hidden tab + a visible pause button,
autoplay disabled under `prefers-reduced-motion`. Behaviour: `src/scripts/carousel.ts` (no library).

| Prop | Type | Default |
|---|---|---|
| `ariaLabel` | string, required | |
| `perView` | `{base?, md?, lg?}` | 1 per view |
| `gap` | CSS length | `1rem` |
| `autoplay` | ms | 0 (off) |
| `loop` | boolean | true if autoplay |
| `controls` | `'overlay' \| 'below' \| 'none'` | `overlay` (round white buttons over slides) |
| `showDots`, `showCounter` | boolean | false |
| `onDark` | boolean | light dots/buttons |
| `class`, `trackClass` | string | |

```astro
<Carousel ariaLabel="Seasonal tips" controls="below" showDots perView={{ base: 1, lg: 2 }}>
  <div class="card p-6">…</div>
  <div class="card p-6">…</div>
</Carousel>
```

## ImageCarousel

Photo carousel on top of `Carousel` (overlay arrows, counter on by default).

| Prop | Type | Default |
|---|---|---|
| `images` | `Img[]`, required | |
| `ariaLabel` | string, required | |
| `aspect` | CSS aspect-ratio | `'4/3'` |
| `eagerFirst` | boolean | false (only the very first hero image on a page) |
| `perView` | `{base?, md?, lg?}` | 1 |
| `fit` | `'cover' \| 'contain'` | `cover`; `contain` letterboxes on navy (portrait photos) |
| `showCounter` / `showDots` | boolean | true / false |
| `onDark` | boolean | false |
| `sizes` | string | `(min-width: 1024px) 50vw, 100vw` |
| `class` | string | |

```astro
<ImageCarousel ariaLabel="Maintenance photos" showDots
  images={imgs('tech-attic-install', 'tech-basement-ceiling-install', 'tech-condenser-gauges', 'ecobee-smart-thermostat', 'nest-thermostat')} />
```

## TestimonialCarousel

Built on `Carousel`: one quote per view (max-w-3xl, centred), big quote glyph, "— Name", project pill,
prev/next + dots below, autoplay 6 s with pause button. **Quotes verbatim, never star ratings.**
Props: `items` (`{quote, name, project?}[]`, required), `ariaLabel` ("Customer testimonials"),
`autoplay` (6000; 0 = off), `onDark`, `class`.

```astro
<Section title="What Customers Say." align="center">
  <TestimonialCarousel items={homeReviews} />
  <div class="mt-10 text-center"><Button href="/reviews/" variant="secondary">All Reviews</Button></div>
</Section>
```

## ProjectReview

One project on /reviews/: photo carousel (dots) + quote card with project pill.
Props: `quote`, `name`, `project`, `images` (required), `flip` (carousel right on desktop),
`portrait` (letterbox portrait photos), `id`. Stacks carousel-first on mobile.

```astro
<div class="space-y-16 lg:space-y-24">
  {reviews.map((r, i) => <ProjectReview {...r} flip={i % 2 === 1} />)}
</div>
```

## ContactCard

Card with "Call Today" h2, big tel link, email, mailing address, service area, hours (all from `site`).
Props: `title` ("Call Today"), `class`.

## ContactForm

Static-site form (`docs/PLAN.md` §6). Fields: name*, email*, phone (tel), "I am…" select (3 original
options), message*, hidden `_subject`, honeypot `_gotcha`. Inline validation messages, `aria-live` status.
With `PUBLIC_FORM_ENDPOINT` set: fetch POST + success/error message; without it: opens a pre-filled
`mailto:` to `site.email` and shows "This opens your email app…" note.
Props: `title` ("Request Your Appointment"), `endpoint` (override env), `class`.
One per page (uses fixed element ids).

```astro
<Section>
  <div class="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
    <ContactCard />
    <ContactForm title="Send us a message" />
  </div>
</Section>
```

## ContactBand

No props. Map background (`service-area-map-hudson-valley.jpg`) + navy overlay + white card: legal name,
PO Box, phone, service-area sentence, hours, "Contact Us" button. Use on About, HVAC, Maintenance,
Reviews, just before `CtaBand`.

## MapEmbed

Lazy Google Maps iframe (16:9, 4:3 on phones) with `<noscript>` static image fallback.
Props: `src` (`site.mapEmbed`), `title` (service-area description), `class`.

## Prose

Typographic wrapper (`max-w-prose`, centred) for policy pages. Put verbatim text inside as plain
`h2`/`p`/`ul`/`a` elements; links get brand-700 underline; long URLs wrap.

```astro
<PageHero title="Privacy Policy" size="sm" />
<Section><Prose><h2>PERSONAL INFORMATION WE COLLECT</h2><p>…</p></Prose></Section>
```

---

## Conventions

- One `h1` per page (Hero or PageHero). Section titles are h2, cards h3.
- Images: always via `img()`/`imgs()` so width/height/alt are correct; only the first hero image is eager.
- Internal links use trailing slashes (`/about-us/`, `/hvac/#emergency`).
- Phone/email/address only from `site` (`telHref`, `mailHref`, `addressLine`) — never hard-code.
- Layout must not scroll horizontally at 375px; containers already provide 16px gutters.
