<script setup lang="ts">
import '@nyema-r-d/css/components/SignalGrid.css';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { createSignalPattern } from '../utils';

const props = withDefaults(
  defineProps<{ columns?: number; rows?: number; animated?: boolean; seed?: number }>(),
  {
    columns: 16,
    rows: 4,
    animated: false,
    seed: 7,
  },
);
const tick = ref(0);
let timer: number | undefined;
onMounted(() => {
  if (!props.animated || window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  timer = window.setInterval(() => tick.value++, 1800);
});
onBeforeUnmount(() => window.clearInterval(timer));
const pattern = computed(() =>
  createSignalPattern(props.columns * props.rows, props.seed + tick.value),
);
</script>

<template>
  <div class="ny-signal-grid" :style="{ '--ny-signal-columns': columns }" aria-hidden="true">
    <div v-for="(state, i) in pattern" :key="i" class="ny-signal-grid__cell" :data-state="state" />
  </div>
</template>
