import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import type { Locale } from '../StatusBadge/StatusBadge';
import './ConnectionStatus.css';

export type ConnectionState = 'online' | 'offline' | 'syncing' | 'conflict';

/** Libellés d'état réseau. Bamanankan : à faire valider par un locuteur natif. */
export const connectionLabels: Record<Locale, Record<ConnectionState, string>> = {
  fr: {
    online: 'Synchronisé',
    offline: 'Hors ligne',
    syncing: 'Synchronisation',
    conflict: 'Conflit',
  },
  bm: {
    online: 'A bɛ ɲɔgɔn fɛ',
    offline: 'Ɛntɛrinɛti tɛ',
    syncing: 'A bɛ ka ɲɔgɔn sɔrɔ',
    conflict: 'Bɛnbaliya',
  },
};

export interface ConnectionStatusProps extends HTMLAttributes<HTMLSpanElement> {
  state: ConnectionState;
  /** Nombre de modifications locales en attente d'envoi. */
  pending?: number;
  /** Détail libre, ex. « il y a 5 min ». */
  detail?: ReactNode;
  locale?: Locale;
}

/** Badge d'état réseau et de synchronisation, annoncé poliment aux lecteurs d'écran. */
export function ConnectionStatus({
  state,
  pending,
  detail,
  locale = 'fr',
  className,
  ...props
}: ConnectionStatusProps) {
  const pendingText =
    pending && pending > 0
      ? locale === 'fr'
        ? `${pending} en attente`
        : `${pending} bɛ makɔnɔni na`
      : null;
  return (
    <span
      role="status"
      className={cx('ny-connection', `ny-connection--${state}`, 'ny-mono-label', className)}
      {...props}
    >
      <span className="ny-connection__dot" aria-hidden="true" />
      {connectionLabels[locale][state]}
      {pendingText ? <span className="ny-connection__detail">· {pendingText}</span> : null}
      {detail != null ? <span className="ny-connection__detail">· {detail}</span> : null}
    </span>
  );
}

export interface OfflineBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  children?: ReactNode;
  /** Action optionnelle, ex. bouton « Réessayer ». */
  action?: ReactNode;
}

/** Bannière pleine largeur affichée hors connexion : rassure sur la conservation des saisies. */
export function OfflineBanner({
  title = 'Hors ligne',
  children = 'Vos saisies sont enregistrées sur l’appareil et seront synchronisées au retour du réseau.',
  action,
  className,
  ...props
}: OfflineBannerProps) {
  return (
    <div role="status" className={cx('ny-offline-banner', className)} {...props}>
      <strong className="ny-offline-banner__title ny-mono-label">{title}</strong>
      <span className="ny-offline-banner__text">{children}</span>
      {action}
    </div>
  );
}
