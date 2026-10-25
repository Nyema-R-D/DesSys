import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitch } from './LanguageSwitch';

describe('LanguageSwitch', () => {
  it('mode bouton : état pressé et changement', async () => {
    const onChange = vi.fn();
    render(<LanguageSwitch value="fr" onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Français' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await userEvent.click(screen.getByRole('button', { name: 'Bamanankan' }));
    expect(onChange).toHaveBeenCalledWith('bm');
  });

  it('mode lien : hreflang et page courante', () => {
    render(<LanguageSwitch value="bm" getHref={(lang) => `/${lang}/`} />);
    const bm = screen.getByRole('link', { name: 'Bamanankan' });
    expect(bm).toHaveAttribute('href', '/bm/');
    expect(bm).toHaveAttribute('hreflang', 'bm');
    expect(bm).toHaveAttribute('aria-current', 'true');
  });
});
