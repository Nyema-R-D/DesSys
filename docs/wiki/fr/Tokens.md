# Tokens

Source : `packages/tokens/src/tokens.json`. Le build génère `tokens.css`, `index.js` + `index.d.ts`, `tokens.json`. Ne jamais modifier `dist/`.

## Couleurs primitives

| Token                       | Valeur                                                                        | Usage                                          |
| --------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------- |
| `--ny-ink-950`              | `#0E0F0E`                                                                     | Fond du site, texte sur papier et sur latérite |
| `--ny-ink-900`              | `#161816`                                                                     | Surfaces surélevées, survol                    |
| `--ny-ink-800`              | `#202321`                                                                     | Désactivé                                      |
| `--ny-ink-700`              | `#2E322F`                                                                     | Filets forts                                   |
| `--ny-ink-650`              | `#3C403D`                                                                     | Texte secondaire (papier)                      |
| `--ny-ink-600`              | `#5A5F5B`                                                                     | Texte tertiaire (papier)                       |
| `--ny-ink-500`              | `#6B706C`                                                                     | Texte tertiaire (anthracite)                   |
| `--ny-ink-300`              | `#A2A7A3`                                                                     | Texte secondaire (anthracite)                  |
| `--ny-paper-50/100/200`     | `#F8F7F3` `#F2F0EA` `#E4E1D8`                                                 | Documents                                      |
| `--ny-laterite-400/500/600` | `#EE7A4B` `#E2602E` `#C24A1C`                                                 | **Accent unique**                              |
| `--ny-status-*`             | research `#7FA6E0`, prototype `#D9B04E`, pilot `#E2602E`, available `#5FC08A` | **Badges uniquement**                          |

## Tokens sémantiques (par thème)

`--surface-page`, `--surface-raised`, `--surface-inverse`, `--surface-disabled`, `--text-primary`, `--text-secondary`, `--text-tertiary`, `--text-inverse`, `--text-on-accent`, `--line-hairline`, `--line-subtle`, `--line-strong`, `--line-contrast`, `--accent`, `--accent-hover`, `--accent-text`, `--danger`, `--status-research`, `--status-prototype`, `--status-pilot`, `--status-available`.

Les couleurs de statut sont assombries en thème papier (#3D6FB8, #A07A16, #C24A1C, #2E9E62) pour rester visibles sur fond clair (contraste ≥ 3:1).

Utilisez toujours les tokens sémantiques dans les composants : ils changent avec `data-ny-theme`.

## Typographie

| Token            | Valeur                                                  |
| ---------------- | ------------------------------------------------------- |
| `--type-display` | 600 clamp(48px, 8.4vw, 128px)/0.92                      |
| `--type-h1`      | 600 clamp(40px, 5vw, 72px)/1                            |
| `--type-h2`      | 600 clamp(30px, 3.4vw, 48px)/1.05                       |
| `--type-h3`      | 600 24px/1.2                                            |
| `--type-body-lg` | 400 20px/1.5                                            |
| `--type-body`    | 400 17px/1.55                                           |
| `--type-small`   | 400 14px/1.5                                            |
| `--type-label`   | 500 12px/1.3 mono, `--tracking-label` .08em, majuscules |

Chasse (`font-stretch`) : `--stretch-display` 118 %, `--stretch-heading` 110 %, `--stretch-title` 108 %, `--stretch-body` 100 %.

## Espacement, formes, mouvement

- `--space-1` … `--space-10` : 4, 8, 12, 16, 24, 32, 48, 64, 96, 144 px.
- `--radius-0` 0, `--radius-1` 2 px (maximum).
- `--container` 1360 px, `--gutter` clamp(20px, 4vw, 56px).
- `--control-nav` 40, `--control-field` 48, `--control-cta` 52, `--control-cta-lg` 56 px.
- `--dur-fast` 140 ms, `--dur-base` 240 ms, `--dur-slow` 600 ms, `--ease-out` cubic-bezier(.2,.7,.2,1).
- Focus : `--focus-ring-width` 2 px, `--focus-ring-offset` 2 px, `--focus-ring-color` latérite.
