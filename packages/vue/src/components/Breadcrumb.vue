<script setup lang="ts">
import '@nyema-r-d/css/components/Breadcrumb.css';

export interface BreadcrumbItem {
  label: string;
  /** Absent sur la page courante (dernier élément). */
  href?: string;
}

withDefaults(defineProps<{ items: BreadcrumbItem[]; label?: string }>(), {
  label: 'Fil d’Ariane',
});
</script>

<template>
  <nav class="ny-breadcrumb" :aria-label="label">
    <ol class="ny-breadcrumb__list">
      <li v-for="(item, index) in items" :key="index" class="ny-breadcrumb__item">
        <span v-if="index === items.length - 1" aria-current="page">{{ item.label }}</span>
        <template v-else>
          <a class="ny-breadcrumb__link" :href="item.href">{{ item.label }}</a
          ><span class="ny-breadcrumb__separator" aria-hidden="true">/</span>
        </template>
      </li>
    </ol>
  </nav>
</template>
