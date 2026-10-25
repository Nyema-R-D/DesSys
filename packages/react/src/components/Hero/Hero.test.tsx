import { render, screen } from '@testing-library/react';
import { Hero } from './Hero';

describe('Hero', () => {
  it('rend un titre de niveau 1 et les zones fournies', () => {
    render(
      <Hero
        eyebrow="Logiciels · Plateformes"
        aside="Mali → Afrique"
        title="Construire les infrastructures numériques utiles."
        lead="NYEMA conçoit des logiciels."
        actions={<a href="#contact">Parler d’un projet</a>}
        media={<div data-testid="media" />}
        mediaLegend={['Réseau', 'Hors ligne', 'Synchronisé']}
      />,
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Construire');
    expect(screen.getByText('Mali → Afrique')).toBeInTheDocument();
    expect(screen.getByTestId('media')).toBeInTheDocument();
    expect(screen.getByText('Hors ligne')).toBeInTheDocument();
  });

  it('omet les zones absentes', () => {
    const { container } = render(<Hero title="Titre." />);
    expect(container.querySelector('.ny-hero__top')).toBeNull();
    expect(container.querySelector('.ny-hero__media')).toBeNull();
  });
});
