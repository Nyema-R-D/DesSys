<script setup lang="ts">
import '@nyema-r-d/css/components/Drawer.css';
import Dialog from './Dialog.vue';

/** Panneau latéral modal : un Dialog collé au bord (`end` : droite en français), pleine hauteur. */
withDefaults(
  defineProps<{ open: boolean; title: string; closeLabel?: string; side?: 'start' | 'end' }>(),
  { closeLabel: 'Fermer', side: 'end' },
);
defineEmits<{ close: [] }>();
</script>

<template>
  <Dialog
    :open="open"
    :title="title"
    :close-label="closeLabel"
    :class="['ny-drawer', `ny-drawer--${side}`]"
    @close="$emit('close')"
  >
    <template v-if="$slots.default" #default><slot /></template>
    <template v-if="$slots.footer" #footer><slot name="footer" /></template>
  </Dialog>
</template>
