import { fireEvent, render, screen } from '@testing-library/react';
import { FileUpload } from './FileUpload';
import { formatFileSize } from '../../utils';

const pdf = new File(['x'.repeat(2048)], 'releve.pdf', { type: 'application/pdf' });

describe('FileUpload', () => {
  it('associe libellé, aide et erreur au champ fichier', () => {
    render(<FileUpload label="Justificatif" hint="PDF, 5 Mo max." error="Trop lourd." required />);
    const input = screen.getByLabelText('Justificatif *');
    expect(input).toHaveAttribute('type', 'file');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('PDF, 5 Mo max. Trop lourd.');
  });

  it('liste les fichiers choisis et les transmet', () => {
    const onFilesChange = vi.fn();
    render(<FileUpload label="Justificatif" onFilesChange={onFilesChange} />);
    fireEvent.change(screen.getByLabelText('Justificatif'), { target: { files: [pdf] } });
    expect(onFilesChange).toHaveBeenCalledWith([pdf]);
    expect(screen.getByRole('listitem')).toHaveTextContent('releve.pdf2 ko');
  });

  it('affiche l’avancement de l’envoi par fichier', () => {
    const pdf = new File(['x'], 'releve.pdf');
    const photo = new File(['y'], 'photo.jpg');
    render(
      <FileUpload
        label="Justificatif"
        multiple
        getProgress={(file) => (file.name === 'releve.pdf' ? 40 : undefined)}
      />,
    );
    fireEvent.change(screen.getByLabelText('Justificatif'), { target: { files: [pdf, photo] } });
    const bars = screen.getAllByRole('progressbar');
    expect(bars).toHaveLength(1);
    expect(bars[0]).toHaveAccessibleName('Envoi de releve.pdf');
    expect(bars[0]).toHaveAttribute('value', '40');
  });

  it('signale le survol pendant un glisser-déposer', () => {
    const { container } = render(<FileUpload label="Justificatif" />);
    const zone = container.querySelector('.ny-file__zone')!;
    fireEvent.dragEnter(zone);
    expect(zone).toHaveAttribute('data-dragging');
    fireEvent.dragLeave(zone);
    expect(zone).not.toHaveAttribute('data-dragging');
  });

  it('formate les tailles en ko et Mo', () => {
    expect(formatFileSize(10)).toBe('1 ko');
    expect(formatFileSize(1.5 * 1024 * 1024)).toBe('1,5 Mo');
  });
});
