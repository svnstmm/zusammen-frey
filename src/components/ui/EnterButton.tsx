import { motion } from 'framer-motion';
import { fadeTransition } from '../../lib/motion';
import styles from './EnterButton.module.css';

interface EnterButtonProps {
  onEnter: () => void;
  disabled?: boolean;
  label?: string;
  className?: string;
}

export function EnterButton({
  onEnter,
  disabled = false,
  label = "View Director's Cut",
  className,
}: EnterButtonProps) {
  return (
    <motion.button
      type="button"
      className={[styles.button, className].filter(Boolean).join(' ')}
      onClick={onEnter}
      disabled={disabled}
      whileTap={disabled ? undefined : { opacity: 0.7 }}
      transition={fadeTransition}
    >
      <span className={styles.label}>{label}</span>
    </motion.button>
  );
}
