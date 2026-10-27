# Démarrage

## 1. Accès au registre

Les packages sont publiés sur GitHub Packages, scope `@nyema-r-d`.

```ini
# .npmrc du projet (versionné : jamais de jeton ici)
@nyema-r-d:registry=https://npm.pkg.github.com
```

Le jeton (`read:packages`) va dans la configuration **utilisateur** : pnpm 11 ignore une variable `${…}` placée dans le `.npmrc` du projet, pour ne pas la divulguer.

```bash
pnpm config set //npm.pkg.github.com/:_authToken "$(gh auth token)"
```

En CI, `actions/setup-node` avec `registry-url: https://npm.pkg.github.com` et `scope: '@nyema-r-d'` écrit ce jeton (`NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}` sur l'étape d'installation). Le dépôt consommateur doit avoir reçu l'accès au package (Package settings → Manage Actions access).

## 2. Installation

```bash
pnpm add @nyema-r-d/react @nyema-r-d/tokens
```

## 3. Styles et thème

```tsx
import '@nyema-r-d/tokens/fonts-local.css'; // Archivo + JetBrains Mono embarquées (hors ligne)
import '@nyema-r-d/tokens/tokens.css'; // variables CSS
import '@nyema-r-d/react/styles.css'; // styles des composants
import { Theme } from '@nyema-r-d/react';

<Theme theme="anthracite">{/* application */}</Theme>;
```

Polices : `fonts-local.css` embarque Archivo (variable : graisse et chasse) et JetBrains Mono en latin + latin-ext (caractères bamanankan inclus), environ 340 Ko, sans appel à un service tiers. `fonts.css` reste disponible pour charger depuis Google Fonts.

`Theme` pose `data-ny-theme` et la classe `ny-root` (typographie, fond, anneau de focus). Les thèmes peuvent s'imbriquer : une carte papier dans une page anthracite.

## 4. Sans React (HTML, Vue, autre)

```html
<link rel="stylesheet" href="node_modules/@nyema-r-d/tokens/dist/tokens.css" />
<link rel="stylesheet" href="node_modules/@nyema-r-d/css/dist/styles.css" />
<body
  data-ny-theme="paper"
  style="background: var(--surface-page); color: var(--text-primary)"
></body>
```

Avec `@nyema-r-d/css`, les classes des composants (`ny-button ny-button--primary`, `ny-status-badge`…) s'utilisent directement ; la structure HTML attendue est celle rendue dans Storybook.

Les valeurs sont aussi disponibles en JS (`import { tokens, themes } from '@nyema-r-d/tokens'`) et en JSON (`@nyema-r-d/tokens/tokens.json`).
