import { render, screen } from '@testing-library/react';
import { Stepper } from './Stepper';

const steps = [
  { id: 'cooperative', label: 'Coopérative' },
  { id: 'membres', label: 'Membres' },
  { id: 'envoi', label: 'Envoi' },
];

describe('Stepper', () => {
  it('nomme la navigation et marque l’étape en cours', () => {
    render(<Stepper steps={steps} current="membres" />);
    expect(screen.getByRole('navigation', { name: 'Étapes' })).toBeInTheDocument();
    const items = screen.getAllByRole('listitem');
    expect(items[1]).toHaveAttribute('aria-current', 'step');
    expect(items[0]).not.toHaveAttribute('aria-current');
  });

  it('annonce les étapes faites et numérote sur deux chiffres', () => {
    render(<Stepper steps={steps} current="envoi" doneLabel="faite" />);
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('01Coopérative (faite)');
    expect(items[0]).toHaveClass('ny-stepper__step--done');
    expect(items[2]).toHaveClass('ny-stepper__step--current');
    expect(items[2]).not.toHaveTextContent('faite');
  });
});
