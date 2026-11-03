import { fireEvent, render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('annonce une erreur immédiatement et affiche son ton en toutes lettres', () => {
    render(
      <Alert tone="error" title="Envoi impossible">
        Vérifiez les champs signalés.
      </Alert>,
    );
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent('Erreur');
    expect(alert).toHaveTextContent('Envoi impossible');
    expect(alert).toHaveClass('ny-alert--error');
  });

  it('utilise role="status" pour les autres tons et accepte un libellé personnalisé', () => {
    render(
      <Alert tone="warning" toneLabel="À vérifier">
        Synchronisation en attente.
      </Alert>,
    );
    expect(screen.getByRole('status')).toHaveTextContent('À vérifier');
  });

  it('affiche l’action et se ferme avec onDismiss', () => {
    const onDismiss = vi.fn();
    render(
      <Alert onDismiss={onDismiss} action={<button type="button">Réessayer</button>}>
        Données mises à jour.
      </Alert>,
    );
    expect(screen.getByRole('button', { name: 'Réessayer' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Fermer' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('sans onDismiss, n’affiche pas de bouton de fermeture', () => {
    render(<Alert>Info.</Alert>);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
