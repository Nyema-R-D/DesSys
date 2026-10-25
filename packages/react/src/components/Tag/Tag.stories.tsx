import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagList } from './Tag';

const meta = {
  title: 'Composants/Tag',
  component: TagList,
  args: {
    items: ['Entreprises', 'Administrations', 'Universités', 'Coopératives', 'Développeurs'],
  },
} satisfies Meta<typeof TagList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Liste: Story = {};
