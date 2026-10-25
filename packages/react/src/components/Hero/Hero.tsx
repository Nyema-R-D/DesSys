import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import { Container } from '../Layout/Layout';
import { SectionLabel } from '../SectionLabel/SectionLabel';
import './Hero.css';

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Label mono avec carré-nœud, en haut à gauche. */
  eyebrow?: ReactNode;
  /** Label mono en haut à droite (ex. « Mali → Afrique »). */
  aside?: ReactNode;
  /** Titre display ; une seule phrase, point final. */
  title: ReactNode;
  lead?: ReactNode;
  /** Boutons d'action. */
  actions?: ReactNode;
  /** Visuel à droite, typiquement `<SignalGrid columns={16} rows={8} animated />`. */
  media?: ReactNode;
  /** Légende mono sous le visuel, répartie sur la largeur. */
  mediaLegend?: ReactNode[];
}

/** Ouverture de page : titre display, accroche, actions et visuel (grille de signaux). */
export function Hero({
  eyebrow,
  aside,
  title,
  lead,
  actions,
  media,
  mediaLegend,
  className,
  ...props
}: HeroProps) {
  return (
    <section className={cx('ny-hero', className)} {...props}>
      <Container>
        {eyebrow != null || aside != null ? (
          <div className="ny-hero__top">
            {eyebrow != null ? <SectionLabel node>{eyebrow}</SectionLabel> : <span />}
            {aside != null ? <span className="ny-mono-label ny-hero__aside">{aside}</span> : null}
          </div>
        ) : null}
        <h1 className="ny-hero__title">{title}</h1>
        <div className="ny-hero__bottom">
          <div className="ny-hero__body">
            {lead != null ? <p className="ny-hero__lead">{lead}</p> : null}
            {actions != null ? <div className="ny-hero__actions">{actions}</div> : null}
          </div>
          {media != null ? (
            <div className="ny-hero__media">
              {media}
              {mediaLegend?.length ? (
                <div className="ny-mono-label ny-hero__legend">
                  {mediaLegend.map((item, i) => (
                    <span key={i}>{item}</span>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
