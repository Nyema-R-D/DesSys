import { useId, type ReactNode, type SelectHTMLAttributes } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/TextField.css';
import '@nyema-r-d/css/components/Select.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: ReactNode;
  options: SelectOption[];
  /** Option vide affichée en premier (ex. « Choisir… »). */
  placeholder?: string;
  error?: ReactNode;
  hint?: ReactNode;
}

/** Liste déroulante native, mêmes dimensions et états que TextField. */
export function Select({
  label,
  options,
  placeholder,
  error,
  hint,
  className,
  id,
  required,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  return (
    <div className={cx('ny-field', className)}>
      <label className="ny-field__label" htmlFor={selectId}>
        {label}
        {required ? ' *' : null}
      </label>
      <select
        id={selectId}
        required={required}
        className="ny-field__input ny-select"
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
        {...props}
      >
        {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
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
