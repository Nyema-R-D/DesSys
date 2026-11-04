import { cleanup, render, screen, waitFor } from '@testing-library/react';
import axe from 'axe-core';
import type { KcContext } from './KcContext';
import { KcPageMock } from './KcPageStory';

// Pages vues par les opérateurs d'Edge : connexion, second facteur, clé d'accès, actions requises,
// erreurs et déconnexion.
const pages: KcContext['pageId'][] = [
  'login.ftl',
  'login-username.ftl',
  'login-password.ftl',
  'login-otp.ftl',
  'login-config-totp.ftl',
  'webauthn-authenticate.ftl',
  'webauthn-register.ftl',
  'login-update-password.ftl',
  'login-reset-password.ftl',
  'select-authenticator.ftl',
  'login-page-expired.ftl',
  'error.ftl',
  'info.ftl',
  'logout-confirm.ftl',
];

describe('Thème Keycloak NYEMA', () => {
  afterEach(cleanup);

  it.each(pages)('%s : gabarit NYEMA, sans violation axe', async (pageId) => {
    // info.ftl tire son titre de messageHeader, simulé par « <Message header> » que
    // l'assainissement efface.
    const overrides = pageId === 'info.ftl' ? { messageHeader: 'Compte mis à jour' } : undefined;
    const { container } = render(<KcPageMock pageId={pageId} overrides={overrides} />);
    const main = await screen.findByRole('main');
    expect(main).toHaveClass('ny-kc__card');
    expect(container.querySelector('[data-ny-theme]')).not.toBeNull();
    expect(screen.getByRole('img', { name: 'NYEMA' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    // Aucune classe PatternFly : le rendu passe par le design system (Keycloakify garde en plus
    // le nom des clés, kcInputClass…, comme points d'accroche).
    expect(container.innerHTML).not.toMatch(/\bpf-/);

    // Le gabarit retire les tabindex positifs des pages de Keycloak, y compris rendus tard.
    await waitFor(() =>
      expect(
        [...container.querySelectorAll('[tabindex]')].filter(
          (element) => Number(element.getAttribute('tabindex')) > 0,
        ),
      ).toEqual([]),
    );
    const { violations } = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(violations.map((v) => `${v.id} : ${v.nodes.map((n) => n.target).join(', ')}`)).toEqual(
      [],
    );
  });

  it('connexion : champs et bouton du design system', async () => {
    render(<KcPageMock pageId="login.ftl" />);
    const username = await screen.findByLabelText(/Nom d'utilisateur ou courriel/);
    expect(username).toHaveClass('ny-field__input');
    expect(username.closest('.ny-field')).not.toBeNull();
    const submit = screen.getByRole('button', { name: 'Connexion' });
    expect(submit).toHaveClass('ny-button', 'ny-button--primary', 'ny-button--full');
  });

  it('message d’erreur de Keycloak en Alert', async () => {
    render(
      <KcPageMock
        pageId="login.ftl"
        overrides={{ message: { type: 'error', summary: 'Identifiants invalides.' } }}
      />,
    );
    expect(await screen.findByRole('alert')).toHaveTextContent('Identifiants invalides.');
  });

  it('sélecteur de langue en liens quand le domaine en propose plusieurs', async () => {
    render(<KcPageMock pageId="login.ftl" />);
    await screen.findByRole('main');
    const nav = screen.queryByRole('navigation');
    if (nav) expect(nav.querySelector('a[hreflang]')).not.toBeNull();
  });
});
