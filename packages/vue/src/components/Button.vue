<script setup lang="ts">
import '@nyema-r-d/css/components/Button.css';
import { computed } from 'vue';

export type ButtonVariant = 'primary' | 'inverse' | 'secondary' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

const props = withDefaults(
  defineProps<{
    variant?: ButtonVariant;
    size?: ButtonSize;
    fullWidth?: boolean;
    /** Rendu en <a> si fourni. */
    href?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    /** Élément après le libellé (→, ↗) ; aussi disponible en slot « trailing ». */
    trailing?: string;
  }>(),
  { variant: 'primary', size: 'md', fullWidth: false, disabled: false, type: 'button' },
);

const classes = computed(() => [
  'ny-button',
  'ny-focusable',
  `ny-button--${props.variant}`,
  props.size !== 'md' && `ny-button--${props.size}`,
  props.fullWidth && 'ny-button--full',
]);
</script>

<template>
  <a
    v-if="href !== undefined"
    :class="classes"
    :href="disabled ? undefined : href"
    :aria-disabled="disabled ? 'true' : undefined"
    @click="disabled && $event.preventDefault()"
  >
    <slot /><span v-if="trailing != null || $slots.trailing" aria-hidden="true"
      ><slot name="trailing">{{ trailing }}</slot></span
    >
  </a>
  <button v-else :type="type" :class="classes" :disabled="disabled">
    <slot /><span v-if="trailing != null || $slots.trailing" aria-hidden="true"
      ><slot name="trailing">{{ trailing }}</slot></span
    >
  </button>
</template>
