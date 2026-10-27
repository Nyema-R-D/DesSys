import type { CSSProperties } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Skeleton.css';

export interface SkeletonProps {
  /** Largeur CSS (`100%` par défaut). */
  width?: string;
  /** Hauteur CSS (`1em` par défaut) ; ignorée avec `lines`. */
  height?: string;
  /** Nombre de lignes de texte simulées ; la dernière est plus courte. */
  lines?: number;
  className?: string;
}

/**
 * Emplacement de chargement, masqué aux lecteurs d'écran. Annoncez le chargement sur la zone
 * qui le contient (`aria-busy="true"`), comme le fait `DataTable`.
 */
export function Skeleton({ width, height, lines, className }: SkeletonProps) {
  const style = (vars: Record<string, string | undefined>) => {
    const defined = Object.entries(vars).filter(([, v]) => v !== undefined);
    return defined.length ? (Object.fromEntries(defined) as CSSProperties) : undefined;
  };
  if (lines && lines > 1) {
    return (
      <span
        className={cx('ny-skeleton-text', className)}
        style={style({ '--ny-skeleton-width': width })}
        aria-hidden="true"
      >
        {Array.from({ length: lines }, (_, index) => (
          <span key={index} className="ny-skeleton" />
        ))}
      </span>
    );
  }
  return (
    <span
      className={cx('ny-skeleton', className)}
      style={style({ '--ny-skeleton-width': width, '--ny-skeleton-height': height })}
      aria-hidden="true"
    />
  );
}
