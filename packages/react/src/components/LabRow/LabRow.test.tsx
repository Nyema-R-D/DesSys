import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LabRow } from './LabRow';

describe('LabRow', () => {
  it('déplie et replie son contenu', async () => {
    render(
      <LabRow code="OFFLINE" title="Moteur de synchronisation hors ligne" status="research">
        Détail du projet
      </LabRow>,
    );
    const toggle = screen.getByRole('button', { expanded: false });
    expect(screen.getByText('Détail du projet')).not.toBeVisible();
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Détail du projet')).toBeVisible();
  });

  it('n’est pas interactive sans contenu', () => {
    render(<LabRow code="DATA" title="Plateforme de données" status="prototype" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
