import { useId, type ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Accordion.css';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Une seule section ouverte à la fois (attribut `name` natif des `<details>`). */
  exclusive?: boolean;
  /** Sections ouvertes au premier rendu. */
  defaultOpen?: string[];
  className?: string;
}

/** Sections dépliables sur `<details>`/`<summary>` natifs : clavier et lecteurs d'écran gérés par le navigateur. */
export function Accordion({ items, exclusive, defaultOpen = [], className }: AccordionProps) {
  const name = useId();
  return (
    <div className={cx('ny-accordion', className)}>
      {items.map((item) => (
        <details
          key={item.id}
          className="ny-accordion__item"
          name={exclusive ? name : undefined}
          open={defaultOpen.includes(item.id) || undefined}
        >
          <summary className="ny-accordion__summary ny-focusable">
            <span>{item.title}</span>
            <span className="ny-accordion__icon" aria-hidden="true" />
          </summary>
          <div className="ny-accordion__content">{item.content}</div>
        </details>
      ))}
    </div>
  );
}
