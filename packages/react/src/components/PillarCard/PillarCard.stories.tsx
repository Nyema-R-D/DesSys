import type { Meta, StoryObj } from '@storybook/react-vite';
import { PillarCard } from './PillarCard';

const meta = {
  title: 'Composants/PillarCard',
  component: PillarCard,
  args: {
    index: 2,
    title: 'Infrastructures numériques',
    description: 'Hébergement, sauvegarde, sécurité, synchronisation.',
  },
} satisfies Meta<typeof PillarCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = { name: 'Par défaut' };
export const Lien: Story = { args: { href: '#' } };
