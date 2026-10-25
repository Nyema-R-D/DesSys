import { render, screen } from '@testing-library/react';
import { TextField } from './TextField';

describe('TextField', () => {
  it('associe le libellé au champ', () => {
    render(<TextField label="Organisation" placeholder="Nom de la structure" />);
    expect(screen.getByLabelText('Organisation')).toHaveAttribute(
      'placeholder',
      'Nom de la structure',
    );
  });

  it('annonce l’erreur et marque le champ invalide', () => {
    render(<TextField label="E-mail" required error="Adresse e-mail invalide." />);
    const input = screen.getByLabelText('E-mail *');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toBeRequired();
    expect(screen.getByRole('alert')).toHaveTextContent('Adresse e-mail invalide.');
    expect(input.getAttribute('aria-describedby')).toContain(screen.getByRole('alert').id);
  });

  it('rend une zone de texte en mode multiline', () => {
    render(<TextField label="Message" multiline />);
    expect(screen.getByLabelText('Message').tagName).toBe('TEXTAREA');
  });
});
