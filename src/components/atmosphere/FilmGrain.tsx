import styles from './FilmGrain.module.css';

/** Subtle film grain + flicker. Purely atmospheric — no interaction. */
export function FilmGrain() {
  return (
    <div className={styles.grain} aria-hidden="true">
      <div className={styles.noise} />
    </div>
  );
}
