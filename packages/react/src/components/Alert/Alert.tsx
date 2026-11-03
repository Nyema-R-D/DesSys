import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Alert.css';

export type AlertTone = 'info' | 'success' | 'warning' | 'error';

/** Libellés de ton par défaut, affichés en mono au-dessus du message. */
export const alertToneLabels: Record<AlertTone, string> = {
  info: 'Information',
  success: 'Succès',
  warning: 'Attention',
  error: 'Erreur',
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone;
  title?: ReactNode;
  /** Remplace le libellé de ton (ex. traduction). */
  toneLabel?: string;
  /** Action liée au message (ex. un Button). */
  action?: ReactNode;
  /** Affiche un bouton de fermeture. */
  onDismiss?: () => void;
  closeLabel?: string;
}

/**
 * Message persistant dans la page. Le ton est porté par un libellé mono et un filet coloré,
 * jamais par la couleur seule ; `error` est annoncé immédiatement (role="alert").
 */
export function Alert({
  tone = 'info',
  title,
  toneLabel,
  action,
  onDismiss,
  closeLabel = 'Fermer',
  className,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      className={cx('ny-alert', `ny-alert--${tone}`, className)}
      role={tone === 'error' ? 'alert' : 'status'}
      {...props}
    >
      <div className="ny-alert__body">
        <p className="ny-alert__tone">{toneLabel ?? alertToneLabels[tone]}</p>
        {title ? <p className="ny-alert__title">{title}</p> : null}
        {children ? <div className="ny-alert__content">{children}</div> : null}
        {action ? <div className="ny-alert__action">{action}</div> : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          className="ny-alert__close ny-focusable"
          aria-label={closeLabel}
          onClick={onDismiss}
        >
          <span aria-hidden="true">×</span>
        </button>
      ) : null}
    </div>
  );
}
