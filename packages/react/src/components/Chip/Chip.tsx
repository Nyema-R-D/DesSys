import type { ButtonHTMLAttributes, HTMLAttributes } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Chip.css';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

/** Chip de sélection (bouton bascule). */
export function Chip({ selected = false, className, type = 'button', ...props }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cx('ny-chip', 'ny-focusable', className)}
      {...props}
    />
  );
}

/** Regroupe des chips ; donnez-lui un `aria-label` décrivant le choix. */
export function ChipGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div role="group" className={cx('ny-chip-group', className)} {...props} />;
}
