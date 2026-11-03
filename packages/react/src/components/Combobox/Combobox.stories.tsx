import type { Meta, StoryObj } from '@storybook/react-vite';
import { Combobox } from './Combobox';

const meta = {
  title: 'Composants/Combobox',
  component: Combobox,
  args: {
    label: 'Commune',
    placeholder: 'Rechercher une commune',
    hint: 'Tapez quelques lettres pour filtrer.',
    options: [
      { value: 'bamako', label: 'Bamako' },
      { value: 'kayes', label: 'Kayes' },
      { value: 'koulikoro', label: 'Koulikoro' },
      { value: 'mopti', label: 'Mopti' },
      { value: 'segou', label: 'Ségou' },
      { value: 'sikasso', label: 'Sikasso' },
      { value: 'tombouctou', label: 'Tombouctou', disabled: true },
    ],
  },
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = { name: 'Par défaut' };
export const Ouverte: Story = {
  args: { defaultValue: 'segou' },
  play: async ({ canvasElement }) => {
    canvasElement.querySelector<HTMLInputElement>('[role="combobox"]')?.click();
  },
};
export const Erreur: Story = { args: { required: true, error: 'Choisissez une commune.' } };
