<script setup lang="ts">
import '@nyema-r-d/css/components/TextField.css';
import '@nyema-r-d/css/components/FileUpload.css';
import { computed, ref, useAttrs, useId } from 'vue';
import { formatFileSize } from '../utils';

defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    label: string;
    hint?: string;
    error?: string;
    dropLabel?: string;
    browseLabel?: string;
    required?: boolean;
    id?: string;
    formatSize?: (bytes: number) => string;
  }>(),
  { dropLabel: 'Glissez un fichier ici ou', browseLabel: 'parcourez', formatSize: formatFileSize },
);
/** Fichiers choisis ou déposés ; la validation revient au produit, via `error`. */
const emit = defineEmits<{ filesChange: [files: File[]] }>();
const attrs = useAttrs();
const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const files = ref<File[]>([]);
const dragging = ref(false);
const describedBy = computed(
  () =>
    [props.hint && `${inputId.value}-hint`, props.error && `${inputId.value}-error`]
      .filter(Boolean)
      .join(' ') || undefined,
);
const inputAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  return rest;
});
const onChange = (event: Event) => {
  files.value = [...((event.target as HTMLInputElement).files ?? [])];
  dragging.value = false;
  emit('filesChange', files.value);
};
</script>

<template>
  <div :class="['ny-field ny-file', attrs.class]">
    <label class="ny-field__label" :for="inputId"
      >{{ label }}<template v-if="required"> *</template></label
    >
    <div
      class="ny-file__zone"
      :data-dragging="dragging ? '' : undefined"
      @dragenter="dragging = true"
      @dragleave="dragging = false"
      @drop="dragging = false"
    >
      <input
        v-bind="inputAttrs"
        :id="inputId"
        type="file"
        class="ny-file__input"
        :required="required"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedBy"
        @change="onChange"
      />
      <span class="ny-file__prompt" aria-hidden="true"
        >{{ dropLabel }} <span class="ny-file__browse">{{ browseLabel }}</span></span
      >
    </div>
    <span v-if="hint" :id="`${inputId}-hint`" class="ny-field__hint">{{ hint }}</span>
    <span v-if="error" :id="`${inputId}-error`" class="ny-field__error" role="alert">{{
      error
    }}</span>
    <ul v-if="files.length" class="ny-file__list">
      <li v-for="file in files" :key="`${file.name}-${file.size}`" class="ny-file__item">
        <span class="ny-file__name">{{ file.name }}</span
        ><span class="ny-file__size">{{ formatSize(file.size) }}</span>
      </li>
    </ul>
  </div>
</template>
