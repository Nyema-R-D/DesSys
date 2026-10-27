import { act, fireEvent, render, screen } from '@testing-library/react';
import { Menu } from './Menu';

const items = [
  { id: 'modifier', label: 'Modifier' },
  { id: 'exporter', label: 'Exporter', disabled: true },
  { id: 'supprimer', label: 'Supprimer', tone: 'danger' as const },
];

describe('Menu', () => {
  it('ouvre la liste et place le focus sur la première action', () => {
    render(<Menu label="Actions" items={items} />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu', { name: 'Actions' })).toBeVisible();
    expect(screen.getByRole('menuitem', { name: 'Modifier' })).toHaveFocus();
  });

  it('navigue au clavier en sautant les actions désactivées', () => {
    render(<Menu label="Actions" items={items} />);
    fireEvent.keyDown(screen.getByRole('button', { name: 'Actions' }), { key: 'ArrowUp' });
    const menu = screen.getByRole('menu');
    expect(screen.getByRole('menuitem', { name: 'Supprimer' })).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Modifier' })).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(screen.getByRole('menuitem', { name: 'Supprimer' })).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(screen.getByRole('menuitem', { name: 'Modifier' })).toHaveFocus();
  });

  it('Échap ferme et rend le focus au bouton', () => {
    render(<Menu label="Actions" items={items} />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    fireEvent.click(trigger);
    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('transmet l’action choisie et ferme ; un clic extérieur ferme aussi', () => {
    const onSelect = vi.fn();
    render(<Menu label="Actions" items={items} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Supprimer' }));
    expect(onSelect).toHaveBeenCalledWith('supprimer');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    act(() => {
      document.body.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
