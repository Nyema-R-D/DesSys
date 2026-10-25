import { render, screen } from '@testing-library/react';
import { Logo } from '../Logo/Logo';
import { Mark } from './Mark';

describe('Mark & Logo', () => {
  it('impose la taille minimale de 16 px', () => {
    const { container } = render(<Mark size={8} />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '16');
  });

  it('est décoratif sans titre, accessible avec', () => {
    const { container, rerender } = render(<Mark />);
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    rerender(<Mark title="NYEMA" />);
    expect(screen.getByRole('img', { name: 'NYEMA' })).toBeInTheDocument();
  });

  it('colore le nœud en papier sur latérite', () => {
    const { container } = render(<Mark tone="on-laterite" />);
    expect(container.querySelector('[data-part="node"]')).toHaveAttribute(
      'fill',
      'var(--ny-paper-100)',
    );
  });

  it('le logo complet s’annonce « NYEMA »', () => {
    render(<Logo />);
    expect(screen.getByRole('img', { name: 'NYEMA' })).toBeInTheDocument();
  });
});
