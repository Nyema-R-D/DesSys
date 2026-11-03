import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container, Section } from './Layout';

const meta = {
  title: 'Composants/Layout',
  component: Section,
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
  args: {
    index: 1,
    label: 'Marque',
    children: 'Contenu de la section, aligné sur les trois quarts de la grille.',
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Defaut: Story = { name: 'Par défaut' };
export const Empilee: Story = { name: 'Empilée', args: { stacked: true } };
