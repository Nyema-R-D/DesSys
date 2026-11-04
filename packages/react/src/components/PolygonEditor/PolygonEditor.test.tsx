import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { PolygonEditor, type PolygonPoint } from './PolygonEditor';

const triangle: PolygonPoint[] = [
  [0.1, 0.1],
  [0.5, 0.1],
  [0.3, 0.5],
];

function Controlled({ initial = triangle, max }: { initial?: PolygonPoint[]; max?: number }) {
  const [polygon, setPolygon] = useState(initial);
  return (
    <>
      <PolygonEditor label="Zone Quai" polygon={polygon} onChange={setPolygon} max={max} />
      <pre data-testid="value">{JSON.stringify(polygon)}</pre>
    </>
  );
}
const value = () => JSON.parse(screen.getByTestId('value').textContent!) as PolygonPoint[];

/** Surface de 200 × 100 px à l'origine, pour convertir les coordonnées du pointeur. */
const sizeSurface = () => {
  const surface = screen.getByRole('group', { name: 'Zone Quai' });
  surface.getBoundingClientRect = () =>
    ({ left: 0, top: 0, width: 200, height: 100, right: 200, bottom: 100 }) as DOMRect;
  return surface;
};

describe('PolygonEditor', () => {
  it('nomme la surface, relie le mode d’emploi et nomme chaque point en %', () => {
    render(<Controlled />);
    const surface = screen.getByRole('group', { name: 'Zone Quai' });
    expect(surface).toHaveAccessibleDescription(/Cliquez pour ajouter un point/);
    expect(
      screen.getByRole('button', {
        name: 'Point 2 : 50 % depuis la gauche, 10 % depuis le haut',
      }),
    ).toBeInTheDocument();
    expect(surface.querySelector('polygon.ny-polygon-editor__shape')).toHaveAttribute(
      'points',
      '0.1,0.1 0.5,0.1 0.3,0.5',
    );
  });

  it('ajoute un point au clic et le déplace en glissant', () => {
    render(<Controlled />);
    const surface = sizeSurface();
    fireEvent.pointerDown(surface, { clientX: 150, clientY: 75, button: 0 });
    expect(value()).toHaveLength(4);
    expect(value()[3]).toEqual([0.75, 0.75]);

    const point = screen.getByRole('button', { name: /^Point 1 :/ });
    fireEvent.pointerDown(point, { clientX: 20, clientY: 10, button: 0 });
    fireEvent.pointerMove(surface, { clientX: 40, clientY: 20 });
    fireEvent.pointerUp(surface);
    fireEvent.pointerMove(surface, { clientX: 100, clientY: 100 });
    expect(value()[0]).toEqual([0.2, 0.2]);
    expect(value()).toHaveLength(4);
  });

  it('au clavier : flèches (Maj plus vite), Entrée insère, Suppr retire', async () => {
    render(<Controlled />);
    await userEvent.tab();
    expect(screen.getByRole('button', { name: /^Point 1 :/ })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(value()[0]).toEqual([0.105, 0.1]);
    await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');
    expect(value()[0]).toEqual([0.105, 0.15]);

    await userEvent.keyboard('{Enter}');
    expect(value()).toHaveLength(4);
    expect(value()[1]).toEqual([0.3025, 0.125]);
    expect(screen.getByRole('button', { name: /^Point 2 :/ })).toHaveFocus();

    await userEvent.keyboard('{Delete}');
    expect(value()).toHaveLength(3);
    expect(screen.getByRole('button', { name: /^Point 1 :/ })).toHaveFocus();
  });

  it('borne les coordonnées à [0, 1]', async () => {
    render(<Controlled initial={[[0, 0]]} />);
    await userEvent.tab();
    await userEvent.keyboard('{ArrowLeft}{ArrowUp}');
    expect(value()).toEqual([[0, 0]]);
  });

  it('annonce une zone incomplète, puis le maximum atteint (plus d’ajout)', () => {
    const { unmount } = render(<Controlled initial={triangle.slice(0, 2)} />);
    expect(screen.getByRole('status')).toHaveTextContent(
      'Zone incomplète : au moins 3 points, 2 placés.',
    );
    unmount();

    render(<Controlled max={3} />);
    expect(screen.getByRole('status')).toHaveTextContent('Nombre maximal de points atteint (3).');
    fireEvent.pointerDown(sizeSurface(), { clientX: 10, clientY: 10, button: 0 });
    expect(value()).toHaveLength(3);
  });

  it('surface vide : focalisable, Entrée place un point au centre', async () => {
    render(<Controlled initial={[]} />);
    await userEvent.tab();
    expect(screen.getByRole('group', { name: 'Zone Quai' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(value()).toEqual([[0.5, 0.5]]);
    expect(screen.getByRole('button', { name: /^Point 1 :/ })).toHaveFocus();
    await userEvent.keyboard('{Delete}');
    expect(screen.getByRole('group', { name: 'Zone Quai' })).toHaveFocus();
  });

  it('désactivé : ni ajout ni point focalisable', () => {
    const onChange = vi.fn();
    render(<PolygonEditor label="Zone Quai" polygon={triangle} onChange={onChange} disabled />);
    fireEvent.pointerDown(sizeSurface(), { clientX: 10, clientY: 10, button: 0 });
    expect(onChange).not.toHaveBeenCalled();
    screen.getAllByRole('button').forEach((point) => expect(point).toBeDisabled());
  });

  it('affiche l’image au format réel et les autres zones', () => {
    const { container } = render(
      <PolygonEditor
        label="Zone Quai"
        polygon={triangle}
        onChange={() => {}}
        image={{ src: '/frame.jpg', width: 1280, height: 720 }}
        others={[{ id: 'entree', polygon: triangle }]}
      />,
    );
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
    expect(sizeSurface()).toHaveStyle({ '--ny-polygon-ratio': '1280 / 720' });
    expect(container.querySelectorAll('.ny-polygon-editor__other')).toHaveLength(1);
  });
});
