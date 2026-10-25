<script setup lang="ts">
import '@nyema-r-d/css/components/Tabs.css';
import { computed, ref, useId } from 'vue';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

const props = defineProps<{ items: TabItem[]; label: string; defaultValue?: string }>();
const model = defineModel<string>();
const baseId = useId();
const enabled = computed(() => props.items.filter((item) => !item.disabled));
const uncontrolled = ref(props.defaultValue ?? enabled.value[0]?.id);
const selected = computed(() => model.value ?? uncontrolled.value);
const tabs = ref<Record<string, HTMLButtonElement>>({});

const select = (id: string) => {
  uncontrolled.value = id;
  model.value = id;
  tabs.value[id]?.focus();
};
const onKeydown = (event: KeyboardEvent) => {
  const list = enabled.value;
  const index = list.findIndex((item) => item.id === selected.value);
  const next = {
    ArrowRight: list[(index + 1) % list.length],
    ArrowLeft: list[(index - 1 + list.length) % list.length],
    Home: list[0],
    End: list[list.length - 1],
  }[event.key];
  if (!next) return;
  event.preventDefault();
  select(next.id);
};
</script>

<template>
  <!-- Contenu de chaque onglet : slot nommé #<id>. -->
  <div class="ny-tabs">
    <div role="tablist" :aria-label="label" class="ny-tabs__list" @keydown="onKeydown">
      <button
        v-for="item in items"
        :id="`${baseId}-tab-${item.id}`"
        :key="item.id"
        :ref="(el) => el && (tabs[item.id] = el as HTMLButtonElement)"
        type="button"
        role="tab"
        :aria-selected="item.id === selected"
        :aria-controls="`${baseId}-panel-${item.id}`"
        :tabindex="item.id === selected ? 0 : -1"
        :disabled="item.disabled"
        class="ny-tabs__tab ny-focusable"
        @click="select(item.id)"
      >
        {{ item.label }}
      </button>
    </div>
    <div
      v-for="item in items"
      :id="`${baseId}-panel-${item.id}`"
      :key="item.id"
      role="tabpanel"
      :aria-labelledby="`${baseId}-tab-${item.id}`"
      :hidden="item.id !== selected"
      tabindex="0"
      class="ny-tabs__panel ny-focusable"
    >
      <slot :name="item.id" />
    </div>
  </div>
</template>
