import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta = {
  title: 'Applications/Tabs',
  component: Tabs,
  args: {
    label: 'Fiche coopérative',
    items: [
      {
        id: 'resume',
        label: 'Résumé',
        content: 'Coopérative de Ségou · 142 membres · dernière visite le 12 octobre.',
      },
      {
        id: 'visites',
        label: 'Visites',
        content: '8 visites enregistrées, dont 2 en attente de synchronisation.',
      },
      { id: 'documents', label: 'Documents', content: 'Aucun document.' },
      { id: 'archives', label: 'Archives', content: '—', disabled: true },
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = { name: 'Par défaut' };
