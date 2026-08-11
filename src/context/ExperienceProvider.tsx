import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';

interface ExperienceContextValue {
  enter: () => void;
  isTransitioning: boolean;
}

const ExperienceContext = createContext<ExperienceContextValue | null>(null);

interface ExperienceProviderProps {
  children: ReactNode;
}

export function ExperienceProvider({ children }: ExperienceProviderProps) {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const enter = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    window.setTimeout(() => {
      navigate('/chapters');
      setIsTransitioning(false);
    }, 1100);
  }, [isTransitioning, navigate]);

  const value = useMemo(
    () => ({
      enter,
      isTransitioning,
    }),
    [enter, isTransitioning],
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
