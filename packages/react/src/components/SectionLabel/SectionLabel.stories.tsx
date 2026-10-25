import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionLabel } from './SectionLabel';

const meta = {
  title: 'Fondations/SectionLabel',
  component: SectionLabel,
  args: { index: 2, children: 'Offres disponibles', node: true },
} satisfies Meta<typeof SectionLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AvecNoeud: Story = { name: 'Avec nœud' };
export const Index: Story = { args: { node: false, index: 1, children: 'Marque' } };
