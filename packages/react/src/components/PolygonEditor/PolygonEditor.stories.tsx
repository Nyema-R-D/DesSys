import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { PolygonEditor, type PolygonEditorProps, type PolygonPoint } from './PolygonEditor';
import frame from './sample-frame.jpg?url';

const quai: PolygonPoint[] = [
  [0.12, 0.55],
  [0.46, 0.42],
  [0.62, 0.78],
  [0.2, 0.92],
];
const entree: PolygonPoint[] = [
  [0.6, 0.1],
  [0.9, 0.1],
  [0.9, 0.4],
  [0.6, 0.4],
];

const meta = {
  title: 'Composants/PolygonEditor',
  component: PolygonEditor,
  args: { label: 'Zone Quai de chargement', polygon: quai, onChange: () => {} },
  decorators: [(Story) => <div style={{ maxWidth: 720 }}>{Story()}</div>],
  render: function Render(args: PolygonEditorProps) {
    const [polygon, setPolygon] = useState(args.polygon);
    return <PolygonEditor {...args} polygon={polygon} onChange={setPolygon} />;
  },
} satisfies Meta<typeof PolygonEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SurImage: Story = {
  name: 'Sur une image',
  args: {
    image: { src: frame, width: 640, height: 360 },
    others: [{ id: 'entree', polygon: entree }],
    caption: 'Capture de la caméra Quai nord, 4 novembre à 14 h 08.',
  },
};
export const SansImage: Story = {
  name: 'Sans image, incomplète',
  args: { polygon: quai.slice(0, 2), caption: 'Pas de capture : zone dessinée sur une grille.' },
};
export const Vide: Story = { args: { polygon: [] } };
export const Desactive: Story = {
  name: 'Désactivé',
  args: { disabled: true, image: { src: frame, width: 640, height: 360 } },
};
