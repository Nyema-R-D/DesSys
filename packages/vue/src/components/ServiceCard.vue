<script setup lang="ts">
import '@nyema-r-d/css/components/ServiceCard.css';
import type { Locale, ProductStatus } from '../utils';
import StatusBadge from './StatusBadge.vue';

withDefaults(
  defineProps<{
    code?: string;
    title: string;
    description?: string;
    status?: ProductStatus;
    locale?: Locale;
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
    :class="['ny-service-card', href && 'ny-focusable']"
  >
    <div class="ny-service-card__meta">
      <StatusBadge v-if="status" :status="status" :locale="locale" variant="plain" /><span
        v-else
      /><span v-if="code" class="ny-service-card__code">{{ code }}</span>
    </div>
    <div>
      <component :is="`h${headingLevel}`" class="ny-service-card__title">{{ title }}</component>
      <p v-if="description" class="ny-service-card__description">{{ description }}</p>
    </div>
  </component>
</template>
