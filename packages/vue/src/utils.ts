export type Locale = 'fr' | 'bm';
export type ProductStatus = 'research' | 'prototype' | 'pilot' | 'available';

/** Libellés partagés avec @nyema-r-d/react. Bamanankan : à faire valider par un locuteur natif. */
export const statusLabels: Record<Locale, Record<ProductStatus, string>> = {
  fr: { research: 'Recherche', prototype: 'Prototype', pilot: 'Pilote', available: 'Disponible' },
  bm: { research: 'Ɲinini', prototype: 'Misali', pilot: 'Kɔrɔbɔli', available: 'A bɛ sɔrɔ' },
};

export type ConnectionState = 'online' | 'offline' | 'syncing' | 'conflict';
export const connectionLabels: Record<Locale, Record<ConnectionState, string>> = {
  fr: {
    online: 'Synchronisé',
    offline: 'Hors ligne',
    syncing: 'Synchronisation',
    conflict: 'Conflit',
  },
  bm: {
    online: 'A bɛ ɲɔgɔn fɛ',
    offline: 'Ɛntɛrinɛti tɛ',
    syncing: 'A bɛ ka ɲɔgɔn sɔrɔ',
    conflict: 'Bɛnbaliya',
  },
};

// Grille de signaux : même tirage que @nyema-r-d/react (même graine → même motif).
export type SignalState = 'off' | 'paper' | 'accent';
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

/** Taille de fichier lisible : 820 ko, 1,4 Mo (identique à @nyema-r-d/react). */
export const formatFileSize = (bytes: number) => {
  const format = (n: number) =>
    new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(n);
  return bytes < 1024 * 1024
    ? `${format(Math.max(1, bytes / 1024))} ko`
    : `${format(bytes / 1024 / 1024)} Mo`;
};
