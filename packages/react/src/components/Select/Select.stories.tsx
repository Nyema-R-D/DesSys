import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const meta = {
  title: 'Formulaires/Select',
  component: Select,
  args: {
    label: 'Région',
    placeholder: 'Choisir…',
    options: [
      { value: 'bamako', label: 'Bamako' },
      { value: 'kayes', label: 'Kayes' },
      { value: 'koulikoro', label: 'Koulikoro' },
      { value: 'sikasso', label: 'Sikasso' },
      { value: 'segou', label: 'Ségou' },
      { value: 'mopti', label: 'Mopti' },
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Repos: Story = {};
export const Erreur: Story = { args: { required: true, error: 'Choisissez une région.' } };
export const Desactive: Story = { name: 'Désactivé', args: { disabled: true } };
