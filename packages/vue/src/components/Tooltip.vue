<script setup lang="ts">
import '@nyema-r-d/css/components/Tooltip.css';
import { cloneVNode, onBeforeUnmount, ref, useId, useSlots, watch, type VNode } from 'vue';

/** Info-bulle au survol et au focus, fermée par Échap (WCAG 1.4.13). Slot : un élément focalisable. */
withDefaults(defineProps<{ content: string; placement?: 'top' | 'bottom' }>(), {
  placement: 'top',
});
const slots = useSlots();
const id = useId();
const open = ref(false);

// Le déclencheur reçoit aria-describedby, en plus de celui qu'il portait déjà.
const Trigger = () => {
  const [node] = (slots.default?.() ?? []) as VNode[];
  if (!node) return null;
  const own = node.props?.['aria-describedby'] as string | undefined;
  return cloneVNode(node, { 'aria-describedby': [own, id].filter(Boolean).join(' ') });
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') open.value = false;
};
watch(open, (value) =>
  value
    ? document.addEventListener('keydown', onKeydown)
    : document.removeEventListener('keydown', onKeydown),
);
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown));
</script>

<template>
  <span
    :class="['ny-tooltip', placement === 'bottom' && 'ny-tooltip--bottom']"
    @mouseenter="open = true"
    @mouseleave="open = false"
    @focusin="open = true"
    @focusout="open = false"
  >
    <Trigger />
    <span :id="id" role="tooltip" class="ny-tooltip__bubble" :hidden="!open"
      ><span class="ny-tooltip__text">{{ content }}</span></span
    >
  </span>
</template>
