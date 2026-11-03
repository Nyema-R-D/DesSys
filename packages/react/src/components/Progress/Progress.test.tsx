import { render, screen } from '@testing-library/react';
import { Progress, Spinner, formatPercent } from './Progress';

describe('Progress', () => {
  it('nomme la barre par son libellé et affiche le pourcentage', () => {
    const { container } = render(<Progress label="Synchronisation" value={42} />);
    const bar = screen.getByRole('progressbar', { name: 'Synchronisation' });
    expect(bar).toHaveAttribute('value', '42');
    expect(container.querySelector('.ny-progress__value')?.textContent).toBe('42\u202f%');
  });

  it('sans valeur, est indéterminée et n’affiche pas de pourcentage', () => {
    render(<Progress label="Préparation" />);
    expect(screen.getByRole('progressbar')).not.toHaveAttribute('value');
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it('accepte un libellé de valeur et une aide', () => {
    render(<Progress label="Envoi" value={3} max={5} valueLabel="3 fichiers sur 5" hint="Wi-Fi" />);
    expect(screen.getByText('3 fichiers sur 5')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAccessibleDescription('Wi-Fi');
  });

  it('borne et arrondit le pourcentage', () => {
    expect(formatPercent(1, 3)).toBe('33\u202f%');
    expect(formatPercent(12, 10)).toBe('100\u202f%');
    expect(formatPercent(-1, 10)).toBe('0\u202f%');
  });
});

describe('Spinner', () => {
  it('annonce le chargement sans exposer le motif', () => {
    render(<Spinner label="Envoi en cours" size="sm" />);
    expect(screen.getByRole('status')).toHaveTextContent('Envoi en cours');
    expect(screen.getByRole('status')).toHaveClass('ny-spinner--sm');
  });
});
