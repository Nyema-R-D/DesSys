<script setup lang="ts">
import '@nyema-r-d/css/components/Switch.css';
import { computed, useAttrs, useId } from 'vue';

defineOptions({ inheritAttrs: false });
const props = defineProps<{ label?: string; hint?: string; id?: string }>();
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
  <div :class="['ny-switch', attrs.class]">
    <label class="ny-switch__control" :for="inputId">
      <input
        v-bind="inputAttrs"
        :id="inputId"
        v-model="model"
        type="checkbox"
        role="switch"
        class="ny-switch__input ny-focusable"
        :aria-describedby="hint ? `${inputId}-hint` : undefined"
      /><span
        ><slot>{{ label }}</slot></span
      >
    </label>
    <span v-if="hint" :id="`${inputId}-hint`" class="ny-switch__hint">{{ hint }}</span>
  </div>
</template>
