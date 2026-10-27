import '@nyema-r-d/tokens/fonts-local.css';
import '@nyema-r-d/tokens/tokens.css';
import '@nyema-r-d/react/styles.css';
import './app.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
