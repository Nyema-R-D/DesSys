import { tokens } from '@nyema-r-d/tokens';

export const neutrals = [
  ['Ink 950', 'ink', '950'],
  ['Ink 900', 'ink', '900'],
  ['Ink 800', 'ink', '800'],
  ['Ink 700', 'ink', '700'],
  ['Ink 500', 'ink', '500'],
  ['Ink 400', 'ink', '400'],
  ['Ink 300', 'ink', '300'],
  ['Paper 200', 'paper', '200'],
  ['Paper 100', 'paper', '100'],
  ['Paper 50', 'paper', '50'],
].map(([name, family, step]) => ({
  name: name!,
  token: `--ny-${family}-${step}`,
  hex: (tokens.color as unknown as Record<string, Record<string, string>>)[family!]![step!]!,
}));

export const spaces = Object.entries(tokens.space).map(([step, px]) => ({
  token: `--space-${step}`,
  px,
  width: `${parseInt(px, 10) * 2}px`,
}));

export const statuses = [
  ['Recherche', tokens.color.status.research],
  ['Prototype', tokens.color.status.prototype],
  ['Pilote', tokens.color.status.pilot],
  ['Disponible', tokens.color.status.available],
] as const;

export const typeScale = [
  {
    spec: 'DISPLAY · 124/0.92 · 112%',
    className: 'ref-type-display',
    sample: 'Infrastructures utiles.',
  },
  { spec: 'H2 · 56/1 · 110%', className: 'ref-type-h2', sample: 'Projets en exploration.' },
  {
    spec: 'H3 · 26/1.1 · 108%',
    className: 'ref-type-h3',
    sample: 'Moteur de synchronisation hors ligne',
  },
  {
    spec: 'BODY LG · 20/1.5',
    className: 'ref-type-body-lg',
    sample:
      'NYEMA conçoit des logiciels, des plateformes et des technologies adaptées aux réalités opérationnelles du Mali et des marchés africains.',
  },
  {
    spec: 'BODY · 17/1.55',
    className: 'ref-type-body',
    sample:
      'Un agent de terrain enregistre ses visites sans connexion ; l’application synchronise et signale les conflits au retour du réseau.',
  },
  {
    spec: 'LABEL · MONO 12 · +8%',
    className: 'ny-mono-label',
    sample: '03 — Laboratoire · Statut : Recherche',
  },
];
