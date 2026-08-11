import type { Chapter, ReleaseDisplay } from '../types/chapter';

const MONTHS = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
] as const;

/** Parse `YYYY-MM-DD` as a local calendar date (no UTC shift). */
export function parseLocalDate(isoDate: string): Date {
  const [year, month, day] = isoDate.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function startOfLocalDay(date = new Date()): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Whether a chapter should render as unlocked for the visitor.
 * Does not mutate source data.
 */
export function isChapterUnlocked(
  chapter: Chapter,
  now: Date = new Date(),
): boolean {
  const { access } = chapter;

  if (access.forceUnlocked) return true;
  if (!access.locked) return true;

  if (access.unlockDate) {
    const unlockDay = parseLocalDate(access.unlockDate);
    return startOfLocalDay(now) >= unlockDay;
  }

  return false;
}

export function formatReleaseLabel(
  isoDate: string,
  display: ReleaseDisplay = 'month',
): string {
  const date = parseLocalDate(isoDate);
  const month = MONTHS[date.getMonth()];
  const year = date.getFullYear();

  if (display === 'date') {
    const day = String(date.getDate()).padStart(2, '0');
    return `${day} ${month} ${year}`;
  }

  return `${month} ${year}`;
}

export function getReleaseLabel(chapter: Chapter): string | null {
  const { unlockDate, releaseDisplay = 'month' } = chapter.access;
  if (!unlockDate) return null;
  return formatReleaseLabel(unlockDate, releaseDisplay);
}

/** Short overview line for locked chapters. */
export function getComingSoonLabel(chapter: Chapter): string {
  if (chapter.access.lockedMessage) return chapter.access.lockedMessage;

  const release = getReleaseLabel(chapter);
  if (release) return release;

  return 'Release date to be announced';
}

/** Detail-page availability line for locked chapters. */
export function getLockedAvailabilityCopy(chapter: Chapter): string {
  if (chapter.access.lockedMessage) return chapter.access.lockedMessage;

  const release = getReleaseLabel(chapter);
  if (release) return `Available ${release}`;

  return 'Release date to be announced.';
}
