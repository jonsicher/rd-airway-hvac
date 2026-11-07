// Testimonials verbatim from docs/content/reviews.md (old order). Do not edit text — typos included.
// No star ratings exist on the old site; never add them.
import { imgs, type Img } from './images';

export interface Review {
  id: string;
  name: string;
  project: string;
  quote: string;
  images: Img[];
  /** Portrait photos (Chris G.) → use aspect "3/4" in the carousel. */
  portrait?: boolean;
}

export const reviews: Review[] = [
  {
    id: 'nancy-o',
    name: 'Nancy O.',
    project: 'Mini Split Unit Installation',
    quote:
      'R.D. Airway was amazing throughout our entire 9 unit AC installation project. We have an antique colonial style home with plaster walls, and R.D. Airway designed a unique layout to accommodate our home.',
    images: imgs('tech-exterior-lineset-rough-in', 'exterior-lineset-cover', 'tech-mounting-mini-split', 'dining-room-mini-split', 'bedroom-mini-split', 'living-room-mini-split'),
  },
  {
    id: 'devin-r',
    name: 'Devin R.',
    project: 'Central Air Unit Installation with Zoning (Attic and Basement)',
    quote:
      'With a house under brand new construction, I knew I had to call on a stout group of professionals that I could trust to get the job done in creating a unique AC layout aligned with my vision for my home. R.D. Airway rose up to the challenge and they delivered on all levels. They provided excellent service through amazing craftsmanship.',
    images: imgs('new-construction-site', 'basement-rough-in-crew', 'tech-basement-ceiling-install', 'framed-basement-ductwork', 'foil-wrapped-duct-trunk', 'air-handler-closet-basement'),
  },
  {
    id: 'josh-c',
    name: 'Josh C.',
    project: 'Central Air Unit Installation with Zoning (Attic and Basement)',
    quote:
      'I was blown away by the work R.D. Airway did throughout my home. Very clean, professional, as well as a great set up for future service. All of the workers were amazing young men. Looking forward to calling on them in the future for all of my AC needs.',
    images: imgs('crew-exterior-condenser-ladder', 'twin-condensers-white-house', 'attic-flex-duct-system', 'basement-duct-run', 'ecobee-smart-thermostat'),
  },
  {
    id: 'joe-l',
    name: 'Joe L.',
    project: 'Condenser and Air Handler Coil Replacement',
    quote:
      "It's never a good thing when your AC stops blowing cold air in the middle of summer. I reached out to R.D. Airway online and they were able to replace our home's condenser and air handler coil in just one day! Amazing service!",
    images: imgs('foil-duct-closeup', 'sheet-metal-plenum', 'basement-duct-chase', 'air-handler-basement-ductwork', 'condenser-landscaped-arborvitae'),
  },
  {
    id: 'daniel-w',
    name: 'Daniel W.',
    project: 'Central Air Installation (Attic)',
    quote: 'It was a pleasure having such professional and knowledgeable people to do the job. Great work!',
    images: imgs('attic-spray-foam-lineset', 'tech-attic-install', 'attic-air-handler-flex-duct', 'attic-insulated-ductwork', 'condenser-yellow-house-winter', 'nest-thermostat'),
  },
  {
    id: 'chris-g',
    name: 'Chris G.',
    project: 'Condenser and Air Handler Coil Replacement',
    quote:
      "R.D. Airway's installation of a brand new AC unit in my town home blows away the previous company's work. I never knew HVAC work could looks so clean and professional!",
    images: imgs('tech-air-handler-closet-portrait', 'air-handler-closet-portrait'),
    portrait: true,
  },
];

/** The three testimonials shown on the home page, in the old order. */
export const homeReviews = ['nancy-o', 'joe-l', 'chris-g'].map((id) => reviews.find((r) => r.id === id)!);

/**
 * Reviews from R.D. Airway's Google Business Profile, copied verbatim. Newest first.
 * Add new ones at the top. Only add reviews that really appear on Google; leave out
 * `rating` unless you copy the stars shown there.
 */
export interface GoogleReview {
  id: string;
  name: string;
  project: string;
  quote: string;
  /** Star rating shown on Google (1–5), if known. */
  rating?: number;
}

export const googleReviews: GoogleReview[] = [
  {
    id: 'jon-s',
    name: 'Jon S.',
    project: 'Blower Motor Diagnosis & Replacement',
    quote:
      'My HVAC unit stopped blowing air and I wasn’t sure what was wrong. Raf from R.D. Airway came out, quickly diagnosed a failed blower motor, and explained clearly what had gone wrong and what needed to be done. He swapped in a new motor and had everything running again. Professional, knowledgeable, and easy to work with. I’d definitely call R.D. Airway again and recommend them to anyone who needs HVAC work.',
  },
];
