import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/TextField.css';
import '@nyema-r-d/css/components/Combobox.css';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  label: ReactNode;
  options: ComboboxOption[];
  /** Valeur contrôlée (`null` : aucune). */
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string | null) => void;
  /** Filtre personnalisé ; par défaut, insensible à la casse et aux accents. */
  filter?: (option: ComboboxOption, query: string) => boolean;
  /** Message affiché et annoncé quand aucune option ne correspond. */
  emptyMessage?: ReactNode;
  placeholder?: string;
  error?: ReactNode;
  hint?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  /** Nom du champ caché qui porte la valeur dans un formulaire. */
  name?: string;
  id?: string;
  className?: string;
}

const fold = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

/** Filtre par défaut : le libellé contient la saisie, sans tenir compte de la casse ni des accents. */
export const filterOption = (option: ComboboxOption, query: string) =>
  fold(option.label).includes(fold(query.trim()));

/**
 * Liste filtrable (motif ARIA combobox, sélection manuelle) : la saisie filtre les options,
 * flèches pour parcourir, Entrée pour choisir, Échap pour fermer. Le focus reste dans le champ.
 */
export function Combobox({
  label,
  options,
  value,
  defaultValue = null,
  onChange,
  filter = filterOption,
  emptyMessage = 'Aucun résultat',
  placeholder,
  error,
  hint,
  required,
  disabled,
  name,
  id,
  className,
}: ComboboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listId = `${inputId}-list`;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const [internal, setInternal] = useState(defaultValue);
  const selected = value !== undefined ? value : internal;
  const selectedLabel = options.find((option) => option.value === selected)?.label ?? '';
  const [query, setQuery] = useState<string>();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number>();
  const listRef = useRef<HTMLUListElement>(null);

  const text = query ?? selectedLabel;
  const visible = options.flatMap((option, index) =>
    query === undefined || filter(option, query) ? [index] : [],
  );
  const enabled = visible.filter((index) => !options[index]!.disabled);
  const optionId = (index: number) => `${inputId}-option-${index}`;

  useEffect(() => {
    if (active === undefined) return;
    listRef.current
      ?.querySelector(`[id="${inputId}-option-${active}"]`)
      ?.scrollIntoView?.({ block: 'nearest' });
  }, [active, inputId]);

  const close = () => {
    setOpen(false);
    setActive(undefined);
    setQuery(undefined);
  };
  const choose = (index: number) => {
    const option = options[index]!;
    if (option.disabled) return;
    if (value === undefined) setInternal(option.value);
    onChange?.(option.value);
    close();
  };
  const move = (step: 1 | -1) => {
    if (!enabled.length) return;
    const position = active === undefined ? -1 : enabled.indexOf(active);
    const next =
      position === -1
        ? step === 1
          ? 0
          : enabled.length - 1
        : (position + step + enabled.length) % enabled.length;
    setOpen(true);
    setActive(enabled[next]);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (event.altKey) setOpen(event.key === 'ArrowDown');
      else move(event.key === 'ArrowDown' ? 1 : -1);
    } else if (event.key === 'Enter' && open && active !== undefined) {
      event.preventDefault();
      choose(active);
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      close();
    }
  };

  const onBlur = () => {
    if (query === '' && selected !== null) {
      if (value === undefined) setInternal(null);
      onChange?.(null);
    }
    close();
  };

  return (
    <div className={cx('ny-field', 'ny-combobox', className)}>
      <label id={`${inputId}-label`} className="ny-field__label" htmlFor={inputId}>
        {label}
        {required ? ' *' : null}
      </label>
      <div className="ny-combobox__control">
        <input
          id={inputId}
          type="text"
          role="combobox"
          autoComplete="off"
          className="ny-field__input ny-combobox__input"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && active !== undefined ? optionId(active) : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={text}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(undefined);
            setOpen(true);
          }}
          onClick={() => setOpen(true)}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
        <div className="ny-combobox__popup" hidden={!open}>
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={`${inputId}-label`}
            className="ny-combobox__list"
            hidden={visible.length === 0}
          >
            {visible.map((index) => {
              const option = options[index]!;
              return (
                <li
                  key={option.value}
                  id={optionId(index)}
                  role="option"
                  aria-selected={option.value === selected}
                  aria-disabled={option.disabled ? true : undefined}
                  className={cx(
                    'ny-combobox__option',
                    index === active && 'ny-combobox__option--active',
                  )}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(index)}
                >
                  {option.label}
                </li>
              );
            })}
          </ul>
          {open && visible.length === 0 ? (
            <p className="ny-combobox__empty" role="status">
              {emptyMessage}
            </p>
          ) : null}
        </div>
      </div>
      {name ? <input type="hidden" name={name} value={selected ?? ''} /> : null}
      {hint ? (
        <span id={hintId} className="ny-field__hint">
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="ny-field__error" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
