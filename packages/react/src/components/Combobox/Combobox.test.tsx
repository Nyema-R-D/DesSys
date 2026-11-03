import { fireEvent, render, screen } from '@testing-library/react';
import { Combobox } from './Combobox';

const options = [
  { value: 'bamako', label: 'Bamako' },
  { value: 'segou', label: 'Ségou' },
  { value: 'sikasso', label: 'Sikasso', disabled: true },
  { value: 'mopti', label: 'Mopti' },
];

describe('Combobox', () => {
  it('filtre à la saisie sans tenir compte de la casse ni des accents', () => {
    render(<Combobox label="Commune" options={options} />);
    const input = screen.getByRole('combobox', { name: 'Commune' });
    fireEvent.change(input, { target: { value: 'SEG' } });
    expect(input).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual(['Ségou']);
  });

  it('parcourt au clavier en sautant les options désactivées et choisit avec Entrée', () => {
    const onChange = vi.fn();
    render(<Combobox label="Commune" options={options} onChange={onChange} />);
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Bamako' }).id,
    );
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Mopti' }).id,
    );
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    expect(input).toHaveAttribute(
      'aria-activedescendant',
      screen.getByRole('option', { name: 'Ségou' }).id,
    );
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('segou');
    expect(input).toHaveValue('Ségou');
    expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  it('choisit au clic et marque l’option retenue', () => {
    render(<Combobox label="Commune" options={options} name="commune" />);
    const input = screen.getByRole('combobox');
    fireEvent.click(input);
    fireEvent.click(screen.getByRole('option', { name: 'Mopti' }));
    expect(input).toHaveValue('Mopti');
    fireEvent.click(input);
    expect(screen.getByRole('option', { name: 'Mopti' })).toHaveAttribute('aria-selected', 'true');
    expect(document.querySelector('input[type="hidden"]')).toHaveValue('mopti');
  });

  it('annonce l’absence de résultat', () => {
    render(<Combobox label="Commune" options={options} emptyMessage="Aucune commune" />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Kayes' } });
    expect(screen.getByRole('status')).toHaveTextContent('Aucune commune');
  });

  it('Échap ferme et rétablit le libellé ; vider le champ efface la valeur', () => {
    const onChange = vi.fn();
    render(
      <Combobox label="Commune" options={options} defaultValue="bamako" onChange={onChange} />,
    );
    const input = screen.getByRole('combobox');
    expect(input).toHaveValue('Bamako');
    fireEvent.change(input, { target: { value: 'Mo' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).toHaveValue('Bamako');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith(null);
    expect(input).toHaveValue('');
  });

  it('relie l’aide et l’erreur au champ', () => {
    render(<Combobox label="Commune" options={options} hint="Saisir 2 lettres" error="Requis." />);
    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Saisir 2 lettres Requis.');
  });
});
