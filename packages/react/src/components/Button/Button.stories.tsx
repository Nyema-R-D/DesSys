import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Composants/Button',
  component: Button,
  args: { children: 'Parler d’un projet', trailing: '→' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'inverse', 'secondary', 'link'] },
    size: { control: 'inline-radio', options: ['md', 'lg'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primaire: Story = { args: { variant: 'primary' } };
export const Inverse: Story = { args: { variant: 'inverse', children: 'Envoyer' } };
export const Secondaire: Story = {
  args: { variant: 'secondary', children: 'Découvrir nos solutions', trailing: undefined },
};
export const Lien: Story = { args: { variant: 'link', children: 'Lire la note', href: '#' } };
export const Desactive: Story = {
  name: 'Désactivé',
  args: { disabled: true, children: 'Indisponible', trailing: undefined },
};

export const Ensemble: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
      <Button trailing="→">Parler d’un projet</Button>
      <Button variant="inverse" trailing="→">
        Envoyer
      </Button>
      <Button variant="secondary">Découvrir nos solutions</Button>
      <Button variant="link" href="#" trailing="→">
        Lire la note
      </Button>
      <Button disabled>Indisponible</Button>
    </div>
  ),
};
