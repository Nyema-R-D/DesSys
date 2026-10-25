<script setup lang="ts">
import '@nyema-r-d/css/base.css';
import '@nyema-r-d/css/components/ConnectionStatus.css';

withDefaults(defineProps<{ title?: string; text?: string }>(), {
  title: 'Hors ligne',
  text: 'Vos saisies sont enregistrées sur l’appareil et seront synchronisées au retour du réseau.',
});
</script>

<template>
  <div role="status" class="ny-offline-banner">
    <strong class="ny-offline-banner__title ny-mono-label">{{ title }}</strong
    ><span class="ny-offline-banner__text"
      ><slot>{{ text }}</slot></span
    ><slot name="action" />
  </div>
</template>
