import { Alert, LanguageSwitch, Logo, Theme, type ThemeName } from '@nyema-r-d/react';
import { kcSanitize } from 'keycloakify/lib/kcSanitize';
import { useInitialize } from 'keycloakify/login/Template.useInitialize';
import type { TemplateProps } from 'keycloakify/login/TemplateProps';
import { useSetClassName } from 'keycloakify/tools/useSetClassName';
import { useEffect, useRef, useState } from 'react';
import type { I18n } from './i18n';
import type { KcContext } from './KcContext';

const prefersLight = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: light)').matches;

/**
 * Cadre commun des pages de connexion : logo, langue, titre, message de Keycloak (Alert), puis
 * la page. Thème anthracite, papier si le système est en mode clair.
 */
export default function Template({
  displayInfo = false,
  displayMessage = true,
  displayRequiredFields = false,
  headerNode,
  socialProvidersNode = null,
  infoNode = null,
  documentTitle,
  bodyClassName,
  kcContext,
  i18n,
  doUseDefaultCss,
  children,
}: TemplateProps<KcContext, I18n>) {
  const { msg, msgStr, currentLanguage, enabledLanguages } = i18n;
  const { realm, auth, url, message, isAppInitiatedAction } = kcContext;
  const [theme] = useState<ThemeName>(() => (prefersLight() ? 'paper' : 'anthracite'));
  const page = useRef<HTMLDivElement>(null);

  // Les pages de Keycloak posent des tabindex positifs (1, 2, 3…) : l'ordre de tabulation suit
  // alors ces numéros et non la page. On rend l'ordre du document.
  // Les pages se rendent aussi après le gabarit (scripts WebAuthn…) : on surveille la page.
  useEffect(() => {
    const root = page.current;
    if (!root) return;
    const reset = () =>
      root.querySelectorAll<HTMLElement>('[tabindex]').forEach((element) => {
        if (Number(element.getAttribute('tabindex')) > 0) element.removeAttribute('tabindex');
      });
    reset();
    const observer = new MutationObserver(reset);
    observer.observe(root, { subtree: true, childList: true, attributeFilter: ['tabindex'] });
    return () => observer.disconnect();
  });

  useEffect(() => {
    document.title = documentTitle ?? msgStr('loginTitle', realm.displayName || realm.name);
  }, [documentTitle, msgStr, realm.displayName, realm.name]);

  useSetClassName({ qualifiedName: 'html', className: 'ny-kc-html' });
  useSetClassName({ qualifiedName: 'body', className: bodyClassName ?? 'ny-kc-body' });

  const { isReadyToRender } = useInitialize({ kcContext, doUseDefaultCss });
  if (!isReadyToRender) return null;

  const showUsername = auth !== undefined && auth.showUsername && !auth.showResetCredentials;
  // N'afficher l'avertissement « action requise » qu'à une connexion, pas à une action de l'app.
  const showMessage =
    displayMessage &&
    message !== undefined &&
    (message.type !== 'warning' || !isAppInitiatedAction);

  return (
    <Theme theme={theme} className="ny-kc">
      <div ref={page} className="ny-kc__page">
        <header className="ny-kc__header">
          <Logo size={26} />
          {enabledLanguages.length > 1 ? (
            <LanguageSwitch
              label={msgStr('languages')}
              value={currentLanguage.languageTag}
              options={enabledLanguages.map(({ languageTag, label }) => ({
                value: languageTag,
                label: languageTag.toUpperCase(),
                name: label,
              }))}
              getHref={(tag) => enabledLanguages.find((l) => l.languageTag === tag)!.href}
            />
          ) : null}
        </header>

        <main className="ny-kc__card">
          <p className="ny-mono-label ny-kc__realm">{realm.displayName || realm.name}</p>
          <h1 id="kc-page-title" className="ny-kc__title">
            {headerNode}
          </h1>
          {showUsername ? (
            <p id="kc-username" className="ny-kc__username">
              <span id="kc-attempted-username">{auth.attemptedUsername}</span>
              <a id="reset-login" href={url.loginRestartFlowUrl}>
                {msg('restartLoginTooltip')}
              </a>
            </p>
          ) : null}
          {displayRequiredFields ? (
            <p className="ny-field__hint ny-kc__required">* {msg('requiredFields')}</p>
          ) : null}

          {showMessage ? (
            <Alert tone={message.type} className="ny-kc__message">
              <span dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
            </Alert>
          ) : null}

          <div id="kc-content" className="ny-kc__content">
            {children}
            {auth !== undefined && auth.showTryAnotherWayLink ? (
              <form id="kc-select-try-another-way-form" action={url.loginAction} method="post">
                <input type="hidden" name="tryAnotherWay" value="on" />
                <button
                  type="submit"
                  id="try-another-way"
                  className="ny-button ny-button--link ny-focusable"
                >
                  {msg('doTryAnotherWay')}
                </button>
              </form>
            ) : null}
            {socialProvidersNode}
            {displayInfo ? (
              <div id="kc-info" className="ny-kc__info">
                {infoNode}
              </div>
            ) : null}
          </div>
        </main>
      </div>
    </Theme>
  );
}
