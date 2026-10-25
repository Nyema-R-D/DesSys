import { render } from '@testing-library/react';
import { createSignalPattern, SignalGrid } from './SignalGrid';

describe('SignalGrid', () => {
  it('respecte les proportions 7 % latérite / 17 % papier', () => {
    const pattern = createSignalPattern(100, 3);
    expect(pattern.filter((s) => s === 'accent')).toHaveLength(7);
    expect(pattern.filter((s) => s === 'paper')).toHaveLength(17);
  });

  it('est déterministe pour une graine donnée', () => {
    expect(createSignalPattern(64, 42)).toEqual(createSignalPattern(64, 42));
  });

  it('rend colonnes × lignes cellules, masquées aux lecteurs d’écran', () => {
    const { container } = render(<SignalGrid columns={8} rows={2} />);
    expect(container.querySelectorAll('.ny-signal-grid__cell')).toHaveLength(16);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });
});
