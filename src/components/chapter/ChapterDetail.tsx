import { motion } from 'framer-motion';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getAdjacentChapters, getChapterBySlug } from '../../data/chapters';
import {
  getLockedAvailabilityCopy,
  isChapterUnlocked,
} from '../../lib/chapterAccess';
import { fadeUp, staggerChildren } from '../../lib/motion';
import { ClaimRequest } from '../voucher/ClaimRequest';
import styles from './ChapterDetail.module.css';

export function ChapterDetail() {
  const { slug = '' } = useParams();
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return <Navigate to="/chapters" replace />;
  }

  const unlocked = isChapterUnlocked(chapter);
  const { previous, next } = getAdjacentChapters(chapter.slug);
  const reveal = unlocked ? chapter.reveal : undefined;
  const experienceLabel = reveal?.category?.toUpperCase() ?? null;
  const hasReveal = Boolean(reveal?.category || reveal?.venue);
  const claimable = reveal?.claimable !== false;

  return (
    <motion.article
      className={`${styles.page} ${unlocked ? '' : styles.pageLocked}`}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={{
        hidden: {},
        visible: { transition: staggerChildren(0.16, 0.2) },
        exit: {
          opacity: 0,
          filter: 'blur(6px)',
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <motion.div className={styles.backRow} variants={fadeUp}>
        <Link to="/chapters" className={styles.back}>
          All Chapters
        </Link>
      </motion.div>

      <motion.p className={styles.chapterLabel} variants={fadeUp}>
        {unlocked ? `Chapter ${chapter.number}` : chapter.number}
      </motion.p>

      <motion.h1 className={styles.title} variants={fadeUp}>
        {chapter.title}
      </motion.h1>

      {unlocked ? (
        <>
          <motion.p className={styles.teaser} variants={fadeUp}>
            {reveal?.description ?? chapter.subtitle}
          </motion.p>

          {hasReveal ? (
            <motion.section
              className={styles.reveal}
              variants={fadeUp}
              aria-label="Experience"
            >
              <div className={styles.revealRule} aria-hidden="true" />
              {experienceLabel ? (
                <p className={styles.category}>{experienceLabel}</p>
              ) : null}
              {reveal?.venue ? (
                <h2 className={styles.venue}>{reveal.venue}</h2>
              ) : null}
            </motion.section>
          ) : null}

          {claimable ? (
            <motion.div variants={fadeUp}>
              <ClaimRequest
                slug={chapter.slug}
                chapterLabel={`${chapter.number} ${chapter.title}`}
              />
            </motion.div>
          ) : null}
        </>
      ) : (
        <motion.section
          className={styles.locked}
          variants={fadeUp}
          aria-label="Unreleased chapter"
        >
          <div className={styles.revealRule} aria-hidden="true" />
          <p className={styles.lockedLead}>
            This chapter hasn&apos;t premiered yet.
          </p>
          <p className={styles.lockedWhen}>
            {getLockedAvailabilityCopy(chapter)}
          </p>
        </motion.section>
      )}

      <motion.nav className={styles.nav} variants={fadeUp} aria-label="Chapters">
        {previous ? (
          <Link to={`/chapters/${previous.slug}`} className={styles.navLink}>
            <span className={styles.navMeta}>Previous</span>
            <span className={styles.navTitle}>
              {previous.number} {previous.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            to={`/chapters/${next.slug}`}
            className={`${styles.navLink} ${styles.navNext}`}
          >
            <span className={styles.navMeta}>Next</span>
            <span className={styles.navTitle}>
              {next.number} {next.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </motion.nav>
    </motion.article>
  );
}
