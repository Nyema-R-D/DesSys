import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress, Spinner } from './Progress';

const meta = {
  title: 'Composants/Progress',
  component: Progress,
  args: { label: 'Synchronisation', value: 64, hint: '12 visites sur cet appareil.' },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Determinee: Story = { name: 'Déterminée' };
export const Indeterminee: Story = {
  name: 'Indéterminée',
  args: { value: undefined, label: 'Préparation de l’envoi' },
};
export const LibelleDeValeur: Story = {
  name: 'Libellé de valeur',
  args: { label: 'Envoi', value: 3, max: 5, valueLabel: '3 fichiers sur 5' },
};
export const Indicateur: Story = {
  name: 'Spinner',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner />
    </div>
  ),
};
