// Image registry: alt text for every photo in src/assets/images/.
// Photos are processed by astro:assets at build time (responsive AVIF/WebP/JPEG
// srcsets) — render them with <Photo image={img('name')} /> (src/components/Photo.astro).
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/images/*.{jpg,jpeg,png}', { eager: true });
const byName: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(files)) {
  byName[path.split('/').pop()!.replace(/\.(jpe?g|png)$/, '')] = mod.default;
}

export interface Img {
  /** Processed image metadata (pass to astro:assets). */
  meta: ImageMetadata;
  /** Original-size URL of the processed asset. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

const L = { width: 1600, height: 1200 };
const P = { width: 1200, height: 1600 };

// width/height kept for reference; real dimensions come from the file metadata.
const registry: Record<string, { alt: string; width: number; height: number }> = {
  'hero-suburban-neighborhood': { alt: 'Tree-lined suburban street with large homes in spring', width: 1600, height: 914 },
  'service-area-map-hudson-valley': { alt: 'Map of Westchester County, Putnam County, the lower Hudson Valley and the Connecticut border', width: 1920, height: 755 },
  'service-area-map-millwood': { alt: 'Stylised map of the service area around Millwood, NY', width: 1600, height: 941 },
  'tech-attic-install': { alt: 'Technician kneeling in a spray-foam attic beside a new air handler', width: 1600, height: 1203 },
  'tech-exterior-lineset-rough-in': { alt: 'Technician crouched outside a house running refrigerant line sets', ...L },
  'tech-mounting-mini-split': { alt: 'Technician on a step ladder mounting a wall mini-split bracket', ...L },
  'tech-basement-ceiling-install': { alt: 'Technician on a ladder installing foil duct along basement ceiling joists', ...L },
  'tech-ceiling-unit-install': { alt: 'Technician on a ladder installing a ceiling unit in a closet doorway', width: 1536, height: 1186 },
  'crew-exterior-ladder-siding': { alt: 'Crew outside a tan-sided house, one on a tall ladder, with a condenser below', width: 1536, height: 1141 },
  'tech-condenser-gauges': { alt: 'Technician charging a condenser with manifold gauges', width: 1536, height: 1289 },
  'attic-flex-duct-system': { alt: 'Attic with a new insulated flex-duct system and air handler', ...L },
  'living-room-mini-split': { alt: 'Finished living room with a wall-mounted mini-split above the window', ...L },
  'sheet-metal-plenum': { alt: 'Sheet-metal plenum and duct transition in a basement', ...L },
  'basement-duct-chase': { alt: 'Duct chase through a block foundation wall', ...L },
  'attic-insulated-ductwork': { alt: 'Attic with insulated duct runs under spray foam', ...L },
  'attic-spray-foam-lineset': { alt: 'Line set and insulation detail in a spray-foam attic', ...L },
  'attic-air-handler-flex-duct': { alt: 'Attic air handler with flex duct connections', ...L },
  'air-handler-basement-ductwork': { alt: 'Basement air handler with new insulated trunk duct', ...L },
  'air-handler-closet-basement': { alt: 'Air handler in a basement utility closet with foil duct', ...L },
  'air-handler-closet-portrait': { alt: 'Air handler installed in a tight utility closet', ...P },
  'tech-air-handler-closet-portrait': { alt: 'Technician working on an air handler in a utility closet', ...P },
  'foil-wrapped-duct-trunk': { alt: 'Foil-wrapped duct trunk in a framed basement', ...L },
  'foil-duct-closeup': { alt: 'Close-up of a foil-faced duct board joint', ...L },
  'basement-rough-in-crew': { alt: 'Crew roughing-in ductwork in an unfinished basement', ...L },
  'basement-duct-run': { alt: 'Insulated duct run across an unfinished basement ceiling', ...L },
  'framed-basement-ductwork': { alt: 'Framed basement with ductwork before drywall', ...L },
  'condenser-landscaped-arborvitae': { alt: 'Condenser unit set between arborvitae on a pad', ...L },
  'condenser-yellow-house-winter': { alt: 'Condenser beside a yellow house in light snow', ...L },
  'twin-condensers-white-house': { alt: 'Two condensers on pads beside a white house', ...L },
  'crew-exterior-condenser-ladder': { alt: 'Crew installing an exterior line set up a two-storey house', ...L },
  'exterior-lineset-cover': { alt: 'White line-set cover run along a stucco exterior', ...L },
  'dining-room-mini-split': { alt: 'Dining room with a wall mini-split above the windows', ...L },
  'bedroom-mini-split': { alt: 'Bedroom nook with a wall mini-split above the window', ...L },
  'ecobee-smart-thermostat': { alt: 'ecobee smart thermostat reading 71 degrees', ...L },
  'nest-thermostat': { alt: 'Nest thermostat reading 68 degrees', ...L },
  'new-construction-site': { alt: 'New-construction house with an excavator in the foreground', ...L },
};

export type ImageName = keyof typeof registry;

/** Look up an image by its filename (without extension). Optional alt override. */
export function img(name: string, alt?: string): Img {
  const r = registry[name];
  const meta = byName[name];
  if (!r || !meta) throw new Error(`Unknown image "${name}" — see src/data/images.ts and src/assets/images/`);
  return { meta, src: meta.src, alt: alt ?? r.alt, width: meta.width, height: meta.height };
}

export const imgs = (...names: string[]): Img[] => names.map((n) => img(n));
