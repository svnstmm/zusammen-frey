import { FilmGrain } from './FilmGrain';
import { PaperTexture } from './PaperTexture';
import styles from './Atmosphere.module.css';

export function Atmosphere() {
  return (
    <div className={styles.root} aria-hidden="true">
      <div className={styles.field} />
      <PaperTexture />
      <FilmGrain />
    </div>
  );
}
