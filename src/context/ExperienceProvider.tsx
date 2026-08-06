import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { AppView } from '../types/experience';

interface ExperienceContextValue {
  view: AppView;
  enter: () => void;
  returnToLanding: () => void;
  isTransitioning: boolean;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

interface ExperienceProviderProps {
  children: ReactNode;
}

export function ExperienceProvider({ children }: ExperienceProviderProps) {
  const [view, setView] = useState<AppView>('landing');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const enter = useCallback(() => {
    if (view !== 'landing' || isTransitioning) return;
    setIsTransitioning(true);
    // Allow dissolve to complete before committing the view.
    window.setTimeout(() => {
      setView('experience');
      setIsTransitioning(false);
    }, 1100);
  }, [view, isTransitioning]);

  const returnToLanding = useCallback(() => {
    setView('landing');
  }, []);

  const value = useMemo(
    () => ({
      view,
      enter,
      returnToLanding,
      isTransitioning,
    }),
    [view, enter, returnToLanding, isTransitioning],
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
