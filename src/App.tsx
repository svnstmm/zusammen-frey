import { Route, Routes } from 'react-router-dom';
import { Atmosphere } from './components/atmosphere/Atmosphere';
import { ChapterDetail, ChapterOverview } from './components/chapter';
import { LandingPage } from './components/landing/LandingPage';
import { useExperience } from './context/ExperienceProvider';
import styles from './App.module.css';

function LandingRoute() {
  const { enter, isTransitioning } = useExperience();
  return <LandingPage onEnter={enter} isExiting={isTransitioning} />;
}

export default function App() {
  return (
    <div className={styles.app}>
      <Atmosphere />
      <Routes>
        <Route path="/" element={<LandingRoute />} />
        <Route path="/chapters" element={<ChapterOverview />} />
        <Route path="/chapters/:slug" element={<ChapterDetail />} />
      </Routes>
    </div>
  );
}
