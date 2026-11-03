import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { Alert } from './Alert';

const meta = {
  title: 'Composants/Alert',
  component: Alert,
  args: {
    title: 'Visite enregistrée sur cet appareil',
    children: 'Elle sera envoyée dès le retour de la connexion.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Succes: Story = {
  name: 'Succès',
  args: { tone: 'success', title: 'Synchronisation terminée', children: '12 visites envoyées.' },
};
export const Attention: Story = {
  args: {
    tone: 'warning',
    title: 'Conflit de synchronisation',
    children: 'La fiche a été modifiée ailleurs.',
    action: (
      <Button size="sm" variant="secondary">
        Comparer
      </Button>
    ),
  },
};
export const Erreur: Story = {
  args: {
    tone: 'error',
    title: 'Envoi impossible',
    children: 'Vérifiez les 2 champs signalés.',
    onDismiss: () => {},
  },
};
