import type { ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Breadcrumb.css';

export interface BreadcrumbItem {
  label: ReactNode;
  /** Absent sur la page courante (dernier élément). */
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Nom de la navigation. */
  label?: string;
  className?: string;
}

/** Fil d'Ariane : le dernier élément est la page courante (`aria-current="page"`). */
export function Breadcrumb({ items, label = 'Fil d’Ariane', className }: BreadcrumbProps) {
  return (
    <nav className={cx('ny-breadcrumb', className)} aria-label={label}>
      <ol className="ny-breadcrumb__list">
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={index} className="ny-breadcrumb__item">
              {last ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <>
                  <a className="ny-breadcrumb__link" href={item.href}>
                    {item.label}
                  </a>
                  <span className="ny-breadcrumb__separator" aria-hidden="true">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
