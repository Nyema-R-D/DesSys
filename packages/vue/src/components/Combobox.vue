<script lang="ts">
export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const fold = (text: string) =>
  text
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase();

/** Filtre par défaut : le libellé contient la saisie, sans tenir compte de la casse ni des accents. */
export const filterOption = (option: ComboboxOption, query: string) =>
  fold(option.label).includes(fold(query.trim()));
</script>

<script setup lang="ts">
import '@nyema-r-d/css/components/TextField.css';
import '@nyema-r-d/css/components/Combobox.css';
import { computed, nextTick, ref, useAttrs, useId, watch } from 'vue';

/** Liste filtrable (motif ARIA combobox) : saisie, flèches, Entrée, Échap ; focus dans le champ. */
defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    label: string;
    options: ComboboxOption[];
    filter?: (option: ComboboxOption, query: string) => boolean;
    emptyMessage?: string;
    placeholder?: string;
    error?: string;
    hint?: string;
    required?: boolean;
    disabled?: boolean;
    name?: string;
    id?: string;
  }>(),
  {
    filter: filterOption,
    emptyMessage: 'Aucun résultat',
  },
);
const model = defineModel<string | null>({ default: null });
const attrs = useAttrs();
const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const listId = computed(() => `${inputId.value}-list`);
const describedBy = computed(
  () =>
    [props.hint && `${inputId.value}-hint`, props.error && `${inputId.value}-error`]
      .filter(Boolean)
      .join(' ') || undefined,
);
const query = ref<string>();
const open = ref(false);
const active = ref<number>();
const list = ref<HTMLUListElement>();

const selectedLabel = computed(
  () => props.options.find((option) => option.value === model.value)?.label ?? '',
);
const text = computed(() => query.value ?? selectedLabel.value);
const visible = computed(() =>
  props.options.flatMap((option, index) =>
    query.value === undefined || props.filter(option, query.value) ? [index] : [],
  ),
);
const enabled = computed(() => visible.value.filter((index) => !props.options[index]!.disabled));
const optionId = (index: number) => `${inputId.value}-option-${index}`;

watch(active, async (index) => {
  if (index === undefined) return;
  await nextTick();
  list.value?.querySelector(`[id="${optionId(index)}"]`)?.scrollIntoView?.({ block: 'nearest' });
});

const close = () => {
  open.value = false;
  active.value = undefined;
  query.value = undefined;
};
const choose = (index: number) => {
  const option = props.options[index]!;
  if (option.disabled) return;
  model.value = option.value;
  close();
};
const move = (step: 1 | -1) => {
  const ids = enabled.value;
  if (!ids.length) return;
  const position = active.value === undefined ? -1 : ids.indexOf(active.value);
  const next =
    position === -1
      ? step === 1
        ? 0
        : ids.length - 1
      : (position + step + ids.length) % ids.length;
  open.value = true;
  active.value = ids[next];
};

const onInput = (event: Event) => {
  query.value = (event.target as HTMLInputElement).value;
  active.value = undefined;
  open.value = true;
};
const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    if (event.altKey) open.value = event.key === 'ArrowDown';
    else move(event.key === 'ArrowDown' ? 1 : -1);
  } else if (event.key === 'Enter' && open.value && active.value !== undefined) {
    event.preventDefault();
    choose(active.value);
  } else if (event.key === 'Escape' && open.value) {
    event.preventDefault();
    close();
  }
};
const onBlur = () => {
  if (query.value === '' && model.value !== null) model.value = null;
  close();
};
</script>

<template>
  <div :class="['ny-field', 'ny-combobox', attrs.class]">
    <label :id="`${inputId}-label`" class="ny-field__label" :for="inputId"
      >{{ label }}<template v-if="required"> *</template></label
    >
    <div class="ny-combobox__control">
      <input
        :id="inputId"
        type="text"
        role="combobox"
        autocomplete="off"
        class="ny-field__input ny-combobox__input"
        aria-autocomplete="list"
        :aria-expanded="open"
        :aria-controls="listId"
        :aria-activedescendant="open && active !== undefined ? optionId(active) : undefined"
        :aria-invalid="error ? 'true' : undefined"
        :aria-describedby="describedBy"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :value="text"
        @input="onInput"
        @click="open = true"
        @keydown="onKeydown"
        @blur="onBlur"
      />
      <div class="ny-combobox__popup" :hidden="!open">
        <ul
          :id="listId"
          ref="list"
          role="listbox"
          :aria-labelledby="`${inputId}-label`"
          class="ny-combobox__list"
          :hidden="visible.length === 0"
        >
          <li
            v-for="index in visible"
            :id="optionId(index)"
            :key="options[index]!.value"
            role="option"
            :aria-selected="options[index]!.value === model"
            :aria-disabled="options[index]!.disabled ? 'true' : undefined"
            :class="['ny-combobox__option', index === active && 'ny-combobox__option--active']"
            @mousedown.prevent
            @click="choose(index)"
          >
            {{ options[index]!.label }}
          </li>
        </ul>
        <p v-if="open && visible.length === 0" class="ny-combobox__empty" role="status">
          {{ emptyMessage }}
        </p>
      </div>
    </div>
    <input v-if="name" type="hidden" :name="name" :value="model ?? ''" />
    <span v-if="hint" :id="`${inputId}-hint`" class="ny-field__hint">{{ hint }}</span>
    <span v-if="error" :id="`${inputId}-error`" class="ny-field__error" role="alert">{{
      error
    }}</span>
  </div>
</template>
