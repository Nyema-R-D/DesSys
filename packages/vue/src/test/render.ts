import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createSSRApp, h, type Component } from 'vue';
import { renderToString } from 'vue/server-renderer';

export { createElement as r };

/** Rend un composant Vue côté serveur, avec un slot par défaut éventuel. */
export async function renderVue(
  component: Component,
  props: Record<string, unknown> = {},
  slot?: string,
) {
  const app = createSSRApp({
    render: () => h(component, props, slot === undefined ? undefined : { default: () => slot }),
  });
  return renderToString(app);
}

export const renderReact = (element: ReactElement) => renderToStaticMarkup(element);

// Attributs dont la valeur dépend du générateur d'identifiants du framework.
const UNSTABLE = new Set(['id', 'for', 'aria-describedby', 'aria-labelledby', 'aria-controls']);

/** Forme canonique d'un fragment HTML : comparable entre React et Vue. */
export function canonical(html: string): string {
  const template = document.createElement('template');
  template.innerHTML = html.replace(/<!--[\s\S]*?-->/g, '');
  const walk = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent ?? '').replace(/\s+/g, ' ').trim();
      return text ? JSON.stringify(text) : '';
    }
    if (!(node instanceof Element)) return '';
    const attrs = [...node.attributes]
      .filter((a) => !UNSTABLE.has(a.name) && !a.name.startsWith('data-v-'))
      .map((a) => {
        if (a.name === 'class')
          return `class="${a.value.split(/\s+/).filter(Boolean).sort().join(' ')}"`;
        if (a.name === 'style')
          return `style="${a.value
            .split(';')
            .map((d) => d.replace(/\s+/g, ''))
            .filter(Boolean)
            .sort()
            .join(';')}"`;
        return `${a.name}="${a.value}"`;
      })
      .sort();
    const children = [...node.childNodes].map(walk).filter(Boolean).join('');
    return `<${node.tagName.toLowerCase()}${attrs.length ? ' ' + attrs.join(' ') : ''}>${children}</${node.tagName.toLowerCase()}>`;
  };
  return [...template.content.childNodes].map(walk).filter(Boolean).join('');
}
