import { useEffect, useId, useRef, type ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Dialog.css';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children?: ReactNode;
  /** Actions en pied, typiquement des Button. */
  footer?: ReactNode;
  closeLabel?: string;
  className?: string;
}

/**
 * Boîte de dialogue modale sur l'élément natif `<dialog>` : piège du focus, Échap et retour du focus
 * sont gérés par le navigateur. Fermeture aussi par clic sur le fond.
 */
export function Dialog({
  open,
  onClose,
  title,
  children,
  footer,
  closeLabel = 'Fermer',
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={cx('ny-dialog', className)}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="ny-dialog__header">
        <h2 id={titleId} className="ny-dialog__title">
          {title}
        </h2>
        <button
          type="button"
          className="ny-dialog__close ny-focusable"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      {children != null ? <div className="ny-dialog__body">{children}</div> : null}
      {footer != null ? <div className="ny-dialog__footer">{footer}</div> : null}
    </dialog>
  );
}
