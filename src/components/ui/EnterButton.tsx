import { motion } from 'framer-motion';
import { fadeTransition } from '../../lib/motion';
import styles from './EnterButton.module.css';

interface EnterButtonProps {
  onEnter: () => void;
  disabled?: boolean;
}

export function EnterButton({ onEnter, disabled = false }: EnterButtonProps) {
  return (
    <motion.button
      type="button"
      className={styles.button}
      onClick={onEnter}
      disabled={disabled}
      whileTap={disabled ? undefined : { opacity: 0.55 }}
      transition={fadeTransition}
    >
      <span className={styles.label}>Enter</span>
      <span className={styles.rule} aria-hidden="true" />
    </motion.button>
  );
}
