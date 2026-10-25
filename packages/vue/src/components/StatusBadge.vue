<script setup lang="ts">
import '@nyema-r-d/css/components/StatusBadge.css';
import { statusLabels, type Locale, type ProductStatus } from '../utils';

withDefaults(
  defineProps<{ status: ProductStatus; locale?: Locale; variant?: 'outline' | 'plain' }>(),
  {
    locale: 'fr',
    variant: 'outline',
  },
);
</script>

<template>
  <span
    :class="[
      'ny-status-badge',
      `ny-status-badge--${status}`,
      variant === 'plain' && 'ny-status-badge--plain',
    ]"
  >
    <span class="ny-status-badge__dot" aria-hidden="true" /><slot>{{
      statusLabels[locale][status]
    }}</slot>
  </span>
</template>
