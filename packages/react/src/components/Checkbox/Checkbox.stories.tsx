import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Formulaires/Checkbox',
  component: Checkbox,
  args: {
    label: (
      <>
        J’accepte que mes informations soient utilisées pour répondre à ma demande.{' '}
        <a href="#">Politique de confidentialité</a>.
      </>
    ),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Repos: Story = {};
export const Coche: Story = { name: 'Cochée', args: { defaultChecked: true } };
export const Erreur: Story = { args: { error: 'Consentement requis.' } };
