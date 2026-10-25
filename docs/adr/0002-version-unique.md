# ADR 0002 — Une version unique pour tout le système

- Statut : accepté · 2026-10-25

## Décision

Tous les packages partagent un seul numéro SemVer, un tag `vX.Y.Z`, un CHANGELOG et un jalon GitHub. release-please (composant racine + `extra-files`) bumpe chaque `package.json`.

## Raisons

Les produits NYEMA déclarent une seule version de design system ; jalons, releases, wiki et backlog restent alignés 1 pour 1.

## Coût

Un correctif de tokens publie aussi une nouvelle version de `@nyema-r-d/react` (sans changement de code). Accepté.
