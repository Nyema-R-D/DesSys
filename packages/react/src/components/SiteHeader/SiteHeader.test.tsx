import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SiteHeader } from './SiteHeader';

const links = [
  { href: '#solutions', label: 'Solutions', current: true },
  { href: '#laboratoire', label: 'Laboratoire' },
];

describe('SiteHeader', () => {
  it('rend logo, navigation et page courante', () => {
    render(<SiteHeader links={links} />);
    expect(screen.getByRole('img', { name: 'NYEMA' })).toBeInTheDocument();
    const [nav] = screen.getAllByRole('navigation', {
      name: 'Navigation principale',
      hidden: true,
    });
    expect(within(nav!).getByRole('link', { name: 'Solutions' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('ouvre et ferme le menu (bouton puis Échap)', async () => {
    render(<SiteHeader links={links} />);
    const toggle = screen.getByRole('button', { name: 'Menu' });
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveTextContent('Fermer');
    await userEvent.keyboard('{Escape}');
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
  });
});
