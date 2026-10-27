import { fireEvent, render, screen } from '@testing-library/react';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('décrit le déclencheur et s’affiche au focus', () => {
    render(
      <Tooltip content="Envoi différé.">
        <button type="button">Attente</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Attente' });
    expect(trigger).toHaveAccessibleDescription('Envoi différé.');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    fireEvent.focus(trigger);
    expect(screen.getByRole('tooltip')).toBeVisible();
  });

  it('se ferme avec Échap et au départ du pointeur', () => {
    render(
      <Tooltip content="Envoi différé.">
        <button type="button" aria-describedby="autre">
          Attente
        </button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');
    expect(trigger.getAttribute('aria-describedby')).toMatch(/^autre /);
    fireEvent.mouseEnter(trigger.parentElement!);
    expect(screen.getByRole('tooltip')).toBeVisible();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    fireEvent.mouseEnter(trigger.parentElement!);
    fireEvent.mouseLeave(trigger.parentElement!);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
