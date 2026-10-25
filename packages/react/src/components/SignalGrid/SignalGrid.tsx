import { useEffect, useState, type CSSProperties, type HTMLAttributes } from 'react';
import { cx } from '../../utils';
import './SignalGrid.css';

export type SignalState = 'off' | 'paper' | 'accent';

export interface SignalGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  rows?: number;
  /** Anime doucement la grille (600 ms) — réservé au hero. Désactivé si l'utilisateur réduit les animations. */
  animated?: boolean;
  /** Graine du tirage, pour un motif stable entre deux rendus. */
  seed?: number;
}

/** Proportions de la grille de signaux : 7 % latérite, 17 % papier, le reste éteint. */
export const SIGNAL_RATIOS = { accent: 0.07, paper: 0.17 } as const;

const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

export function createSignalPattern(count: number, seed = 1): SignalState[] {
  const random = mulberry32(seed);
  const order = Array.from({ length: count }, (_, i) => i).sort(() => random() - 0.5);
  const accent = Math.round(count * SIGNAL_RATIOS.accent);
  const paper = Math.round(count * SIGNAL_RATIOS.paper);
  const states: SignalState[] = Array.from({ length: count }, () => 'off');
  order.forEach((cell, rank) => {
    states[cell] = rank < accent ? 'accent' : rank < accent + paper ? 'paper' : 'off';
  });
  return states;
}

/** Grille de signaux : modules carrés écartés de 3 px, dérivés du carré-nœud du logo. */
export function SignalGrid({
  columns = 16,
  rows = 4,
  animated = false,
  seed = 7,
  className,
  style,
  ...props
}: SignalGridProps) {
  const count = columns * rows;
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!animated) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), 1800);
    return () => window.clearInterval(timer);
  }, [animated]);

  const pattern = createSignalPattern(count, seed + tick);

  return (
    <div
      className={cx('ny-signal-grid', className)}
      style={{ '--ny-signal-columns': columns, ...style } as CSSProperties}
      aria-hidden="true"
      {...props}
    >
      {pattern.map((state, i) => (
        <div key={i} className="ny-signal-grid__cell" data-state={state} />
      ))}
    </div>
  );
}
