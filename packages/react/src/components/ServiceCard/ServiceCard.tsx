import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import { StatusBadge, type Locale, type ProductStatus } from '../StatusBadge/StatusBadge';
import '@nyema-r-d/css/components/ServiceCard.css';

export interface ServiceCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Code d'offre en mono, ex. « S/01 ». */
  code?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Statut réel de l'offre. Ne jamais afficher « available » pour une offre non livrable. */
  status?: ProductStatus;
  locale?: Locale;
  href?: string;
  headingLevel?: 2 | 3 | 4;
}

/** Carte d'offre : statut et code en tête, titre et description en pied. */
export function ServiceCard({
  code,
  title,
  description,
  status,
  locale,
  href,
  headingLevel = 3,
  className,
  ...props
}: ServiceCardProps) {
  const Heading = `h${headingLevel}` as const;
  const content = (
    <>
      <div className="ny-service-card__meta">
        {status ? <StatusBadge status={status} locale={locale} variant="plain" /> : <span />}
        {code ? <span className="ny-service-card__code">{code}</span> : null}
      </div>
      <div>
        <Heading className="ny-service-card__title">{title}</Heading>
        {description ? <p className="ny-service-card__description">{description}</p> : null}
      </div>
    </>
  );
  const classes = cx('ny-service-card', href && 'ny-focusable', className);
  return href ? (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  ) : (
    <article className={classes} {...props}>
      {content}
    </article>
  );
}

/** Grille de cartes séparées par des filets 1 px. */
export function ServiceGrid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('ny-service-grid', className)} {...props} />;
}
