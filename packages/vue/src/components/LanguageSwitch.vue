<script setup lang="ts">
import '@nyema-r-d/css/base.css';
import '@nyema-r-d/css/components/LanguageSwitch.css';

export interface LanguageOption {
  value: string;
  label: string;
  name: string;
}

withDefaults(
  defineProps<{
    options?: LanguageOption[];
    getHref?: (value: string) => string;
    label?: string;
  }>(),
  {
    options: () => [
      { value: 'fr', label: 'FR', name: 'Français' },
      { value: 'bm', label: 'BM', name: 'Bamanankan' },
    ],
    label: 'Langue · Kan',
  },
);
const model = defineModel<string>({ required: true });
</script>

<template>
  <nav :aria-label="label" class="ny-language-switch">
    <template v-for="option in options" :key="option.value">
      <a
        v-if="getHref"
        :href="getHref(option.value)"
        :hreflang="option.value"
        :lang="option.value"
        :aria-current="option.value === model ? 'true' : undefined"
        class="ny-language-switch__option ny-mono-label ny-focusable"
        ><span aria-hidden="true">{{ option.label }}</span
        ><span class="ny-visually-hidden">{{ option.name }}</span></a
      >
      <button
        v-else
        type="button"
        :lang="option.value"
        :aria-pressed="option.value === model"
        class="ny-language-switch__option ny-mono-label ny-focusable"
        @click="model = option.value"
      >
        <span aria-hidden="true">{{ option.label }}</span
        ><span class="ny-visually-hidden">{{ option.name }}</span>
      </button>
    </template>
  </nav>
</template>
