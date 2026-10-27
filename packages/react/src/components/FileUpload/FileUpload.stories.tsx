import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from './FileUpload';

const meta = {
  title: 'Composants/FileUpload',
  component: FileUpload,
  args: {
    label: 'Pièce justificative',
    hint: 'PDF ou image, 5 Mo maximum.',
    accept: 'application/pdf,image/*',
  },
} satisfies Meta<typeof FileUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Repos: Story = {};
export const Plusieurs: Story = {
  args: { label: 'Photos de la parcelle', hint: 'Jusqu’à 10 images.', multiple: true },
};
export const Erreur: Story = {
  args: { required: true, error: 'Le fichier dépasse 5 Mo.' },
};
export const Desactive: Story = { name: 'Désactivé', args: { disabled: true } };
