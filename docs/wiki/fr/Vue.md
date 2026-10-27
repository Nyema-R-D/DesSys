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

## Composants

Tous les composants de `@nyema-r-d/react` existent en Vue, avec les adaptations idiomatiques suivantes :

| React                                                              | Vue                                                                                                          |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `value` + `onChange`                                               | `v-model` (`TextField`, `DateField`, `Select`, `Checkbox`, `Switch`, `RadioGroup`, `Tabs`, `LanguageSwitch`) |
| `page` + `onPageChange`                                            | `v-model:page` (`Pagination`)                                                                                |
| `open` + `onOpenChange`                                            | `v-model:open` (`LabRow`), `@close` (`Dialog`)                                                               |
| `sort` + `onSortChange`                                            | `v-model:sort` (`DataTable`)                                                                                 |
| props `ReactNode` (`actions`, `media`, `footer`, `extra`, `brand`) | slots nommés `#actions`, `#media`, `#footer`, `#extra`, `#brand`                                             |
| `TabItem.content`                                                  | slot nommé par onglet : `#<id>`                                                                              |
| `DataTableColumn.cell`                                             | slot `#cell-<key>="{ row }"`                                                                                 |
| `onFilesChange` (`FileUpload`)                                     | `@files-change`                                                                                              |
| `useOnlineStatus()` → `boolean`                                    | `useOnlineStatus()` → `Ref<boolean>`                                                                         |
| `ToastProvider` + `useToast()`                                     | idem (provide / inject)                                                                                      |
| `Icon icon={WifiOff}` (lucide-react)                               | `<Icon :icon="WifiOff" />` (lucide-vue-next)                                                                 |

## Garantie de parité

`packages/vue/src/test/parity.test.ts` rend chaque composant Vue côté serveur et compare son HTML (classes, attributs ARIA, structure) à celui du composant React avec les mêmes props. Toute divergence fait échouer la CI. Un composant Vue exporté sans cas de parité fait aussi échouer le test. 71 cas couvrent les 39 composants, dans leurs principaux états (ouvert/fermé, trié, vide, chargement, erreur, lien/bouton).
