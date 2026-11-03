import { useId, useState, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx, formatFileSize } from '../../utils';
import '@nyema-r-d/css/components/TextField.css';
import '@nyema-r-d/css/components/FileUpload.css';
import '@nyema-r-d/css/components/Progress.css';

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  /** Contraintes à annoncer : formats, taille maximale. */
  hint?: ReactNode;
  error?: ReactNode;
  /** Texte de la zone, suivi de `browseLabel`. */
  dropLabel?: ReactNode;
  browseLabel?: ReactNode;
  /** Fichiers choisis ou déposés. La validation (taille, type) revient au produit, via `error`. */
  onFilesChange?: (files: File[]) => void;
  formatSize?: (bytes: number) => string;
  /** Avancement de l'envoi d'un fichier, de 0 à 100 ; `undefined` : pas de barre. */
  getProgress?: (file: File) => number | undefined;
  /** Nom accessible de la barre : « Envoi de releve.pdf ». */
  progressLabel?: (file: File) => string;
}

/**
 * Champ fichier natif dans une zone de dépôt. Clic, clavier et glisser-déposer sont gérés
 * par le navigateur : le champ, transparent, couvre la zone.
 */
export function FileUpload({
  label,
  hint,
  error,
  dropLabel = 'Glissez un fichier ici ou',
  browseLabel = 'parcourez',
  onFilesChange,
  formatSize = formatFileSize,
  getProgress,
  progressLabel = (file) => `Envoi de ${file.name}`,
  className,
  id,
  required,
  onChange,
  ...props
}: FileUploadProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const chosen = [...(event.target.files ?? [])];
    setFiles(chosen);
    setDragging(false);
    onFilesChange?.(chosen);
    onChange?.(event);
  };

  return (
    <div className={cx('ny-field ny-file', className)}>
      <label className="ny-field__label" htmlFor={inputId}>
        {label}
        {required ? ' *' : null}
      </label>
      <div
        className="ny-file__zone"
        data-dragging={dragging ? '' : undefined}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDrop={() => setDragging(false)}
      >
        <input
          id={inputId}
          type="file"
          className="ny-file__input"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          onChange={handleChange}
          {...props}
        />
        <span className="ny-file__prompt" aria-hidden="true">
          {dropLabel} <span className="ny-file__browse">{browseLabel}</span>
        </span>
      </div>
      {hint ? (
        <span id={hintId} className="ny-field__hint">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="ny-field__error" role="alert">
          {error}
        </span>
      ) : null}
      {files.length ? (
        <ul className="ny-file__list">
          {files.map((file) => {
            const progress = getProgress?.(file);
            return (
              <li key={`${file.name}-${file.size}`} className="ny-file__item">
                <span className="ny-file__name">{file.name}</span>
                <span className="ny-file__size">{formatSize(file.size)}</span>
                {progress !== undefined ? (
                  <progress
                    className="ny-progress__bar ny-file__progress"
                    aria-label={progressLabel(file)}
                    max={100}
                    value={progress}
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
