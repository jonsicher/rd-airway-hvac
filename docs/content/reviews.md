# Page: Reviews
Slug: `/reviews/`
Old `<title>`: "Reviews – R.D. Airway HVAC"
Old h1: "Customer Testimonials"
Old layout: h1, then six project blocks. Each block = an image carousel (project photos, full width, arrows) followed by h4 project type and the quote with "- Name" appended. Then contact band (map bg) + footer.

No star ratings or review sources (Google/Yelp) are shown on the old site — do NOT add stars or "5.0" badges. Quotes are verbatim, including the typo "looks so clean" in Chris G.'s review.

## Testimonials (verbatim, old order)

### 1. Mini Split Unit Installation — Nancy O.
"R.D. Airway was amazing throughout our entire 9 unit AC installation project. We have an antique colonial style home with plaster walls, and R.D. Airway designed a unique layout to accommodate our home."
Photos (old order): tech-exterior-lineset-rough-in, exterior-lineset-cover, tech-mounting-mini-split, dining-room-mini-split, bedroom-mini-split, living-room-mini-split
(old files: IMG_0021-1, IMG_0005, IMG_0008, IMG_0011-2, IMG_0018, IMG_0004)

### 2. Central Air Unit Installation with Zoning (Attic and Basement) — Devin R.
"With a house under brand new construction, I knew I had to call on a stout group of professionals that I could trust to get the job done in creating a unique AC layout aligned with my vision for my home. R.D. Airway rose up to the challenge and they delivered on all levels. They provided excellent service through amazing craftsmanship."
Photos: new-construction-site, basement-rough-in-crew, tech-basement-ceiling-install, framed-basement-ductwork, foil-wrapped-duct-trunk, air-handler-closet-basement

### 3. Central Air Unit Installation with Zoning (Attic and Basement) — Josh C.
"I was blown away by the work R.D. Airway did throughout my home. Very clean, professional, as well as a great set up for future service. All of the workers were amazing young men. Looking forward to calling on them in the future for all of my AC needs."
Photos: crew-exterior-condenser-ladder, twin-condensers-white-house, attic-flex-duct-system, basement-duct-run, ecobee-smart-thermostat
(old files: IMG_0006-1, IMG_0008-1, IMG_0011-4, IMG_0007, IMG_0001)

### 4. Condenser and Air Handler Coil Replacement — Joe L.
"It's never a good thing when your AC stops blowing cold air in the middle of summer. I reached out to R.D. Airway online and they were able to replace our home's condenser and air handler coil in just one day! Amazing service!"
Photos: foil-duct-closeup, sheet-metal-plenum, basement-duct-chase, air-handler-basement-ductwork, condenser-landscaped-arborvitae
(old files: IMG_0009, IMG_0006-2, IMG_0005-1, IMG_0004-1, IMG_0003-1)

### 5. Central Air Installation (Attic)  — Daniel W.
"It was a pleasure having such professional and knowledgeable people to do the job. Great work!"
Photos: attic-spray-foam-lineset, tech-attic-install, attic-air-handler-flex-duct, attic-insulated-ductwork, condenser-yellow-house-winter, nest-thermostat
(old files: IMG_0002, IMG_0004-2, IMG_0008-2, IMG_0003-2, IMG_0006-3, IMG_0005-2)

### 6. Condenser and Air Handler Coil Replacement — Chris G.
"R.D. Airway's installation of a brand new AC unit in my town home blows away the previous company's work. I never knew HVAC work could looks so clean and professional!"
Photos: tech-air-handler-closet-portrait, air-handler-closet-portrait (both portrait 1200×1600 — carousel aspect 3/4 for this block, or letterbox on a navy-950 bg)
(old files: IMG_0003-3, IMG_0001-1)

Note: on the old page each carousel sits ABOVE its quote; mapping above follows that order (carousel 1 → Nancy O., … carousel 6 → Chris G.). Photos are the same originals used elsewhere; reuse is fine.

## New page spec
1. PageHero: eyebrow "Reviews", h1 "Customer Testimonials", sub "Real projects, real homeowners across Westchester County, NY and the Greater Hudson Valley."
2. Six `ProjectReview` blocks: left — quote card (large opening-quote glyph, quote text, "— Name", project-type pill); right — ImageCarousel of that project's photos (with lightbox optional, not required). Alternate left/right on desktop; stacked on mobile (carousel first).
3. CTA band: "Want work like this in your home?" → Request Service.
4. JSON-LD: do NOT add AggregateRating (no ratings exist). Optionally emit `Review` items with `reviewBody` and `author` only.

## SEO
- title: "Customer Reviews & Project Photos | R.D. Airway HVAC"
- description: "Read what homeowners in Westchester County and the Hudson Valley say about R.D. Airway's mini split, central air and zoning installations — with photos from every project."
