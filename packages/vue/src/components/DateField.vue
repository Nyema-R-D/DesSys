<script setup lang="ts">
import TextField from './TextField.vue';

/** Date au format natif (AAAA-MM-JJ) : calendrier, clavier et langue du système. */
defineProps<{ label: string; error?: string; hint?: string; required?: boolean; id?: string }>();
const model = defineModel<string>();
</script>

<template>
  <TextField
    v-model="model"
    :label="label"
    :error="error"
    :hint="hint"
    :required="required"
    :id="id"
    type="date"
    class="ny-field--date"
  />
</template>
