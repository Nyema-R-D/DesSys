# Réutiliser ce dépôt

Chaque nouvel outil NYEMA reprend la même configuration et la même automatisation.

**Pour une application** (site, outil métier, back-office) : utilisez le [kit de démarrage](Kit-de-demarrage), `pnpm create @nyema-r-d/app`. Les options ci-dessous servent aux dépôts de bibliothèques ou aux cas particuliers.

## Option A — modèle GitHub

Ce dépôt est un _template_ : **Use this template** → nouveau dépôt. Supprimez `packages/tokens`, `packages/react`, `apps/reference`, gardez le reste.

## Option B — consommer sans copier

1. **Configuration** : `pnpm add -D @nyema-r-d/config` puis

   ```js
   // eslint.config.js
   import nyema from '@nyema-r-d/config/eslint';
   export default [...nyema];
   ```

   ```jsonc
   // tsconfig.json
   { "extends": "@nyema-r-d/config/tsconfig/react-library.json" }
   ```

   `.prettierrc.json` : `"@nyema-r-d/config/prettier"` · `commitlint.config.js` : `export { default } from '@nyema-r-d/config/commitlint';`

2. **Pipeline** :

   ```yaml
   # .github/workflows/ci.yml
   on: [pull_request, push]
   jobs:
     ci:
       uses: Nyema-R-D/DesSys/.github/workflows/reusable-node-ci.yml@v0.0.1
   ```

   Contrat : `.nvmrc`, `packageManager` pnpm, scripts `format:check`, `lint`, `build:packages`, `typecheck`, `test`, `publint`. Pour un dépôt privé : _Settings → Actions → Access_ de DesSys doit autoriser l'organisation.

3. **Fichiers à copier** : `release-please-config.json`, `.release-please-manifest.json`, `.github/labels.yml`, `.github/ISSUE_TEMPLATE/`, `.github/PULL_REQUEST_TEMPLATE.md`, `.github/workflows/{release,pr,issues,labels,wiki,stale}.yml`, `scripts/github/`, `lefthook.yml`, `docs/wiki/`.
