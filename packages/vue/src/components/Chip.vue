<script setup lang="ts">
import '@nyema-r-d/css/components/Chip.css';

withDefaults(defineProps<{ selected?: boolean }>(), { selected: false });
</script>

<template>
  <button type="button" :aria-pressed="selected ? 'true' : 'false'" class="ny-chip ny-focusable">
    <slot />
  </button>
</template>
