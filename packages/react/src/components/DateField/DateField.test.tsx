import { render, screen } from '@testing-library/react';
import { DateField } from './DateField';

describe('DateField', () => {
  it('rend un champ date natif borné', () => {
    render(<DateField label="Date de récolte" min="2026-10-01" max="2026-12-31" />);
    const input = screen.getByLabelText('Date de récolte');
    expect(input).toHaveAttribute('type', 'date');
    expect(input).toHaveAttribute('min', '2026-10-01');
    expect(input.closest('.ny-field')).toHaveClass('ny-field--date');
  });
});
