# Versionnage et publication

## Une version pour tout le système

Les packages `@nyema-r-d/tokens`, `@nyema-r-d/react` et `@nyema-r-d/config` partagent **un seul numéro de version** (SemVer), un seul tag (`v0.0.1`) et un seul [CHANGELOG](https://github.com/Nyema-R-D/DesSys/blob/main/CHANGELOG.md). Un produit NYEMA déclare donc « design system v0.0.1 », sans matrice de compatibilité.

## Du commit à la release

```
commit conventionnel → PR (squash) → main
        └─ release-please met à jour la PR « chore(release): vX.Y.Z »
              (version dans chaque package.json + CHANGELOG bilingue)
fusion de la PR de release
        ├─ tag vX.Y.Z + release GitHub (notes = CHANGELOG + en-tête FR/BM)
        ├─ publication des packages sur GitHub Packages + archives .tgz jointes
        ├─ documentation (référence + Storybook) jointe, déployée sur Pages si activé
        ├─ issues du jalon vX.Y.Z commentées « Livré dans… », jalon fermé
        └─ wiki, backlog, feuille de route et tableau de bord régénérés
```

## Règles de version

Avant 1.0 : `feat` et `fix` → patch, changement cassant → mineure. À partir de 1.0 : SemVer standard.

## Jalons

Un jalon par version (`v0.0.1`, `v0.1.0`…). Chaque PR sans jalon est rattachée au prochain jalon ouvert. Une issue ajoutée à un jalon passe en `status:ready`.

## Forcer une version

Quand un jalon se termine (ex. `v0.1.0` alors que les `feat` donneraient `0.0.x`), ajoutez `Release-As: X.Y.Z` dans **le dernier paragraphe** du message de commit, avec les autres pieds (`Co-Authored-By`, `Closes`). Un `Release-As` suivi d'un autre paragraphe est ignoré :

```text
chore(release): aligne la version sur le jalon v0.1.0

Release-As: 0.1.0
Co-Authored-By: …
```

Fusionnez ensuite la PR en **rebase** (le squash réécrit le message).
