<script setup lang="ts" generic="T">
import '@nyema-r-d/css/components/DataTable.css';
import { computed, ref, useId } from 'vue';

export type SortDirection = 'ascending' | 'descending';
export interface SortState {
  key: string;
  direction: SortDirection;
}
export interface DataTableColumn<Row> {
  key: string;
  header: string;
  /** Valeur de tri ; par défaut `row[key]`. Rendu de cellule personnalisé : slot `#cell-<key>="{ row }"`. */
  sortValue?: (row: Row) => string | number | Date | null | undefined;
  sortable?: boolean;
  align?: 'start' | 'end';
  width?: string;
}

const props = withDefaults(
  defineProps<{
    caption: string;
    captionHidden?: boolean;
    columns: DataTableColumn<T>[];
    rows: T[];
    rowKey: (row: T) => string;
    defaultSort?: SortState;
    sortMode?: 'client' | 'manual';
    loading?: boolean;
    empty?: string;
    density?: 'comfortable' | 'compact';
  }>(),
  {
    captionHidden: false,
    sortMode: 'client',
    loading: false,
    empty: 'Aucune donnée.',
    density: 'comfortable',
  },
);
const sort = defineModel<SortState | null>('sort');
const captionId = useId();
const uncontrolled = ref<SortState | null>(props.defaultSort ?? null);
const current = computed(() => (sort.value !== undefined ? sort.value : uncontrolled.value));

const read = (row: T, key: string) => (row as Record<string, unknown>)[key];
const compare = (a: unknown, b: unknown) => {
  if (a == null) return b == null ? 0 : 1;
  if (b == null) return -1;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), 'fr', { numeric: true, sensitivity: 'base' });
};
const sortedRows = computed(() => {
  const s = current.value;
  if (!s || props.sortMode === 'manual') return props.rows;
  const column = props.columns.find((c) => c.key === s.key);
  if (!column) return props.rows;
  const value = (row: T) => (column.sortValue ? column.sortValue(row) : read(row, column.key));
  const factor = s.direction === 'ascending' ? 1 : -1;
  return [...props.rows].sort((a, b) => factor * compare(value(a), value(b)));
});
const toggle = (key: string) => {
  const next: SortState = {
    key,
    direction:
      current.value?.key === key && current.value.direction === 'ascending'
        ? 'descending'
        : 'ascending',
  };
  uncontrolled.value = next;
  sort.value = next;
};
</script>

<template>
  <div class="ny-table-wrap" role="region" :aria-labelledby="captionId" tabindex="0">
    <table
      :class="['ny-table', density === 'compact' && 'ny-table--compact']"
      :aria-busy="loading ? 'true' : undefined"
    >
      <caption
        :id="captionId"
        :class="['ny-table__caption', captionHidden && 'ny-visually-hidden']"
      >
        {{
          caption
        }}
      </caption>
      <thead>
        <tr>
          <th
            v-for="column in columns"
            :key="column.key"
            scope="col"
            :data-align="column.align"
            v-bind="column.width ? { style: { width: column.width } } : {}"
            :aria-sort="
              column.sortable
                ? current?.key === column.key
                  ? current.direction
                  : 'none'
                : undefined
            "
          >
            <button
              v-if="column.sortable"
              type="button"
              class="ny-table__sort ny-focusable"
              @click="toggle(column.key)"
            >
              {{ column.header
              }}<span class="ny-table__sort-icon" aria-hidden="true">{{
                current?.key === column.key ? (current.direction === 'ascending' ? '↑' : '↓') : ''
              }}</span>
            </button>
            <template v-else>{{ column.header }}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="i in 3" :key="`loading-${i}`">
            <td v-for="column in columns" :key="column.key" :data-align="column.align">
              <span class="ny-table__skeleton" />
            </td>
          </tr>
        </template>
        <tr v-else-if="sortedRows.length === 0">
          <td :colspan="columns.length" class="ny-table__empty">{{ empty }}</td>
        </tr>
        <template v-else>
          <tr v-for="row in sortedRows" :key="rowKey(row)">
            <td v-for="column in columns" :key="column.key" :data-align="column.align">
              <slot :name="`cell-${column.key}`" :row="row">{{ read(row, column.key) }}</slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
