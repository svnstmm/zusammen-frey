import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { chapters } from '../../data/chapters';
import { siteMeta } from '../../data/site';
import { soundtrack } from '../../data/soundtrack';
import {
  getReleaseLabel,
  isChapterUnlocked,
} from '../../lib/chapterAccess';
import { fadeUp, staggerChildren } from '../../lib/motion';
import { SoundtrackPlayer } from '../soundtrack/SoundtrackPlayer';
import styles from './ChapterOverview.module.css';

export function ChapterOverview() {
  return (
    <motion.main
      className={styles.page}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {},
        visible: { transition: staggerChildren(0.06, 0.15) },
        exit: { opacity: 0, transition: { duration: 0.6 } },
      }}
    >
      <header className={styles.header}>
        <motion.p className={styles.kicker} variants={fadeUp}>
          {siteMeta.subtitle}
        </motion.p>
        <motion.h1 className={styles.heading} variants={fadeUp}>
          <span className={styles.titlePrefix}>{siteMeta.titlePrefix}</span>
          <span className={styles.titleEmphasis}>{siteMeta.titleEmphasis}</span>
        </motion.h1>
        <motion.p className={styles.deck} variants={fadeUp}>
          {siteMeta.yearArc}
        </motion.p>
      </header>

      <ol className={styles.strip}>
        {chapters.map((chapter) => {
          const unlocked = isChapterUnlocked(chapter);
          const release = getReleaseLabel(chapter);

          return (
            <motion.li
              key={chapter.id}
              className={`${styles.frame} ${unlocked ? '' : styles.frameLocked}`}
              variants={fadeUp}
            >
              <Link
                to={`/chapters/${chapter.slug}`}
                className={`${styles.link} ${unlocked ? '' : styles.linkLocked}`}
                aria-label={
                  unlocked
                    ? `Chapter ${chapter.number}: ${chapter.title}`
                    : `Chapter ${chapter.number}: ${chapter.title} — coming soon`
                }
              >
                <span className={styles.number}>{chapter.number}</span>
                <span className={styles.title}>{chapter.title}</span>
                {unlocked ? (
                  <span className={styles.teaser}>{chapter.subtitle}</span>
                ) : (
                  <span className={styles.coming}>
                    <span className={styles.comingLabel}>Premieres</span>
                    <span className={styles.comingWhen}>
                      {release ?? 'Date to be announced'}
                    </span>
                  </span>
                )}
              </Link>
            </motion.li>
          );
        })}
      </ol>

      {soundtrack.enabled ? (
        <motion.div className={styles.soundtrack} variants={fadeUp}>
          <SoundtrackPlayer />
        </motion.div>
      ) : null}
    </motion.main>
  );
}
