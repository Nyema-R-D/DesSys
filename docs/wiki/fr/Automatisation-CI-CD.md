# Automatisation CI/CD

| Workflow               | Déclencheur                     | Rôle                                                                                                             |
| ---------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `ci.yml`               | PR, push `main`, file de fusion | Pipeline réutilisable (format, lint, types, tests, build, Storybook, publint), commitlint, revue des dépendances |
| `reusable-node-ci.yml` | `workflow_call`                 | Pipeline Node commune à tous les dépôts NYEMA                                                                    |
| `pr.yml`               | PR                              | Titre conventionnel, labels par zone, jalon automatique                                                          |
| `issues.yml`           | Issues                          | Statuts `status:*` automatiques                                                                                  |
| `release.yml`          | Push `main`                     | release-please, publication, documentation, notes, jalons                                                        |
| `docs.yml`             | Release, manuel                 | Référence + Storybook ; Pages si `PAGES_ENABLED=true`                                                            |
| `wiki.yml`             | Docs, issues, jalons, quotidien | Wiki FR/BM, backlog, feuille de route, tableau de bord                                                           |
| `labels.yml`           | `.github/labels.yml`            | Synchronisation des labels                                                                                       |
| `codeql.yml`           | Push, PR, hebdo                 | Analyse de sécurité (dépôt public ou GHAS)                                                                       |
| `stale.yml`            | Hebdo                           | Relance puis fermeture des issues inactives (hors jalons)                                                        |
| Dependabot             | Hebdo (lundi, Bamako)           | Mises à jour npm et Actions, groupées                                                                            |

## Accessibilité

`packages/react/src/test/a11y.test.tsx` rend **chaque story** dans les thèmes anthracite et papier et l'audite avec axe-core ; toute violation fait échouer `pnpm test`, donc la CI. Le contraste des couleurs n'est pas mesurable dans jsdom : il relève de l'audit dédié (issue #22). Une nouvelle story est couverte automatiquement.

## Régression visuelle

Chaque story est capturée (thèmes anthracite et papier, mouvement réduit) et comparée aux références `packages/react/visual/__screenshots__`. Les références sont produites **uniquement en CI**, dans l'image Docker Playwright, pour un rendu de polices identique.

- Changement visuel voulu : _Actions → Visuel → Run workflow_, choisir la branche, cocher `update`. Le workflow committe les nouvelles captures sur la branche.
- Échec inattendu : télécharger l'artefact `rapport-visuel` (diff image par image).

## En local

`lefthook` exécute Prettier et ESLint sur les fichiers indexés, et commitlint sur le message. `pnpm check` reproduit la CI.

## Secrets et variables

| Nom                     | Type               | Rôle                                                         |
| ----------------------- | ------------------ | ------------------------------------------------------------ |
| `RELEASE_TOKEN`         | secret (optionnel) | PAT ou token d'App : la CI tourne aussi sur la PR de release |
| `PAGES_ENABLED`         | variable           | `true` pour déployer sur GitHub Pages                        |
| `CODE_SCANNING_ENABLED` | variable           | `true` pour CodeQL sur dépôt privé avec GHAS                 |

## Politique d'actions

Les workflows n'utilisent que des actions publiées par GitHub ou par des créateurs vérifiés (`actions/*`, `github/*`, `googleapis/release-please-action`). pnpm est installé par corepack (inclus dans Node), à la version du champ `packageManager`. Le dépôt fonctionne donc avec le réglage « Allow GitHub-owned and verified creators actions ».
