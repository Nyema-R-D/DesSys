import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const meta = {
  title: 'Composants/Accordion',
  component: Accordion,
  args: {
    items: [
      {
        id: 'hors-ligne',
        title: 'Puis-je saisir une visite sans réseau ?',
        content: 'Oui. La visite reste sur le téléphone et part au retour du réseau.',
      },
      {
        id: 'donnees',
        title: 'Où sont gardées les données ?',
        content: 'Sur des serveurs situés en Afrique de l’Ouest, chiffrées.',
      },
      {
        id: 'langues',
        title: 'Quelles langues sont disponibles ?',
        content: 'Français et bamanankan.',
      },
    ],
    defaultOpen: ['hors-ligne'],
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Repos: Story = {};
export const Exclusif: Story = { args: { exclusive: true } };
