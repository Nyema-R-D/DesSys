<script setup lang="ts">
import '@nyema-r-d/css/components/Pagination.css';
import Button from './Button.vue';

withDefaults(
  defineProps<{
    page: number;
    pageCount: number;
    labels?: {
      previous: string;
      next: string;
      status: (page: number, count: number) => string;
      nav: string;
    };
  }>(),
  {
    labels: () => ({
      previous: '← Précédent',
      next: 'Suivant →',
      status: (page: number, count: number) => `Page ${page} sur ${count}`,
      nav: 'Pagination',
    }),
  },
);
const emit = defineEmits<{ 'update:page': [page: number] }>();
</script>

<template>
  <nav v-if="pageCount > 1" :aria-label="labels.nav" class="ny-pagination">
    <span class="ny-pagination__status ny-mono-label" aria-live="polite">{{
      labels.status(page, pageCount)
    }}</span>
    <div class="ny-pagination__actions">
      <Button
        size="sm"
        variant="secondary"
        :disabled="page <= 1"
        @click="emit('update:page', page - 1)"
        >{{ labels.previous }}</Button
      >
      <Button
        size="sm"
        variant="secondary"
        :disabled="page >= pageCount"
        @click="emit('update:page', page + 1)"
        >{{ labels.next }}</Button
      >
    </div>
  </nav>
</template>
