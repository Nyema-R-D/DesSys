import { render, screen } from '@testing-library/react';
import { StatusBadge, statusLabels } from './StatusBadge';

describe('StatusBadge', () => {
  it.each(Object.entries(statusLabels.fr))('affiche le libellé français de %s', (status, label) => {
    render(<StatusBadge status={status as keyof typeof statusLabels.fr} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('accepte la locale bamanankan', () => {
    render(<StatusBadge status="research" locale="bm" />);
    expect(screen.getByText(statusLabels.bm.research)).toBeInTheDocument();
  });

  it('les deux locales couvrent les mêmes statuts', () => {
    expect(Object.keys(statusLabels.bm).sort()).toEqual(Object.keys(statusLabels.fr).sort());
  });
});
