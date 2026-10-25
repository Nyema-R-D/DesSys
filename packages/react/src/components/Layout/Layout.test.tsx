import { render, screen } from '@testing-library/react';
import { SectionLabel } from '../SectionLabel/SectionLabel';
import { Section } from './Layout';

describe('Section & SectionLabel', () => {
  it('formate l’index sur deux chiffres', () => {
    render(<SectionLabel index={2}>Offres disponibles</SectionLabel>);
    expect(screen.getByText('02 — Offres disponibles')).toBeInTheDocument();
  });

  it('expose le libellé de section comme titre', () => {
    render(
      <Section index={1} label="Marque">
        Contenu
      </Section>,
    );
    expect(screen.getByRole('heading', { name: '01 — Marque' })).toBeInTheDocument();
  });
});
