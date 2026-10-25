import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { SiteHeader } from './SiteHeader';

const meta = {
  title: 'Structure/SiteHeader',
  component: SiteHeader,
  parameters: { nyPadding: false },
  args: {
    links: [
      { href: '#solutions', label: 'Solutions' },
      { href: '#laboratoire', label: 'Laboratoire', current: true },
      { href: '#industries', label: 'Industries' },
      { href: '#approche', label: 'Approche' },
      { href: '#ressources', label: 'Ressources' },
      { href: '#apropos', label: 'À propos' },
    ],
    actions: (
      <Button size="sm" variant="inverse" href="#contact" trailing="→">
        Parler d’un projet
      </Button>
    ),
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bureau: Story = {};
export const Mobile: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } };
