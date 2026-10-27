<script setup lang="ts">
import '@nyema-r-d/css/components/Menu.css';
import { computed, nextTick, onBeforeUnmount, ref, useId, watch } from 'vue';
import Button, { type ButtonSize, type ButtonVariant } from './Button.vue';

export interface MenuItem {
  id: string;
  label: string;
  disabled?: boolean;
  tone?: 'danger';
}

/** Bouton de menu (motif ARIA) : flèches, Début, Fin ; Échap rend le focus au bouton. */
const props = withDefaults(
  defineProps<{
    label: string;
    items: MenuItem[];
    align?: 'start' | 'end';
    variant?: ButtonVariant;
    size?: ButtonSize;
  }>(),
  { align: 'start', variant: 'secondary', size: 'sm' },
);
const emit = defineEmits<{ select: [id: string] }>();
const baseId = useId();
const open = ref(false);
const focusIndex = ref<number>();
const root = ref<HTMLDivElement>();
const itemRefs = ref<Record<number, HTMLButtonElement>>({});
const enabled = computed(() =>
  props.items.flatMap((item, index) => (item.disabled ? [] : [index])),
);

const show = async (index: number | undefined) => {
  open.value = true;
  focusIndex.value = index;
};
watch([open, focusIndex], async ([isOpen, index]) => {
  if (!isOpen || index === undefined) return;
  await nextTick();
  itemRefs.value[index]?.focus();
});
const close = () => {
  open.value = false;
  (root.value?.firstElementChild as HTMLButtonElement | null)?.focus();
};

const onPointerdown = (event: PointerEvent) => {
  if (!root.value?.contains(event.target as Node)) open.value = false;
};
watch(open, (value) =>
  value
    ? document.addEventListener('pointerdown', onPointerdown)
    : document.removeEventListener('pointerdown', onPointerdown),
);
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerdown));

const onTriggerKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    show(event.key === 'ArrowDown' ? enabled.value[0] : enabled.value.at(-1));
  }
};
const onListKeydown = (event: KeyboardEvent) => {
  const list = enabled.value;
  const position = list.indexOf(focusIndex.value ?? -1);
  const next = {
    ArrowDown: list[(position + 1) % list.length],
    ArrowUp: list[(position - 1 + list.length) % list.length],
    Home: list[0],
    End: list.at(-1),
  }[event.key];
  if (next !== undefined) {
    event.preventDefault();
    focusIndex.value = next;
  } else if (event.key === 'Escape') {
    event.preventDefault();
    close();
  } else if (event.key === 'Tab') {
    open.value = false;
  }
};
const choose = (id: string) => {
  emit('select', id);
  close();
};
</script>

<template>
  <div ref="root" :class="['ny-menu', align === 'end' && 'ny-menu--end']">
    <Button
      :id="`${baseId}-trigger`"
      :variant="variant"
      :size="size"
      trailing="↓"
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-controls="`${baseId}-menu`"
      @click="open ? (open = false) : show(enabled[0])"
      @keydown="onTriggerKeydown"
      >{{ label }}</Button
    >
    <ul
      :id="`${baseId}-menu`"
      role="menu"
      :aria-labelledby="`${baseId}-trigger`"
      class="ny-menu__list"
      :hidden="!open"
      @keydown="onListKeydown"
    >
      <li v-for="(item, index) in items" :key="item.id" role="none">
        <button
          :ref="(el) => el && (itemRefs[index] = el as HTMLButtonElement)"
          type="button"
          role="menuitem"
          tabindex="-1"
          :disabled="item.disabled"
          :class="['ny-menu__item', item.tone === 'danger' && 'ny-menu__item--danger']"
          @click="choose(item.id)"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </div>
</template>
