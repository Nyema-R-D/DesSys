// Parité : chaque composant Vue doit produire le même HTML (structure, classes, attributs ARIA)
// que son jumeau @nyema-r-d/react. C'est ce qui permet de partager @nyema-r-d/css.
import * as R from '@nyema-r-d/react';
import type { Component } from 'vue';
import * as V from '../index';
import { canonical, r, renderReact, renderVue } from './render';

type Case = [
  name: string,
  react: ReturnType<typeof r>,
  vue: Component,
  props?: Record<string, unknown>,
  slot?: string,
];

const options = [
  { value: 'bamako', label: 'Bamako' },
  { value: 'segou', label: 'Ségou', disabled: true },
];

const cases: Case[] = [
  ['Theme anthracite', r(R.Theme, null, 'x'), V.Theme, {}, 'x'],
  ['Theme papier', r(R.Theme, { theme: 'paper' }, 'x'), V.Theme, { theme: 'paper' }, 'x'],
  ['Mark décoratif', r(R.Mark), V.Mark],
  [
    'Mark titré, 8 px → 16',
    r(R.Mark, { title: 'NYEMA', size: 8 }),
    V.Mark,
    { title: 'NYEMA', size: 8 },
  ],
  ['Mark sur latérite', r(R.Mark, { tone: 'on-laterite' }), V.Mark, { tone: 'on-laterite' }],
  ['Mark mono', r(R.Mark, { tone: 'mono', size: 48 }), V.Mark, { tone: 'mono', size: 48 }],
  ['Logo', r(R.Logo, { size: 40 }), V.Logo, { size: 40 }],
  ['Button primaire', r(R.Button, null, 'Envoyer'), V.Button, {}, 'Envoyer'],
  [
    'Button flèche',
    r(R.Button, { trailing: '→' }, 'Parler d’un projet'),
    V.Button,
    { trailing: '→' },
    'Parler d’un projet',
  ],
  [
    'Button sm pleine largeur',
    r(R.Button, { size: 'sm', fullWidth: true, variant: 'inverse' }, 'Go'),
    V.Button,
    { size: 'sm', fullWidth: true, variant: 'inverse' },
    'Go',
  ],
  [
    'Button lien',
    r(R.Button, { href: '/contact', variant: 'link' }, 'Lire'),
    V.Button,
    { href: '/contact', variant: 'link' },
    'Lire',
  ],
  [
    'Button lien désactivé',
    r(R.Button, { href: '/x', disabled: true }, 'Indisponible'),
    V.Button,
    { href: '/x', disabled: true },
    'Indisponible',
  ],
  [
    'Button désactivé',
    r(R.Button, { disabled: true, type: 'submit' }, 'Envoyer'),
    V.Button,
    { disabled: true, type: 'submit' },
    'Envoyer',
  ],
  ['StatusBadge', r(R.StatusBadge, { status: 'research' }), V.StatusBadge, { status: 'research' }],
  [
    'StatusBadge bm sans cadre',
    r(R.StatusBadge, { status: 'available', locale: 'bm', variant: 'plain' }),
    V.StatusBadge,
    { status: 'available', locale: 'bm', variant: 'plain' },
  ],
  [
    'TextField',
    r(R.TextField, { label: 'Organisation', placeholder: 'Nom' }),
    V.TextField,
    { label: 'Organisation', placeholder: 'Nom' },
  ],
  [
    'TextField erreur',
    r(R.TextField, {
      label: 'E-mail',
      required: true,
      type: 'email',
      error: 'Adresse invalide.',
      hint: 'Pro',
    }),
    V.TextField,
    { label: 'E-mail', required: true, type: 'email', error: 'Adresse invalide.', hint: 'Pro' },
  ],
  [
    'TextField multiligne',
    r(R.TextField, { label: 'Message', multiline: true, rows: 4 }),
    V.TextField,
    { label: 'Message', multiline: true, rows: 4 },
  ],
  [
    'Select',
    r(R.Select, { label: 'Région', options, placeholder: 'Choisir…', required: true }),
    V.Select,
    { label: 'Région', options, placeholder: 'Choisir…', required: true },
  ],
  [
    'Checkbox',
    r(R.Checkbox, { label: 'J’accepte', error: 'Requis.' }),
    V.Checkbox,
    { label: 'J’accepte', error: 'Requis.' },
  ],
  ['Chip', r(R.Chip, { selected: true }, 'Audit'), V.Chip, { selected: true }, 'Audit'],
  ['Chip non sélectionné', r(R.Chip, null, 'Audit'), V.Chip, {}, 'Audit'],
  [
    'ChipGroup',
    r(R.ChipGroup, { 'aria-label': 'Besoin' }),
    V.ChipGroup,
    { 'aria-label': 'Besoin' },
  ],
  [
    'SectionLabel',
    r(R.SectionLabel, { index: 2, node: true, children: 'Offres' }),
    V.SectionLabel,
    { index: 2, node: true },
    'Offres',
  ],
  [
    'SectionLabel h2',
    r(R.SectionLabel, { as: 'h2', children: 'Marque' }),
    V.SectionLabel,
    { as: 'h2' },
    'Marque',
  ],
  ['Tag', r(R.Tag, null, 'Coopératives'), V.Tag, {}, 'Coopératives'],
  [
    'TagList',
    r(R.TagList, { items: ['Entreprises', 'Universités'] }),
    V.TagList,
    { items: ['Entreprises', 'Universités'] },
  ],
  [
    'ConnectionStatus',
    r(R.ConnectionStatus, { state: 'offline', pending: 3 }),
    V.ConnectionStatus,
    { state: 'offline', pending: 3 },
  ],
  [
    'ConnectionStatus bm',
    r(R.ConnectionStatus, { state: 'online', detail: '09:42', locale: 'bm' }),
    V.ConnectionStatus,
    { state: 'online', detail: '09:42', locale: 'bm' },
  ],
  ['Container', r(R.Container, null, 'x'), V.Container, {}, 'x'],
  [
    'Section',
    r(R.Section, { index: 1, label: 'Marque' }, 'x'),
    V.Section,
    { index: 1, label: 'Marque' },
    'x',
  ],
];

describe('Parité HTML React ↔ Vue', () => {
  it.each(cases)('%s', async (_name, reactElement, vueComponent, props, slot) => {
    const vue = canonical(await renderVue(vueComponent, props, slot));
    const react = canonical(renderReact(reactElement));
    expect(vue).toBe(react);
  });

  it('couvre chaque composant exporté par le package Vue', () => {
    const covered = new Set(cases.map(([, , component]) => component));
    const exported = Object.entries(V).filter(
      ([, value]) =>
        (typeof value === 'object' && value !== null && 'setup' in value) ||
        (typeof value === 'object' && value !== null && 'render' in value),
    );
    const missing = exported
      .filter(([, component]) => !covered.has(component as Component))
      .map(([name]) => name);
    expect(missing).toEqual([]);
  });
});
