import { render, screen } from '@testing-library/react';
import { Fieldset, FormActions, FormRow } from './Fieldset';

describe('Fieldset', () => {
  it('expose un groupe nommé par sa légende et décrit', () => {
    render(
      <Fieldset legend="Coopérative" description="Telle qu’enregistrée." error="Incomplet.">
        <input aria-label="Nom" />
      </Fieldset>,
    );
    const group = screen.getByRole('group', { name: 'Coopérative' });
    expect(group).toHaveAccessibleDescription('Telle qu’enregistrée. Incomplet.');
    expect(screen.getByRole('alert')).toHaveTextContent('Incomplet.');
  });

  it('FormRow transmet le nombre de colonnes en variable CSS', () => {
    const { container } = render(
      <FormRow columns={3}>
        <span />
      </FormRow>,
    );
    expect(
      (container.firstChild as HTMLElement).style.getPropertyValue('--ny-form-row-columns'),
    ).toBe('3');
  });

  it('FormActions accepte ses enfants', () => {
    render(
      <FormActions>
        <button type="submit">Envoyer</button>
      </FormActions>,
    );
    expect(screen.getByRole('button', { name: 'Envoyer' }).parentElement).toHaveClass(
      'ny-form-actions',
    );
  });
});
