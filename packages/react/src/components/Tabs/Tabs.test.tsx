import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const items = [
  { id: 'resume', label: 'Résumé', content: 'Contenu résumé' },
  { id: 'visites', label: 'Visites', content: 'Contenu visites' },
  { id: 'archives', label: 'Archives', content: 'Contenu archives', disabled: true },
  { id: 'reglages', label: 'Réglages', content: 'Contenu réglages' },
];

describe('Tabs', () => {
  it('relie onglets et panneaux et n’affiche que le panneau actif', () => {
    render(<Tabs label="Dossier" items={items} />);
    expect(screen.getByRole('tablist', { name: 'Dossier' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Résumé' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Résumé' })).toHaveTextContent('Contenu résumé');
    expect(screen.getByText('Contenu visites')).not.toBeVisible();
  });

  it('navigue au clavier en sautant les onglets désactivés', async () => {
    render(<Tabs label="Dossier" items={items} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Visites' }));
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Réglages' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Réglages' })).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Résumé' })).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Réglages' })).toHaveFocus();
  });
});
