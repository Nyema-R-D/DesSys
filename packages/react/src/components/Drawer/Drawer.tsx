import { cx } from '../../utils';
import { Dialog, type DialogProps } from '../Dialog/Dialog';
import '@nyema-r-d/css/components/Drawer.css';

export interface DrawerProps extends DialogProps {
  /** Bord d'apparition : `end` (droite en français), `start` (gauche). */
  side?: 'start' | 'end';
}

/**
 * Panneau latéral modal : un Dialog (`<dialog>` natif, focus piégé, Échap, retour du focus)
 * collé au bord, pleine hauteur, pleine largeur sur mobile. Pour éditer un détail sans quitter la liste.
 */
export function Drawer({ side = 'end', className, ...props }: DrawerProps) {
  return <Dialog {...props} className={cx('ny-drawer', `ny-drawer--${side}`, className)} />;
}
