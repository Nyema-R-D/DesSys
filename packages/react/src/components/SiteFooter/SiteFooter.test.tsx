import { render, screen } from '@testing-library/react';
import { SiteFooter } from './SiteFooter';

describe('SiteFooter', () => {
  it('nomme chaque colonne de navigation par son titre', () => {
    render(
      <SiteFooter
        columns={[
          { title: 'NYEMA', links: [{ href: '#apropos', label: 'À propos' }] },
          { title: 'Légal', links: [{ href: '/mentions', label: 'Mentions légales' }] },
        ]}
        legal="© 2026 NYEMA"
        tagline="Technologie utile."
      />,
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Légal' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Mentions légales' })).toHaveAttribute(
      'href',
      '/mentions',
    );
    expect(screen.getByText('© 2026 NYEMA')).toBeInTheDocument();
  });
});
