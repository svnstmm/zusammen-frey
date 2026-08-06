import { motion } from 'framer-motion';
import { fadeUp, staggerChildren } from '../../lib/motion';
import styles from './ExperienceShell.module.css';

/**
 * Placeholder for the 12-chapter experience.
 * Landing → Enter dissolves into this quiet holding frame.
 */
export function ExperienceShell() {
  return (
    <motion.section
      className={styles.shell}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: staggerChildren(0.25, 0.4),
        },
      }}
      aria-label="Director's Cut"
    >
      <motion.p className={styles.kicker} variants={fadeUp}>
        Special Edition
      </motion.p>
      <motion.h2 className={styles.heading} variants={fadeUp}>
        The chapters await.
      </motion.h2>
      <motion.p className={styles.note} variants={fadeUp}>
        Twelve scenes will unlock across one year.
      </motion.p>
    </motion.section>
  );
}
