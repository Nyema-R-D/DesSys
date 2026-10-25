import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('rend un <button type="button"> par défaut', () => {
    render(<Button>Envoyer</Button>);
    const button = screen.getByRole('button', { name: 'Envoyer' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('ny-button--primary');
  });

  it('rend un lien quand href est fourni', () => {
    render(
      <Button href="/contact" variant="secondary">
        Contact
      </Button>,
    );
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
  });

  it('neutralise un lien désactivé', async () => {
    const onClick = vi.fn();
    render(
      <Button href="/x" disabled onClick={onClick}>
        Indisponible
      </Button>,
    );
    const link = screen.getByText('Indisponible').closest('a')!;
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).not.toHaveAttribute('href');
    await userEvent.click(link);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('masque la flèche aux lecteurs d’écran', () => {
    render(<Button trailing="→">Parler d’un projet</Button>);
    expect(screen.getByRole('button', { name: 'Parler d’un projet' })).toBeInTheDocument();
  });
});
