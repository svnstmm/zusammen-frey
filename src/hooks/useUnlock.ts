import { useMemo } from 'react';
import { chapters } from '../data/chapters';
import {
  getComingSoonLabel,
  getLockedAvailabilityCopy,
  getReleaseLabel,
  isChapterUnlocked,
} from '../lib/chapterAccess';
import type { Chapter } from '../types/chapter';

export function useUnlock(now: Date = new Date()) {
  const resolved = useMemo(() => {
    return chapters.map((chapter) => ({
      chapter,
      unlocked: isChapterUnlocked(chapter, now),
      releaseLabel: getReleaseLabel(chapter),
      comingSoonLabel: getComingSoonLabel(chapter),
      lockedAvailability: getLockedAvailabilityCopy(chapter),
    }));
  }, [now]);

  const isUnlocked = (id: number): boolean =>
    resolved.find((item) => item.chapter.id === id)?.unlocked ?? false;

  const getUnlockedChapters = (): Chapter[] =>
    resolved.filter((item) => item.unlocked).map((item) => item.chapter);

  return {
    entries: resolved,
    isUnlocked,
    getUnlockedChapters,
    isChapterUnlocked: (chapter: Chapter) => isChapterUnlocked(chapter, now),
  };
}
