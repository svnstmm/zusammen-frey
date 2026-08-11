import { motion } from 'framer-motion';
import { siteMeta } from '../../data/site';
import { easeEditorial, fadeUp, staggerChildren } from '../../lib/motion';
import { EnterButton } from '../ui/EnterButton';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  onEnter: () => void;
  isExiting?: boolean;
}

export function LandingPage({ onEnter, isExiting = false }: LandingPageProps) {
  const [taglineFirst, taglineSecond] = siteMeta.tagline.split('\n');

  return (
    <motion.main
      className={styles.page}
      initial="hidden"
      animate={isExiting ? 'exit' : 'visible'}
      variants={{
        hidden: {},
        visible: {
          transition: staggerChildren(0.14, 0.22),
        },
        exit: {
          opacity: 0,
          transition: { duration: 0.28, ease: easeEditorial },
        },
      }}
    >
      <div className={styles.stage}>
        <div className={styles.lockup}>
          <motion.p className={styles.eyebrow} variants={fadeUp}>
            {siteMeta.subtitle}
          </motion.p>

          <motion.h1 className={styles.title} variants={fadeUp}>
            <span className={styles.titlePrefix}>{siteMeta.titlePrefix}</span>
            <span className={styles.titleEmphasis}>{siteMeta.titleEmphasis}</span>
          </motion.h1>
        </div>

        <motion.p className={styles.tagline} variants={fadeUp}>
          {taglineFirst}
          <br className={styles.taglineBreak} />
          {taglineSecond ? ` ${taglineSecond}` : null}
        </motion.p>
      </div>

      <motion.div className={styles.footer} variants={fadeUp}>
        <EnterButton
          className={styles.cta}
          label={siteMeta.cta}
          onEnter={onEnter}
          disabled={isExiting}
        />
      </motion.div>
    </motion.main>
  );
}
