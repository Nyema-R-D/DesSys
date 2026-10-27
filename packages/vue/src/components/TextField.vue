<script setup lang="ts">
import '@nyema-r-d/css/components/TextField.css';
import { computed, useAttrs, useId } from 'vue';

defineOptions({ inheritAttrs: false });
const props = defineProps<{
  label: string;
  error?: string;
  hint?: string;
  multiline?: boolean;
  required?: boolean;
  id?: string;
  /** Affiche « n / maxlength » sous le champ (requiert l'attribut `maxlength`). */
  showCount?: boolean;
}>();
const model = defineModel<string>();
const attrs = useAttrs();
const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const maxLength = computed(() => attrs.maxlength ?? attrs.maxLength);
const counted = computed(() => props.showCount && maxLength.value !== undefined);
const describedBy = computed(
  () =>
    [
      props.hint && `${inputId.value}-hint`,
      counted.value && `${inputId.value}-count`,
      props.error && `${inputId.value}-error`,
    ]
      .filter(Boolean)
      .join(' ') || undefined,
);
const inputAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
</script>

<template>
  <div :class="['ny-field', attrs.class]">
    <label class="ny-field__label" :for="inputId"
      >{{ label }}<template v-if="required"> *</template></label
    >
    <textarea
      v-if="multiline"
      v-bind="inputAttrs"
      :id="inputId"
      v-model="model"
      :required="required"
      class="ny-field__input"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
    />
    <input
      v-else
      v-bind="inputAttrs"
      :id="inputId"
      v-model="model"
      :required="required"
      class="ny-field__input"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="describedBy"
    />
    <span v-if="hint" :id="`${inputId}-hint`" class="ny-field__hint">{{ hint }}</span>
    <span v-if="counted" :id="`${inputId}-count`" class="ny-field__count"
      >{{ (model ?? '').length }} / {{ maxLength }}</span
    >
    <span v-if="error" :id="`${inputId}-error`" class="ny-field__error" role="alert">{{
      error
    }}</span>
  </div>
</template>
