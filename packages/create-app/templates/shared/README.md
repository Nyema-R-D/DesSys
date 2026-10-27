# %%TITLE%%

> 🇫🇷 Français · [Bamanankan](README.bm.md)

Outil de l'écosystème NYEMA, construit sur le [système de design NYEMA](https://github.com/Nyema-R-D/DesSys) v%%DS_VERSION%%.

## Démarrer

Les paquets `@nyema-r-d/*` sont publiés sur GitHub Packages : il faut un jeton en lecture (`read:packages`), enregistré une fois dans votre configuration utilisateur. pnpm ignore volontairement un jeton placé dans le `.npmrc` du projet.

```sh
pnpm config set //npm.pkg.github.com/:_authToken "$(gh auth token)"
pnpm install
pnpm dev
```

| Commande      | Rôle                                              |
| ------------- | ------------------------------------------------- |
| `pnpm dev`    | serveur de développement                          |
| `pnpm check`  | format, lint, types, tests et build (comme la CI) |
| `pnpm build`  | build de production dans `dist/`                  |
| `pnpm format` | formate le code                                   |

## Conventions

- **Commits et titres de PR** : [Conventional Commits](https://www.conventionalcommits.org/fr/) en français (`feat: …`, `fix: …`). Ils produisent la version et le CHANGELOG.
- **Release** : chaque push sur `main` met à jour la PR « chore(release) » ; la fusionner crée le tag et la release GitHub.
- **Interface** : composants et tokens du design system uniquement (voir `CLAUDE.md`). Catalogue : [wiki Composants](https://github.com/Nyema-R-D/DesSys/wiki/Composants).

## Réglages GitHub à faire une fois

- Sur chaque paquet `@nyema-r-d/*` utilisé : _Package settings → Manage Actions access_ → ajouter ce dépôt (sinon `pnpm install` échoue en CI avec 403).
- Secret `PACKAGES_TOKEN` (jeton `read:packages`) pour que Dependabot propose les mises à jour du design system.
- Facultatif : secret `RELEASE_TOKEN` pour que la CI tourne sur les PR de release.
