# ADR 0001 — React 19 pour les composants, tokens agnostiques

- Statut : accepté · 2026-10-25

## Contexte

Le système doit servir le site officiel, des apps métier et des outils internes. L'écosystème TypeScript le plus large côté composants, tests et documentation (Storybook, Testing Library) est React.

## Décision

- Composants en **React 19** (`@nyema-r-d/react`), styles en CSS simple à base de variables, classes `ny-`.
- Tokens dans un package **indépendant du framework** (`@nyema-r-d/tokens` : CSS, JS, JSON). Un futur `@nyema-r-d/vue` réutilisera tokens et CSS sans réécriture.
- TypeScript 6.0 (et non 7) tant que typescript-eslint ne supporte pas TS 7.

## Conséquences

Un projet Vue ou Svelte peut adopter la marque dès aujourd'hui via les tokens ; seuls les comportements (dépliage, focus) seraient à réécrire.
