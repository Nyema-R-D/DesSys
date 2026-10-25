# Vue

Package `@nyema-r-d/vue` (Vue 3.5+). Mêmes classes, même HTML et même CSS (`@nyema-r-d/css`) que `@nyema-r-d/react`.

```bash
pnpm add @nyema-r-d/vue @nyema-r-d/tokens
```

```vue
<script setup lang="ts">
import '@nyema-r-d/tokens/fonts-local.css';
import '@nyema-r-d/tokens/tokens.css';
import '@nyema-r-d/vue/styles.css';
import { ref } from 'vue';
import { Theme, Button, TextField, StatusBadge } from '@nyema-r-d/vue';

const nom = ref('');
</script>

<template>
  <Theme theme="anthracite">
    <TextField v-model="nom" label="Nom" required />
    <Button trailing="→">Parler d’un projet</Button>
    <StatusBadge status="prototype" />
  </Theme>
</template>
```

## Composants disponibles (v0.3.0)

`Theme`, `Mark`, `Logo`, `Button` (slot `trailing`), `StatusBadge`, `TextField` (`v-model`), `Select` (`v-model`), `Checkbox` (`v-model`), `Chip`, `ChipGroup`, `SectionLabel`, `Tag`, `TagList`, `ConnectionStatus`, `Container`, `Section`.

Les autres composants arrivent avant la 1.0 (issue « parité complète »). En attendant, la structure HTML de Storybook + `@nyema-r-d/css` permet de les reproduire.

## Garantie de parité

`packages/vue/src/test/parity.test.ts` rend chaque composant Vue côté serveur et compare son HTML (classes, attributs ARIA, structure) à celui du composant React avec les mêmes props. Toute divergence fait échouer la CI. Un composant Vue exporté sans cas de parité fait aussi échouer le test.
