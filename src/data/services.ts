// The three services, copy verbatim from docs/content/hvac.md (with the listed typo fixes only).
import { imgs, type Img } from './images';

export interface ServiceBullet {
  label: string;
  text: string;
}

export interface Service {
  id: 'installation' | 'emergency' | 'routine';
  title: string;
  icon: 'snowflake' | 'wrench' | 'truck';
  href: string;
  intro: string;
  bullets: ServiceBullet[];
  images: Img[];
}

export const services: Service[] = [
  {
    id: 'installation',
    title: 'HVAC Installation',
    icon: 'snowflake',
    href: '/hvac/#installation',
    intro:
      'A job done right the first time matters. We ensure that your AC installation from A to Z is carefully calculated for maximum efficiency and comfort for your entire family.',
    bullets: [
      {
        label: 'Professionalism',
        text: 'Always on time. Often early. Never late. We at R.D. Airway take what we do very seriously. Our staff undergoes regular training to hone their craft in order to have the tools and knowledge needed to succeed.',
      },
      {
        label: 'Clean and Precise Work',
        text: 'We at R.D. Airway take pride in our work. That’s why when you hire us, you are getting the most comfortable AC experience, you also get an installation layout that is not only functional, but aesthetically appealing to your home’s unique look.',
      },
      {
        label: 'Maximum Comfort',
        text: 'At the beginning of every install, we carefully calculate your AC’s CFMs compared to the size of your home, down to a science. This allows every room to get to its most effective temperature based on its size. Not too warm, or too cold.',
      },
      {
        label: 'Years of Experience',
        text: 'With over 15 years of experience, R.D. Airway stands behind all of our work as well as the surrounding Westchester County, NY community and the Greater Hudson Valley.',
      },
    ],
    images: imgs('attic-flex-duct-system', 'living-room-mini-split'),
  },
  {
    id: 'emergency',
    title: 'Emergency Repairs',
    icon: 'wrench',
    href: '/hvac/#emergency',
    intro:
      'R.D. Airway offers emergency HVAC services in Westchester County, NY as well as the Greater Hudson Valley. We pride ourselves on being there for you when it counts. Your HVAC repair is only a phone call away.',
    bullets: [
      {
        label: 'Fast Response',
        text: 'We stand by ready to help you with all of your emergency repair and comfort needs. If you feel like your AC units are not running properly, don’t hesitate to call us at 914-373-1687.',
      },
      {
        label: 'Lasting Solution',
        text: 'How inconvenient is it to have the same mechanic come back again and again for those nagging AC problems. We analyze every solution possible to make sure that we get the job done right the first time.',
      },
      {
        label: 'Expert Technicians',
        text: 'Our technicians at R.D. Airway go through extensive skill development training multiple times a year. We pride ourselves on our commitment to improvement.',
      },
      {
        label: 'There For You',
        text: 'Rain or shine, wind or snow. R.D. Airway is there for you anytime of the year. Your home’s comfort is what always comes first.',
      },
    ],
    images: imgs('sheet-metal-plenum', 'basement-duct-chase'),
  },
  {
    id: 'routine',
    title: 'Routine Service',
    icon: 'truck',
    href: '/maintenance/',
    intro:
      'Save money in the long run, and avoid foreseeable problematic repairs of your AC units. Our annual routine service ensures your air conditioning is always running at its best with longevity in mind.',
    bullets: [
      {
        label: 'Long Term Savings',
        text: 'Did you know that in the long run, you will save more money on routine service maintenance than if you let your units go year after year unchecked? Schedule a service maintenance call at 914-373-1687.',
      },
      {
        label: 'Avoid the Unexpected',
        text: 'Routine Service is the key to avoiding those days in the middle of summer where your AC unexpectedly stops running in the middle of your 4th of July party. We’ve all been there. R.D. Airway will help keep these types of days at bay.',
      },
      {
        label: 'Seasonal Tune Ups',
        text: "Was your AC running day in and day out all summer long? The best time to service your home's AC is at the beginning of Fall, and the end of Spring.",
      },
      {
        label: 'Ensured Top Quality Work',
        text: 'All of our new installs are backed by a one year service guarantee. During that time, we cover tune ups and installation checks at no cost to you for one year.',
      },
    ],
    images: imgs('tech-attic-install', 'tech-basement-ceiling-install'),
  },
];

export const guarantee = 'All of our new installs are backed by a one year service guarantee.';
