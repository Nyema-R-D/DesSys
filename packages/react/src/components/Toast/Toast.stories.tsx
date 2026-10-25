import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect } from 'react';
import { Button } from '../Button/Button';
import { ToastProvider, useToast } from './Toast';

function Demo({ preset = false }: { preset?: boolean }) {
  const toast = useToast();
  useEffect(() => {
    if (!preset) return;
    toast.show({
      title: 'Visite enregistrée.',
      description: 'Elle sera synchronisée au retour du réseau.',
      duration: 0,
    });
    toast.show({ title: 'Synchronisation terminée.', tone: 'success', duration: 0 });
    toast.show({
      title: 'Échec de l’envoi.',
      description: 'Le serveur ne répond pas.',
      tone: 'error',
      duration: 0,
    });
  }, [preset, toast]);
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => toast.show({ title: 'Visite enregistrée.' })}
      >
        Info
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => toast.show({ title: 'Synchronisé.', tone: 'success' })}
      >
        Succès
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() => toast.show({ title: 'Échec de l’envoi.', tone: 'error' })}
      >
        Erreur
      </Button>
    </div>
  );
}

const meta = {
  title: 'Applications/Toast',
  component: ToastProvider,
  args: { children: null },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Declencheurs: Story = {
  name: 'Déclencheurs',
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
export const Pile: Story = {
  render: () => (
    <ToastProvider>
      <Demo preset />
    </ToastProvider>
  ),
};
