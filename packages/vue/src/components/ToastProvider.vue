<script setup lang="ts">
import '@nyema-r-d/css/components/Toast.css';
import { onBeforeUnmount, provide, ref } from 'vue';
import { toastKey, type ToastEntry, type ToastOptions } from '../toast';

withDefaults(defineProps<{ closeLabel?: string }>(), { closeLabel: 'Fermer' });
const toasts = ref<ToastEntry[]>([]);
const timers = new Map<number, number>();
let nextId = 1;

const dismiss = (id: number) => {
  toasts.value = toasts.value.filter((t) => t.id !== id);
  window.clearTimeout(timers.get(id));
  timers.delete(id);
};
const show = (options: ToastOptions) => {
  const id = nextId++;
  toasts.value = [...toasts.value, { ...options, id }];
  const duration = options.duration ?? (options.tone === 'error' ? 8000 : 5000);
  if (duration)
    timers.set(
      id,
      window.setTimeout(() => dismiss(id), duration),
    );
  return id;
};
onBeforeUnmount(() => timers.forEach((timer) => window.clearTimeout(timer)));
provide(toastKey, { show, dismiss, toasts });
</script>

<template>
  <slot />
  <ol class="ny-toast-region" aria-live="polite" aria-relevant="additions">
    <li v-for="toast in toasts" :key="toast.id" class="ny-toast-item">
      <div
        :class="['ny-toast', `ny-toast--${toast.tone ?? 'info'}`]"
        :role="toast.tone === 'error' ? 'alert' : 'status'"
      >
        <span class="ny-toast__dot" aria-hidden="true" />
        <div class="ny-toast__body">
          <span class="ny-toast__title">{{ toast.title }}</span
          ><span v-if="toast.description != null">{{ toast.description }}</span>
        </div>
        <button
          type="button"
          class="ny-toast__close ny-focusable"
          :aria-label="closeLabel"
          @click="dismiss(toast.id)"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </li>
  </ol>
</template>
