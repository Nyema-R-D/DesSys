# Source Claude Design

Projet : « Système de design NYEMA complet » (`e0b39f0c-e6c4-4764-bf01-85e271387748`), fichiers de référence `Design System.dc.html` et `Site NYEMA.dc.html`.

- [`marque.md`](marque.md) — notes de marque d'origine (fondamentaux de contenu, fondations visuelles, iconographie).
- [`SKILL.md`](SKILL.md) — skill Claude « nyema-design » d'origine.

## Correspondance design → code

| Claude Design | Dépôt |
|---|---|
| `tokens/colors.css`, `typography.css`, `spacing.css` | `packages/tokens/src/tokens.json` |
| `assets/nyema-mark-*.svg` | `packages/tokens/assets/` |
| Section « Composants » de `Design System.dc.html` | `packages/css` + `packages/react` (+ `packages/vue`) |
| `Design System.dc.html` | `apps/reference` |
| `Site NYEMA.dc.html` | composants `SiteHeader`, `Hero`, `SiteFooter`, `ServiceCard`, `Tag`, formulaires — le site lui-même vit dans son propre dépôt |

## Écarts assumés

Marque validée par les fondateurs le 25/10/2026 (#20), écarts compris :

- `ink-600` (#5A5F5B) et `ink-650` (#3C403D), utilisés par la page de référence ;
- `ink-400` (#7C827D) et `laterite-600` assombri à #BC481B, pour le contraste AA (#22) ;
- thème papier sémantique dérivé, couleurs de statut assombries sur papier ;
- survol primaire en latérite 400 dans les deux thèmes ;
- échelle typographique : celle de la page de référence fait foi (#21) ;
- bordures des contrôles interactifs sur un token dédié `--line-control` à 3:1 (#41).
