import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Tabs.css';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** Nom accessible de la liste d'onglets. */
  label: string;
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
}

/** Onglets (motif ARIA) : flèches gauche/droite, Début/Fin, activation automatique. */
export function Tabs({ items, label, value, defaultValue, onChange, className }: TabsProps) {
  const baseId = useId();
  const enabled = items.filter((item) => !item.disabled);
  const [uncontrolled, setUncontrolled] = useState(defaultValue ?? enabled[0]?.id);
  const selected = value ?? uncontrolled;
  const refs = useRef(new Map<string, HTMLButtonElement>());

  const select = (id: string) => {
    setUncontrolled(id);
    onChange?.(id);
    refs.current.get(id)?.focus();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const index = enabled.findIndex((item) => item.id === selected);
    const next = {
      ArrowRight: enabled[(index + 1) % enabled.length],
      ArrowLeft: enabled[(index - 1 + enabled.length) % enabled.length],
      Home: enabled[0],
      End: enabled[enabled.length - 1],
    }[event.key];
    if (!next) return;
    event.preventDefault();
    select(next.id);
  };

  return (
    <div className={cx('ny-tabs', className)}>
      <div role="tablist" aria-label={label} className="ny-tabs__list" onKeyDown={onKeyDown}>
        {items.map((item) => {
          const active = item.id === selected;
          return (
            <button
              key={item.id}
              ref={(node) => {
                if (node) refs.current.set(item.id, node);
                else refs.current.delete(item.id);
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={active}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={active ? 0 : -1}
              disabled={item.disabled}
              className="ny-tabs__tab ny-focusable"
              onClick={() => select(item.id)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-panel-${item.id}`}
          aria-labelledby={`${baseId}-tab-${item.id}`}
          hidden={item.id !== selected}
          tabIndex={0}
          className="ny-tabs__panel ny-focusable"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
