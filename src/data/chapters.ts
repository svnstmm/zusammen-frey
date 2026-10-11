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
    subtitle: 'Jeder Geschichte braucht einen Anfang.',
    access: {
      locked: true,
      unlockDate: '2026-09-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Light finds the frame. Two seats, one morning, the first shared scene.',
      category: 'Breakfast',
      venue: 'TBD',
    },
  },
  {
    id: 2,
    slug: 'meet-cute',
    number: '02',
    title: 'Meet Cute',
    subtitle: 'Two timelines intersect.',
    access: {
      locked: true,
      unlockDate: '2026-10-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Steam rises. Conversation finds its rhythm. A city slows for a moment.',
      category: 'Specialty Coffee',
      venue: 'Balthasar Kaffee Bar',
    },
  },
  {
    id: 3,
    slug: 'montage',
    number: '03',
    title: 'Montage',
    subtitle: 'Time compresses. Feeling expands.',
    access: {
      locked: true,
      unlockDate: '2026-11-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Platforms, windows, landscapes in motion — the year in cuts and dissolves.',
      category: 'Travel',
      venue: 'ÖBB / DB',
    },
  },
  {
    id: 4,
    slug: 'mise-en-scene',
    number: '04',
    title: 'Mise-en-scène',
    subtitle: 'Everything in the frame matters.',
    access: {
      locked: true,
      unlockDate: '2026-12-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Rooms arranged with intention. Look long enough and the story looks back.',
      category: 'Museum',
      venue: 'Albertina Modern',
    },
  },
  {
    id: 5,
    slug: 'close-up',
    number: '05',
    title: 'Close-Up',
    subtitle: 'The smallest gesture holds the most.',
    access: {
      locked: true,
      unlockDate: '2027-01-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Sugar, glaze, a quiet table — intimacy in miniature.',
      category: 'Patisserie',
      venue: 'Crème de la Crème',
    },
  },
  {
    id: 6,
    slug: 'intermission',
    number: '06',
    title: 'Intermission',
    subtitle: 'A pause. A breath. A second act.',
    access: {
      locked: true,
      unlockDate: '2027-02-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Halfway through the reel, the house lights soften. Take a walk. Share something cold. Come back for the rest.',
      category: 'Ice Cream',
      venue: 'Open choice',
      value: 10,
    },
  },
  {
    id: 7,
    slug: 'double-feature',
    number: '07',
    title: 'Double Feature',
    subtitle: 'Two stories. One ticket.',
    access: {
      locked: true,
      unlockDate: '2027-03-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Dark room. Shared silence. Two films, or one long night — either way, together.',
      category: 'Cinema',
      venue: 'Filmcasino',
    },
  },
  {
    id: 8,
    slug: 'costume-change',
    number: '08',
    title: 'Costume Change',
    subtitle: 'Who we become, frame by frame.',
    access: {
      locked: true,
      unlockDate: '2027-04-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Wardrobe as character. A new silhouette for the next scene.',
      category: 'Fashion',
      venue: 'Luv the Shop',
    },
  },
  {
    id: 9,
    slug: 'golden-hour',
    number: '09',
    title: 'Golden Hour',
    subtitle: 'Light does the talking.',
    access: {
      locked: true,
      unlockDate: '2027-05-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'The hour when everything is warm and unfinished. Order something slow.',
      category: 'Bar',
      venue: 'TBD',
    },
  },
  {
    id: 10,
    slug: 'dinner-scene',
    number: '10',
    title: 'Dinner Scene',
    subtitle: 'The table as stage.',
    access: {
      locked: true,
      unlockDate: '2027-06-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Courses as acts. Conversation as score. Stay for the encore.',
      category: 'Restaurant',
      venue: 'TBD',
    },
  },
  {
    id: 11,
    slug: 'fade-out',
    number: '11',
    title: 'Fade Out',
    subtitle: 'Not an ending. A dissolve.',
    access: {
      locked: true,
      unlockDate: '2027-07-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'Steam, water, quiet. Let the year soften at the edges.',
      category: 'Spa / Relax',
      venue: 'Therme Wien',
    },
  },
  {
    id: 12,
    slug: 'to-be-continued',
    number: '12',
    title: 'To Be Continued...',
    subtitle: 'The reel keeps turning.',
    access: {
      locked: true,
      unlockDate: '2027-08-01',
      releaseDisplay: 'month',
    },
    image: null,
    reveal: {
      description:
        'A small world, newly shared. The sequel is already writing itself.',
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
