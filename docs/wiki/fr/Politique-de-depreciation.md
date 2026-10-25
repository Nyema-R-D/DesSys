# Politique de dépréciation

Objectif : aucun produit NYEMA ne casse lors d'une mise à jour **mineure** ou **corrective** du système de design.

## Règles (à partir de 1.0)

1. **Annoncer** — une API (composant, prop, token, classe CSS) est dépréciée dans une version **mineure**, jamais retirée dans la même.
2. **Avertir** — le code déprécié appelle `warnDeprecated()` : un avertissement par API, en développement uniquement, avec le remplaçant et la version de retrait.
3. **Accompagner** — chaque dépréciation a un remplaçant disponible **dans la même version** et une entrée dans le guide de migration de la prochaine majeure.
4. **Durée** — l'API reste disponible au moins **une version mineure complète et 3 mois**, puis est retirée **uniquement à la majeure suivante**.
5. **Tracer** — le commit utilise le type `deprecate:` ; il apparaît dans la section _Dépréciations_ du CHANGELOG et des notes de release.

Avant 1.0, les versions 0.x peuvent encore changer d'API en version mineure (signalé `!` / `BREAKING CHANGE`), mais la même discipline est appliquée autant que possible.

## Dans le code

```ts
import { warnDeprecated } from '@nyema-r-d/react'; // ou '@nyema-r-d/vue'

if (variant === 'ghost') {
  warnDeprecated('Button variant="ghost"', {
    replacement: 'variant="secondary"',
    removal: 'v2.0.0',
    guide: 'https://github.com/Nyema-R-D/DesSys/blob/main/docs/migrations/v2.md',
  });
}
```

Pour un token : conserver l'ancien nom comme alias du nouveau dans `tokens.json` jusqu'à la majeure, et le lister dans le guide de migration.

## Commit

```text
deprecate(react): déprécie Button variant="ghost" au profit de secondary

Retrait prévu en v2.0.0. Guide : docs/migrations/v2.md
```

## Guide de migration

Copier `docs/migrations/MODELE.md` en `docs/migrations/vX.md` dès la première dépréciation visant la majeure X.
