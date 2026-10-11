import type { Chapter } from '../types/chapter';

/**
 * Single source of truth for all twelve chapters.
 *
 * Public fields only. Redeemable vouchers are never stored here —
 * unlocked chapters expose a claim request; fulfillment is manual email.
 */
export const chapters: Chapter[] = [
  {
    id: 1,
    slug: 'fade-in',
    number: '01',
    title: 'Fade In',
    subtitle: 'Every story needs a first morning.',
    access: {
      locked: true,
      unlockDate: '2026-09-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'We start with breakfast — or a long brunch, no rush. Chez Bernard is for that first shared table: coffee, something warm, the easy conversations where you actually get to know each other. A soft beginning before the year picks up speed.',
      category: 'Breakfast / Brunch',
      venue: 'Chez Bernard',
    },
  },
  {
    id: 2,
    slug: 'meet-cute',
    number: '02',
    title: 'Meet Cute',
    subtitle: 'A second cup. A little longer.',
    access: {
      locked: true,
      unlockDate: '2026-10-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Coffee is for the in-between moments — when you already like each other enough to meet again, but everything still feels a bit new. Balthasar is small, focused, and good for talking without a plan. One specialty coffee, nowhere else to be.',
      category: 'Specialty Coffee',
      venue: 'Balthasar Kaffee Bar',
    },
  },
  {
    id: 3,
    slug: 'montage',
    number: '03',
    title: 'Montage',
    subtitle: 'Leaving the city together.',
    access: {
      locked: true,
      unlockDate: '2026-11-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Travel is how a relationship stretches — shared tickets, shared windows, the little logistics of going somewhere as a pair. This one’s for trains (ÖBB / DB): a day trip or a longer hop, landscapes sliding by, the feeling that your world just got a bit bigger together.',
      category: 'Travel',
      venue: 'ÖBB / DB',
    },
  },
  {
    id: 4,
    slug: 'mise-en-scene',
    number: '04',
    title: 'Mise-en-scène',
    subtitle: 'Looking at the same thing, side by side.',
    access: {
      locked: true,
      unlockDate: '2026-12-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'A museum date is quiet on purpose. You walk, you pause, you compare what you notice — and you learn how the other person sees. Albertina Modern felt right for that: art as an excuse to slow down and still be completely together.',
      category: 'Museum',
      venue: 'Albertina Modern',
    },
  },
  {
    id: 5,
    slug: 'close-up',
    number: '05',
    title: 'Close-Up',
    subtitle: 'Something small, chosen carefully.',
    access: {
      locked: true,
      unlockDate: '2027-01-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Not every chapter has to be grand. A patisserie is for the tiny joys — sharing a plate, arguing gently over which cake, sitting close. Crème de la Crème is that kind of afternoon: sweet, unhurried, a little intimate.',
      category: 'Patisserie',
      venue: 'Crème de la Crème',
    },
  },
  {
    id: 6,
    slug: 'intermission',
    number: '06',
    title: 'Intermission',
    subtitle: 'A break in the middle.',
    access: {
      locked: true,
      unlockDate: '2027-02-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Halfway through the year, you’re allowed to pause. Ice cream is the opposite of serious plans — pick a place you both fancy, take a walk, talk about nothing important. €10 toward whatever scoop (or two) the evening asks for.',
      category: 'Ice Cream',
      venue: 'Your choice',
      value: 10,
    },
  },
  {
    id: 7,
    slug: 'double-feature',
    number: '07',
    title: 'Double Feature',
    subtitle: 'Sitting in the dark, same story.',
    access: {
      locked: true,
      unlockDate: '2027-03-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Cinema is one of the simplest ways to share time: you don’t have to perform, you just watch something together and talk about it after. Filmcasino for a proper film night — popcorn optional, opinions mandatory.',
      category: 'Cinema',
      venue: 'Filmcasino',
    },
  },
  {
    id: 8,
    slug: 'costume-change',
    number: '08',
    title: 'Costume Change',
    subtitle: 'Trying on a new version of yourselves.',
    access: {
      locked: true,
      unlockDate: '2027-04-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Clothes are how we show up in the world — and shopping together is oddly revealing. What you reach for, what you laugh at, what you’d wear on a night out as a couple. Luv the Shop is for that playful “who are we becoming?” energy.',
      category: 'Fashion',
      venue: 'Luv the Shop',
    },
  },
  {
    id: 9,
    slug: 'golden-hour',
    number: '09',
    title: 'Golden Hour',
    subtitle: 'When the day softens into evening.',
    access: {
      locked: true,
      unlockDate: '2027-05-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'A bar at golden hour is for the conversations that don’t fit into lunch breaks — longer, looser, a little more honest. One slow drink, the city warming up around you, nowhere else you need to be yet. Venue still picking itself; the mood is the point.',
      category: 'Bar',
      venue: 'TBD',
    },
  },
  {
    id: 10,
    slug: 'dinner-scene',
    number: '10',
    title: 'Dinner Scene',
    subtitle: 'The night you dress up a little.',
    access: {
      locked: true,
      unlockDate: '2027-06-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Dinner is the classic date for a reason: you sit across from each other, phones down, courses giving you time. This one’s meant to feel like an occasion — a restaurant night that marks how far you’ve come since that first brunch.',
      category: 'Restaurant',
      venue: 'TBD',
    },
  },
  {
    id: 11,
    slug: 'fade-out',
    number: '11',
    title: 'Fade Out',
    subtitle: 'Exhale. Soften. Stay a while.',
    access: {
      locked: true,
      unlockDate: '2027-07-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Near the end of the arc, you don’t need more stimulation — you need rest. A spa day at Therme Wien is for floating, warming up, saying less. A quiet thank-you to the year you’ve been building side by side.',
      category: 'Spa / Relax',
      venue: 'Therme Wien',
    },
  },
  {
    id: 12,
    slug: 'to-be-continued',
    number: '12',
    title: 'To Be Continued...',
    subtitle: 'The story keeps going.',
    access: {
      locked: true,
      unlockDate: '2027-08-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'The last chapter looks forward. Herr und Frau Klein is for the little world you’re growing into — family, curiosity, play. Not a finale so much as a soft “what’s next?” with room for all of you.',
      category: 'Child / Family',
      venue: 'Herr und Frau Klein',
    },
  },
];

export const getChapterBySlug = (slug: string): Chapter | undefined =>
  chapters.find((chapter) => chapter.slug === slug);

export const getChapterById = (id: number): Chapter | undefined =>
  chapters.find((chapter) => chapter.id === id);

export const getAdjacentChapters = (slug: string) => {
  const index = chapters.findIndex((chapter) => chapter.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? chapters[index - 1] : undefined,
    next: index < chapters.length - 1 ? chapters[index + 1] : undefined,
  };
};
