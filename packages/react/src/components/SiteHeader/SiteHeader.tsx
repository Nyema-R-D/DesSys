import { useEffect, useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils';
import { Container } from '../Layout/Layout';
import { Logo } from '../Logo/Logo';
import '@nyema-r-d/css/components/SiteHeader.css';

export interface NavLink {
  href: string;
  label: ReactNode;
  /** Page courante : annoncée via aria-current. */
  current?: boolean;
}

export interface SiteHeaderProps extends HTMLAttributes<HTMLElement> {
  links: NavLink[];
  /** Zone de droite, typiquement `<Button size="sm" variant="inverse">`. */
  actions?: ReactNode;
  brand?: ReactNode;
  brandHref?: string;
  navLabel?: string;
  menuLabels?: { open: string; close: string };
}

/**
 * En-tête collant : logo, navigation (repliée en menu sous 1040 px) et action principale
 * (déplacée dans le menu sous 600 px).
 */
export function SiteHeader({
  links,
  actions,
  brand = <Logo size={26} />,
  brandHref = '/',
  navLabel = 'Navigation principale',
  menuLabels = { open: 'Menu', close: 'Fermer' },
  className,
  ...props
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const renderLinks = (onNavigate?: () => void) =>
    links.map((link) => (
      <a
        key={link.href}
        href={link.href}
        className="ny-site-header__link ny-focusable"
        aria-current={link.current ? 'page' : undefined}
        onClick={onNavigate}
      >
        {link.label}
      </a>
    ));

  return (
    <header className={cx('ny-site-header', className)} {...props}>
      <Container>
        <div className="ny-site-header__bar">
          <a href={brandHref} className="ny-site-header__brand ny-focusable">
            {brand}
          </a>
          <nav aria-label={navLabel} className="ny-site-header__nav">
            {renderLinks()}
          </nav>
          <div className="ny-site-header__end">
            {actions != null ? <div className="ny-site-header__actions">{actions}</div> : null}
            <button
              type="button"
              className="ny-site-header__toggle ny-mono-label ny-focusable"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen(!open)}
            >
              {open ? menuLabels.close : menuLabels.open}
            </button>
          </div>
        </div>
        <nav id={panelId} aria-label={navLabel} className="ny-site-header__panel" hidden={!open}>
          {renderLinks(() => setOpen(false))}
          {actions != null ? <div className="ny-site-header__panel-actions">{actions}</div> : null}
        </nav>
      </Container>
    </header>
  );
}
