<script setup lang="ts">
import '@nyema-r-d/css/components/Icon.css';
import type { Component } from 'vue';

export type IconSize = 16 | 20 | 24 | 32;
withDefaults(defineProps<{ icon: Component; size?: IconSize; label?: string }>(), { size: 20 });
</script>

<template>
  <!-- Adaptateur Lucide (lucide-vue-next) : trait 1,5 px constant, décorative sans label. -->
  <component
    :is="icon"
    :size="size"
    :stroke-width="1.5"
    absolute-stroke-width
    class="ny-icon"
    :role="label ? 'img' : undefined"
    :aria-label="label"
    :aria-hidden="label ? undefined : 'true'"
    focusable="false"
  />
</template>
