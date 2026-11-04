import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
import { VideoFrame } from './VideoFrame';
import sample from './sample.webm?url';

// Affiche fixe : la capture visuelle ne dépend pas du décodage de la première image.
const poster = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 9"><rect width="16" height="9" fill="#2b2b2b"/><path d="M0 6l5-3 4 2 7-4v8H0z" fill="#3d3d3d"/></svg>',
)}`;

const meta = {
  title: 'Composants/VideoFrame',
  component: VideoFrame,
  args: {
    label: 'Extrait de l’événement, caméra Entrée nord',
    caption: 'Consultation enregistrée au journal.',
  },
  decorators: [(Story) => <div style={{ maxWidth: 640 }}>{Story()}</div>],
} satisfies Meta<typeof VideoFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lecture: Story = { args: { src: sample, poster } };
export const Chargement: Story = { args: { src: undefined } };

const download = (
  <Button size="sm" variant="secondary">
    Télécharger l’extrait
  </Button>
);

export const FormatNonLu: Story = {
  name: 'Format non lu',
  args: { failure: 'unsupported', action: download },
};
export const Erreur: Story = {
  args: { failure: 'error', errorMessage: 'L’extrait n’a pas pu être téléchargé.' },
};
