<script setup lang="ts">
import '@nyema-r-d/css/components/Form.css';

/** Ligne de champs côte à côte ; `columns` est un maximum, chaque champ garde 220 px. */
defineProps<{ columns?: number }>();
</script>

<template>
  <div class="ny-form-row" v-bind="columns ? { style: { '--ny-form-row-columns': columns } } : {}">
    <slot />
  </div>
</template>
