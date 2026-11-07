// Site-wide structured data. Never add aggregateRating / reviewRating / openingHours — none exist.
import { site } from './site';

export const businessId = `${site.domain}/#business`;

export const business = {
  '@context': 'https://schema.org',
  '@type': 'HVACBusiness',
  '@id': businessId,
  name: site.legalName,
  alternateName: site.name,
  url: `${site.domain}/`,
  telephone: site.phoneE164,
  email: site.email,
  image: `${site.domain}${site.logo.src}`,
  logo: `${site.domain}${site.logo.src}`,
  description: site.description,
  ...(site.showAddress
    ? {
        address: {
          '@type': 'PostalAddress',
          postOfficeBoxNumber: site.address.poBoxNumber,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.zip,
          addressCountry: site.address.country,
        },
      }
    : {}),
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Westchester County, NY' },
    { '@type': 'AdministrativeArea', name: 'Putnam County, NY' },
    { '@type': 'State', name: 'Connecticut' },
    { '@type': 'Place', name: 'Hudson Valley, NY' },
  ],
  founder: { '@type': 'Person', name: site.founder },
};
