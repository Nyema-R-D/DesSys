import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Composants/Tooltip',
  component: Tooltip,
  args: {
    content: 'Envoyée au retour du réseau.',
    children: (
      <Button variant="secondary" size="sm">
        3 visites en attente
      </Button>
    ),
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Repos: Story = {};
export const Ouverte: Story = {
  args: { placement: 'bottom' },
  play: async ({ canvasElement }) => {
    canvasElement.querySelector('button')?.focus();
  },
};
