import type { Chapter } from '../types/chapter';

/**
 * Single source of truth for all chapters.
 * Content, unlock rules, media, and vouchers live here —
 * UI components should never hardcode chapter copy.
 */
export const chapters: Chapter[] = [
  {
    id: 1,
    slug: 'fade-in',
    number: '01',
    title: 'Fade In',
    tagline: 'Every story needs a beginning.',
    description: '',
    status: 'locked',
  },
  {
    id: 2,
    slug: 'meet-cute',
    number: '02',
    title: 'Meet Cute',
    tagline: 'Two timelines intersect.',
    description: '',
    status: 'locked',
  },
  {
    id: 3,
    slug: 'montage',
    number: '03',
    title: 'Montage',
    tagline: 'Time compresses. Feeling expands.',
    description: '',
    status: 'locked',
  },
  {
    id: 4,
    slug: 'mise-en-scene',
    number: '04',
    title: 'Mise-en-scène',
    tagline: 'Everything in the frame matters.',
    description: '',
    status: 'locked',
  },
  {
    id: 5,
    slug: 'close-up',
    number: '05',
    title: 'Close-Up',
    tagline: 'The smallest gesture holds the most.',
    description: '',
    status: 'locked',
  },
  {
    id: 6,
    slug: 'intermission',
    number: '06',
    title: 'Intermission',
    tagline: 'A pause. A breath. A second act.',
    description: '',
    status: 'locked',
  },
  {
    id: 7,
    slug: 'double-feature',
    number: '07',
    title: 'Double Feature',
    tagline: 'Two stories. One ticket.',
    description: '',
    status: 'locked',
  },
  {
    id: 8,
    slug: 'costume-change',
    number: '08',
    title: 'Costume Change',
    tagline: 'Who we become, frame by frame.',
    description: '',
    status: 'locked',
  },
  {
    id: 9,
    slug: 'golden-hour',
    number: '09',
    title: 'Golden Hour',
    tagline: 'Light does the talking.',
    description: '',
    status: 'locked',
  },
  {
    id: 10,
    slug: 'dinner-scene',
    number: '10',
    title: 'Dinner Scene',
    tagline: 'The table as stage.',
    description: '',
    status: 'locked',
  },
  {
    id: 11,
    slug: 'fade-out',
    number: '11',
    title: 'Fade Out',
    tagline: 'Not an ending. A dissolve.',
    description: '',
    status: 'locked',
  },
  {
    id: 12,
    slug: 'to-be-continued',
    number: '12',
    title: 'To Be Continued...',
    tagline: 'The reel keeps turning.',
    description: '',
    status: 'locked',
  },
];

export const getChapterBySlug = (slug: string): Chapter | undefined =>
  chapters.find((chapter) => chapter.slug === slug);

export const getChapterById = (id: number): Chapter | undefined =>
  chapters.find((chapter) => chapter.id === id);
