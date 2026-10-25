import { render, screen } from '@testing-library/react';
import { Tag, TagList } from '../Tag/Tag';
import { ServiceCard, ServiceGrid } from './ServiceCard';

describe('ServiceCard', () => {
  it('rend titre, code et statut ; lien si href', () => {
    render(
      <ServiceGrid>
        <ServiceCard
          code="S/01"
          title="Cadrage"
          description="Atelier."
          status="available"
          href="#contact"
        />
      </ServiceGrid>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '#contact');
    expect(screen.getByRole('heading', { name: 'Cadrage' })).toBeInTheDocument();
    expect(screen.getByText('S/01')).toBeInTheDocument();
    expect(screen.getByText('Disponible').closest('.ny-status-badge')).toHaveClass(
      'ny-status-badge--plain',
    );
  });
});

describe('Tag', () => {
  it('rend une liste d’étiquettes non interactives', () => {
    render(<TagList items={['Entreprises', 'Universités']} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('accepte un contenu libre', () => {
    render(<Tag>Coopératives</Tag>);
    expect(screen.getByText('Coopératives')).toHaveClass('ny-tag');
  });
});
