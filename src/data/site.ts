// Single source of truth for business facts. Values copied from the old site
// (see docs/content/shared.md). Do not edit facts without the owner's sign-off.

export interface NavItem {
  label: string;
  href: string;
}

export const site = {
  name: 'R.D. Airway HVAC',
  shortName: 'R.D. Airway',
  legalName: 'R.D. Airway HVAC, LLC',
  domain: 'https://rdairwayhvac.com',
  tagline: 'Fully licensed and insured. Serving Westchester County, NY and the Greater Hudson Valley.',
  description:
    'Fully licensed and insured HVAC installation, emergency repairs and routine service for Westchester County, Putnam County and the Greater Hudson Valley.',
  phoneDisplay: '(914) 373-1687',
  phoneTel: '+19143731687',
  phoneE164: '+1-914-373-1687',
  email: 'rdairway@gmail.com',
  address: {
    poBox: 'PO BOX 340',
    poBoxNumber: '340',
    city: 'Verplanck',
    state: 'NY',
    zip: '10596',
    country: 'US',
  },
  serviceAreas: ['Westchester County', 'Putnam County', 'Connecticut'],
  serviceAreaSentence: 'Proudly serving Westchester County, NY and the Greater Hudson Valley',
  serviceAreaShort: 'Serving Westchester County, NY & the Hudson Valley',
  hours: 'Available weekdays and weekends',
  licenseClaim: 'Fully licensed and insured',
  experience: 'over 15 years',
  founder: 'Rafael Da Silva',
  // Old site had icons with no links. Render an icon only when a URL is set.
  social: { facebook: '', instagram: '', yelp: '' } as Record<'facebook' | 'instagram' | 'yelp', string>,
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Cortlandt%20Manor%2C%20NY',
  mapEmbed:
    'https://maps.google.com/maps?q=Cortlandt%20Manor%2C%20NY&t=m&z=10&output=embed&iwloc=near',
  logo: { src: '/images/logo-rd-airway-trimmed.png', width: 400, height: 153, alt: 'R.D. Airway HVAC' },
  ogDefault: '/og-default.jpg',
  nav: [
    { label: 'About Us', href: '/about-us/' },
    { label: 'HVAC Services', href: '/hvac/' },
    { label: 'Maintenance', href: '/maintenance/' },
    { label: 'Reviews', href: '/reviews/' },
    { label: 'Contact', href: '/contact-us/' },
  ] as NavItem[],
  cta: { label: 'Request Service', href: '/contact-us/' },
  footerNav: {
    company: [
      { label: 'About Us', href: '/about-us/' },
      { label: 'Reviews', href: '/reviews/' },
      { label: 'Contact', href: '/contact-us/' },
    ] as NavItem[],
    services: [
      { label: 'HVAC Installation', href: '/hvac/#installation' },
      { label: 'Emergency Repairs', href: '/hvac/#emergency' },
      { label: 'Routine Service', href: '/maintenance/' },
    ] as NavItem[],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy/' },
      { label: 'Terms of Service', href: '/terms-of-service/' },
    ] as NavItem[],
  },
};

export const telHref = `tel:${site.phoneTel}`;
export const mailHref = `mailto:${site.email}`;
export const addressLine = `${site.address.poBox}, ${site.address.city}, ${site.address.state} ${site.address.zip}`;
