import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils';
import { Button, type ButtonSize, type ButtonVariant } from '../Button/Button';
import '@nyema-r-d/css/components/Menu.css';

export interface MenuItem {
  id: string;
  label: ReactNode;
  disabled?: boolean;
  /** `danger` pour une action destructrice. */
  tone?: 'danger';
}

export interface MenuProps {
  /** Libellé du bouton déclencheur. */
  label: ReactNode;
  items: MenuItem[];
  onSelect?: (id: string) => void;
  /** Alignement de la liste sur le bouton. */
  align?: 'start' | 'end';
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/**
 * Bouton de menu (motif ARIA menu button) : Entrée, Espace ou flèches ouvrent la liste ;
 * flèches, Début et Fin y naviguent ; Échap ferme et rend le focus au bouton.
 */
export function Menu({
  label,
  items,
  onSelect,
  align = 'start',
  variant = 'secondary',
  size = 'sm',
  className,
}: MenuProps) {
  const baseId = useId();
  const [open, setOpen] = useState(false);
  const [focusIndex, setFocusIndex] = useState<number>();
  const root = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const enabled = items.flatMap((item, index) => (item.disabled ? [] : [index]));

  useEffect(() => {
    if (open && focusIndex !== undefined) itemRefs.current[focusIndex]?.focus();
  }, [open, focusIndex]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const show = (index: number | undefined) => {
    setOpen(true);
    setFocusIndex(index);
  };
  const close = () => {
    setOpen(false);
    (root.current?.firstElementChild as HTMLButtonElement | null)?.focus();
  };

  const onTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      show(event.key === 'ArrowDown' ? enabled[0] : enabled.at(-1));
    }
  };

  const onListKeyDown = (event: KeyboardEvent) => {
    const position = enabled.indexOf(focusIndex ?? -1);
    const next = {
      ArrowDown: enabled[(position + 1) % enabled.length],
      ArrowUp: enabled[(position - 1 + enabled.length) % enabled.length],
      Home: enabled[0],
      End: enabled.at(-1),
    }[event.key];
    if (next !== undefined) {
      event.preventDefault();
      setFocusIndex(next);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  };

  return (
    <div ref={root} className={cx('ny-menu', align === 'end' && 'ny-menu--end', className)}>
      <Button
        id={`${baseId}-trigger`}
        variant={variant}
        size={size}
        trailing="↓"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${baseId}-menu`}
        onClick={() => (open ? setOpen(false) : show(enabled[0]))}
        onKeyDown={onTriggerKeyDown}
      >
        {label}
      </Button>
      <ul
        role="menu"
        id={`${baseId}-menu`}
        aria-labelledby={`${baseId}-trigger`}
        className="ny-menu__list"
        hidden={!open}
        onKeyDown={onListKeyDown}
      >
        {items.map((item, index) => (
          <li key={item.id} role="none">
            <button
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              type="button"
              role="menuitem"
              tabIndex={-1}
              disabled={item.disabled}
              className={cx('ny-menu__item', item.tone === 'danger' && 'ny-menu__item--danger')}
              onClick={() => {
                onSelect?.(item.id);
                close();
              }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
