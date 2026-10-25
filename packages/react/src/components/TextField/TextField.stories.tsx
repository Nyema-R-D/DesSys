import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Composants/TextField',
  component: TextField,
  args: { label: 'Organisation', placeholder: 'Nom de la structure' },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Repos: Story = {};
export const Erreur: Story = {
  args: {
    label: 'E-mail',
    required: true,
    defaultValue: 'awa@',
    error: 'Adresse e-mail invalide.',
  },
};
export const AvecAide: Story = {
  name: 'Avec aide',
  args: { label: 'Téléphone', hint: 'Format international : +223 …' },
};
export const Multiligne: Story = {
  args: { label: 'Message', multiline: true, placeholder: undefined },
};
