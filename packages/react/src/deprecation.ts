const warned = new Set<string>();

// Sans dépendre des types Node : `process` n'existe pas toujours (navigateur sans bundler).
const isProduction = () =>
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
    ?.NODE_ENV === 'production';

/**
 * Signale une API dépréciée, une seule fois par API et jamais en production.
 * Politique : dépréciée dans une version mineure, retirée au plus tôt à la majeure suivante.
 */
export function warnDeprecated(
  api: string,
  options: { replacement?: string; removal: string; guide?: string },
) {
  if (isProduction() || warned.has(api)) return;
  warned.add(api);
  const parts = [
    `[NYEMA] « ${api} » est déprécié et sera retiré en ${options.removal}.`,
    options.replacement ? `Utilisez « ${options.replacement} ».` : '',
    options.guide ? `Guide : ${options.guide}` : '',
  ];
  console.warn(parts.filter(Boolean).join(' '));
}

/** Réservé aux tests. */
export function resetDeprecationWarnings() {
  warned.clear();
}
