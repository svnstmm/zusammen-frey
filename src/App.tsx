import { AnimatePresence } from 'framer-motion';
import { Atmosphere } from './components/atmosphere/Atmosphere';
import { ExperienceShell } from './components/experience/ExperienceShell';
import { LandingPage } from './components/landing/LandingPage';
import { useExperience } from './context/ExperienceProvider';
import styles from './App.module.css';

function AppViews() {
  const { view, enter, isTransitioning } = useExperience();

  return (
    <div className={styles.app}>
      <Atmosphere />
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <LandingPage
            key="landing"
            onEnter={enter}
            isExiting={isTransitioning}
          />
        ) : (
          <ExperienceShell key="experience" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return <AppViews />;
}
