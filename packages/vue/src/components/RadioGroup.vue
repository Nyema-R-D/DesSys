<script setup lang="ts">
import '@nyema-r-d/css/components/Checkbox.css';
import '@nyema-r-d/css/components/TextField.css';
import '@nyema-r-d/css/components/RadioGroup.css';
import { computed, useId } from 'vue';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    legend: string;
    options: RadioOption[];
    name?: string;
    required?: boolean;
    error?: string;
    orientation?: 'vertical' | 'horizontal';
  }>(),
  { orientation: 'vertical' },
);
const model = defineModel<string>();
const generatedName = useId();
const groupName = computed(() => props.name ?? generatedName);
const errorId = computed(() => (props.error ? `${groupName.value}-error` : undefined));
</script>

<template>
  <fieldset
    :class="['ny-radio-group', orientation === 'horizontal' && 'ny-radio-group--horizontal']"
    :aria-describedby="errorId"
    :aria-invalid="error ? 'true' : undefined"
  >
    <legend class="ny-field__label ny-radio-group__legend">
      {{ legend }}<template v-if="required"> *</template>
    </legend>
    <div class="ny-radio-group__options">
      <label v-for="option in options" :key="option.value" class="ny-radio">
        <input
          v-model="model"
          type="radio"
          class="ny-radio__input ny-focusable"
          :name="groupName"
          :value="option.value"
          :disabled="option.disabled"
          :required="required"
        /><span>{{ option.label }}</span>
      </label>
    </div>
    <span v-if="error" :id="errorId" class="ny-field__error" role="alert">{{ error }}</span>
  </fieldset>
</template>
