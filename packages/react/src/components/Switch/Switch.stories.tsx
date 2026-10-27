import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Composants/Switch',
  component: Switch,
  args: { label: 'Synchronisation automatique' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Arret: Story = { name: 'Arrêt' };
export const Marche: Story = { args: { defaultChecked: true } };
export const AvecAide: Story = {
  name: 'Avec aide',
  args: {
    label: 'Mode hors ligne',
    hint: 'Les saisies sont gardées sur l’appareil et envoyées au retour du réseau.',
    defaultChecked: true,
  },
};
export const Desactive: Story = { name: 'Désactivé', args: { disabled: true } };
