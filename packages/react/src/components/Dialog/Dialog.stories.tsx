import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Dialog } from './Dialog';

function Demo({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Supprimer la visite
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Supprimer la visite ?"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Supprimer
            </Button>
          </>
        }
      >
        La visite du 12 octobre sera supprimée de l’appareil et du serveur. Cette action est
        définitive.
      </Dialog>
    </>
  );
}

const meta = {
  title: 'Applications/Dialog',
  component: Dialog,
  args: { open: false, onClose: () => {}, title: 'Supprimer la visite ?' },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ferme: Story = { name: 'Fermé', render: () => <Demo /> };
export const Ouvert: Story = { render: () => <Demo initiallyOpen /> };
