import { fireEvent, render, screen } from '@testing-library/react';
import { VideoFrame } from './VideoFrame';

const failWith = (video: HTMLElement, code: number) => {
  Object.defineProperty(video, 'error', { value: { code }, configurable: true });
  fireEvent.error(video);
};

describe('VideoFrame', () => {
  it('réserve le cadre et annonce le chargement tant que la source manque', () => {
    const { container } = render(<VideoFrame label="Extrait" aspectRatio="4 / 3" />);
    expect(screen.getByRole('status')).toHaveTextContent('Chargement de la vidéo');
    const surface = container.querySelector('.ny-video-frame__surface')!;
    expect(surface).toHaveAttribute('aria-busy', 'true');
    expect(surface).toHaveStyle({ '--ny-video-ratio': '4 / 3' });
    expect(container.querySelector('video')).toBeNull();
  });

  it('rend la vidéo native nommée, avec ses contrôles et la légende', () => {
    const { container } = render(
      <VideoFrame
        src="blob:clip"
        label="Extrait, caméra nord"
        caption="Consultation enregistrée."
      />,
    );
    const video = container.querySelector('video')!;
    expect(video).toHaveAttribute('controls');
    expect(video).toHaveAttribute('aria-label', 'Extrait, caméra nord');
    expect(screen.getByText('Consultation enregistrée.').tagName).toBe('FIGCAPTION');
  });

  it('format non lu : message, action et rappel, puis nouvelle source relue', () => {
    const onUnsupported = vi.fn();
    const { container, rerender } = render(
      <VideoFrame
        src="blob:h265"
        label="Extrait"
        onUnsupported={onUnsupported}
        action={<button type="button">Télécharger</button>}
      />,
    );
    failWith(container.querySelector('video')!, 4);
    expect(onUnsupported).toHaveBeenCalledOnce();
    expect(screen.getByText('Format non lu par ce navigateur')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Télécharger' })).toBeInTheDocument();
    expect(container.querySelector('video')).toBeNull();

    rerender(<VideoFrame src="blob:h264" label="Extrait" />);
    expect(container.querySelector('video')).toHaveAttribute('src', 'blob:h264');
  });

  it('autre erreur : alerte annoncée et code transmis', () => {
    const onError = vi.fn();
    const { container } = render(<VideoFrame src="blob:x" label="Extrait" onError={onError} />);
    failWith(container.querySelector('video')!, 2);
    expect(onError).toHaveBeenCalledWith(2);
    expect(screen.getByRole('alert')).toHaveTextContent('Lecture impossible');
  });

  it('échec signalé par l’application', () => {
    render(<VideoFrame label="Extrait" failure="error" errorMessage="Téléchargement refusé." />);
    expect(screen.getByRole('alert')).toHaveTextContent('Téléchargement refusé.');
  });
});
