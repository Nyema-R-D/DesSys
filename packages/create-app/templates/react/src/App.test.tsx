import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('affiche le titre et l’état du réseau', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('%%TITLE%%');
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
