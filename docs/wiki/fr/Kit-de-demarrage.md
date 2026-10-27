# Kit de démarrage

Un nouvel outil de l'écosystème NYEMA démarre avec une seule commande. Le projet généré est déjà branché au design system, aux conventions et à la CI.

```sh
pnpm create @nyema-r-d/app suivi-visites --framework react --title "Suivi des visites"
```

Sans option, la commande pose les questions (dossier, framework `react` ou `vue`, nom affiché).

## Prérequis

Les paquets `@nyema-r-d/*` sont sur GitHub Packages. Une fois par poste, avec un jeton `read:packages` :

```sh
pnpm config set @nyema-r-d:registry https://npm.pkg.github.com
pnpm config set //npm.pkg.github.com/:_authToken "$(gh auth token)"
```

pnpm 11 ignore un jeton placé dans le `.npmrc` du projet (fichier versionné) : il doit être dans la configuration utilisateur.

## Contenu du projet

| Élément                                  | Détail                                                                                     |
| ---------------------------------------- | ------------------------------------------------------------------------------------------ |
| Vite + React 19 ou Vue 3.5               | écran d'accueil : `Theme`, `Logo`, `ConnectionStatus`, `StatusBadge`, `Button`             |
| Design system                            | `@nyema-r-d/react` ou `@nyema-r-d/vue` + `@nyema-r-d/tokens`, polices locales (hors ligne) |
| Configuration partagée                   | TypeScript, ESLint, Prettier, commitlint (`@nyema-r-d/config`), crochets lefthook          |
| Tests                                    | Vitest + Testing Library (React) ou Vue Test Utils, un test d'exemple                      |
| `.github/workflows/ci.yml`               | `pnpm check` (format, lint, types, tests, build) + titre de PR conventionnel               |
| `.github/workflows/release.yml`          | release-please : version, CHANGELOG bilingue, tag, release                                 |
| `.github/dependabot.yml`                 | mises à jour hebdomadaires, paquets `@nyema-r-d/*` groupés                                 |
| `README.md`, `README.bm.md`, `CLAUDE.md` | démarrage, conventions, règles de marque pour Claude                                       |

Les versions des dépendances sont **celles testées dans ce dépôt** au moment de la release : le kit les relève à la construction (`dist/versions.json`).

## Réglages GitHub du nouveau dépôt

1. Sur chaque paquet `@nyema-r-d/*` utilisé : _Package settings → Manage Actions access_ → ajouter le dépôt. Sans cela, `pnpm install` échoue en CI (403).
2. Secret `PACKAGES_TOKEN` (`read:packages`) pour Dependabot.
3. Facultatif : secret `RELEASE_TOKEN` pour que la CI tourne sur les PR de release.

## Garanties

À chaque PR de ce dépôt, le job « Kit de démarrage » génère un outil React et un outil Vue, les installe sur les paquets construits dans la PR (`pnpm pack`) et y lance `pnpm check`. Une évolution du design system qui casserait un outil neuf échoue donc ici, avant publication.
