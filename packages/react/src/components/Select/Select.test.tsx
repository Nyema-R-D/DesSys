import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';

describe('Select', () => {
  it('associe libellé, options et placeholder', async () => {
    render(
      <Select
        label="Région"
        placeholder="Choisir…"
        options={[
          { value: 'bko', label: 'Bamako' },
          { value: 'sgo', label: 'Ségou' },
        ]}
      />,
    );
    const select = screen.getByLabelText('Région');
    expect(screen.getAllByRole('option')).toHaveLength(3);
    await userEvent.selectOptions(select, 'sgo');
    expect(select).toHaveValue('sgo');
  });

  it('annonce l’erreur', () => {
    render(<Select label="Région" options={[]} required error="Choisissez une région." />);
    expect(screen.getByLabelText('Région *')).toHaveAccessibleDescription('Choisissez une région.');
  });
});
