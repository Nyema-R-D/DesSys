import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '../Pagination/Pagination';
import { DataTable, type DataTableColumn } from './DataTable';

interface Visit {
  id: string;
  cooperative: string;
  members: number;
}

const rows: Visit[] = [
  { id: '1', cooperative: 'Ségou', members: 142 },
  { id: '2', cooperative: 'Bamako', members: 38 },
  { id: '3', cooperative: 'Sikasso', members: 96 },
];
const columns: DataTableColumn<Visit>[] = [
  { key: 'cooperative', header: 'Coopérative', sortable: true },
  { key: 'members', header: 'Membres', sortable: true, align: 'end' },
];

const firstColumn = () =>
  screen
    .getAllByRole('row')
    .slice(1)
    .map((row) => within(row).getAllByRole('cell')[0]!.textContent);

describe('DataTable', () => {
  it('nomme le tableau et sa zone de défilement par la légende', () => {
    render(<DataTable caption="Visites" columns={columns} rows={rows} rowKey={(r) => r.id} />);
    expect(screen.getByRole('table', { name: 'Visites' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Visites' })).toBeInTheDocument();
  });

  it('trie au clic et expose aria-sort', async () => {
    render(<DataTable caption="Visites" columns={columns} rows={rows} rowKey={(r) => r.id} />);
    const header = screen.getByRole('columnheader', { name: /Membres/ });
    expect(header).toHaveAttribute('aria-sort', 'none');
    await userEvent.click(within(header).getByRole('button'));
    expect(header).toHaveAttribute('aria-sort', 'ascending');
    await userEvent.click(within(header).getByRole('button'));
    expect(header).toHaveAttribute('aria-sort', 'descending');
    expect(firstColumn()).toEqual(['Ségou', 'Sikasso', 'Bamako']);
  });

  it('trie le texte selon les règles du français', async () => {
    render(
      <DataTable
        caption="Visites"
        columns={columns}
        rows={rows}
        rowKey={(r) => r.id}
        defaultSort={{ key: 'cooperative', direction: 'ascending' }}
      />,
    );
    expect(firstColumn()).toEqual(['Bamako', 'Ségou', 'Sikasso']);
  });

  it('affiche les états vide et chargement', () => {
    const { rerender } = render(
      <DataTable
        caption="Visites"
        columns={columns}
        rows={[]}
        rowKey={(r) => r.id}
        empty="Aucune visite."
      />,
    );
    expect(screen.getByText('Aucune visite.')).toBeInTheDocument();
    rerender(
      <DataTable caption="Visites" columns={columns} rows={[]} rowKey={(r) => r.id} loading />,
    );
    expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');
  });

  it('en mode manuel, laisse l’ordre au serveur', async () => {
    const onSortChange = vi.fn();
    render(
      <DataTable
        caption="Visites"
        columns={columns}
        rows={rows}
        rowKey={(r) => r.id}
        sortMode="manual"
        onSortChange={onSortChange}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /Coopérative/ }));
    expect(onSortChange).toHaveBeenCalledWith({ key: 'cooperative', direction: 'ascending' });
    expect(firstColumn()).toEqual(['Ségou', 'Bamako', 'Sikasso']);
  });
});

describe('Pagination', () => {
  it('désactive les bornes et remonte la page', async () => {
    const onPageChange = vi.fn();
    render(<Pagination page={1} pageCount={4} onPageChange={onPageChange} />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toHaveTextContent(
      'Page 1 sur 4',
    );
    expect(screen.getByRole('button', { name: '← Précédent' })).toBeDisabled();
    await userEvent.click(screen.getByRole('button', { name: 'Suivant →' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('ne s’affiche pas pour une seule page', () => {
    const { container } = render(<Pagination page={1} pageCount={1} onPageChange={() => {}} />);
    expect(container).toBeEmptyDOMElement();
  });
});
