import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from './Toast';

function Trigger({ tone }: { tone?: 'success' | 'error' }) {
  const toast = useToast();
  return (
    <button type="button" onClick={() => toast.show({ title: 'Visite enregistrée.', tone })}>
      Enregistrer
    </button>
  );
}

describe('Toast', () => {
  it('annonce la notification puis la retire après le délai', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    render(
      <ToastProvider>
        <Trigger tone="success" />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
    expect(screen.getByRole('status')).toHaveTextContent('Visite enregistrée.');
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.queryByText('Visite enregistrée.')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('une erreur est une alerte et se ferme à la main', async () => {
    render(
      <ToastProvider>
        <Trigger tone="error" />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Enregistrer' }));
    expect(screen.getByRole('alert')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Fermer' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('exige un ToastProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Trigger />)).toThrow('ToastProvider');
  });
});
