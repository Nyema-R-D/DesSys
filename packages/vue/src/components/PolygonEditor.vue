<script setup lang="ts">
import '@nyema-r-d/css/components/PolygonEditor.css';
import { computed, nextTick, ref, useId } from 'vue';
import {
  KEY_BIG_STEP,
  KEY_STEP,
  defaultPointLabel,
  defaultStatus,
  insertAfter,
  removePoint,
  setPoint,
  toPoint,
  type PolygonPoint,
} from '../polygon';

export interface PolygonEditorImage {
  src: string;
  width: number;
  height: number;
}

/**
 * Dessin d'un polygone sur une image (coordonnées normalisées), `v-model:polygon`. Clic : ajout,
 * glisser : déplacement ; au clavier, flèches (Maj : plus vite), Entrée insère, Suppr retire.
 */
const props = withDefaults(
  defineProps<{
    label: string;
    image?: PolygonEditorImage | null;
    others?: { id: string; polygon: PolygonPoint[] }[];
    min?: number;
    max?: number;
    caption?: string;
    instructions?: string;
    disabled?: boolean;
    pointLabel?: (index: number, point: PolygonPoint) => string;
    status?: (count: number, min: number, max: number) => string;
  }>(),
  {
    others: () => [],
    min: 3,
    max: 64,
    instructions:
      'Cliquez pour ajouter un point, faites glisser un point pour le déplacer. Au clavier : flèches pour déplacer le point (Maj : plus vite), Entrée pour en insérer un autre après lui, Suppr pour l’enlever.',
    disabled: false,
    pointLabel: defaultPointLabel,
    status: defaultStatus,
  },
);
const polygon = defineModel<PolygonPoint[]>('polygon', { required: true });

const instructionsId = useId();
const surface = ref<HTMLDivElement>();
const dragging = ref<number>();
const full = computed(() => polygon.value.length >= props.max);
const empty = computed(() => polygon.value.length === 0);
const message = computed(() => props.status(polygon.value.length, props.min, props.max));
const surfaceStyle = computed(() =>
  props.image
    ? { style: { '--ny-polygon-ratio': `${props.image.width} / ${props.image.height}` } }
    : {},
);
const points = (p: PolygonPoint[]) => p.map(([x, y]) => `${x},${y}`).join(' ');

// Focalise un point (-1 : la surface) une fois le nouveau polygone rendu.
const focusAfterRender = async (index: number) => {
  await nextTick();
  const target =
    index < 0
      ? surface.value
      : surface.value?.querySelector<HTMLElement>(`[data-index="${index}"]`);
  target?.focus();
};

const at = (event: PointerEvent) => {
  const box = surface.value!.getBoundingClientRect();
  return [(event.clientX - box.left) / box.width, (event.clientY - box.top) / box.height] as const;
};

const onSurfacePointerDown = (event: PointerEvent) => {
  if (props.disabled || full.value || event.button !== 0) return;
  if ((event.target as Element).closest('button')) return;
  polygon.value = [...polygon.value, toPoint(...at(event))];
};
const onSurfacePointerMove = (event: PointerEvent) => {
  if (dragging.value === undefined) return;
  polygon.value = setPoint(polygon.value, dragging.value, ...at(event));
};
const onSurfaceKeyDown = (event: KeyboardEvent) => {
  if (event.target !== event.currentTarget || !empty.value || props.disabled) return;
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    polygon.value = [toPoint(0.5, 0.5)];
    void focusAfterRender(0);
  }
};
const onPointPointerDown = (index: number, event: PointerEvent) => {
  if (event.button !== 0) return;
  (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
  dragging.value = index;
};
const onPointKeyDown = (index: number, event: KeyboardEvent) => {
  const step = event.shiftKey ? KEY_BIG_STEP : KEY_STEP;
  const moves: Record<string, [number, number]> = {
    ArrowLeft: [-step, 0],
    ArrowRight: [step, 0],
    ArrowUp: [0, -step],
    ArrowDown: [0, step],
  };
  const move = moves[event.key];
  const [x, y] = polygon.value[index]!;
  if (move) {
    event.preventDefault();
    polygon.value = setPoint(polygon.value, index, x + move[0], y + move[1]);
  } else if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    if (full.value) return;
    polygon.value = insertAfter(polygon.value, index);
    void focusAfterRender(index + 1);
  } else if (event.key === 'Delete' || event.key === 'Backspace') {
    event.preventDefault();
    const last = polygon.value.length === 1;
    polygon.value = removePoint(polygon.value, index);
    void focusAfterRender(last ? -1 : Math.max(0, index - 1));
  }
};
</script>

<template>
  <figure :class="['ny-polygon-editor', disabled && 'ny-polygon-editor--disabled']">
    <div
      ref="surface"
      class="ny-polygon-editor__surface ny-focusable"
      v-bind="surfaceStyle"
      role="group"
      :aria-label="label"
      :aria-describedby="instructionsId"
      :aria-disabled="disabled ? 'true' : undefined"
      :tabindex="empty && !disabled ? 0 : undefined"
      @pointerdown="onSurfacePointerDown"
      @pointermove="onSurfacePointerMove"
      @pointerup="dragging = undefined"
      @pointercancel="dragging = undefined"
      @keydown="onSurfaceKeyDown"
    >
      <img v-if="image" class="ny-polygon-editor__image" :src="image.src" alt="" />
      <svg
        class="ny-polygon-editor__drawing"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon
          v-for="other in others"
          :key="other.id"
          class="ny-polygon-editor__other"
          :points="points(other.polygon)"
        />
        <polygon
          v-if="polygon.length >= 3"
          class="ny-polygon-editor__shape"
          :points="points(polygon)"
        />
        <polyline
          v-else-if="polygon.length === 2"
          class="ny-polygon-editor__shape"
          :points="points(polygon)"
        />
      </svg>
      <button
        v-for="(point, index) in polygon"
        :key="index"
        type="button"
        :data-index="index"
        class="ny-polygon-editor__point ny-focusable"
        :style="{ left: `${point[0] * 100}%`, top: `${point[1] * 100}%` }"
        :aria-label="pointLabel(index, point)"
        :disabled="disabled"
        @pointerdown="onPointPointerDown(index, $event)"
        @keydown="onPointKeyDown(index, $event)"
      ></button>
    </div>
    <p class="ny-polygon-editor__status" role="status">{{ message }}</p>
    <figcaption class="ny-polygon-editor__caption">
      <template v-if="caption != null">{{ caption }} </template
      ><span :id="instructionsId">{{ instructions }}</span>
    </figcaption>
  </figure>
</template>
