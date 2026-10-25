import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('se coche via son libellé', async () => {
    render(<Checkbox label="J’accepte" />);
    const box = screen.getByRole('checkbox', { name: 'J’accepte' });
    await userEvent.click(screen.getByText('J’accepte'));
    expect(box).toBeChecked();
  });

  it('annonce l’erreur', () => {
    render(<Checkbox label="Consentement" error="Consentement requis." />);
    const box = screen.getByRole('checkbox');
    expect(box).toHaveAttribute('aria-invalid', 'true');
    expect(box).toHaveAccessibleDescription('Consentement requis.');
  });
});
