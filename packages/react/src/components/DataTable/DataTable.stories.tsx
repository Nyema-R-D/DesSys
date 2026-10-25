import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from '../Pagination/Pagination';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import { DataTable, type DataTableColumn } from './DataTable';

interface Visit {
  id: string;
  date: string;
  cooperative: string;
  agent: string;
  members: number;
  synced: boolean;
}

const visits: Visit[] = [
  {
    id: 'V-0142',
    date: '2026-10-12',
    cooperative: 'Ségou — Riziculteurs',
    agent: 'A. Traoré',
    members: 142,
    synced: true,
  },
  {
    id: 'V-0143',
    date: '2026-10-14',
    cooperative: 'Sikasso — Maraîchers',
    agent: 'M. Diarra',
    members: 96,
    synced: false,
  },
  {
    id: 'V-0144',
    date: '2026-10-15',
    cooperative: 'Koutiala — Coton',
    agent: 'A. Traoré',
    members: 210,
    synced: true,
  },
  {
    id: 'V-0145',
    date: '2026-10-19',
    cooperative: 'Kayes — Éleveurs',
    agent: 'F. Coulibaly',
    members: 38,
    synced: false,
  },
  {
    id: 'V-0146',
    date: '2026-10-21',
    cooperative: 'Mopti — Pêcheurs',
    agent: 'M. Diarra',
    members: 64,
    synced: true,
  },
];

const columns: DataTableColumn<Visit>[] = [
  { key: 'id', header: 'Réf.', cell: (v) => <code>{v.id}</code>, width: '96px' },
  {
    key: 'date',
    header: 'Date',
    sortable: true,
    cell: (v) => new Date(v.date).toLocaleDateString('fr-FR'),
  },
  { key: 'cooperative', header: 'Coopérative', sortable: true },
  { key: 'agent', header: 'Agent', sortable: true },
  { key: 'members', header: 'Membres', sortable: true, align: 'end' },
  {
    key: 'synced',
    header: 'Synchro',
    cell: (v) => (
      <StatusBadge variant="plain" status={v.synced ? 'available' : 'prototype'}>
        {v.synced ? 'Envoyée' : 'En attente'}
      </StatusBadge>
    ),
  },
];

function Paginated() {
  const [page, setPage] = useState(1);
  return (
    <>
      <DataTable
        caption="Visites de terrain — octobre 2026"
        columns={columns}
        rows={visits}
        rowKey={(v) => v.id}
      />
      <Pagination page={page} pageCount={3} onPageChange={setPage} />
    </>
  );
}

const meta = {
  title: 'Applications/DataTable',
  component: DataTable,
  args: {
    caption: 'Visites de terrain — octobre 2026',
    columns: columns as DataTableColumn<unknown>[],
    rows: visits,
    rowKey: (v: unknown) => (v as Visit).id,
    defaultSort: { key: 'date', direction: 'descending' },
  },
} satisfies Meta<typeof DataTable<unknown>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = { name: 'Par défaut' };
export const Compact: Story = { args: { density: 'compact' } };
export const Vide: Story = { args: { rows: [], empty: 'Aucune visite enregistrée ce mois-ci.' } };
export const Chargement: Story = { args: { loading: true } };
export const AvecPagination: Story = { name: 'Avec pagination', render: () => <Paginated /> };
