import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('s’ouvre en modale au bord demandé, porte son titre et se ferme', async () => {
    const onClose = vi.fn();
    render(
      <Drawer open onClose={onClose} title="Visite du 4 novembre" side="start">
        Détail
      </Drawer>,
    );
    const drawer = screen.getByRole('dialog', { name: 'Visite du 4 novembre' });
    expect(drawer).toHaveClass('ny-dialog', 'ny-drawer', 'ny-drawer--start');
    expect((drawer as HTMLDialogElement).open).toBe(true);
    await userEvent.click(screen.getByRole('button', { name: 'Fermer' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('se place à droite par défaut', () => {
    render(<Drawer open onClose={() => {}} title="Filtres" />);
    expect(screen.getByRole('dialog')).toHaveClass('ny-drawer--end');
  });
});
