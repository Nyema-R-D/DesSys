import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { SignalGrid } from '../SignalGrid/SignalGrid';
import { Hero } from './Hero';

const meta = {
  title: 'Structure/Hero',
  component: Hero,
  decorators: [
    (Story) => (
      <div style={{ margin: -32 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    eyebrow: 'Logiciels · Plateformes · Recherche appliquée',
    aside: 'Mali → Afrique',
    title: 'Construire les infrastructures numériques utiles à l’Afrique.',
    lead: 'NYEMA conçoit des logiciels, des plateformes et des technologies adaptées aux réalités opérationnelles du Mali et des marchés africains.',
    actions: (
      <>
        <Button href="#contact" trailing="→">
          Parler d’un projet
        </Button>
        <Button href="#solutions" variant="secondary">
          Découvrir nos solutions
        </Button>
      </>
    ),
    media: <SignalGrid columns={16} rows={8} animated />,
    mediaLegend: ['Réseau', 'Hors ligne', 'Synchronisé'],
  },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Complet: Story = {};
export const SansVisuel: Story = {
  name: 'Sans visuel',
  args: { media: undefined, mediaLegend: undefined },
};
