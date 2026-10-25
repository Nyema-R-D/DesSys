import type { ComponentType, SVGProps } from 'react';
import { cx } from '../../utils';
import './Icon.css';

/** Toute icône Lucide (ou compatible) : composant SVG acceptant size, strokeWidth et absoluteStrokeWidth. */
export type IconComponent = ComponentType<
  SVGProps<SVGSVGElement> & {
    size?: number | string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
  }
>;

export type IconSize = 16 | 20 | 24 | 32;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  icon: IconComponent;
  /** Tailles alignées sur la grille : 16, 20, 24, 32 px. */
  size?: IconSize;
  /** Nom accessible ; sans label, l'icône est décorative. */
  label?: string;
}

/**
 * Adaptateur d'icônes Lucide : trait 1,5 px constant quelle que soit la taille, couleur courante.
 * Le carré-nœud, les flèches → ↗ et les signes + − restent à privilégier quand ils suffisent.
 */
export function Icon({ icon: Glyph, size = 20, label, className, ...props }: IconProps) {
  return (
    <Glyph
      size={size}
      strokeWidth={1.5}
      absoluteStrokeWidth
      className={cx('ny-icon', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
      {...props}
    />
  );
}
