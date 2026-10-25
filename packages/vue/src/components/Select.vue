<script setup lang="ts">
import '@nyema-r-d/css/components/TextField.css';
import '@nyema-r-d/css/components/Select.css';
import { computed, useAttrs, useId } from 'vue';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

defineOptions({ inheritAttrs: false });
const props = defineProps<{
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  id?: string;
}>();
const model = defineModel<string>();
const attrs = useAttrs();
const generatedId = useId();
const selectId = computed(() => props.id ?? generatedId);
const describedBy = computed(
  () =>
    [props.hint && `${selectId.value}-hint`, props.error && `${selectId.value}-error`]
      .filter(Boolean)
      .join(' ') || undefined,
);
const selectAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div :class="['ny-field', attrs.class]">
    <label class="ny-field__label" :for="selectId"
      >{{ label }}<template v-if="required"> *</template></label
    >
    <select
      v-bind="selectAttrs"
      :id="selectId"
      v-model="model"
      :required="required"
      class="ny-field__input ny-select"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
    >
      <option v-if="placeholder !== undefined" value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>
    <span v-if="hint" :id="`${selectId}-hint`" class="ny-field__hint">{{ hint }}</span>
    <span v-if="error" :id="`${selectId}-error`" class="ny-field__error" role="alert">{{
      error
    }}</span>
  </div>
</template>
