export type AppView = 'landing' | 'experience';

export interface SiteMeta {
  title: string;
  subtitle: string;
  logline: string;
  synopsis: string;
  yearArc: string;
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
