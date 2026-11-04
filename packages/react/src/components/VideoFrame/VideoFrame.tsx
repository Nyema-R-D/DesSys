import { useState, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils';
import { Alert } from '../Alert/Alert';
import { Spinner } from '../Progress/Progress';
import { Skeleton } from '../Skeleton/Skeleton';
import '@nyema-r-d/css/components/VideoFrame.css';

/** `MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED`, écrit en clair : `MediaError` n'existe pas partout. */
export const MEDIA_ERR_SRC_NOT_SUPPORTED = 4;

export type VideoFrameState = 'loading' | 'playable' | 'unsupported' | 'error';

export interface VideoFrameProps extends Omit<HTMLAttributes<HTMLElement>, 'onError'> {
  /** Source de la vidéo (URL, `blob:`) ; absente pendant son chargement. */
  src?: string;
  /** Échec connu de l'application (téléchargement refusé, format annoncé non lisible…). */
  failure?: 'error' | 'unsupported';
  /** Nom accessible de la vidéo. */
  label: string;
  caption?: ReactNode;
  /** Format réservé pendant le chargement et en lecture (`16 / 9` par défaut). */
  aspectRatio?: string;
  poster?: string;
  /** `metadata` par défaut ; `none` pour une liste d'extraits (rien n'est chargé avant lecture). */
  preload?: 'none' | 'metadata' | 'auto';
  /** Action proposée quand la vidéo ne peut pas être lue (ex. un bouton de téléchargement). */
  action?: ReactNode;
  /** Appelé quand le navigateur ne sait pas décoder la vidéo (souvent le H.265 des caméras). */
  onUnsupported?: () => void;
  /** Appelé pour toute autre erreur de lecture, avec le code `MediaError`. */
  onError?: (code: number | undefined) => void;
  loadingLabel?: string;
  unsupportedTitle?: ReactNode;
  unsupportedMessage?: ReactNode;
  errorTitle?: ReactNode;
  errorMessage?: ReactNode;
}

/**
 * Cadre autour du `<video>` natif : les contrôles restent ceux du navigateur (accessibles,
 * traduits). Gère le chargement, l'erreur et le format non lu, avec une action de repli.
 */
export function VideoFrame({
  src,
  failure: forcedFailure,
  label,
  caption,
  aspectRatio,
  poster,
  preload = 'metadata',
  action,
  onUnsupported,
  onError,
  loadingLabel = 'Chargement de la vidéo',
  unsupportedTitle = 'Format non lu par ce navigateur',
  unsupportedMessage = 'Ce navigateur ne sait pas lire cette vidéo. Téléchargez-la pour l’ouvrir avec un lecteur vidéo.',
  errorTitle = 'Lecture impossible',
  errorMessage = 'La vidéo n’a pas pu être chargée.',
  className,
  style,
  ...props
}: VideoFrameProps) {
  // L'échec est lié à la source : une nouvelle source repart de zéro.
  const [failure, setFailure] = useState<{ src: string; unsupported: boolean }>();
  const state: VideoFrameState = forcedFailure
    ? forcedFailure
    : src === undefined
      ? 'loading'
      : failure?.src === src
        ? failure.unsupported
          ? 'unsupported'
          : 'error'
        : 'playable';

  const surfaceStyle = aspectRatio
    ? ({ '--ny-video-ratio': aspectRatio } as CSSProperties)
    : undefined;

  return (
    <figure className={cx('ny-video-frame', className)} style={style} {...props}>
      {state === 'unsupported' || state === 'error' ? (
        <Alert
          tone={state === 'unsupported' ? 'warning' : 'error'}
          title={state === 'unsupported' ? unsupportedTitle : errorTitle}
          action={action}
        >
          {state === 'unsupported' ? unsupportedMessage : errorMessage}
        </Alert>
      ) : (
        <div
          className="ny-video-frame__surface"
          style={surfaceStyle}
          aria-busy={state === 'loading' || undefined}
        >
          {state === 'loading' ? (
            <>
              <Skeleton className="ny-video-frame__skeleton" />
              <Spinner label={loadingLabel} />
            </>
          ) : (
            <video
              className="ny-video-frame__media"
              src={src}
              poster={poster}
              controls
              preload={preload}
              aria-label={label}
              onError={(event) => {
                const code = event.currentTarget.error?.code;
                const unsupported = code === MEDIA_ERR_SRC_NOT_SUPPORTED;
                setFailure({ src: src!, unsupported });
                if (unsupported) onUnsupported?.();
                else onError?.(code);
              }}
            />
          )}
        </div>
      )}
      {caption != null ? (
        <figcaption className="ny-video-frame__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
