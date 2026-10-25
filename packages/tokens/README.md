# @nyema-r-d/tokens

Tokens de design NYEMA, indépendants du framework. · _NYEMA ka tokens._

```js
import '@nyema-r-d/tokens/fonts-local.css';
import '@nyema-r-d/tokens/tokens.css';
import { tokens, themes } from '@nyema-r-d/tokens';
```

- `tokens.css` — variables CSS ; thème anthracite par défaut, `[data-ny-theme="paper"]` pour les documents.
- `fonts-local.css` + `fonts/` — polices embarquées (OFL), fonctionnent hors ligne ; `fonts.css` — variante Google Fonts.
- `tokens.json` — valeurs résolues.
- `assets/nyema-mark-{dark,light,laterite,mono-black,mono-white}.svg` — symbole.

Source : `src/tokens.json`. Documentation : wiki, page _Tokens_.
