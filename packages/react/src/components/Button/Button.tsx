import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils';
import '@nyema-r-d/css/components/Button.css';

export type ButtonVariant = 'primary' | 'inverse' | 'secondary' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface CommonProps {
  variant?: ButtonVariant;
  /** `sm` 40 px (navigation), `md` 52 px, `lg` 56 px (CTA). */
  size?: ButtonSize;
  /** Occupe toute la largeur ; libellé et élément `trailing` sont écartés aux extrémités. */
  fullWidth?: boolean;
  /** Élément placé après le libellé, typiquement une flèche typographique → ou ↗. */
  trailing?: ReactNode;
  children?: ReactNode;
}

export type ButtonProps = CommonProps &
  (
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ href: string; disabled?: boolean } & AnchorHTMLAttributes<HTMLAnchorElement>)
  );

/** Bouton d'action. Rendu en `<a>` si `href` est fourni, sinon en `<button>`. */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  trailing,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cx(
    'ny-button',
    'ny-focusable',
    `ny-button--${variant}`,
    size !== 'md' && `ny-button--${size}`,
    fullWidth && 'ny-button--full',
    className,
  );
  const content = (
    <>
      {children}
      {trailing != null ? <span aria-hidden="true">{trailing}</span> : null}
    </>
  );

  if (props.href !== undefined) {
    const { disabled, href, onClick, ...anchorProps } = props;
    return (
      <a
        className={classes}
        href={disabled ? undefined : href}
        aria-disabled={disabled || undefined}
        onClick={disabled ? (event) => event.preventDefault() : onClick}
        {...anchorProps}
      >
        {content}
      </a>
    );
  }

  const { type = 'button', ...buttonProps } = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
