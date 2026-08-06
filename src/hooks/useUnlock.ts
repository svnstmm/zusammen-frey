import { useMemo } from 'react';
import { chapters } from '../data/chapters';
import type { Chapter, ChapterStatus } from '../types/chapter';

/**
 * Unlock logic stub.
 * Later: date gates, passwords, analytics hooks.
 */
export function useUnlock() {
  const resolved = useMemo(() => {
    return chapters.map((chapter) => ({
      ...chapter,
      // Placeholder: all locked until unlock system lands.
      status: chapter.status as ChapterStatus,
    }));
  }, []);

  const isUnlocked = (id: number): boolean => {
    const chapter = resolved.find((item) => item.id === id);
    return chapter?.status === 'unlocked' || chapter?.status === 'revealed';
  };

  const getUnlockedChapters = (): Chapter[] =>
    resolved.filter(
      (chapter) =>
        chapter.status === 'unlocked' || chapter.status === 'revealed',
    );

  return {
    chapters: resolved,
    isUnlocked,
    getUnlockedChapters,
  };
}
