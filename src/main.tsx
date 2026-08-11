import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AudioProvider } from './context/AudioProvider';
import { ExperienceProvider } from './context/ExperienceProvider';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AudioProvider>
        <ExperienceProvider>
          <App />
        </ExperienceProvider>
      </AudioProvider>
    </BrowserRouter>
  </StrictMode>,
);
