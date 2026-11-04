<script setup lang="ts">
import { useLinkComponent } from '../link';

/**
 * Lien interne des composants : `<a>` par défaut, composant de `LinkProvider` sinon. Sans href
 * (bouton désactivé), pas de navigation : un `<a>` simple suffit.
 */
defineProps<{ href?: string }>();
const link = useLinkComponent();
</script>

<template>
  <component :is="href === undefined ? 'a' : link" :href="href"><slot /></component>
</template>
