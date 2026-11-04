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
        ├─ publication des packages sur GitHub Packages + archives .tgz jointes et attestées
        ├─ thème Keycloak : nyema-keycloak-theme-vX.Y.Z.jar joint et attesté
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

Le commit doit **modifier au moins un fichier** : la fusion en rebase de GitHub supprime les commits vides, et leur `Release-As` avec. Fusionnez ensuite la PR en **rebase** (le squash réécrit le message).

## Geler une version : la branche `next`

Quand une release attend une validation humaine (relecture, décision des fondateurs) et que le travail suivant a déjà commencé, les nouveautés ne doivent pas partir dans la release en attente. Exemple : la 1.0 attend la relecture du bamanankan (#23) pendant le développement de la v1.1.0.

1. Créer la branche `next` depuis `main`. La CI complète et CodeQL tournent sur ses push et ses PR.
2. Les PR de la version suivante ciblent `next`. Elles sont rattachées automatiquement au **deuxième** jalon ouvert (`v1.1.0`), celles de `main` au premier (`v1.0.0`).
3. `main` ne reçoit que ce qui concerne la release gelée (corrections, relecture), puis le `Release-As`.
4. Une fois la release publiée : PR `next` → `main`, fusionnée en **rebase** pour conserver chaque commit `feat`/`fix`. release-please ouvre alors la PR de la version suivante.
5. `next` n'est jamais supprimée : la règle de dépôt « Conserver next » l'empêche, y compris lors de la suppression automatique des branches fusionnées. Après chaque fusion vers `main`, la réaligner : `git push origin main:next`.

### Publier `next` avant la release gelée

Si l'attente se prolonge, le travail de `next` peut sortir en version mineure 0.x sans débloquer la version gelée. Exemple : la 1.0 attendant toujours #23, les nouveautés prévues pour la v1.1.0 sont publiées en **0.5.0**.

1. Rebaser `next` sur `main`, lancer `pnpm check`, ouvrir la PR `next` → `main` et la fusionner en **rebase**.
2. Fusionner sur `main` un commit non vide portant `Release-As: 0.5.0`. Sans ce pied, `bump-patch-for-minor-pre-major` donnerait une version de correctif (0.4.x).
3. La PR release-please passe en v0.5.0. La fusionner publie la version.
4. Réaligner `next` sur `main` tant que la release gelée reste en attente.

## Vérifier une archive

Chaque archive `.tgz` jointe à une release porte une attestation de build GitHub (GitHub Packages ne gère pas la provenance npm), à partir des releases suivant la v0.6.0 :

```bash
gh release download vX.Y.Z --repo Nyema-R-D/DesSys --pattern '*.tgz' --pattern '*.jar'
gh attestation verify nyema-r-d-react-X.Y.Z.tgz --repo Nyema-R-D/DesSys
gh attestation verify nyema-keycloak-theme-vX.Y.Z.jar --repo Nyema-R-D/DesSys
```
