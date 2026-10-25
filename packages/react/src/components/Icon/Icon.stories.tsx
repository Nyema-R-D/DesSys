import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  ArrowUpRight,
  CloudOff,
  Database,
  RefreshCw,
  ShieldCheck,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { Icon } from './Icon';

const meta = {
  title: 'Fondations/Icon',
  component: Icon,
  args: { icon: WifiOff, size: 24 },
  argTypes: {
    icon: { control: false },
    size: { control: 'inline-radio', options: [16, 20, 24, 32] },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unique: Story = {};

export const Tailles: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {([16, 20, 24, 32] as const).map((size) => (
        <div key={size} style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <code style={{ width: 40 }}>{size}</code>
          {[Wifi, WifiOff, RefreshCw, CloudOff, Database, ShieldCheck, ArrowUpRight].map(
            (glyph, i) => (
              <Icon key={i} icon={glyph} size={size} />
            ),
          )}
        </div>
      ))}
    </div>
  ),
};
