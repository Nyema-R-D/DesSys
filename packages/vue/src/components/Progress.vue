<script lang="ts">
/** « 42 % » avec l'espace fine insécable du français. */
export const formatPercent = (value: number, max: number) =>
  `${Math.round((Math.min(Math.max(value, 0), max) / max) * 100)}\u202f%`;
</script>

<script setup lang="ts">
import '@nyema-r-d/css/components/TextField.css';
import '@nyema-r-d/css/components/Progress.css';
import { useId } from 'vue';

/** Barre de progression : `<progress>` natif nommé par son libellé ; sans `value`, indéterminée. */
withDefaults(
  defineProps<{
    label: string;
    value?: number;
    max?: number;
    /** Remplace le pourcentage affiché (ex. « 3 fichiers sur 5 »). */
    valueLabel?: string;
    hint?: string;
  }>(),
  { max: 100 },
);
const id = useId();
</script>

<template>
  <div class="ny-progress">
    <div class="ny-progress__header">
      <span :id="`${id}-label`" class="ny-progress__label">{{ label }}</span>
      <span
        v-if="value !== undefined || valueLabel"
        class="ny-progress__value"
        aria-hidden="true"
        >{{ valueLabel ?? formatPercent(value!, max) }}</span
      >
    </div>
    <progress
      class="ny-progress__bar"
      :aria-labelledby="`${id}-label`"
      :aria-describedby="hint ? `${id}-hint` : undefined"
      :max="max"
      :value="value"
    />
    <span v-if="hint" :id="`${id}-hint`" class="ny-field__hint">{{ hint }}</span>
  </div>
</template>
