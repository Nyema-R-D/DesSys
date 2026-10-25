<p align="center">
  <img src="packages/tokens/assets/nyema-mark-light.svg" width="72" alt="NYEMA" />
</p>

# Système de design NYEMA

[![CI](https://github.com/Nyema-R-D/DesSys/actions/workflows/ci.yml/badge.svg)](https://github.com/Nyema-R-D/DesSys/actions/workflows/ci.yml)
[![Release](https://github.com/Nyema-R-D/DesSys/actions/workflows/release.yml/badge.svg)](https://github.com/Nyema-R-D/DesSys/actions/workflows/release.yml)

🇫🇷 Français · [🇲🇱 Bamanankan](README.bm.md)

Identité sobre, technologique et géométrique. Un seul accent (latérite `#E2602E`), une grille de modules, un symbole construit sur le carré-nœud. Ce dépôt est la source unique de la marque NYEMA pour tous les logiciels, outils, apps et sites de l'écosystème.

> Statut : **provisoire** — dérivé du dossier de cadrage, à valider par les fondateurs.

## Packages

| Package                                | Rôle                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@nyema-r-d/tokens`](packages/tokens) | Couleurs, typographie, espacement, mouvement ; thèmes anthracite et papier. CSS, JS/TS, JSON et logos SVG. Agnostique du framework.                                                                                                                                                                                                                                                                                             |
| [`@nyema-r-d/css`](packages/css)       | CSS des composants (classes `ny-`), indépendant du framework : React, Vue ou HTML pur.                                                                                                                                                                                                                                                                                                                                          |
| [`@nyema-r-d/react`](packages/react)   | Composants React 19 — marque et structure (`Theme`, `Logo`, `SiteHeader`, `Hero`, `SiteFooter`, `LanguageSwitch`…), formulaires (`TextField`, `Select`, `RadioGroup`, `Checkbox`, `Chip`), contenus (`ServiceCard`, `LabRow`, `PillarCard`, `StatusBadge`, `Tag`), applications métier (`DataTable`, `Pagination`, `Tabs`, `Dialog`, `Toast`, `ConnectionStatus`, `OfflineBanner`, `Icon`). Liste complète : wiki _Composants_. |
| [`@nyema-r-d/vue`](packages/vue)       | Composants Vue 3 : même HTML et même CSS que React, vérifiés par un test de parité (16 composants en v0.3.0).                                                                                                                                                                                                                                                                                                                   |
| [`@nyema-r-d/config`](packages/config) | Configuration partagée : TypeScript, ESLint, Prettier, Commitlint.                                                                                                                                                                                                                                                                                                                                                              |
| [`apps/reference`](apps/reference)     | Page de référence du système (implémentation de `Design System.dc.html`).                                                                                                                                                                                                                                                                                                                                                       |

## Utiliser dans un projet

```bash
# .npmrc du projet consommateur
echo "@nyema-r-d:registry=https://npm.pkg.github.com" >> .npmrc
pnpm add @nyema-r-d/react @nyema-r-d/tokens
```

```tsx
import '@nyema-r-d/tokens/fonts-local.css';
import '@nyema-r-d/tokens/tokens.css';
import '@nyema-r-d/react/styles.css';
import { Theme, Logo, Button, StatusBadge } from '@nyema-r-d/react';

export function App() {
  return (
    <Theme theme="anthracite">
      <Logo size={32} />
      <Button trailing="→">Parler d’un projet</Button>
      <StatusBadge status="prototype" />
    </Theme>
  );
}
```

Sans React (Vue, Svelte, HTML) : importez `@nyema-r-d/tokens/tokens.css` et utilisez les variables (`var(--accent)`, `var(--space-4)`, `var(--type-body)`…).

## Développer

```bash
pnpm install
pnpm dev          # page de référence → http://localhost:5173
pnpm storybook    # Storybook → http://localhost:6006
pnpm check        # format, lint, types, tests, build — identique à la CI
```

Prérequis : Node 24 (`.nvmrc`), pnpm 11 (`corepack enable`).

## Automatisation

- **Commits** au format [Conventional Commits](https://www.conventionalcommits.org/fr/) (vérifiés par `lefthook` en local et par la CI).
- **CI** sur chaque PR : format, lint, types, tests, build, Storybook, `publint`, revue des dépendances.
- **Versionnage** : [release-please](https://github.com/googleapis/release-please) tient une PR de release à jour (version + [CHANGELOG](CHANGELOG.md) bilingue). Sa fusion crée le tag, la release, publie les packages sur GitHub Packages, joint la documentation et met à jour le wiki.
- **Backlog** : jalons = versions. Le [tableau de bord](https://github.com/Nyema-R-D/DesSys/issues?q=label%3Apinned) et les pages _Backlog_ / _Feuille de route_ du wiki sont régénérés à chaque changement d'issue ou de jalon.

Détails : [wiki](https://github.com/Nyema-R-D/DesSys/wiki) · [docs/wiki](docs/wiki) · [CONTRIBUTING](CONTRIBUTING.md).

## Réutiliser ce dépôt

Ce dépôt sert de modèle pour les autres outils NYEMA : configuration (`@nyema-r-d/config`), pipeline réutilisable (`.github/workflows/reusable-node-ci.yml`), release-please, labels, templates d'issues, wiki automatisé. Voir [Réutiliser ce dépôt](docs/wiki/fr/Reutiliser-ce-depot.md).

## Source de design

Projet Claude Design « Système de design NYEMA complet ». Notes de marque : [design/claude-design/marque.md](design/claude-design/marque.md).
