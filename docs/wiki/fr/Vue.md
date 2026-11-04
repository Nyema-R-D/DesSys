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

| React                                                                        | Vue                                                                                                                      |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `value` + `onChange`                                                         | `v-model` (`TextField`, `DateField`, `Select`, `Combobox`, `Checkbox`, `Switch`, `RadioGroup`, `Tabs`, `LanguageSwitch`) |
| `polygon` + `onChange` (`PolygonEditor`)                                     | `v-model:polygon`                                                                                                        |
| `page` + `onPageChange`                                                      | `v-model:page` (`Pagination`)                                                                                            |
| `open` + `onOpenChange`                                                      | `v-model:open` (`LabRow`), `@close` (`Dialog`, `Drawer`)                                                                 |
| `sort` + `onSortChange`                                                      | `v-model:sort` (`DataTable`)                                                                                             |
| props `ReactNode` (`actions`, `media`, `footer`, `extra`, `brand`, `action`) | slots nommés `#actions`, `#media`, `#footer`, `#extra`, `#brand`, `#action` (`Alert`)                                    |
| `AccordionItem.content`                                                      | slot nommé par section : `#<id>`                                                                                         |
| `TabItem.content`                                                            | slot nommé par onglet : `#<id>`                                                                                          |
| `DataTableColumn.cell`                                                       | slot `#cell-<key>="{ row }"`                                                                                             |
| `onSelect` (`Menu`)                                                          | `@select`                                                                                                                |
| `onFilesChange` (`FileUpload`)                                               | `@files-change`                                                                                                          |
| `onDismiss` (`Alert`)                                                        | `dismissible` + `@dismiss`                                                                                               |
| `useOnlineStatus()` → `boolean`                                              | `useOnlineStatus()` → `Ref<boolean>`                                                                                     |
| `ToastProvider` + `useToast()`                                               | idem (provide / inject)                                                                                                  |
| `LinkProvider component={…}`                                                 | `<LinkProvider :component="…">` ou `provideLinkComponent(…)` / `app.provide(linkComponentKey, …)`                        |
| `Icon icon={WifiOff}` (lucide-react)                                         | `<Icon :icon="WifiOff" />` (lucide-vue-next)                                                                             |

## Avec vue-router

L'adaptateur reçoit `href` en prop ; classe, `aria-current` et écouteurs lui arrivent en attributs, transmis automatiquement à l'élément racine de `RouterLink` :

```ts
import { defineComponent, h } from 'vue';
import { RouterLink } from 'vue-router';

export const NyemaRouterLink = defineComponent({
  props: { href: { type: String, required: true } },
  setup:
    (props, { slots }) =>
    () =>
      h(RouterLink, { to: props.href }, slots),
});
```

```vue
<LinkProvider :component="NyemaRouterLink"><RouterView /></LinkProvider>
```

## Garantie de parité

`packages/vue/src/test/parity.test.ts` rend chaque composant Vue côté serveur et compare son HTML (classes, attributs ARIA, structure) à celui du composant React avec les mêmes props. Toute divergence fait échouer la CI. Un composant Vue exporté sans cas de parité fait aussi échouer le test. 98 cas couvrent les 52 composants, dans leurs principaux états (ouvert/fermé, trié, vide, chargement, erreur, lien/bouton).
