import type { SVGAttributes } from 'react';
import { cx } from '../../utils';

/**
 * - `auto` : corps en couleur courante, nœud en accent (s'adapte au thème).
 * - `on-laterite` : corps ink, nœud papier — sur aplat latérite.
 * - `mono` : une seule couleur (couleur courante) — noir ou blanc selon le fond.
 */
export type MarkTone = 'auto' | 'on-laterite' | 'mono';

export interface MarkProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  /** Taille en px. Minimum 16 px. */
  size?: number;
  tone?: MarkTone;
  /** Texte alternatif ; si absent, le symbole est décoratif. */
  title?: string;
}

const MIN_SIZE = 16;

/** Symbole NYEMA : un N sur grille 48 dont l'angle supérieur droit se détache en carré-nœud. */
export function Mark({ size = 24, tone = 'auto', title, className, ...props }: MarkProps) {
  const px = Math.max(size, MIN_SIZE);
  const body = tone === 'on-laterite' ? 'var(--ny-ink-950)' : 'currentColor';
  const node =
    tone === 'mono'
      ? 'currentColor'
      : tone === 'on-laterite'
        ? 'var(--ny-paper-100)'
        : 'var(--accent)';
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 48 48"
      className={cx('ny-mark', className)}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      <rect x="6" y="6" width="9" height="36" fill={body} />
      <polygon points="6,6 15,6 42,42 33,42" fill={body} />
      <rect x="33" y="18" width="9" height="24" fill={body} />
      <rect x="33" y="6" width="9" height="9" fill={node} data-part="node" />
    </svg>
  );
}
