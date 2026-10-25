# @nyema-r-d/config

Configuration partagée de l'écosystème NYEMA. · _NYEMA baarakɛminɛnw ka labɛn min bɛ tila._

```jsonc
// tsconfig.json
{ "extends": "@nyema-r-d/config/tsconfig/react-library.json" }
```

```js
// eslint.config.js
import nyema from '@nyema-r-d/config/eslint';
export default [...nyema];
```

```jsonc
// .prettierrc.json
"@nyema-r-d/config/prettier"
```

```js
// commitlint.config.js
export { default } from '@nyema-r-d/config/commitlint';
```
