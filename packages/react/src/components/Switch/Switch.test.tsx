import { fireEvent, render, screen } from '@testing-library/react';
import { Switch } from './Switch';

describe('Switch', () => {
  it('expose un interrupteur libellé', () => {
    render(<Switch label="Mode hors ligne" />);
    const control = screen.getByRole('switch', { name: 'Mode hors ligne' });
    expect(control).not.toBeChecked();
    fireEvent.click(control);
    expect(control).toBeChecked();
  });

  it('relie l’aide au contrôle', () => {
    render(<Switch label="Mode hors ligne" hint="Envoi au retour du réseau." />);
    expect(screen.getByRole('switch')).toHaveAccessibleDescription('Envoi au retour du réseau.');
  });

  it('transmet onChange et checked contrôlé', () => {
    const onChange = vi.fn();
    render(<Switch label="Notifications" checked onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledOnce();
  });
});
