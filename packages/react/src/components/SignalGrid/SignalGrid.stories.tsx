import type { Meta, StoryObj } from '@storybook/react-vite';
import { SignalGrid } from './SignalGrid';

const meta = {
  title: 'Fondations/SignalGrid',
  component: SignalGrid,
  args: { columns: 16, rows: 4 },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 520 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SignalGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Statique: Story = {};
export const Animee: Story = { name: 'Animée (hero)', args: { animated: true } };
