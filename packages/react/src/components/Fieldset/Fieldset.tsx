import {
  useId,
  type CSSProperties,
  type FieldsetHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/TextField.css';
import '@nyema-r-d/css/components/Form.css';

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend: ReactNode;
  description?: ReactNode;
  /** Erreur qui concerne le groupe entier (ex. « Renseignez au moins un contact »). */
  error?: ReactNode;
}

/** Section titrée d'un formulaire : regroupe des champs sous une légende annoncée. */
export function Fieldset({
  legend,
  description,
  error,
  className,
  id,
  children,
  ...props
}: FieldsetProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const descriptionId = description ? `${baseId}-description` : undefined;
  const errorId = error ? `${baseId}-error` : undefined;
  return (
    <fieldset
      id={id}
      className={cx('ny-fieldset', className)}
      aria-describedby={[descriptionId, errorId].filter(Boolean).join(' ') || undefined}
      {...props}
    >
      <legend className="ny-fieldset__legend">{legend}</legend>
      {description ? (
        <p id={descriptionId} className="ny-fieldset__description">
          {description}
        </p>
      ) : null}
      <div className="ny-fieldset__body">{children}</div>
      {error ? (
        <span id={errorId} className="ny-field__error" role="alert">
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}

export interface FormRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Nombre maximal de colonnes ; la ligne passe sur une colonne quand la place manque. */
  columns?: number;
}

/** Ligne de champs côte à côte, sans point de rupture : chaque champ garde 220 px minimum. */
export function FormRow({ columns, className, style, ...props }: FormRowProps) {
  return (
    <div
      className={cx('ny-form-row', className)}
      style={columns ? ({ ...style, '--ny-form-row-columns': columns } as CSSProperties) : style}
      {...props}
    />
  );
}

/** Barre d'actions en bas de formulaire, séparée par un filet. */
export function FormActions({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('ny-form-actions', className)} {...props} />;
}
