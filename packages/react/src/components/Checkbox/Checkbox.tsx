import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: ReactNode;
}

/** Case à cocher native, accent latérite. Le libellé peut contenir un lien (ex. politique de confidentialité). */
export function Checkbox({ label, error, className, id, ...props }: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  return (
    <div className={cx('ny-checkbox', className)}>
      <label className="ny-checkbox__control" htmlFor={inputId}>
        <input
          id={inputId}
          type="checkbox"
          className="ny-checkbox__input ny-focusable"
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          {...props}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <span id={errorId} className="ny-field__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
