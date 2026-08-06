import { motion } from 'framer-motion';
import { siteMeta } from '../../data/site';
import { fadeUp, staggerChildren } from '../../lib/motion';
import { EnterButton } from '../ui/EnterButton';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  onEnter: () => void;
  isExiting?: boolean;
}

export function LandingPage({ onEnter, isExiting = false }: LandingPageProps) {
  const synopsisLines = siteMeta.synopsis.split('\n');

  return (
    <motion.main
      className={styles.page}
      initial="hidden"
      animate={isExiting ? 'exit' : 'visible'}
      exit="exit"
      variants={{
        hidden: {},
        visible: {
          transition: staggerChildren(0.22, 0.35),
        },
        exit: {
          opacity: 0,
          filter: 'blur(8px)',
          transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <div className={styles.frame}>
        <motion.p className={styles.eyebrow} variants={fadeUp}>
          {siteMeta.subtitle}
        </motion.p>

        <motion.h1 className={styles.title} variants={fadeUp}>
          {siteMeta.title}
        </motion.h1>

        <motion.div className={styles.divider} variants={fadeUp} aria-hidden="true">
          <span className={styles.dividerMark} />
        </motion.div>

        <motion.p className={styles.logline} variants={fadeUp}>
          {siteMeta.logline}
        </motion.p>

        <motion.div className={styles.synopsis} variants={fadeUp}>
          {synopsisLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </motion.div>

        <motion.div className={styles.action} variants={fadeUp}>
          <EnterButton onEnter={onEnter} disabled={isExiting} />
        </motion.div>
      </div>
    </motion.main>
  );
}
