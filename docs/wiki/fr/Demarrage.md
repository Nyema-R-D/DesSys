# Démarrage

## 1. Accès au registre

Les packages sont publiés sur GitHub Packages, scope `@nyema-r-d`.

```ini
# .npmrc du projet
@nyema-r-d:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

En local, `GITHUB_TOKEN` est un jeton personnel avec `read:packages`. En CI, le `GITHUB_TOKEN` du workflow suffit si le dépôt consommateur a reçu l'accès au package (Package settings → Manage Actions access).

## 2. Installation

```bash
pnpm add @nyema-r-d/react @nyema-r-d/tokens
```

## 3. Styles et thème

```tsx
import '@nyema-r-d/tokens/fonts.css'; // Archivo + JetBrains Mono (Google Fonts)
import '@nyema-r-d/tokens/tokens.css'; // variables CSS
import '@nyema-r-d/react/styles.css'; // styles des composants
import { Theme } from '@nyema-r-d/react';

<Theme theme="anthracite">{/* application */}</Theme>;
```

`Theme` pose `data-ny-theme` et la classe `ny-root` (typographie, fond, anneau de focus). Les thèmes peuvent s'imbriquer : une carte papier dans une page anthracite.

## 4. Sans React

```html
<link rel="stylesheet" href="node_modules/@nyema-r-d/tokens/dist/tokens.css" />
<body
  data-ny-theme="paper"
  style="background: var(--surface-page); color: var(--text-primary)"
></body>
```

Les valeurs sont aussi disponibles en JS (`import { tokens, themes } from '@nyema-r-d/tokens'`) et en JSON (`@nyema-r-d/tokens/tokens.json`).
