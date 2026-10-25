import type { Meta, StoryObj } from '@storybook/react-vite';
import { LabRow } from './LabRow';

const meta = {
  title: 'Composants/LabRow',
  component: LabRow,
  args: {
    code: 'OFFLINE',
    title: 'Moteur de synchronisation hors ligne',
    status: 'research',
    children:
      'Un agent de terrain enregistre ses visites sans connexion ; l’application synchronise et signale les conflits au retour du réseau.',
  },
} satisfies Meta<typeof LabRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ferme: Story = { name: 'Fermé' };
export const Ouvert: Story = { args: { defaultOpen: true } };
export const Liste: Story = {
  render: () => (
    <div>
      <LabRow code="OFFLINE" title="Moteur de synchronisation hors ligne" status="research">
        Synchronisation différée et résolution de conflits.
      </LabRow>
      <LabRow code="TRUST" title="Signature et traçabilité des documents" status="prototype">
        Prototype interne.
      </LabRow>
      <LabRow code="DATA" title="Plateforme de données" status="pilot" />
    </div>
  ),
};
