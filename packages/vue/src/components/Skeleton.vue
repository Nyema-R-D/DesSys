<script setup lang="ts">
import '@nyema-r-d/css/components/Skeleton.css';
import { computed } from 'vue';

/** Emplacement de chargement masqué aux lecteurs d'écran ; annoncez le chargement avec aria-busy. */
const props = defineProps<{ width?: string; height?: string; lines?: number }>();
const style = (vars: Record<string, string | undefined>) => {
  const defined = Object.entries(vars).filter(([, v]) => v !== undefined);
  return defined.length ? { style: Object.fromEntries(defined) } : {};
};
const textStyle = computed(() => style({ '--ny-skeleton-width': props.width }));
const blockStyle = computed(() =>
  style({ '--ny-skeleton-width': props.width, '--ny-skeleton-height': props.height }),
);
</script>

<template>
  <span v-if="lines && lines > 1" class="ny-skeleton-text" v-bind="textStyle" aria-hidden="true">
    <span v-for="index in lines" :key="index" class="ny-skeleton"></span>
  </span>
  <span v-else class="ny-skeleton" v-bind="blockStyle" aria-hidden="true"></span>
</template>
