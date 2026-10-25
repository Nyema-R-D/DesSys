<script setup lang="ts">
import '@nyema-r-d/css/components/LabRow.css';
import { computed, ref, useId, useSlots } from 'vue';
import type { Locale, ProductStatus } from '../utils';
import StatusBadge from './StatusBadge.vue';

const props = withDefaults(
  defineProps<{
    code: string;
    title: string;
    status: ProductStatus;
    locale?: Locale;
    defaultOpen?: boolean;
    open?: boolean;
  }>(),
  { defaultOpen: false, open: undefined },
);
const emit = defineEmits<{ 'update:open': [open: boolean] }>();
const slots = useSlots();
const uncontrolled = ref(props.defaultOpen);
const isOpen = computed(() => props.open ?? uncontrolled.value);
const panelId = useId();
const expandable = computed(() => !!slots.default);
const toggle = () => {
  uncontrolled.value = !isOpen.value;
  emit('update:open', !isOpen.value);
};
</script>

<template>
  <div class="ny-lab-row">
    <component
      :is="expandable ? 'button' : 'div'"
      :type="expandable ? 'button' : undefined"
      :class="['ny-lab-row__summary', expandable && 'ny-focusable']"
      :aria-expanded="expandable ? isOpen : undefined"
      :aria-controls="expandable ? panelId : undefined"
      @click="expandable && toggle()"
    >
      <span class="ny-lab-row__code">{{ code }}</span
      ><span class="ny-lab-row__title">{{ title }}</span
      ><StatusBadge :status="status" :locale="locale" /><span
        v-if="expandable"
        class="ny-lab-row__toggle"
        aria-hidden="true"
        >{{ isOpen ? '−' : '+' }}</span
      >
    </component>
    <div v-if="expandable" :id="panelId" class="ny-lab-row__panel" :hidden="!isOpen"><slot /></div>
  </div>
</template>
