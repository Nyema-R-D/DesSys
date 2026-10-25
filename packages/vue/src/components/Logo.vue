<script setup lang="ts">
import '@nyema-r-d/css/components/Logo.css';
import Mark, { type MarkTone } from './Mark.vue';

withDefaults(defineProps<{ size?: number; tone?: MarkTone }>(), { size: 24, tone: 'auto' });
</script>

<template>
  <span class="ny-logo" :style="{ '--ny-logo-size': `${size}px` }" role="img" aria-label="NYEMA">
    <Mark :size="size" :tone="tone" />
    <span class="ny-logo__wordmark" aria-hidden="true">NYEMA</span>
  </span>
</template>
