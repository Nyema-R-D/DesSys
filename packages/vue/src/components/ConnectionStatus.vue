<script setup lang="ts">
import '@nyema-r-d/css/base.css';
import '@nyema-r-d/css/components/ConnectionStatus.css';
import { computed } from 'vue';
import { connectionLabels, type ConnectionState, type Locale } from '../utils';

const props = withDefaults(
  defineProps<{ state: ConnectionState; pending?: number; detail?: string; locale?: Locale }>(),
  { locale: 'fr' },
);
const pendingText = computed(() =>
  props.pending && props.pending > 0
    ? props.locale === 'fr'
      ? `${props.pending} en attente`
      : `${props.pending} bɛ makɔnɔni na`
    : null,
);
</script>

<template>
  <span role="status" :class="['ny-connection', `ny-connection--${state}`, 'ny-mono-label']">
    <span class="ny-connection__dot" aria-hidden="true" />{{ connectionLabels[locale][state]
    }}<span v-if="pendingText" class="ny-connection__detail">· {{ pendingText }}</span
    ><span v-if="detail != null" class="ny-connection__detail">· {{ detail }}</span>
  </span>
</template>
