import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { startSmoothScroll } from './lib/smoothScroll';
import './index.css';

// Always open at the top, where the intro animation plays
history.scrollRestoration = 'manual';
startSmoothScroll();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
