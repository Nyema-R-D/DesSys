import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateField } from './DateField';

const meta = {
  title: 'Composants/DateField',
  component: DateField,
  args: { label: 'Date de la visite', defaultValue: '2026-11-04' },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Repos: Story = {};
export const Bornes: Story = {
  args: { label: 'Date de récolte', min: '2026-10-01', max: '2026-12-31', hint: 'Saison 2026.' },
};
export const Erreur: Story = {
  args: { required: true, defaultValue: '', error: 'Indiquez la date de la visite.' },
};
