import { render, screen } from '@testing-library/react';
import { PillarCard } from './PillarCard';

describe('PillarCard', () => {
  it('formate l’index sur deux chiffres', () => {
    render(<PillarCard index={2} title="Infrastructures numériques" />);
    expect(screen.getByText('/02')).toBeInTheDocument();
  });

  it('rend un article avec un titre du niveau demandé', () => {
    render(<PillarCard index={1} title="Données" headingLevel={2} />);
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Données' })).toBeInTheDocument();
  });

  it('devient un lien focalisable avec href', () => {
    render(<PillarCard index={3} title="Formation" href="/formation" />);
    const link = screen.getByRole('link', { name: /Formation/ });
    expect(link).toHaveAttribute('href', '/formation');
    expect(link).toHaveClass('ny-focusable');
  });
});
