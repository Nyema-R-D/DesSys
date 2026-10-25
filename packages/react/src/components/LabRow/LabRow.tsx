import { useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils';
import { StatusBadge, type Locale, type ProductStatus } from '../StatusBadge/StatusBadge';
import '@nyema-r-d/css/components/LabRow.css';

export interface LabRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Code produit en mono : OFFLINE, TRUST, DATA… */
  code: string;
  title: ReactNode;
  status: ProductStatus;
  locale?: Locale;
  /** Contenu dépliable. Sans contenu, la ligne n'est pas interactive. */
  children?: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** Ligne du laboratoire : code produit, titre, statut et détail dépliable (+ / −). */
export function LabRow({
  code,
  title,
  status,
  locale,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
  ...props
}: LabRowProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = controlledOpen ?? uncontrolledOpen;
  const panelId = useId();
  const expandable = children != null;

  const toggle = () => {
    setUncontrolledOpen(!open);
    onOpenChange?.(!open);
  };

  const summary = (
    <>
      <span className="ny-lab-row__code">{code}</span>
      <span className="ny-lab-row__title">{title}</span>
      <StatusBadge status={status} locale={locale} />
      {expandable ? (
        <span className="ny-lab-row__toggle" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      ) : null}
    </>
  );

  return (
    <div className={cx('ny-lab-row', className)} {...props}>
      {expandable ? (
        <button
          type="button"
          className="ny-lab-row__summary ny-focusable"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={toggle}
        >
          {summary}
        </button>
      ) : (
        <div className="ny-lab-row__summary">{summary}</div>
      )}
      {expandable ? (
        <div id={panelId} className="ny-lab-row__panel" hidden={!open}>
          {children}
        </div>
      ) : null}
    </div>
  );
}
