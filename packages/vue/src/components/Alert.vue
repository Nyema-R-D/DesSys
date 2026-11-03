<script lang="ts">
export type AlertTone = 'info' | 'success' | 'warning' | 'error';

/** Libellés de ton par défaut, affichés en mono au-dessus du message. */
export const alertToneLabels: Record<AlertTone, string> = {
  info: 'Information',
  success: 'Succès',
  warning: 'Attention',
  error: 'Erreur',
};
</script>

<script setup lang="ts">
import '@nyema-r-d/css/components/Alert.css';

/** Message persistant ; ton porté par un libellé mono et un filet, `error` en role="alert". */
withDefaults(
  defineProps<{
    tone?: AlertTone;
    title?: string;
    toneLabel?: string;
    /** Affiche un bouton de fermeture (événement `dismiss`). */
    dismissible?: boolean;
    closeLabel?: string;
  }>(),
  { tone: 'info', closeLabel: 'Fermer' },
);
defineEmits<{ dismiss: [] }>();
</script>

<template>
  <div :class="['ny-alert', `ny-alert--${tone}`]" :role="tone === 'error' ? 'alert' : 'status'">
    <div class="ny-alert__body">
      <p class="ny-alert__tone">{{ toneLabel ?? alertToneLabels[tone] }}</p>
      <p v-if="title" class="ny-alert__title">{{ title }}</p>
      <div v-if="$slots.default" class="ny-alert__content"><slot /></div>
      <div v-if="$slots.action" class="ny-alert__action"><slot name="action" /></div>
    </div>
    <button
      v-if="dismissible"
      type="button"
      class="ny-alert__close ny-focusable"
      :aria-label="closeLabel"
      @click="$emit('dismiss')"
    >
      <span aria-hidden="true">×</span>
    </button>
  </div>
</template>
