import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/TextField.css';

interface FieldOwnProps {
  label: ReactNode;
  /** Message d'erreur ; rend le champ invalide et l'annonce aux lecteurs d'écran. */
  error?: ReactNode;
  hint?: ReactNode;
}

export type TextFieldProps = FieldOwnProps &
  (
    | ({ multiline?: false } & InputHTMLAttributes<HTMLInputElement>)
    | ({ multiline: true } & TextareaHTMLAttributes<HTMLTextAreaElement>)
  );

/** Champ de saisie avec libellé mono, état focus latérite et message d'erreur. */
export function TextField({
  label,
  error,
  hint,
  className,
  id,
  required,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  const shared = {
    id: inputId,
    required,
    className: 'ny-field__input',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  };

  return (
    <div className={cx('ny-field', className)}>
      <label className="ny-field__label" htmlFor={inputId}>
        {label}
        {required ? ' *' : null}
      </label>
      {props.multiline ? (
        <textarea {...shared} {...omitMultiline(props)} />
      ) : (
        <input {...shared} {...omitMultiline(props)} />
      )}
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
    </div>
  );
}

function omitMultiline<T extends { multiline?: boolean }>({ multiline: _multiline, ...rest }: T) {
  return rest;
}
