import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import { Button } from '../Button/Button';
import './Pagination.css';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Page courante, à partir de 1. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  labels?: {
    previous: string;
    next: string;
    status: (page: number, count: number) => string;
    nav: string;
  };
}

const frLabels = {
  previous: '← Précédent',
  next: 'Suivant →',
  status: (page: number, count: number) => `Page ${page} sur ${count}`,
  nav: 'Pagination',
};

/** Pagination simple : précédent / suivant et position, pour les listes longues des apps métier. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  labels = frLabels,
  className,
  ...props
}: PaginationProps) {
  if (pageCount <= 1) return null;
  return (
    <nav aria-label={labels.nav} className={cx('ny-pagination', className)} {...props}>
      <span className="ny-pagination__status ny-mono-label" aria-live="polite">
        {labels.status(page, pageCount)}
      </span>
      <div className="ny-pagination__actions">
        <Button
          size="sm"
          variant="secondary"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          {labels.previous}
        </Button>
        <Button
          size="sm"
          variant="secondary"
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          {labels.next}
        </Button>
      </div>
    </nav>
  );
}
