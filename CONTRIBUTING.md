# Contribuer · _Ka dɛmɛ_

## Flux de travail

1. Partir d'une issue (templates : anomalie, évolution, composant, décision de design). Toute issue arrive en `status:triage` ; l'ajout à un jalon la passe en `status:ready`.
2. Créer une branche : `feat/react-tabs`, `fix/tokens-contrast`…
3. Commits au format Conventional Commits, en français : `feat(react): ajoute le composant Tabs`.
4. Ouvrir une PR (titre conventionnel, `Closes #n`). Labels et jalon sont posés automatiquement.
5. Fusion en **squash** : le titre de la PR devient l'entrée du CHANGELOG.
6. release-please met à jour la PR de release ; sa fusion publie la version.

| Préfixe                                    | Effet sur la version (avant 1.0) | Section du CHANGELOG                                           |
| ------------------------------------------ | -------------------------------- | -------------------------------------------------------------- |
| `feat:`                                    | patch (0.0.x)                    | Nouveautés · Fɛn kuraw                                         |
| `fix:` / `perf:`                           | patch                            | Corrections · Latilenniw / Performances                        |
| `deprecate:`                               | patch (mineure après 1.0)        | Dépréciations · A tɛna mɛn — voir la politique de dépréciation |
| `feat!:` ou `BREAKING CHANGE:`             | mineure (0.x.0)                  | idem + ⚠                                                       |
| `docs:` `ci:` `build:` `refactor:` `deps:` | patch                            | sections dédiées                                               |
| `test:` `style:` `chore:`                  | aucune                           | masqué                                                         |

Après 1.0 : `feat` → mineure, `fix` → patch, cassant → majeure.

## Règles du système

- Toujours passer par les tokens (`var(--accent)`, `var(--space-4)`) ; aucune couleur codée en dur dans un composant.
- Un composant = `packages/css/src/components/Composant.css` (partagé) + `Composant.tsx`, `Composant.test.tsx`, `Composant.stories.tsx` dans `packages/react`, exporté depuis `src/index.ts`.
- Classes CSS préfixées `ny-`, BEM léger (`ny-lab-row__title`).
- Accessibilité : contraste AA, focus visible, clavier. Chaque story est auditée par axe-core dans les deux thèmes (`pnpm test`) ; l'addon a11y de Storybook est en mode erreur.
- Ton : français, vouvoiement, phrases déclaratives, aucun produit annoncé « disponible » sans l'être.

## Langues

Le français fait foi. Toute page de `docs/wiki/fr` a son équivalent dans `docs/wiki/bm` (préfixe `BM-`). Si vous ne pouvez pas traduire, ouvrez une issue `i18n:bm`.

---

## Bamanankan

1. Baara bɛɛ bɛ daminɛ issue dɔ la.
2. Branche kura dilan : `feat/…` walima `fix/…`.
3. Commit sɛbɛn _Conventional Commits_ cogo la.
4. PR dayɛlɛ, `Closes #n` sɛbɛn a kɔnɔ.
5. PR bɛ fara ɲɔgɔn kan _squash_ cogo la.
6. _release-please_ bɛ version kura labɛn otomatiki la.

Tubabukan de ye sɛbɛn fɔlɔ ye. Ni i tɛ se ka bamanankan sɛbɛn, issue `i18n:bm` dayɛlɛ.
