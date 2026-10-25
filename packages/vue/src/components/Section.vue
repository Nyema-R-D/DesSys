<script setup lang="ts">
import '@nyema-r-d/css/components/Layout.css';
import SectionLabel from './SectionLabel.vue';

withDefaults(defineProps<{ index?: string | number; label?: string; stacked?: boolean }>(), {
  stacked: false,
});
</script>

<template>
  <section :class="['ny-section', stacked && 'ny-section--stacked']">
    <SectionLabel v-if="label != null" as="h2" :index="index" class="ny-section__index">{{
      label
    }}</SectionLabel>
    <div class="ny-section__content"><slot /></div>
  </section>
</template>
