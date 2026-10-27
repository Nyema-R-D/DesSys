<script setup lang="ts">
import '@nyema-r-d/css/components/Accordion.css';
import { useId } from 'vue';

export interface AccordionItem {
  id: string;
  title: string;
}

withDefaults(
  defineProps<{
    items: AccordionItem[];
    /** Une seule section ouverte à la fois (attribut `name` natif). */
    exclusive?: boolean;
    defaultOpen?: string[];
  }>(),
  { defaultOpen: () => [] },
);
const name = useId();
</script>

<template>
  <!-- Contenu de chaque section : slot nommé #<id>. -->
  <div class="ny-accordion">
    <details
      v-for="item in items"
      :key="item.id"
      class="ny-accordion__item"
      :name="exclusive ? name : undefined"
      :open="defaultOpen.includes(item.id) || undefined"
    >
      <summary class="ny-accordion__summary ny-focusable">
        <span>{{ item.title }}</span
        ><span class="ny-accordion__icon" aria-hidden="true"></span>
      </summary>
      <div class="ny-accordion__content"><slot :name="item.id" /></div>
    </details>
  </div>
</template>
