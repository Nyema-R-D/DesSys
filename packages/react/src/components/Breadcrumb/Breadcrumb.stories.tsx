import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Composants/Breadcrumb',
  component: Breadcrumb,
  args: {
    items: [
      { label: 'Coopératives', href: '#cooperatives' },
      { label: 'Ségou', href: '#segou' },
      { label: 'Visite du 4 novembre' },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Repos: Story = {};
