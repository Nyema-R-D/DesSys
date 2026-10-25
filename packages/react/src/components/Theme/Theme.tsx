import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
// Fondations importées ici : un import dans le seul index.ts peut être éliminé par le bundler.
import '../../styles/base.css';

export type ThemeName = 'anthracite' | 'paper';

export interface ThemeProps extends HTMLAttributes<HTMLDivElement> {
  /** `anthracite` pour le site et les apps, `papier` pour les documents. */
  theme?: ThemeName;
}

/** Racine de thème : applique tokens sémantiques, typographie et anneau de focus à ses enfants. */
export function Theme({ theme = 'anthracite', className, ...props }: ThemeProps) {
  return <div data-ny-theme={theme} className={cx('ny-root', className)} {...props} />;
}
