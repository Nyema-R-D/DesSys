import '@nyema-r-d/tokens/fonts-local.css';
import '@nyema-r-d/tokens/tokens.css';
import '@nyema-r-d/react/styles.css';
import './reference.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DesignSystemPage } from './DesignSystemPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesignSystemPage />
  </StrictMode>,
);
