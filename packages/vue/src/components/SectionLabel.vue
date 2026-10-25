<script setup lang="ts">
import '@nyema-r-d/css/components/SectionLabel.css';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    index?: string | number;
    node?: boolean;
    as?: 'div' | 'p' | 'span' | 'h2' | 'h3';
  }>(),
  { node: false, as: 'div' },
);
const prefix = computed(() =>
  props.index === undefined ? '' : `${String(props.index).padStart(2, '0')} — `,
);
</script>

<template>
  <component :is="as" class="ny-section-label">
    <span v-if="node" class="ny-section-label__node" aria-hidden="true" /><span
      >{{ prefix }}<slot
    /></span>
  </component>
</template>
