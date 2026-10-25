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
