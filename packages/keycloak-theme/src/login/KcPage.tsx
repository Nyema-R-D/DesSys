import DefaultPage from 'keycloakify/login/DefaultPage';
import { lazy, Suspense } from 'react';
import { classes } from './classes';
import { useI18n } from './i18n';
import type { KcContext } from './KcContext';
import Template from './Template';
import './theme.css';

const UserProfileFormFields = lazy(() => import('keycloakify/login/UserProfileFormFields'));

/**
 * Toutes les pages de Keycloak, rendues par Keycloakify avec le gabarit NYEMA et les classes du
 * design system (pas de CSS PatternFly).
 */
export default function KcPage({ kcContext }: { kcContext: KcContext }) {
  const { i18n } = useI18n({ kcContext });
  return (
    <Suspense>
      <DefaultPage
        kcContext={kcContext}
        i18n={i18n}
        classes={classes}
        Template={Template}
        doUseDefaultCss={false}
        UserProfileFormFields={UserProfileFormFields}
        doMakeUserConfirmPassword
      />
    </Suspense>
  );
}
