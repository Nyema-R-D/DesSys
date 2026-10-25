import { render, screen } from '@testing-library/react';
import { WifiOff } from 'lucide-react';
import { Icon } from './Icon';

describe('Icon', () => {
  it('est décorative par défaut, trait 1,5 px', () => {
    const { container } = render(<Icon icon={WifiOff} />);
    const svg = container.querySelector('svg')!;
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveClass('ny-icon');
  });

  it('expose un nom accessible avec label', () => {
    render(<Icon icon={WifiOff} label="Hors ligne" size={24} />);
    expect(screen.getByRole('img', { name: 'Hors ligne' })).toHaveAttribute('width', '24');
  });
});
