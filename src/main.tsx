import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AudioProvider } from './context/AudioProvider';
import { ExperienceProvider } from './context/ExperienceProvider';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AudioProvider>
      <ExperienceProvider>
        <App />
      </ExperienceProvider>
    </AudioProvider>
  </StrictMode>,
);
