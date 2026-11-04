import '@nyema-r-d/tokens/fonts-local.css';
import '@nyema-r-d/tokens/tokens.css';
import '@nyema-r-d/react/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { KcPage } from './kc.gen';

// En développement (`pnpm dev`), une page simulée : ?page=login-otp.ftl, ?page=error.ftl…
if (import.meta.env.DEV && !window.kcContext) {
  const { getKcContextMock } = await import('./login/KcPageStory');
  const pageId = new URLSearchParams(location.search).get('page') ?? 'login.ftl';
  window.kcContext = getKcContextMock({ pageId: pageId as 'login.ftl', overrides: {} });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {window.kcContext ? <KcPage kcContext={window.kcContext} /> : <p>Pas de contexte Keycloak.</p>}
  </StrictMode>,
);
