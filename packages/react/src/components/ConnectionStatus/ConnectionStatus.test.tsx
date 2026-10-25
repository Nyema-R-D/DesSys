import { act, render, renderHook, screen } from '@testing-library/react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { ConnectionStatus, connectionLabels, OfflineBanner } from './ConnectionStatus';

describe('ConnectionStatus', () => {
  it('annonce l’état et les modifications en attente', () => {
    render(<ConnectionStatus state="offline" pending={3} />);
    expect(screen.getByRole('status')).toHaveTextContent('Hors ligne· 3 en attente');
  });

  it('couvre les mêmes états en français et en bamanankan', () => {
    expect(Object.keys(connectionLabels.bm).sort()).toEqual(
      Object.keys(connectionLabels.fr).sort(),
    );
  });

  it('bannière hors ligne avec message par défaut', () => {
    render(<OfflineBanner />);
    expect(screen.getByRole('status')).toHaveTextContent('synchronisées au retour du réseau');
  });
});

describe('useOnlineStatus', () => {
  it('suit les événements online / offline', () => {
    const onLine = vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    const { result } = renderHook(() => useOnlineStatus());
    expect(result.current).toBe(true);
    onLine.mockReturnValue(false);
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current).toBe(false);
    onLine.mockRestore();
  });
});
