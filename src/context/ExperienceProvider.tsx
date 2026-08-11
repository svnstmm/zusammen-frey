import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import type { IntroTransitionPhase } from '../types/experience';

interface ExperienceContextValue {
  enter: () => void;
  isTransitioning: boolean;
  transitionPhase: IntroTransitionPhase;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

interface ExperienceProviderProps {
  children: ReactNode;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function ExperienceProvider({ children }: ExperienceProviderProps) {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] =
    useState<IntroTransitionPhase>('idle');

  const enter = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    if (prefersReducedMotion()) {
      navigate('/chapters');
      setIsTransitioning(false);
      setTransitionPhase('idle');
      return;
    }

    // Title-card dissolve: text out → photo present → white → chapters
    setTransitionPhase('leaving');
    window.setTimeout(() => setTransitionPhase('reveal'), 240);
    window.setTimeout(() => setTransitionPhase('white'), 460);
    window.setTimeout(() => {
      navigate('/chapters');
      setIsTransitioning(false);
      // Hold the white dissolve briefly so the chapter page arrives under it
      window.setTimeout(() => setTransitionPhase('idle'), 160);
    }, 720);
  }, [isTransitioning, navigate]);

  const value = useMemo(
    () => ({
      enter,
      isTransitioning,
      transitionPhase,
    }),
    [enter, isTransitioning, transitionPhase],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience(): ExperienceContextValue {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within ExperienceProvider');
  }
  return context;
}
