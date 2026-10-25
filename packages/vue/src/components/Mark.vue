<script setup lang="ts">
import { computed } from 'vue';

export type MarkTone = 'auto' | 'on-laterite' | 'mono';
const props = withDefaults(defineProps<{ size?: number; tone?: MarkTone; title?: string }>(), {
  size: 24,
  tone: 'auto',
});
const px = computed(() => Math.max(props.size, 16));
const body = computed(() => (props.tone === 'on-laterite' ? 'var(--ny-ink-950)' : 'currentColor'));
const node = computed(() =>
  props.tone === 'mono'
    ? 'currentColor'
    : props.tone === 'on-laterite'
      ? 'var(--ny-paper-100)'
      : 'var(--accent)',
);
</script>

<template>
  <svg
    :width="px"
    :height="px"
    viewBox="0 0 48 48"
    class="ny-mark"
    :role="title ? 'img' : undefined"
    :aria-hidden="title ? undefined : 'true'"
  >
    <title v-if="title">{{ title }}</title>
    <rect x="6" y="6" width="9" height="36" :fill="body" />
    <polygon points="6,6 15,6 42,42 33,42" :fill="body" />
    <rect x="33" y="18" width="9" height="24" :fill="body" />
    <rect x="33" y="6" width="9" height="9" :fill="node" data-part="node" />
  </svg>
</template>
