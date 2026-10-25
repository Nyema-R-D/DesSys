# NYEMA Design System — consignes pour Claude

- Monorepo pnpm : `packages/tokens` (source `src/tokens.json` → `scripts/build.mjs`), `packages/css` (CSS des composants, classes `ny-`), `packages/react`, `packages/vue`, `packages/config`, `apps/reference`.
- Avant de conclure : `pnpm check`.
- Tokens : modifier uniquement `packages/tokens/src/tokens.json`, jamais `dist/`.
- Composants : CSS dans `packages/css/src/components/<Composant>.css` (partagé React/Vue), classes `ny-`, valeurs via variables CSS ; tests Vitest + story Storybook obligatoires.
- Commits et titres de PR : Conventional Commits en français (ils génèrent version et CHANGELOG).
- Documentation : `docs/wiki/fr` fait foi, miroir `docs/wiki/bm` (préfixe `BM-`). Le bamanankan doit être relu par un locuteur natif ; ne pas l'inventer avec assurance.
- Règles de marque : `design/claude-design/marque.md`. Un seul accent (latérite), couleurs de statut réservées aux badges, angles vifs, pas d'ombre, pas d'emoji dans l'UI.
