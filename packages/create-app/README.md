# @nyema-r-d/create-app

Kit de démarrage d'un outil NYEMA.

```sh
pnpm create @nyema-r-d/app suivi-visites --framework react --title "Suivi des visites"
```

Génère un projet Vite + React ou Vue branché au design system, aux conventions (TypeScript, ESLint, Prettier, commitlint, lefthook), à la CI et à release-please. Documentation : wiki, page _Kit de démarrage_.

- `templates/shared`, `templates/react`, `templates/vue` : fichiers copiés. Un nom qui commence par `_` devient `.` (npm ne publie pas `.gitignore` ni `.npmrc`). `%%TITLE%%`, `%%NAME%%`, `%%DS_VERSION%%`, `%%NODE%%`, `%%FRAMEWORK%%` sont remplacés.
- `scripts/build.mjs` relève les versions des dépendances du monorepo dans `dist/versions.json`.
- `pnpm test` : génération et contenu ; `pnpm test:e2e` (après `pnpm build:packages`) : installation sur les archives locales et `pnpm check` dans les deux projets générés.
