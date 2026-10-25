import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Chip, ChipGroup } from './Chip';

const meta = {
  title: 'Composants/Chip',
  component: Chip,
  args: { children: 'Développement' },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Selectionne: Story = { name: 'Sélectionné', args: { selected: true } };

function GroupeInteractif() {
  const options = ['Développement', 'Intégration', 'Audit'];
  const [value, setValue] = useState(options[0]);
  return (
    <ChipGroup aria-label="Type de besoin">
      {options.map((option) => (
        <Chip key={option} selected={value === option} onClick={() => setValue(option)}>
          {option}
        </Chip>
      ))}
    </ChipGroup>
  );
}

export const Groupe: Story = { render: () => <GroupeInteractif /> };
