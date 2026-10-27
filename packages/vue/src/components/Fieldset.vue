<script setup lang="ts">
import '@nyema-r-d/css/components/TextField.css';
import '@nyema-r-d/css/components/Form.css';
import { computed, useId } from 'vue';

const props = defineProps<{ legend?: string; description?: string; error?: string; id?: string }>();
const generatedId = useId();
const baseId = computed(() => props.id ?? generatedId);
const describedBy = computed(
  () =>
    [props.description && `${baseId.value}-description`, props.error && `${baseId.value}-error`]
      .filter(Boolean)
      .join(' ') || undefined,
);
</script>

<template>
  <fieldset :id="id" class="ny-fieldset" :aria-describedby="describedBy">
    <legend class="ny-fieldset__legend">
      <slot name="legend">{{ legend }}</slot>
    </legend>
    <p v-if="description" :id="`${baseId}-description`" class="ny-fieldset__description">
      {{ description }}
    </p>
    <div class="ny-fieldset__body"><slot /></div>
    <span v-if="error" :id="`${baseId}-error`" class="ny-field__error" role="alert">{{
      error
    }}</span>
  </fieldset>
</template>
