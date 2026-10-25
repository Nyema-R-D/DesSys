import { render, screen } from '@testing-library/react';
import { Chip, ChipGroup } from './Chip';

describe('Chip', () => {
  it('expose son état sélectionné', () => {
    render(
      <ChipGroup aria-label="Type de besoin">
        <Chip selected>Développement</Chip>
        <Chip>Audit</Chip>
      </ChipGroup>,
    );
    expect(screen.getByRole('button', { name: 'Développement' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Audit' })).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByRole('group', { name: 'Type de besoin' })).toBeInTheDocument();
  });
});
