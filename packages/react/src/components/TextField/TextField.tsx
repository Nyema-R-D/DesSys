import {
  useId,
  useState,
  type ChangeEvent,
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
  /** Affiche « n / maxLength » sous le champ (requiert `maxLength`). */
  showCount?: boolean;
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
  showCount,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const counted = showCount && props.maxLength !== undefined;
  const countId = counted ? `${inputId}-count` : undefined;
  const [typed, setTyped] = useState(String(props.defaultValue ?? '').length);
  const length = props.value !== undefined ? String(props.value).length : typed;
  const describedBy = [hintId, countId, errorId].filter(Boolean).join(' ') || undefined;
  const onChange = counted
    ? (event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        setTyped(event.target.value.length);
        props.onChange?.(event);
      }
    : props.onChange;
  const shared = {
    id: inputId,
    required,
    className: 'ny-field__input',
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  };
  const fieldProps = { ...omitMultiline(props), onChange };

  return (
    <div className={cx('ny-field', className)}>
      <label className="ny-field__label" htmlFor={inputId}>
        {label}
        {required ? ' *' : null}
      </label>
      {props.multiline ? (
        <textarea {...shared} {...(fieldProps as TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <input {...shared} {...(fieldProps as InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {hint ? (
        <span id={hintId} className="ny-field__hint">
          {hint}
        </span>
      ) : null}
      {countId ? (
        <span id={countId} className="ny-field__count">
          {length} / {props.maxLength}
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
