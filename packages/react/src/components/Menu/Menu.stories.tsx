import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from './Menu';

const meta = {
  title: 'Composants/Menu',
  component: Menu,
  args: {
    label: 'Actions',
    items: [
      { id: 'modifier', label: 'Modifier la visite' },
      { id: 'dupliquer', label: 'Dupliquer' },
      { id: 'exporter', label: 'Exporter en PDF', disabled: true },
      { id: 'supprimer', label: 'Supprimer', tone: 'danger' },
    ],
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ferme: Story = { name: 'Fermé' };
export const Ouvert: Story = {
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLButtonElement>('[aria-haspopup]')?.click();
  },
};
