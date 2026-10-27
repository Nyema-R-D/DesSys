import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('est masqué aux lecteurs d’écran et dimensionné par variables CSS', () => {
    const { container } = render(<Skeleton width="50%" height="20px" />);
    const block = container.firstChild as HTMLElement;
    expect(block).toHaveAttribute('aria-hidden', 'true');
    expect(block.style.getPropertyValue('--ny-skeleton-width')).toBe('50%');
    expect(block.style.getPropertyValue('--ny-skeleton-height')).toBe('20px');
  });

  it('rend une ligne par élément de texte', () => {
    const { container } = render(<Skeleton lines={3} />);
    expect(container.querySelectorAll('.ny-skeleton')).toHaveLength(3);
    expect(container.firstChild).not.toHaveAttribute('style');
  });
});
