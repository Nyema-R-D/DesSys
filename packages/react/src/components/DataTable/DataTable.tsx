import { useId, useMemo, useState, type ReactNode } from 'react';
import { cx } from '../../utils';
import './DataTable.css';

export type SortDirection = 'ascending' | 'descending';
export interface SortState {
  key: string;
  direction: SortDirection;
}

export interface DataTableColumn<T> {
  key: string;
  header: ReactNode;
  /** Rendu de la cellule ; par défaut `row[key]`. */
  cell?: (row: T) => ReactNode;
  /** Valeur de tri ; par défaut `row[key]`. */
  sortValue?: (row: T) => string | number | Date | null | undefined;
  sortable?: boolean;
  /** `end` pour les nombres et montants. */
  align?: 'start' | 'end';
  width?: string;
}

export interface DataTableProps<T> {
  /** Légende du tableau, obligatoire pour l'accessibilité. */
  caption: ReactNode;
  captionHidden?: boolean;
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  sort?: SortState | null;
  defaultSort?: SortState;
  onSortChange?: (sort: SortState) => void;
  /** `client` trie les lignes reçues ; `manual` laisse le tri au serveur. */
  sortMode?: 'client' | 'manual';
  loading?: boolean;
  /** Contenu affiché sans ligne, ex. « Aucune visite enregistrée. » */
  empty?: ReactNode;
  density?: 'comfortable' | 'compact';
  className?: string;
}

const read = <T,>(row: T, key: string) => (row as Record<string, unknown>)[key];

function compare(a: unknown, b: unknown) {
  if (a == null) return b == null ? 0 : 1;
  if (b == null) return -1;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), 'fr', { numeric: true, sensitivity: 'base' });
}

/** Tableau de données : filets 1 px, en-têtes mono, tri accessible, états vide et chargement. */
export function DataTable<T>({
  caption,
  captionHidden = false,
  columns,
  rows,
  rowKey,
  sort: controlledSort,
  defaultSort,
  onSortChange,
  sortMode = 'client',
  loading = false,
  empty = 'Aucune donnée.',
  density = 'comfortable',
  className,
}: DataTableProps<T>) {
  const captionId = useId();
  const [uncontrolledSort, setUncontrolledSort] = useState<SortState | null>(defaultSort ?? null);
  const sort = controlledSort !== undefined ? controlledSort : uncontrolledSort;

  const sortedRows = useMemo(() => {
    if (!sort || sortMode === 'manual') return rows;
    const column = columns.find((c) => c.key === sort.key);
    if (!column) return rows;
    const value = (row: T) => (column.sortValue ? column.sortValue(row) : read(row, column.key));
    const factor = sort.direction === 'ascending' ? 1 : -1;
    return [...rows].sort((a, b) => factor * compare(value(a), value(b)));
  }, [rows, columns, sort, sortMode]);

  const toggleSort = (key: string) => {
    const next: SortState = {
      key,
      direction: sort?.key === key && sort.direction === 'ascending' ? 'descending' : 'ascending',
    };
    setUncontrolledSort(next);
    onSortChange?.(next);
  };

  return (
    <div
      className={cx('ny-table-wrap', className)}
      role="region"
      aria-labelledby={captionId}
      tabIndex={0}
    >
      <table
        className={cx('ny-table', density === 'compact' && 'ny-table--compact')}
        aria-busy={loading || undefined}
      >
        <caption
          id={captionId}
          className={cx('ny-table__caption', captionHidden && 'ny-visually-hidden')}
        >
          {caption}
        </caption>
        <thead>
          <tr>
            {columns.map((column) => {
              const active = sort?.key === column.key;
              return (
                <th
                  key={column.key}
                  scope="col"
                  data-align={column.align}
                  style={column.width ? { width: column.width } : undefined}
                  aria-sort={column.sortable ? (active ? sort!.direction : 'none') : undefined}
                >
                  {column.sortable ? (
                    <button
                      type="button"
                      className="ny-table__sort ny-focusable"
                      onClick={() => toggleSort(column.key)}
                    >
                      {column.header}
                      <span className="ny-table__sort-icon" aria-hidden="true">
                        {active ? (sort!.direction === 'ascending' ? '↑' : '↓') : ''}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 3 }, (_, i) => (
              <tr key={`loading-${i}`}>
                {columns.map((column) => (
                  <td key={column.key} data-align={column.align}>
                    <span className="ny-table__skeleton" />
                  </td>
                ))}
              </tr>
            ))
          ) : sortedRows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="ny-table__empty">
                {empty}
              </td>
            </tr>
          ) : (
            sortedRows.map((row) => (
              <tr key={rowKey(row)}>
                {columns.map((column) => (
                  <td key={column.key} data-align={column.align}>
                    {column.cell ? column.cell(row) : (read(row, column.key) as ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
