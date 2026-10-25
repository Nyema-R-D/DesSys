# NYEMA Design System — consignes pour Claude

- Monorepo pnpm : `packages/tokens` (source `src/tokens.json` → `scripts/build.mjs`), `packages/react`, `packages/config`, `apps/reference`.
- Avant de conclure : `pnpm check`.
- Tokens : modifier uniquement `packages/tokens/src/tokens.json`, jamais `dist/`.
- Composants : CSS par composant, classes `ny-`, valeurs via variables CSS ; tests Vitest + story Storybook obligatoires.
- Commits et titres de PR : Conventional Commits en français (ils génèrent version et CHANGELOG).
- Documentation : `docs/wiki/fr` fait foi, miroir `docs/wiki/bm` (préfixe `BM-`). Le bamanankan doit être relu par un locuteur natif ; ne pas l'inventer avec assurance.
- Règles de marque : `design/claude-design/readme.md`. Un seul accent (latérite), couleurs de statut réservées aux badges, angles vifs, pas d'ombre, pas d'emoji dans l'UI.
