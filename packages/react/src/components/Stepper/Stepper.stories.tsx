import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from './Stepper';

const meta = {
  title: 'Composants/Stepper',
  component: Stepper,
  args: {
    steps: [
      { id: 'cooperative', label: 'Coopérative' },
      { id: 'membres', label: 'Membres' },
      { id: 'parcelles', label: 'Parcelles' },
      { id: 'envoi', label: 'Vérification et envoi' },
    ],
    current: 'membres',
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = { name: 'Par défaut' };
export const DerniereEtape: Story = { name: 'Dernière étape', args: { current: 'envoi' } };
