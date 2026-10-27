import { fireEvent, render, screen } from '@testing-library/react';
import { Accordion } from './Accordion';

const items = [
  { id: 'a', title: 'Première', content: 'Contenu A' },
  { id: 'b', title: 'Seconde', content: 'Contenu B' },
];

describe('Accordion', () => {
  it('ouvre les sections par défaut et bascule au clic', () => {
    const { container } = render(<Accordion items={items} defaultOpen={['a']} />);
    const [first, second] = container.querySelectorAll('details');
    expect(first).toHaveAttribute('open');
    expect(second).not.toHaveAttribute('open');
    fireEvent.click(screen.getByText('Seconde'));
    expect(second).toHaveAttribute('open');
  });

  it('partage un name en mode exclusif', () => {
    const { container } = render(<Accordion items={items} exclusive />);
    const names = [...container.querySelectorAll('details')].map((d) => d.getAttribute('name'));
    expect(names[0]).toBeTruthy();
    expect(names[0]).toBe(names[1]);
  });
});
