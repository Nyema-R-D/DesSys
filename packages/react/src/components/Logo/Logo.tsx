import type { CSSProperties, HTMLAttributes } from 'react';
import { cx } from '../../utils';
import { Mark, type MarkTone } from '../Mark/Mark';
import './Logo.css';

export interface LogoProps extends HTMLAttributes<HTMLSpanElement> {
  /** Hauteur du symbole en px (logo complet : 72 px de large minimum). */
  size?: number;
  tone?: MarkTone;
}

/** Logo complet : symbole + logotype NYEMA (Archivo 700, chasse 118 %, +0,04em). */
export function Logo({ size = 24, tone = 'auto', className, style, ...props }: LogoProps) {
  return (
    <span
      className={cx('ny-logo', className)}
      style={{ '--ny-logo-size': `${size}px`, ...style } as CSSProperties}
      role="img"
      aria-label="NYEMA"
      {...props}
    >
      <Mark size={size} tone={tone} />
      <span className="ny-logo__wordmark" aria-hidden="true">
        NYEMA
      </span>
    </span>
  );
}
