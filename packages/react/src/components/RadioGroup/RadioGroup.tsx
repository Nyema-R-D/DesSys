import { useId, type ReactNode } from 'react';
import { cx } from '../../utils';
import '../Checkbox/Checkbox.css';
import '../TextField/TextField.css';
import './RadioGroup.css';

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  legend: ReactNode;
  options: RadioOption[];
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  error?: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

/** Groupe de boutons radio natifs dans un fieldset, légende en label mono. */
export function RadioGroup({
  legend,
  options,
  name,
  value,
  defaultValue,
  onChange,
  required,
  error,
  orientation = 'vertical',
  className,
}: RadioGroupProps) {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const errorId = error ? `${groupName}-error` : undefined;
  return (
    <fieldset
      className={cx(
        'ny-radio-group',
        orientation === 'horizontal' && 'ny-radio-group--horizontal',
        className,
      )}
      aria-describedby={errorId}
      aria-invalid={error ? true : undefined}
    >
      <legend className="ny-field__label ny-radio-group__legend">
        {legend}
        {required ? ' *' : null}
      </legend>
      <div className="ny-radio-group__options">
        {options.map((option) => (
          <label key={option.value} className="ny-radio">
            <input
              type="radio"
              className="ny-radio__input ny-focusable"
              name={groupName}
              value={option.value}
              disabled={option.disabled}
              required={required}
              {...(value !== undefined
                ? { checked: value === option.value }
                : { defaultChecked: defaultValue === option.value })}
              onChange={(event) => onChange?.(event.target.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error ? (
        <span id={errorId} className="ny-field__error" role="alert">
          {error}
        </span>
      ) : null}
    </fieldset>
  );
}
