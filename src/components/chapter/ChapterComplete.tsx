import type { Chapter } from '../../types/chapter';
import styles from './ChapterComplete.module.css';

interface ChapterCompleteProps {
  chapter: Chapter;
}

/**
 * Quiet celebration once a voucher has been lived.
 * Reuse for any chapter with `status: 'redeemed'`.
 */
export function ChapterComplete({ chapter }: ChapterCompleteProps) {
  const venue = chapter.reveal?.venue;
  const note =
    chapter.redeemedNote ??
    'This one has been lived — a small scene, kept.';

  return (
    <section className={styles.root} aria-label="Scene complete">
      <p className={styles.kicker}>Scene complete</p>
      <p className={styles.note}>{note}</p>
      {venue ? (
        <p className={styles.venueEcho}>Lived at {venue}</p>
      ) : null}
      <p className={styles.closing}>The reel keeps turning.</p>
    </section>
  );
}
