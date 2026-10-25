import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from './StatusBadge';

const meta = {
  title: 'Composants/StatusBadge',
  component: StatusBadge,
  args: { status: 'research' },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Recherche: Story = {};
export const Tous: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['fr', 'bm'] as const).map((locale) => (
        <div key={locale} style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {(['research', 'prototype', 'pilot', 'available'] as const).map((status) => (
            <StatusBadge key={status} {...args} status={status} locale={locale} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const SansCadre: Story = {
  name: 'Sans cadre (légende)',
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
      {(['research', 'prototype', 'pilot', 'available'] as const).map((status) => (
        <StatusBadge key={status} {...args} status={status} variant="plain" />
      ))}
    </div>
  ),
};
