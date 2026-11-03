import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/TextField.css';
import '@nyema-r-d/css/components/Progress.css';

/** « 42 % » avec l'espace fine insécable du français. */
export const formatPercent = (value: number, max: number) =>
  `${Math.round((Math.min(Math.max(value, 0), max) / max) * 100)}\u202f%`;

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  /** Sans valeur : progression indéterminée. */
  value?: number;
  max?: number;
  /** Remplace le pourcentage affiché (ex. « 3 fichiers sur 5 »). */
  valueLabel?: ReactNode;
  hint?: ReactNode;
}

/** Barre de progression : `<progress>` natif nommé par son libellé, pourcentage en mono. */
export function Progress({
  label,
  value,
  max = 100,
  valueLabel,
  hint,
  className,
  ...props
}: ProgressProps) {
  const id = useId();
  const determinate = value !== undefined;
  return (
    <div className={cx('ny-progress', className)} {...props}>
      <div className="ny-progress__header">
        <span id={`${id}-label`} className="ny-progress__label">
          {label}
        </span>
        {determinate || valueLabel ? (
          <span className="ny-progress__value" aria-hidden="true">
            {valueLabel ?? formatPercent(value!, max)}
          </span>
        ) : null}
      </div>
      <progress
        className="ny-progress__bar"
        aria-labelledby={`${id}-label`}
        aria-describedby={hint ? `${id}-hint` : undefined}
        max={max}
        value={value}
      />
      {hint ? (
        <span id={`${id}-hint`} className="ny-field__hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  /** Texte lu par les lecteurs d'écran. */
  label?: string;
  size?: 'sm' | 'md';
}

/** Indicateur de chargement compact (boutons, cellules) ; figé si le mouvement est réduit. */
export function Spinner({ label = 'Chargement', size = 'md', className, ...props }: SpinnerProps) {
  return (
    <span className={cx('ny-spinner', `ny-spinner--${size}`, className)} role="status" {...props}>
      <span className="ny-spinner__mark" aria-hidden="true" />
      <span className="ny-visually-hidden">{label}</span>
    </span>
  );
}
