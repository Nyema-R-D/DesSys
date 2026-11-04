import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { cx } from '../../utils';
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
} from './polygon';
import '@nyema-r-d/css/components/PolygonEditor.css';

export type { PolygonPoint } from './polygon';

export interface PolygonEditorImage {
  src: string;
  /** Dimensions réelles : elles fixent le format de la surface. */
  width: number;
  height: number;
}

export interface PolygonEditorProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Nom de la surface (ex. « Zone Quai de chargement »). */
  label: string;
  /** Points en coordonnées normalisées [0, 1]. */
  polygon: PolygonPoint[];
  onChange: (polygon: PolygonPoint[]) => void;
  /** Image de fond ; sans image, une grille de repère au format 16 / 9. */
  image?: PolygonEditorImage | null;
  /** Autres polygones affichés pour repère, en pointillés, non modifiables. */
  others?: { id: string; polygon: PolygonPoint[] }[];
  min?: number;
  max?: number;
  /** Légende (ex. ce que montre l'image), avant le mode d'emploi. */
  caption?: ReactNode;
  /** Mode d'emploi, relié à la surface. */
  instructions?: ReactNode;
  disabled?: boolean;
  pointLabel?: (index: number, point: PolygonPoint) => string;
  /** Message annoncé selon le nombre de points (vide : rien à signaler). */
  status?: (count: number, min: number, max: number) => string;
}

const points = (polygon: PolygonPoint[]) => polygon.map(([x, y]) => `${x},${y}`).join(' ');

/**
 * Dessin d'un polygone sur une image, en coordonnées normalisées. Pointeur : un clic ajoute un
 * point, un glisser le déplace. Clavier : chaque point est un bouton ; flèches pour le déplacer
 * (Maj : plus vite), Entrée pour insérer un point après lui, Suppr pour l'enlever. Surface vide :
 * Entrée place un premier point au centre.
 */
export function PolygonEditor({
  label,
  polygon,
  onChange,
  image,
  others = [],
  min = 3,
  max = 64,
  caption,
  instructions = 'Cliquez pour ajouter un point, faites glisser un point pour le déplacer. Au clavier : flèches pour déplacer le point (Maj : plus vite), Entrée pour en insérer un autre après lui, Suppr pour l’enlever.',
  disabled = false,
  pointLabel = defaultPointLabel,
  status = defaultStatus,
  className,
  ...props
}: PolygonEditorProps) {
  const instructionsId = useId();
  const surface = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<number>();
  // Point à focaliser après un ajout ou une suppression au clavier (-1 : la surface), une fois
  // le nouveau polygone rendu.
  const pendingFocus = useRef<number>(undefined);
  const setFocusIndex = (index: number) => {
    pendingFocus.current = index;
  };

  useEffect(() => {
    const index = pendingFocus.current;
    if (index === undefined) return;
    pendingFocus.current = undefined;
    const target =
      index < 0
        ? surface.current
        : surface.current?.querySelector<HTMLElement>(`[data-index="${index}"]`);
    target?.focus();
  });

  const at = (event: PointerEvent) => {
    const box = surface.current!.getBoundingClientRect();
    return [
      (event.clientX - box.left) / box.width,
      (event.clientY - box.top) / box.height,
    ] as const;
  };
  const full = polygon.length >= max;
  const empty = polygon.length === 0;

  const onSurfacePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (disabled || full || event.button !== 0) return;
    if ((event.target as Element).closest('button')) return;
    onChange([...polygon, toPoint(...at(event))]);
  };

  const onSurfaceKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !empty || disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onChange([toPoint(0.5, 0.5)]);
      setFocusIndex(0);
    }
  };

  const onPointKeyDown = (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? KEY_BIG_STEP : KEY_STEP;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const move = moves[event.key];
    const [x, y] = polygon[index]!;
    if (move) {
      event.preventDefault();
      onChange(setPoint(polygon, index, x + move[0], y + move[1]));
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (full) return;
      onChange(insertAfter(polygon, index));
      setFocusIndex(index + 1);
    } else if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      onChange(removePoint(polygon, index));
      setFocusIndex(polygon.length === 1 ? -1 : Math.max(0, index - 1));
    }
  };

  const ratio = image ? `${image.width} / ${image.height}` : undefined;
  const message = status(polygon.length, min, max);

  return (
    <figure
      className={cx('ny-polygon-editor', disabled && 'ny-polygon-editor--disabled', className)}
      {...props}
    >
      <div
        ref={surface}
        className="ny-polygon-editor__surface ny-focusable"
        style={ratio ? ({ '--ny-polygon-ratio': ratio } as CSSProperties) : undefined}
        role="group"
        aria-label={label}
        aria-describedby={instructionsId}
        aria-disabled={disabled || undefined}
        tabIndex={empty && !disabled ? 0 : undefined}
        onPointerDown={onSurfacePointerDown}
        onPointerMove={(event) => {
          if (dragging === undefined) return;
          onChange(setPoint(polygon, dragging, ...at(event)));
        }}
        onPointerUp={() => setDragging(undefined)}
        onPointerCancel={() => setDragging(undefined)}
        onKeyDown={onSurfaceKeyDown}
      >
        {image ? <img className="ny-polygon-editor__image" src={image.src} alt="" /> : null}
        <svg
          className="ny-polygon-editor__drawing"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {others.map((other) => (
            <polygon
              key={other.id}
              className="ny-polygon-editor__other"
              points={points(other.polygon)}
            />
          ))}
          {polygon.length >= 3 ? (
            <polygon className="ny-polygon-editor__shape" points={points(polygon)} />
          ) : polygon.length === 2 ? (
            <polyline className="ny-polygon-editor__shape" points={points(polygon)} />
          ) : null}
        </svg>
        {polygon.map((point, index) => (
          <button
            key={index}
            type="button"
            data-index={index}
            className="ny-polygon-editor__point ny-focusable"
            style={{ left: `${point[0] * 100}%`, top: `${point[1] * 100}%` }}
            aria-label={pointLabel(index, point)}
            disabled={disabled}
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              event.currentTarget.setPointerCapture?.(event.pointerId);
              setDragging(index);
            }}
            onKeyDown={onPointKeyDown(index)}
          />
        ))}
      </div>
      <p className="ny-polygon-editor__status" role="status">
        {message}
      </p>
      <figcaption className="ny-polygon-editor__caption">
        {caption != null ? <>{caption} </> : null}
        <span id={instructionsId}>{instructions}</span>
      </figcaption>
    </figure>
  );
}
