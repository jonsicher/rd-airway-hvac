# Shared content: header, footer, business facts

All facts below are copied from the old site. Use the CANONICAL values everywhere; the "old-site variants" column records inconsistencies found on the old site so nobody "fixes" them the wrong way.

## Business facts (single source of truth → `src/data/site.ts`)

| Field | Canonical value | Old-site variants / notes |
|---|---|---|
| Legal name | R.D. Airway HVAC, LLC | "R.D. Airway HVAC" in titles; "R.D. Airway" in copy |
| Short name | R.D. Airway | |
| Phone (display) | (914) 373-1687 | `tel:9143731687`. Old site ALSO shows "917-373-1687" in 3 places (About header, HVAC body x3, Contact `tel:` href) — this is a typo (914 is the Westchester area code and is used in every footer/contact block). Use 914 everywhere. |
| Phone (E.164) | +1-914-373-1687 | |
| Email | rdairway@gmail.com | Shown in the header top bar on every page (the old `<a>` had no `mailto:` href — broken). Policies use the same address. |
| Mailing address | PO BOX 340, Verplanck, NY 10596 | Used on Home footer (© 2024 version), About, HVAC, Reviews, Contact, Privacy. Owner confirmed (Nov 2026): the only address is PO BOX 340, Verplanck, NY 10596; the only email is rdairway@gmail.com; maps centre on Verplanck, NY. |
| Service area (list) | Westchester County · Putnam County · Connecticut | From Home "Proudly serving your neighborhood." |
| Service area (sentence) | Proudly serving Westchester County, NY and the Greater Hudson Valley | From About/HVAC/Reviews contact band |
| Hours | Available Weekdays and Weekends | No clock hours given anywhere — do not invent. |
| License claim | "Fully licensed and insured." | Home hero line. No license number on old site — do not invent one. |
| Experience claim | "over 15 years" | About + HVAC body copy |
| Founder | Rafael Da Silva | About page |
| Social | Facebook, Instagram, Yelp icons exist in old footer but have NO hrefs (broken). | Decision: `site.social = { facebook: '', instagram: '', yelp: '' }`; render an icon only when its URL is non-empty. Ship with none shown. |
| Map | Google Maps embed on Home: `https://maps.google.com/maps?q=Verplanck%2C%20NY&t=m&z=10&output=embed&iwloc=near` | Reuse on Contact page (lazy iframe). |
| Copyright | © {currentYear} rdairwayhvac.com | Old: "© 2024" (home) / "© 2020" (inner) |
| Domain | rdairwayhvac.com | `public/CNAME` |

## Old header (identical on all pages)
- Top bar: envelope icon + "rdairway@gmail.com" | phone icon + "914-373-1687"
- Logo (rd-2.png → `/images/logo-rd-airway.png`, 750×250, transparent PNG; trimmed variant `logo-rd-airway-trimmed.png` 650×248)
- Nav: About Us · HVAC (dropdown → Maintenance) · Reviews · Contact Us
- CTA button: "Schedule Now" (home, red) / "REQUEST SERVICE" (inner pages, yellow) → /contact-us/

## New header (spec)
- Nav: About Us · HVAC Services (/hvac/) · Maintenance (/maintenance/) · Reviews · Contact
- CTA: "Request Service" → /contact-us/ ; plus click-to-call "(914) 373-1687" (icon + number on desktop; phone icon button on mobile)

## Old footer
- Logo, phone, address, link columns: Blog · About Us · HVAC / Maintenance · Reviews · Contact (inner pages also "News"), social icons (no links), bottom bar: © year rdairwayhvac.com · Terms of Service · Privacy Policy
- "Blog" and "News" links go nowhere useful (only the default WordPress "Hello world!" post exists) → DROP.

## New footer (spec)
- Col 1: logo (on dark bg use the colour logo inside a white rounded card, or the trimmed PNG on a light footer — see PLAN), one-line tagline "Fully licensed and insured. Serving Westchester County, NY and the Greater Hudson Valley.", phone (tel link), email (mailto), "PO BOX 340, Verplanck, NY 10596"
- Col 2 "Company": About Us · Reviews · Contact
- Col 3 "Services": HVAC Installation (/hvac/#installation) · Emergency Repairs (/hvac/#emergency) · Routine Service (/maintenance/)
- Col 4 "Service area": Westchester County · Putnam County · Connecticut · Hours: Available weekdays and weekends
- Bottom bar: © {year} R.D. Airway HVAC, LLC · Privacy Policy · Terms of Service

## Pages found on old site (sitemap + nav)
| Old URL | Keep? | Notes |
|---|---|---|
| / | yes | home |
| /about-us/ | yes | |
| /hvac/ | yes | |
| /maintenance/ | yes (rebuilt) | old page is a byte-for-byte duplicate of /hvac/ (same title "HVAC Services"). New page focuses on Routine Service. |
| /reviews/ | yes | |
| /contact-us/ | yes | |
| /privacy-policy/ | yes | |
| /privacy-policy-2/ | no | identical duplicate |
| /terms-of-service/ | yes | |
| /service-offer/ | no | orphan page (not in nav) containing only a Typeform embed "Will Your HVAC Unit Survive The Winter?" — no content to migrate |
| /2020/09/14/hello-world/ | no | default WordPress post |
