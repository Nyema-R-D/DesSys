import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import './StatusBadge.css';

export type ProductStatus = 'research' | 'prototype' | 'pilot' | 'available';
export type Locale = 'fr' | 'bm';

/** Libellés de statut. Bamanankan : à faire valider par un locuteur natif. */
export const statusLabels: Record<Locale, Record<ProductStatus, string>> = {
  fr: { research: 'Recherche', prototype: 'Prototype', pilot: 'Pilote', available: 'Disponible' },
  bm: { research: 'Ɲinini', prototype: 'Misali', pilot: 'Kɔrɔbɔli', available: 'A bɛ sɔrɔ' },
};

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Chaque produit porte un statut explicite. Ne jamais annoncer « disponible » un produit en idée. */
  status: ProductStatus;
  locale?: Locale;
  children?: ReactNode;
}

/** Badge de statut produit — seul endroit où les couleurs de statut sont autorisées. */
export function StatusBadge({
  status,
  locale = 'fr',
  children,
  className,
  ...props
}: StatusBadgeProps) {
  return (
    <span className={cx('ny-status-badge', `ny-status-badge--${status}`, className)} {...props}>
      <span className="ny-status-badge__dot" aria-hidden="true" />
      {children ?? statusLabels[locale][status]}
    </span>
  );
}
