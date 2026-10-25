import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Tag.css';

/** Étiquette statique (non interactive). Pour une sélection, utiliser Chip. */
export function Tag({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cx('ny-tag', className)} {...props} />;
}

/** Liste d'étiquettes, rendue en `<ul>`. */
export function TagList({
  items,
  className,
  ...props
}: HTMLAttributes<HTMLUListElement> & { items: string[] }) {
  return (
    <ul className={cx('ny-tag-list', className)} {...props}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  );
}
