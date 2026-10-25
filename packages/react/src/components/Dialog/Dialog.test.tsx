import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog';

describe('Dialog', () => {
  it('s’ouvre en modale, porte son titre et se ferme', async () => {
    const onClose = vi.fn();
    const { rerender, container } = render(
      <Dialog open={false} onClose={onClose} title="Supprimer la visite ?">
        Action définitive.
      </Dialog>,
    );
    const dialog = container.querySelector('dialog')!;
    expect(dialog.open).toBe(false);
    rerender(
      <Dialog open onClose={onClose} title="Supprimer la visite ?">
        Action définitive.
      </Dialog>,
    );
    expect(dialog.open).toBe(true);
    expect(screen.getByRole('dialog', { name: 'Supprimer la visite ?' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Fermer' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
