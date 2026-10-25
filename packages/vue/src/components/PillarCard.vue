<script setup lang="ts">
import '@nyema-r-d/css/components/PillarCard.css';

withDefaults(
  defineProps<{
    index: number | string;
    title: string;
    description?: string;
    href?: string;
    headingLevel?: 2 | 3 | 4;
  }>(),
  { headingLevel: 3 },
);
</script>

<template>
  <component
    :is="href ? 'a' : 'article'"
    :href="href"
    :class="['ny-pillar-card', href && 'ny-focusable']"
  >
    <div class="ny-pillar-card__index">/{{ String(index).padStart(2, '0') }}</div>
    <component :is="`h${headingLevel}`" class="ny-pillar-card__title">{{ title }}</component>
    <p v-if="description" class="ny-pillar-card__description">{{ description }}</p>
  </component>
</template>
