# Page: Home
Slug: `/`
Old `<title>`: "R.D. Airway HVAC – R.D. Airway Cooling Installation and Service"
Old meta description: none (add one).

## Old page, section by section (as crawled)

1. **Hero** (solid blue gradient, no image, no h1):
   - h2: "Fully licensed and insured."
   - h2: "We keep your home running right."
   - Three icon cards (red circles: snowflake / tools / truck): "HVAC Installation", "Emergency Service", "Routine Maintenance" — each body text is **Lorem ipsum** (content gap on the old site).
   - Header CTA: "Schedule Now" → /contact-us/
2. **About the company** (bg: hero-suburban-neighborhood.jpg with dark overlay):
   - h2: "About the company."
   - h2 (smaller): "Located in Westchester County, NY and the Greater Hudson Valley, NY."
   - p: "R.D. Airway was founded with one vision in mind. To ensure and promise expert, timely, and high quality HVAC service and results for all of our customers and clients. We take great pride in our work from start to finish. Respecting every step of the process."
   - Image carousel (7 slides, 3 visible, arrows): tech-attic-install, tech-exterior-lineset-rough-in, tech-mounting-mini-split, tech-basement-ceiling-install, tech-ceiling-unit-install, crew-exterior-ladder-siding, tech-condenser-gauges
   - Button: "More About Us" → /about-us/
3. **What Customers Say.** (white, testimonial carousel, faded logo watermark behind):
   - Nancy O.: "R.D. Airway was amazing throughout our entire 9 unit AC installation project. We have an antique colonial style home with plaster walls, and R.D. Airway designed a unique layout to accommodate our home."
   - Joe L.: "It's never a good thing when your AC stops blowing cold air in the middle of summer. I reached out to R.D. Airway online and they were able to replace our home's condenser and air handler coil in just one day! Amazing service!"
   - Chris G.: "R.D. Airway's installation of a brand new AC unit in my town home blows away the previous company's work. I never knew HVAC work could looks so clean and professional!"
   - Button: "All Reviews" → /reviews/
4. **Proudly serving your neighborhood.** (bg: service-area-map-hudson-valley.jpg with dark overlay; red underline rule):
   - list: Westchester County · Putnam County · Connecticut
   - Google Maps iframe (`q=Cortlandt Manor, NY`, z=10) — present in markup but rendered inside this map section
5. Footer (see shared.md)

## New page copy (final — builders use exactly this)

### Hero
- Eyebrow: "Westchester County, NY · Putnam County · Connecticut"
- h1: "We keep your home running right."
- Sub: "Fully licensed and insured. Expert HVAC installation, emergency repairs and routine service for Westchester County, NY and the Greater Hudson Valley."
- Primary CTA: "Request Service" → /contact-us/
- Secondary CTA: "Call (914) 373-1687" → tel:+19143731687
- Hero image carousel (right/under): tech-mounting-mini-split, twin-condensers-white-house, tech-attic-install, living-room-mini-split (alt text from images.md)

### Services strip (replaces lorem ipsum — copy lifted from the HVAC page intros)
- **HVAC Installation** — "A job done right the first time matters. We ensure that your AC installation from A to Z is carefully calculated for maximum efficiency and comfort for your entire family." → /hvac/#installation
- **Emergency Repairs** — "R.D. Airway offers emergency HVAC services in Westchester County, NY as well as the Greater Hudson Valley. We pride ourselves on being there for you when it counts. Your HVAC repair is only a phone call away." → /hvac/#emergency
- **Routine Service** — "Save money in the long run, and avoid foreseeable problematic repairs of your AC units. Our annual routine service ensures your air conditioning is always running at its best with longevity in mind." → /maintenance/

### About the company (keep old copy)
- h2: "About the company."
- Lead: "Located in Westchester County, NY and the Greater Hudson Valley, NY."
- p: (verbatim paragraph from old section 2)
- Supporting facts (from About page, not invented): "Over 15 years of experience" · "Residential and commercial" · "Available weekdays and weekends"
- Project carousel: the 7 old slides in the old order (see section 2)
- Button: "More About Us" → /about-us/

### What Customers Say (testimonial carousel, 3 items as above, in old order) + "All Reviews" → /reviews/

### Service area band
- h2: "Proudly serving your neighborhood."
- Chips/list: Westchester County · Putnam County · Connecticut
- p: "Proudly serving Westchester County, NY and the Greater Hudson Valley."
- Background: service-area-map-hudson-valley.jpg (static image, no iframe on home)

### CTA band
- h2: "Ready to get comfortable?"
- p: "Available weekdays and weekends. Call or send a request and we'll get back to you."
- Buttons: "Request Service" (/contact-us/) · "(914) 373-1687" (tel)

## SEO
- title: "R.D. Airway HVAC | HVAC Installation, Repair & Service in Westchester County, NY"
- description: "Fully licensed and insured HVAC installation, emergency repairs and routine service for Westchester County, Putnam County and the Greater Hudson Valley. Call (914) 373-1687."
- OG image: /images/tech-mounting-mini-split.jpg (or generated og-default.jpg)
- JSON-LD: HVACBusiness (see PLAN)
