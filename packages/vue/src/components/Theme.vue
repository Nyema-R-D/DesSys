<script setup lang="ts">
import '@nyema-r-d/css/base.css';

export type ThemeName = 'anthracite' | 'paper';
withDefaults(defineProps<{ theme?: ThemeName }>(), { theme: 'anthracite' });
</script>

<template>
  <!-- Racine de thème : tokens sémantiques, typographie et anneau de focus pour les enfants. -->
  <div :data-ny-theme="theme" class="ny-root"><slot /></div>
</template>
