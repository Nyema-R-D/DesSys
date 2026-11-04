import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import { Anchor } from '../Link/Link';
import '@nyema-r-d/css/components/PillarCard.css';

export interface PillarCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Index du pilier : 2 → « /02 ». */
  index: number | string;
  title: ReactNode;
  description?: ReactNode;
  /** Rend la carte cliquable. */
  href?: string;
  headingLevel?: 2 | 3 | 4;
}

/** Carte de pilier : index mono latérite, titre, description. */
export function PillarCard({
  index,
  title,
  description,
  href,
  headingLevel = 3,
  className,
  ...props
}: PillarCardProps) {
  const Heading = `h${headingLevel}` as const;
  const content = (
    <>
      <div className="ny-pillar-card__index">/{String(index).padStart(2, '0')}</div>
      <Heading className="ny-pillar-card__title">{title}</Heading>
      {description ? <p className="ny-pillar-card__description">{description}</p> : null}
    </>
  );
  const classes = cx('ny-pillar-card', href && 'ny-focusable', className);
  return href ? (
    <Anchor href={href} className={classes} {...props}>
      {content}
    </Anchor>
  ) : (
    <article className={classes} {...props}>
      {content}
    </article>
  );
}
