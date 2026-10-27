import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('nomme la navigation et marque la page courante', () => {
    render(<Breadcrumb items={[{ label: 'Coopératives', href: '/c' }, { label: 'Ségou' }]} />);
    expect(screen.getByRole('navigation', { name: 'Fil d’Ariane' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Coopératives' })).toHaveAttribute('href', '/c');
    expect(screen.getByText('Ségou')).toHaveAttribute('aria-current', 'page');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});
