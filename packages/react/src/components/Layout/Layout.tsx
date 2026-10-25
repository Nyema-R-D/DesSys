import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import { SectionLabel } from '../SectionLabel/SectionLabel';
import './Layout.css';

/** Conteneur 1360 px, gouttière fluide 20–56 px. */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('ny-container', className)} {...props} />;
}

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  /** Index de section (« 01 »). */
  index?: string | number;
  /** Libellé de la colonne d'index. */
  label?: ReactNode;
  /** Empile index et contenu au lieu de la grille 1/4 + 3/4. */
  stacked?: boolean;
}

/** Section : colonne d'index (1/4) + contenu (3/4), repliée en une colonne sous 900 px. */
export function Section({
  index,
  label,
  stacked = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cx('ny-section', stacked && 'ny-section--stacked', className)} {...props}>
      {label != null ? (
        <SectionLabel as="h2" index={index} className="ny-section__index">
          {label}
        </SectionLabel>
      ) : null}
      <div className="ny-section__content">{children}</div>
    </section>
  );
}
