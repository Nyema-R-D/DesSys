import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils';
import { Container } from '../Layout/Layout';
import { Logo } from '../Logo/Logo';
import '@nyema-r-d/css/components/SiteFooter.css';

export interface FooterColumn {
  title: ReactNode;
  links: { href: string; label: ReactNode }[];
}

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  columns: FooterColumn[];
  /** Mention en bas à gauche, ex. « © 2026 NYEMA ». */
  legal?: ReactNode;
  /** Signature en bas à droite. */
  tagline?: ReactNode;
  /** Élément supplémentaire en bas, typiquement `<LanguageSwitch>`. */
  extra?: ReactNode;
  brand?: ReactNode;
  brandHref?: string;
}

/** Pied de page : logo, colonnes de liens, mentions et sélecteur de langue. */
export function SiteFooter({
  columns,
  legal,
  tagline,
  extra,
  brand = <Logo size={40} />,
  brandHref = '/',
  className,
  ...props
}: SiteFooterProps) {
  const idPrefix = useId();
  return (
    <footer className={cx('ny-site-footer', className)} {...props}>
      <Container>
        <div className="ny-site-footer__top">
          <a href={brandHref} className="ny-site-footer__brand ny-focusable">
            {brand}
          </a>
          <div className="ny-site-footer__columns">
            {columns.map((column, i) => (
              <nav key={i} aria-labelledby={`${idPrefix}-${i}`}>
                <p id={`${idPrefix}-${i}`} className="ny-mono-label ny-site-footer__heading">
                  {column.title}
                </p>
                <ul className="ny-site-footer__column">
                  {column.links.map((link) => (
                    <li key={link.href + String(link.label)}>
                      <a href={link.href} className="ny-site-footer__link ny-focusable">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="ny-mono-label ny-site-footer__bottom">
          {legal != null ? <span>{legal}</span> : null}
          {extra}
          {tagline != null ? <span>{tagline}</span> : null}
        </div>
      </Container>
    </footer>
  );
}
