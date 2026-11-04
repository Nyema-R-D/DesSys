import { inject, provide, type Component, type InjectionKey } from 'vue';

/**
 * Composant de lien des composants du design system. Il reçoit `href` en prop et les attributs
 * d'un `<a>` (classe, aria-current, écouteurs) ; typiquement un adaptateur de `RouterLink`.
 */
export type LinkComponent = Component | 'a';

export const linkComponentKey: InjectionKey<LinkComponent> = Symbol('nyema-link');

/** Équivalent de `<LinkProvider>` dans un `setup()` (ou `app.provide(linkComponentKey, …)`). */
export function provideLinkComponent(component: LinkComponent) {
  provide(linkComponentKey, component);
}

export function useLinkComponent(): LinkComponent {
  return inject(linkComponentKey, 'a');
}
