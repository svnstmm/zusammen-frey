import { FilmGrain } from './FilmGrain';
import { PaperTexture } from './PaperTexture';
import type { IntroTransitionPhase } from '../../types/experience';
import styles from './Atmosphere.module.css';

export type AtmosphereVariant = 'hero' | 'soft';

interface AtmosphereProps {
  variant?: AtmosphereVariant;
  transitionPhase?: IntroTransitionPhase;
}

export function Atmosphere({
  variant = 'soft',
  transitionPhase = 'idle',
}: AtmosphereProps) {
  const phaseClass =
    transitionPhase !== 'idle' ? styles[`phase_${transitionPhase}`] : '';

  return (
    <div
      className={`${styles.root} ${styles[variant]} ${phaseClass}`}
      aria-hidden="true"
      data-variant={variant}
      data-phase={transitionPhase}
    >
      <div className={styles.field} />
      <div className={styles.backdrop} />
      <div className={styles.veil} />
      <div className={styles.whiteout} />
      <PaperTexture />
      <FilmGrain />
    </div>
  );
}
