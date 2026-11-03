import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Stepper.css';

export interface StepperStep {
  id: string;
  label: ReactNode;
}

export interface StepperProps extends HTMLAttributes<HTMLElement> {
  steps: StepperStep[];
  /** Identifiant de l'étape en cours ; les précédentes sont faites. */
  current: string;
  /** Nom de la navigation. */
  label?: string;
  /** Mention lue après une étape faite. */
  doneLabel?: string;
}

/**
 * Étapes d'un formulaire long : index mono « 01 », étape courante en latérite
 * (`aria-current="step"`), étapes faites annoncées ; en colonne sur mobile.
 */
export function Stepper({
  steps,
  current,
  label = 'Étapes',
  doneLabel = 'terminée',
  className,
  ...props
}: StepperProps) {
  const position = steps.findIndex((step) => step.id === current);
  return (
    <nav aria-label={label} className={cx('ny-stepper', className)} {...props}>
      <ol className="ny-stepper__list">
        {steps.map((step, index) => {
          const state = index < position ? 'done' : index === position ? 'current' : 'upcoming';
          return (
            <li
              key={step.id}
              className={`ny-stepper__step ny-stepper__step--${state}`}
              aria-current={state === 'current' ? 'step' : undefined}
            >
              <span className="ny-stepper__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="ny-stepper__label">
                {step.label}
                {state === 'done' ? (
                  <span className="ny-visually-hidden"> ({doneLabel})</span>
                ) : null}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
