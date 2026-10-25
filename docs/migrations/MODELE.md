# Migration vers vX.0.0 · _vX.0.0 ka taa_

> Copier ce modèle en `docs/migrations/vX.md`. Une section par API retirée, dans l'ordre du CHANGELOG.

## Résumé · _A kɔrɔ_

| API retirée              | Dépréciée en | Remplaçant            | Effort                 |
| ------------------------ | ------------ | --------------------- | ---------------------- |
| `Button variant="ghost"` | v1.3.0       | `variant="secondary"` | rechercher / remplacer |

## `Button variant="ghost"`

**Pourquoi** — …

**Avant**

```tsx
<Button variant="ghost">Annuler</Button>
```

**Après**

```tsx
<Button variant="secondary">Annuler</Button>
```

**Vérifier** — aucune occurrence de `variant="ghost"` (`grep -rn 'variant="ghost"' src`), aucun avertissement `[NYEMA]` en console.
