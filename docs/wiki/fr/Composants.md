# Composants

Package `@nyema-r-d/react`. Catalogue interactif : Storybook (`pnpm storybook`, ou l'archive `documentation-vX.Y.Z.zip` jointe à chaque release).

| Composant              | Rôle                 | Points clés                                                                                                    |
| ---------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Theme`                | Racine de thème      | `theme="anthracite" \| "paper"`, imbriquable                                                                   |
| `Mark`                 | Symbole NYEMA        | `tone="auto" \| "on-laterite" \| "mono"`, 16 px minimum, décoratif sans `title`                                |
| `Logo`                 | Symbole + logotype   | Archivo 700, chasse 118 %, +0,04em                                                                             |
| `Button`               | Action               | `variant="primary" \| "inverse" \| "secondary" \| "link"`, `size="md" \| "lg"`, `href` → `<a>`, `trailing="→"` |
| `StatusBadge`          | Statut produit       | `status="research" \| "prototype" \| "pilot" \| "available"`, `locale="fr" \| "bm"`                            |
| `TextField`            | Saisie               | `label`, `error` (annoncé), `hint`, `multiline`                                                                |
| `Chip`, `ChipGroup`    | Sélection            | `selected` → `aria-pressed`                                                                                    |
| `SectionLabel`         | Label mono           | `index` (« 02 — »), `node` (carré-nœud)                                                                        |
| `LabRow`               | Ligne de laboratoire | code, titre, statut, contenu dépliable (+ / −)                                                                 |
| `PillarCard`           | Carte de pilier      | index « /02 », titre, description, `href` optionnel                                                            |
| `SignalGrid`           | Motif de signaux     | 7 % latérite / 17 % papier, `animated` (respecte `prefers-reduced-motion`)                                     |
| `Container`, `Section` | Mise en page         | 1360 px ; index 1/4 + contenu 3/4, une colonne sous 900 px                                                     |

## Exemple

```tsx
<Section index={3} label="Laboratoire">
  <LabRow code="OFFLINE" title="Moteur de synchronisation hors ligne" status="research">
    Un agent de terrain enregistre ses visites sans connexion.
  </LabRow>
</Section>
```

## Ajouter un composant

Ouvrez une issue « Nouveau composant ». Définition de terminé : composant + CSS à base de tokens, tests, story (deux thèmes, a11y sans erreur), export dans `src/index.ts`, page wiki mise à jour.
