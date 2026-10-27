import type { InputHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import { TextField } from '../TextField/TextField';

export interface DateFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: ReactNode;
  hint?: ReactNode;
}

/**
 * Date au format natif (`AAAA-MM-JJ`). Le calendrier, le clavier, la langue et le hors-ligne
 * sont ceux du système : aucun widget à maintenir ni à rendre accessible.
 */
export function DateField({ className, ...props }: DateFieldProps) {
  return <TextField {...props} type="date" className={cx('ny-field--date', className)} />;
}
