import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Composants/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Texte: Story = { args: { lines: 3, width: '420px' } };
export const Carte: Story = {
  render: () => (
    <div aria-busy="true" style={{ display: 'grid', gap: 16, maxWidth: 360 }}>
      <Skeleton height="180px" />
      <Skeleton width="40%" height="12px" />
      <Skeleton lines={2} />
    </div>
  ),
};
