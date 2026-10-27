import { cloneElement, useEffect, useId, useState, type ReactElement, type ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Tooltip.css';

export interface TooltipProps {
  /** Texte d'appoint ; jamais une information indispensable (invisible au toucher). */
  content: ReactNode;
  /** Élément focalisable qui déclenche la bulle. */
  children: ReactElement<Record<string, unknown>>;
  placement?: 'top' | 'bottom';
  className?: string;
}

/** Info-bulle au survol et au focus, fermée par Échap, reliée par `aria-describedby` (WCAG 1.4.13). */
export function Tooltip({ content, children, placement = 'top', className }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const own = children.props['aria-describedby'] as string | undefined;
  const describedBy = [own, id].filter(Boolean).join(' ');
  return (
    <span
      className={cx('ny-tooltip', placement === 'bottom' && 'ny-tooltip--bottom', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {cloneElement(children, { 'aria-describedby': describedBy })}
      <span role="tooltip" id={id} className="ny-tooltip__bubble" hidden={!open}>
        <span className="ny-tooltip__text">{content}</span>
      </span>
    </span>
  );
}
