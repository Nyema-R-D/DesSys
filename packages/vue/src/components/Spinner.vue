<script setup lang="ts">
import '@nyema-r-d/css/components/Progress.css';

/** Indicateur de chargement compact ; figé si le mouvement est réduit. */
withDefaults(defineProps<{ label?: string; size?: 'sm' | 'md' }>(), {
  label: 'Chargement',
  size: 'md',
});
</script>

<template>
  <span :class="['ny-spinner', `ny-spinner--${size}`]" role="status">
    <span class="ny-spinner__mark" aria-hidden="true" />
    <span class="ny-visually-hidden">{{ label }}</span>
  </span>
</template>
