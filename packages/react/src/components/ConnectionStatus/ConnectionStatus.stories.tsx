import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { ConnectionStatus, OfflineBanner } from './ConnectionStatus';

const meta = {
  title: 'Applications/ConnectionStatus',
  component: ConnectionStatus,
  args: { state: 'offline', pending: 3 },
} satisfies Meta<typeof ConnectionStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HorsLigne: Story = { name: 'Hors ligne' };

export const Etats: Story = {
  name: 'États',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['fr', 'bm'] as const).map((locale) => (
        <div key={locale} style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <ConnectionStatus locale={locale} state="online" detail="09:42" />
          <ConnectionStatus locale={locale} state="offline" pending={3} />
          <ConnectionStatus locale={locale} state="syncing" pending={3} />
          <ConnectionStatus locale={locale} state="conflict" pending={1} />
        </div>
      ))}
    </div>
  ),
};

export const Banniere: Story = {
  name: 'Bannière',
  parameters: { nyPadding: false },
  render: () => (
    <OfflineBanner
      action={
        <Button size="sm" variant="secondary">
          Réessayer
        </Button>
      }
    />
  ),
};
