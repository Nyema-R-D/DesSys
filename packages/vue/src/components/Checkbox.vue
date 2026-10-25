<script setup lang="ts">
import '@nyema-r-d/css/components/Checkbox.css';
import { computed, useAttrs, useId } from 'vue';

defineOptions({ inheritAttrs: false });
const props = defineProps<{ label?: string; error?: string; id?: string }>();
const model = defineModel<boolean>();
const attrs = useAttrs();
const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const inputAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div :class="['ny-checkbox', attrs.class]">
    <label class="ny-checkbox__control" :for="inputId">
      <input
        v-bind="inputAttrs"
        :id="inputId"
        v-model="model"
        type="checkbox"
        class="ny-checkbox__input ny-focusable"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="error ? `${inputId}-error` : undefined"
      /><span
        ><slot>{{ label }}</slot></span
      >
    </label>
    <span v-if="error" :id="`${inputId}-error`" class="ny-field__error" role="alert">{{
      error
    }}</span>
  </div>
</template>
