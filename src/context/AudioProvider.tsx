import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { AudioTrack } from '../types/experience';

/**
 * Audio architecture only — no autoplay.
 * Tracks can be wired later (projector hum, room tone, etc.).
 */
interface AudioContextValue {
  isEnabled: boolean;
  isPlaying: boolean;
  currentTrackId: string | null;
  enable: () => void;
  disable: () => void;
  play: (track: AudioTrack) => Promise<void>;
  stop: () => void;
}

const AudioContext = createContext<AudioContextValue | null>(null);

interface AudioProviderProps {
  children: ReactNode;
}

export function AudioProvider({ children }: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);

  const enable = useCallback(() => setIsEnabled(true), []);
  const disable = useCallback(() => {
    setIsEnabled(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsPlaying(false);
    setCurrentTrackId(null);
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
  }, []);

  const play = useCallback(
    async (track: AudioTrack) => {
      if (!isEnabled) return;

      if (!audioRef.current) {
        audioRef.current = new Audio();
      }

      const audio = audioRef.current;
      audio.src = track.src;
      audio.loop = track.loop;
      audio.volume = track.volume;
      setCurrentTrackId(track.id);

      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        // User gesture / browser policy — fail quietly.
        setIsPlaying(false);
      }
    },
    [isEnabled],
  );

  const value = useMemo(
    () => ({
      isEnabled,
      isPlaying,
      currentTrackId,
      enable,
      disable,
      play,
      stop,
    }),
    [isEnabled, isPlaying, currentTrackId, enable, disable, play, stop],
  );

  return (
    <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return context;
}
