import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { Button } from '../Button/Button';
import { SiteHeader } from '../SiteHeader/SiteHeader';
import { LinkProvider, type LinkComponentProps } from './Link';

// Routeur minimal : enregistre la destination au lieu de charger la page.
const visited: string[] = [];
function RouterLink({ href, onClick, ...props }: LinkComponentProps) {
  return (
    <a
      {...props}
      href={href}
      data-router=""
      onClick={(event) => {
        onClick?.(event);
        event.preventDefault();
        visited.push(href);
      }}
    />
  );
}

const links = [
  { href: '/events', label: 'Événements', current: true },
  { href: '/cameras', label: 'Caméras' },
];

describe('LinkProvider', () => {
  beforeEach(() => {
    visited.length = 0;
  });

  it('rend des <a> simples sans fournisseur', () => {
    render(<Breadcrumb items={[{ label: 'Sites', href: '/sites' }, { label: 'Ségou' }]} />);
    expect(screen.getByRole('link', { name: 'Sites' })).not.toHaveAttribute('data-router');
  });

  it('passe les liens de SiteHeader au routeur, classes et aria-current compris', async () => {
    render(
      <LinkProvider component={RouterLink}>
        <SiteHeader links={links} brandHref="/" />
      </LinkProvider>,
    );
    const [bar] = screen.getAllByRole('navigation', {
      name: 'Navigation principale',
      hidden: true,
    });
    const current = within(bar!).getByRole('link', { name: 'Événements' });
    expect(current).toHaveAttribute('data-router');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current).toHaveClass('ny-site-header__link', 'ny-focusable');
    expect(screen.getByRole('link', { name: 'NYEMA' })).toHaveAttribute('data-router');

    await userEvent.click(within(bar!).getByRole('link', { name: 'Caméras' }));
    expect(visited).toEqual(['/cameras']);
  });

  it('ferme le menu replié après une navigation par le routeur', async () => {
    render(
      <LinkProvider component={RouterLink}>
        <SiteHeader links={links} />
      </LinkProvider>,
    );
    const toggle = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(toggle);
    const panel = document.getElementById(toggle.getAttribute('aria-controls')!)!;
    await userEvent.click(within(panel).getByRole('link', { name: 'Caméras' }));
    expect(visited).toEqual(['/cameras']);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });

  it('passe Button href au routeur, mais pas un bouton désactivé', () => {
    render(
      <LinkProvider component={RouterLink}>
        <Button href="/export">Exporter</Button>
        <Button href="/purge" disabled>
          Purger
        </Button>
      </LinkProvider>,
    );
    expect(screen.getByRole('link', { name: 'Exporter' })).toHaveAttribute('data-router');
    const disabled = screen.getByText('Purger');
    expect(disabled).not.toHaveAttribute('data-router');
    expect(disabled).not.toHaveAttribute('href');
  });
});
