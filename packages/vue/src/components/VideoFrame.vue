<script lang="ts">
/** `MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED`, écrit en clair : `MediaError` n'existe pas partout. */
export const MEDIA_ERR_SRC_NOT_SUPPORTED = 4;

export type VideoFrameState = 'loading' | 'playable' | 'unsupported' | 'error';
</script>

<script setup lang="ts">
import '@nyema-r-d/css/components/VideoFrame.css';
import { computed, ref } from 'vue';
import Alert from './Alert.vue';
import Skeleton from './Skeleton.vue';
import Spinner from './Spinner.vue';

/**
 * Cadre autour du `<video>` natif (contrôles du navigateur) : chargement, erreur et format non
 * lu, avec une action de repli (slot `#action`). Événements `unsupported` et `error` (code).
 */
const props = withDefaults(
  defineProps<{
    /** Absente pendant le chargement. */
    src?: string;
    label: string;
    caption?: string;
    aspectRatio?: string;
    poster?: string;
    /** Échec connu de l'application (téléchargement refusé…). */
    failure?: 'error' | 'unsupported';
    loadingLabel?: string;
    unsupportedTitle?: string;
    unsupportedMessage?: string;
    errorTitle?: string;
    errorMessage?: string;
  }>(),
  {
    loadingLabel: 'Chargement de la vidéo',
    unsupportedTitle: 'Format non lu par ce navigateur',
    unsupportedMessage:
      'Ce navigateur ne sait pas lire cette vidéo. Téléchargez-la pour l’ouvrir avec un lecteur vidéo.',
    errorTitle: 'Lecture impossible',
    errorMessage: 'La vidéo n’a pas pu être chargée.',
  },
);
const emit = defineEmits<{ unsupported: []; error: [code: number | undefined] }>();

// L'échec est lié à la source : une nouvelle source repart de zéro.
const failed = ref<{ src: string; unsupported: boolean }>();
const state = computed<VideoFrameState>(() => {
  if (props.failure) return props.failure;
  if (props.src === undefined) return 'loading';
  if (failed.value?.src === props.src) return failed.value.unsupported ? 'unsupported' : 'error';
  return 'playable';
});

const onError = (event: Event) => {
  const code = (event.currentTarget as HTMLVideoElement).error?.code;
  const unsupported = code === MEDIA_ERR_SRC_NOT_SUPPORTED;
  failed.value = { src: props.src!, unsupported };
  if (unsupported) emit('unsupported');
  else emit('error', code);
};
</script>

<template>
  <figure class="ny-video-frame">
    <Alert
      v-if="state === 'unsupported' || state === 'error'"
      :tone="state === 'unsupported' ? 'warning' : 'error'"
      :title="state === 'unsupported' ? unsupportedTitle : errorTitle"
    >
      {{ state === 'unsupported' ? unsupportedMessage : errorMessage }}
      <template v-if="$slots.action" #action><slot name="action" /></template>
    </Alert>
    <div
      v-else
      class="ny-video-frame__surface"
      v-bind="aspectRatio ? { style: { '--ny-video-ratio': aspectRatio } } : {}"
      :aria-busy="state === 'loading' ? 'true' : undefined"
    >
      <template v-if="state === 'loading'">
        <Skeleton class="ny-video-frame__skeleton" />
        <Spinner :label="loadingLabel" />
      </template>
      <video
        v-else
        class="ny-video-frame__media"
        :src="src"
        :poster="poster"
        controls
        preload="metadata"
        :aria-label="label"
        @error="onError"
      ></video>
    </div>
    <figcaption v-if="caption != null" class="ny-video-frame__caption">{{ caption }}</figcaption>
  </figure>
</template>
