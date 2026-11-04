import {
  createContext,
  createElement,
  useContext,
  type AnchorHTMLAttributes,
  type ComponentType,
  type ReactNode,
  type Ref,
} from 'react';

/** Props reçues par le composant de lien : celles d'un `<a>`, `href` toujours fourni. */
export type LinkComponentProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  ref?: Ref<HTMLAnchorElement>;
};
export type LinkComponent = ComponentType<LinkComponentProps>;

const LinkContext = createContext<LinkComponent | 'a'>('a');

export interface LinkProviderProps {
  /** Rend les liens du design system, typiquement le `Link` du routeur adapté à `href`. */
  component: LinkComponent;
  children?: ReactNode;
}

/**
 * Fait rendre aux composants (SiteHeader, SiteFooter, Breadcrumb, Button, cartes, LanguageSwitch)
 * leurs liens avec le composant du routeur : navigation sans rechargement de la page.
 */
export function LinkProvider({ component, children }: LinkProviderProps) {
  return <LinkContext.Provider value={component}>{children}</LinkContext.Provider>;
}

/** Lien interne des composants : `<a>` par défaut, composant de `LinkProvider` sinon. */
export function Anchor({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const Component = useContext(LinkContext);
  // Sans href (bouton désactivé), pas de navigation : un `<a>` simple suffit.
  if (href === undefined || Component === 'a') return <a href={href} {...props} />;
  // Composant fourni par l'application (stable), pas créé pendant le rendu.
  return createElement(Component, { href, ...props });
}
