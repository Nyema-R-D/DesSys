import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioGroup } from './RadioGroup';

const meta = {
  title: 'Formulaires/RadioGroup',
  component: RadioGroup,
  args: {
    legend: 'Taille de l’organisation',
    defaultValue: 'pme',
    options: [
      { value: 'independant', label: 'Indépendant' },
      { value: 'pme', label: 'PME (moins de 250 personnes)' },
      { value: 'grande', label: 'Grande organisation' },
      { value: 'public', label: 'Administration' },
    ],
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};
export const Horizontal: Story = { args: { orientation: 'horizontal' } };
export const Erreur: Story = {
  args: { defaultValue: undefined, required: true, error: 'Choisissez une option.' },
};
