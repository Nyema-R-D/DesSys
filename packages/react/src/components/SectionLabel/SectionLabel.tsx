import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import './SectionLabel.css';

export interface SectionLabelProps extends HTMLAttributes<HTMLElement> {
  /** Index affiché avant le libellé : « 02 » → « 02 — Offres disponibles ». */
  index?: string | number;
  /** Affiche le carré-nœud latérite en puce. */
  node?: boolean;
  as?: 'div' | 'p' | 'span' | 'h2' | 'h3';
  children: ReactNode;
}

/** Label technique en mono majuscules, avec index et carré-nœud optionnels. */
export function SectionLabel({
  index,
  node = false,
  as: Tag = 'div',
  className,
  children,
  ...props
}: SectionLabelProps) {
  const prefix = index === undefined ? '' : `${String(index).padStart(2, '0')} — `;
  return (
    <Tag className={cx('ny-section-label', className)} {...props}>
      {node ? <span className="ny-section-label__node" aria-hidden="true" /> : null}
      <span>
        {prefix}
        {children}
      </span>
    </Tag>
  );
}
