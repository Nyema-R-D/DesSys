import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from './RadioGroup';

const options = [
  { value: 'dev', label: 'Développement' },
  { value: 'audit', label: 'Audit' },
];

describe('RadioGroup', () => {
  it('expose un groupe nommé par sa légende', () => {
    render(<RadioGroup legend="Type de besoin" options={options} />);
    expect(screen.getByRole('group', { name: 'Type de besoin' })).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
  });

  it('remonte la valeur choisie', async () => {
    const onChange = vi.fn();
    render(<RadioGroup legend="Besoin" options={options} defaultValue="dev" onChange={onChange} />);
    expect(screen.getByRole('radio', { name: 'Développement' })).toBeChecked();
    await userEvent.click(screen.getByRole('radio', { name: 'Audit' }));
    expect(onChange).toHaveBeenCalledWith('audit');
  });
});
