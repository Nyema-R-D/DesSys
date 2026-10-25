<script setup lang="ts">
import '@nyema-r-d/css/components/Dialog.css';
import { onMounted, ref, useId, watch } from 'vue';

const props = withDefaults(defineProps<{ open: boolean; title: string; closeLabel?: string }>(), {
  closeLabel: 'Fermer',
});
const emit = defineEmits<{ close: [] }>();
const dialog = ref<HTMLDialogElement>();
const titleId = useId();

const sync = () => {
  const el = dialog.value;
  if (!el) return;
  if (props.open && !el.open) el.showModal();
  if (!props.open && el.open) el.close();
};
onMounted(sync);
watch(() => props.open, sync);
</script>

<template>
  <!-- Élément natif <dialog> : piège du focus, Échap et retour du focus gérés par le navigateur. -->
  <dialog
    ref="dialog"
    :aria-labelledby="titleId"
    class="ny-dialog"
    @cancel.prevent="emit('close')"
    @click="$event.target === $event.currentTarget && emit('close')"
  >
    <div class="ny-dialog__header">
      <h2 :id="titleId" class="ny-dialog__title">{{ title }}</h2>
      <button
        type="button"
        class="ny-dialog__close ny-focusable"
        :aria-label="closeLabel"
        @click="emit('close')"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
    <div v-if="$slots.default" class="ny-dialog__body"><slot /></div>
    <div v-if="$slots.footer" class="ny-dialog__footer"><slot name="footer" /></div>
  </dialog>
</template>
