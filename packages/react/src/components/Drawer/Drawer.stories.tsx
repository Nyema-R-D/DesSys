import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Drawer } from './Drawer';

const meta = {
  title: 'Composants/Drawer',
  component: Drawer,
  args: {
    open: true,
    onClose: () => {},
    title: 'Visite du 4 novembre',
    children: 'Coopérative de Ségou — 142 membres. Agent : A. Traoré.',
    footer: (
      <>
        <Button variant="secondary" size="sm">
          Annuler
        </Button>
        <Button size="sm">Enregistrer</Button>
      </>
    ),
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Droite: Story = {};
export const Gauche: Story = { args: { side: 'start', title: 'Filtres', footer: undefined } };
