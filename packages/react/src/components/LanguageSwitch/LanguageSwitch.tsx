import type { HTMLAttributes } from 'react';
import { cx } from '../../utils';
import './LanguageSwitch.css';

export interface LanguageOption {
  /** Code BCP 47 : `fr`, `bm`… */
  value: string;
  /** Libellé court affiché (FR, BM). */
  label: string;
  /** Nom complet, dans la langue concernée, pour les lecteurs d'écran. */
  name: string;
}

export const defaultLanguages: LanguageOption[] = [
  { value: 'fr', label: 'FR', name: 'Français' },
  { value: 'bm', label: 'BM', name: 'Bamanankan' },
];

export interface LanguageSwitchProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  value: string;
  options?: LanguageOption[];
  /** Mode bouton : changement de langue côté client. */
  onChange?: (value: string) => void;
  /** Mode lien : URL de la page dans chaque langue (prioritaire sur onChange). */
  getHref?: (value: string) => string;
  label?: string;
}

/** Sélecteur de langue FR / BM ; la langue active porte le carré-nœud. */
export function LanguageSwitch({
  value,
  options = defaultLanguages,
  onChange,
  getHref,
  label = 'Langue · Kan',
  className,
  ...props
}: LanguageSwitchProps) {
  return (
    <nav aria-label={label} className={cx('ny-language-switch', className)} {...props}>
      {options.map((option) => {
        const active = option.value === value;
        const content = (
          <>
            <span aria-hidden="true">{option.label}</span>
            <span className="ny-visually-hidden">{option.name}</span>
          </>
        );
        const classes = 'ny-language-switch__option ny-mono-label ny-focusable';
        return getHref ? (
          <a
            key={option.value}
            href={getHref(option.value)}
            hrefLang={option.value}
            lang={option.value}
            aria-current={active ? 'true' : undefined}
            className={classes}
          >
            {content}
          </a>
        ) : (
          <button
            key={option.value}
            type="button"
            lang={option.value}
            aria-pressed={active}
            className={classes}
            onClick={() => onChange?.(option.value)}
          >
            {content}
          </button>
        );
      })}
    </nav>
  );
}
