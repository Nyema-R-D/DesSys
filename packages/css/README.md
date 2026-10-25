# @nyema-r-d/css

CSS des composants NYEMA, indépendant du framework : classes `ny-` utilisées par `@nyema-r-d/react` et `@nyema-r-d/vue`, et utilisables en HTML pur. · _NYEMA komponanw ka CSS._

```html
<link rel="stylesheet" href="@nyema-r-d/tokens/dist/tokens.css" />
<link rel="stylesheet" href="@nyema-r-d/css/dist/styles.css" />

<div class="ny-root" data-ny-theme="anthracite">
  <a class="ny-button ny-button--primary ny-focusable" href="/contact"
    >Parler d’un projet <span aria-hidden="true">→</span></a
  >
</div>
```

- `styles.css` — tout ; `base.css` + `components/<Composant>.css` — à la carte.
- La structure HTML attendue par chaque composant est celle rendue par les packages React et Vue (voir Storybook).
