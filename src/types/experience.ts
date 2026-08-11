export type AppView = 'landing' | 'experience';

export type IntroTransitionPhase = 'idle' | 'leaving' | 'reveal' | 'white';

export interface SiteMeta {
  title: string;
  titlePrefix: string;
  titleEmphasis: string;
  subtitle: string;
  /** Subtle cinematic line under the title. */
  continues: string;
  /** Main conceptual tagline; may include a newline. */
  tagline: string;
  cta: string;
  location: string;
  logline: string;
  synopsis: string;
  yearArc: string;
  premiere: string;
}

export interface UnlockState {
  unlockedIds: number[];
  lastUnlockedAt?: string;
}

export interface AudioTrack {
  id: string;
  src: string;
  label: string;
  loop: boolean;
  volume: number;
}
