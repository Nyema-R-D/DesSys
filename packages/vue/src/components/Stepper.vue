<script setup lang="ts">
import '@nyema-r-d/css/components/Stepper.css';
import { computed } from 'vue';

export interface StepperStep {
  id: string;
  label: string;
}

/** Étapes d'un formulaire long : index mono, étape courante en `aria-current="step"`. */
const props = withDefaults(
  defineProps<{ steps: StepperStep[]; current: string; label?: string; doneLabel?: string }>(),
  { label: 'Étapes', doneLabel: 'terminée' },
);
const position = computed(() => props.steps.findIndex((step) => step.id === props.current));
const state = (index: number) =>
  index < position.value ? 'done' : index === position.value ? 'current' : 'upcoming';
</script>

<template>
  <nav :aria-label="label" class="ny-stepper">
    <ol class="ny-stepper__list">
      <li
        v-for="(step, index) in steps"
        :key="step.id"
        :class="`ny-stepper__step ny-stepper__step--${state(index)}`"
        :aria-current="state(index) === 'current' ? 'step' : undefined"
      >
        <span class="ny-stepper__index" aria-hidden="true">{{
          String(index + 1).padStart(2, '0')
        }}</span>
        <span class="ny-stepper__label"
          >{{ step.label
          }}<span v-if="state(index) === 'done'" class="ny-visually-hidden">
            ({{ doneLabel }})</span
          ></span
        >
      </li>
    </ol>
  </nav>
</template>
