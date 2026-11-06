# Page: Contact Us
Slug: `/contact-us/`
Old `<title>`: "Contact Us – R.D. Airway HVAC"
Old layout: one blue panel; left white card with "Call Today / (914) 373-1687 / Contact Us / PO BOX 340 / Verplanck, NY, 10596"; right: Elementor Pro form "Request Your Appointment". No map on this page (map iframe is on Home). Footer.

## Old form (Elementor Pro, POST via admin-ajax — will not exist on the static site)
| Label | Type | name | placeholder |
|---|---|---|---|
| NAME | text | form_fields[name] | Name... |
| EMAIL | email | form_fields[email] | Email... |
| PHONE | number (!) | form_fields[message] | Phone Number... |
| SELECT | select | form_fields[field_9681ca9] | options: "I am a potential customer." / "I am a current customer." / "I'm neither." |
| MESSAGE | textarea | form_fields[field_7f25fcc] | Message... |
| Submit button | "Submit" | | |
Required flags were not visible in markup; make Name, Email/Phone (at least one), Message required on the new site.

## Verbatim text
- "Call Today"
- "(914) 373-1687"  (old `tel:` href wrongly pointed to 917… — use 914)
- "Contact Us"
- "PO BOX 340" / "Verplanck, NY, 10596"
- "Request Your Appointment"
- Other facts to show (from About/HVAC contact band): "Proudly serving Westchester County, NY and the Greater Hudson Valley" · "HOURS: Available Weekdays and Weekends" · email rdairway@gmail.com

## New page spec
1. PageHero: eyebrow "Contact", h1 "Request Your Appointment", sub "Call today or send us a message — we're available weekdays and weekends."
2. Two-column: 
   - Left `ContactCard`: "Call Today" → big tel link (914) 373-1687; email mailto; "Mailing address: PO BOX 340, Verplanck, NY 10596"; "Service area: Westchester County · Putnam County · Connecticut"; "Hours: Available weekdays and weekends".
   - Right `ContactForm` (fields: Name*, Email*, Phone (type=tel, inputmode=tel), "I am…" select with the 3 original options, Message*, honeypot, consent-free). Button: "Submit Request".
3. Map section: lazy-loaded Google Maps iframe from the old home page (`https://maps.google.com/maps?q=Verplanck%2C%20NY&t=m&z=10&output=embed&iwloc=near`), `title="Map of R.D. Airway HVAC service area around Verplanck, NY"`, `loading="lazy"`, `referrerpolicy="no-referrer-when-downgrade"`, wrapped in a 16:9 container; with a static fallback `<img src="/images/service-area-map-hudson-valley.jpg">` shown if JS disabled (noscript).
4. Form behaviour: see PLAN §Contact form.
5. Success state: inline "Thanks — we received your request and will get back to you shortly. For urgent service call (914) 373-1687."

## SEO
- title: "Contact Us | Request HVAC Service – R.D. Airway HVAC"
- description: "Request an appointment with R.D. Airway HVAC. Call (914) 373-1687 or send a message — serving Westchester County, Putnam County and Connecticut, weekdays and weekends."
