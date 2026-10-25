import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo } from '../Logo/Logo';
import { Mark } from './Mark';

const meta = {
  title: 'Marque/Mark',
  component: Mark,
  args: { size: 88, tone: 'auto' },
  argTypes: { tone: { control: 'inline-radio', options: ['auto', 'on-laterite', 'mono'] } },
} satisfies Meta<typeof Mark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Symbole: Story = {};

export const Declinaisons: Story = {
  name: 'Déclinaisons',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
        gap: 16,
      }}
    >
      <div
        style={{
          background: 'var(--ny-laterite-500)',
          padding: 32,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Mark size={72} tone="on-laterite" />
      </div>
      <div
        style={{
          background: '#fff',
          color: '#000',
          padding: 32,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Mark size={72} tone="mono" />
      </div>
      <div
        style={{
          background: '#000',
          color: '#fff',
          padding: 32,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Mark size={72} tone="mono" />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: 18,
          padding: 32,
        }}
      >
        {[16, 24, 32, 48].map((size) => (
          <Mark key={size} size={size} />
        ))}
      </div>
    </div>
  ),
};

export const LogoComplet: Story = {
  name: 'Logo complet',
  render: () => <Logo size={88} />,
};
