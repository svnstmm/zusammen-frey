export interface SoundtrackMeta {
  /** Set true once the playlist is public and embeddable. */
  enabled: boolean;
  spotifyUrl: string;
  title: string;
  subtitle: string;
}

/**
 * Overall film soundtrack — not a chapter gift.
 * Keep `enabled: false` until the playlist is public.
 */
export const soundtrack: SoundtrackMeta = {
  enabled: false,
  spotifyUrl:
    'https://open.spotify.com/playlist/4DT6kjfa6dk7Vgp1qjbmC7?si=iD6LcuDBS4eGRO7ut2cNwQ',
  title: 'Best Soundtrack of the Year 2026',
  subtitle: 'Exclusively selected by friends & family',
};

export function getSpotifyEmbedUri(spotifyUrl: string): string | null {
  if (!spotifyUrl || spotifyUrl.startsWith('TODO:')) return null;

  try {
    const url = new URL(spotifyUrl.trim());
    const parts = url.pathname.split('/').filter(Boolean);
    const typeIndex = parts.findIndex((part) =>
      ['playlist', 'album', 'track', 'episode', 'show', 'artist'].includes(part),
    );
    if (typeIndex < 0 || !parts[typeIndex + 1]) return null;
    const type = parts[typeIndex];
    const id = parts[typeIndex + 1].split('?')[0];
    return `spotify:${type}:${id}`;
  } catch {
    return null;
  }
}
