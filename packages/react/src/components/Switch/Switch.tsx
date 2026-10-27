import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Switch.css';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'role'> {
  label: ReactNode;
  /** Précise l'effet du réglage (ex. « Synchronise dès que le réseau revient »). */
  hint?: ReactNode;
}

/** Interrupteur marche/arrêt : case native exposée en `role="switch"`, effet immédiat. */
export function Switch({ label, hint, className, id, ...props }: SwitchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  return (
    <div className={cx('ny-switch', className)}>
      <label className="ny-switch__control" htmlFor={inputId}>
        <input
          id={inputId}
          type="checkbox"
          role="switch"
          className="ny-switch__input ny-focusable"
          aria-describedby={hintId}
          {...props}
        />
        <span>{label}</span>
      </label>
      {hint ? (
        <span id={hintId} className="ny-switch__hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
