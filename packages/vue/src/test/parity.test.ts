// Parité : chaque composant Vue doit produire le même HTML (structure, classes, attributs ARIA)
// que son jumeau @nyema-r-d/react. C'est ce qui permet de partager @nyema-r-d/css.
import * as R from '@nyema-r-d/react';
import { h, type Component } from 'vue';
import { createElement, type SVGProps } from 'react';
import * as V from '../index';
import { canonical, r, renderReact, renderVue, type VueSlots } from './render';

type Case = [
  name: string,
  react: ReturnType<typeof r>,
  vue: Component,
  props?: Record<string, unknown>,
  slot?: VueSlots,
];

// Icône minimale identique dans les deux frameworks : on vérifie l'adaptateur, pas Lucide.
const ReactGlyph = ({
  size,
  strokeWidth,
  absoluteStrokeWidth: _absolute,
  ...rest
}: SVGProps<SVGSVGElement> & { size?: number | string; absoluteStrokeWidth?: boolean }) =>
  createElement(
    'svg',
    { width: size, height: size, 'stroke-width': strokeWidth, viewBox: '0 0 24 24', ...rest },
    createElement('path', { d: 'M2 12h20' }),
  );
const VueGlyph = {
  props: ['size', 'strokeWidth', 'absoluteStrokeWidth'],
  setup(props: { size?: number; strokeWidth?: number }) {
    return () =>
      h(
        'svg',
        {
          width: props.size,
          height: props.size,
          'stroke-width': props.strokeWidth,
          viewBox: '0 0 24 24',
        },
        [h('path', { d: 'M2 12h20' })],
      );
  },
};

const links = [
  { href: '#solutions', label: 'Solutions', current: true },
  { href: '#laboratoire', label: 'Laboratoire' },
];
const footerColumns = [
  { title: 'NYEMA', links: [{ href: '#apropos', label: 'À propos' }] },
  { title: 'Légal', links: [{ href: '/mentions', label: 'Mentions légales' }] },
];
const radioOptions = [
  { value: 'pme', label: 'PME' },
  { value: 'public', label: 'Administration', disabled: true },
];
const tableColumns = [
  { key: 'cooperative', header: 'Coopérative', sortable: true },
  { key: 'members', header: 'Membres', sortable: true, align: 'end' as const, width: '120px' },
  { key: 'agent', header: 'Agent' },
];
const tableRows = [
  { id: '1', cooperative: 'Ségou', members: 142, agent: 'A. Traoré' },
  { id: '2', cooperative: 'Bamako', members: 38, agent: 'M. Diarra' },
];
const rowKey = (row: unknown) => (row as { id: string }).id;

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
  [
    'SignalGrid',
    r(R.SignalGrid, { columns: 8, rows: 2, seed: 3 }),
    V.SignalGrid,
    { columns: 8, rows: 2, seed: 3 },
  ],
  [
    'LabRow fermé',
    r(R.LabRow, { code: 'OFFLINE', title: 'Synchronisation', status: 'research' }, 'Détail'),
    V.LabRow,
    { code: 'OFFLINE', title: 'Synchronisation', status: 'research' },
    'Détail',
  ],
  [
    'LabRow ouvert',
    r(R.LabRow, { code: 'DATA', title: 'Données', status: 'pilot', defaultOpen: true }, 'Détail'),
    V.LabRow,
    { code: 'DATA', title: 'Données', status: 'pilot', defaultOpen: true },
    'Détail',
  ],
  [
    'LabRow sans contenu',
    r(R.LabRow, { code: 'AI', title: 'Langues', status: 'prototype' }),
    V.LabRow,
    { code: 'AI', title: 'Langues', status: 'prototype' },
  ],
  [
    'PillarCard',
    r(R.PillarCard, { index: 2, title: 'Infrastructures', description: 'Hébergement.' }),
    V.PillarCard,
    { index: 2, title: 'Infrastructures', description: 'Hébergement.' },
  ],
  [
    'PillarCard lien h2',
    r(R.PillarCard, { index: '3', title: 'Recherche', href: '#r', headingLevel: 2 }),
    V.PillarCard,
    { index: '3', title: 'Recherche', href: '#r', headingLevel: 2 },
  ],
  [
    'ServiceCard',
    r(R.ServiceCard, {
      code: 'S/01',
      title: 'Cadrage',
      description: 'Atelier.',
      status: 'available',
      href: '#c',
    }),
    V.ServiceCard,
    { code: 'S/01', title: 'Cadrage', description: 'Atelier.', status: 'available', href: '#c' },
  ],
  [
    'ServiceCard sans statut',
    r(R.ServiceCard, { title: 'Audit' }),
    V.ServiceCard,
    { title: 'Audit' },
  ],
  ['ServiceGrid', r(R.ServiceGrid, null, 'x'), V.ServiceGrid, {}, 'x'],
  [
    'RadioGroup',
    r(R.RadioGroup, {
      legend: 'Taille',
      name: 'taille',
      options: radioOptions,
      defaultValue: 'pme',
    }),
    V.RadioGroup,
    { legend: 'Taille', name: 'taille', options: radioOptions, modelValue: 'pme' },
  ],
  [
    'RadioGroup erreur horizontal',
    r(R.RadioGroup, {
      legend: 'Taille',
      name: 't2',
      options: radioOptions,
      required: true,
      error: 'Requis.',
      orientation: 'horizontal',
    }),
    V.RadioGroup,
    {
      legend: 'Taille',
      name: 't2',
      options: radioOptions,
      required: true,
      error: 'Requis.',
      orientation: 'horizontal',
    },
  ],
  [
    'Tabs',
    r(R.Tabs, {
      label: 'Dossier',
      items: [
        { id: 'a', label: 'Résumé', content: 'A' },
        { id: 'b', label: 'Visites', content: 'B' },
        { id: 'c', label: 'Archives', content: 'C', disabled: true },
      ],
    }),
    V.Tabs,
    {
      label: 'Dossier',
      items: [
        { id: 'a', label: 'Résumé' },
        { id: 'b', label: 'Visites' },
        { id: 'c', label: 'Archives', disabled: true },
      ],
    },
    { a: () => 'A', b: () => 'B', c: () => 'C' },
  ],
  [
    'Dialog',
    r(R.Dialog, { open: false, onClose: () => {}, title: 'Supprimer ?', footer: 'Pied' }, 'Corps'),
    V.Dialog,
    { open: false, title: 'Supprimer ?' },
    { default: () => 'Corps', footer: () => 'Pied' },
  ],
  ['ToastProvider', r(R.ToastProvider, null, 'App'), V.ToastProvider, {}, 'App'],
  [
    'DataTable',
    r(R.DataTable, { caption: 'Visites', columns: tableColumns, rows: tableRows, rowKey }),
    V.DataTable,
    { caption: 'Visites', columns: tableColumns, rows: tableRows, rowKey },
  ],
  [
    'DataTable trié compact',
    r(R.DataTable, {
      caption: 'Visites',
      columns: tableColumns,
      rows: tableRows,
      rowKey,
      defaultSort: { key: 'members', direction: 'descending' },
      density: 'compact',
      captionHidden: true,
    }),
    V.DataTable,
    {
      caption: 'Visites',
      columns: tableColumns,
      rows: tableRows,
      rowKey,
      defaultSort: { key: 'members', direction: 'descending' },
      density: 'compact',
      captionHidden: true,
    },
  ],
  [
    'DataTable vide',
    r(R.DataTable, {
      caption: 'Visites',
      columns: tableColumns,
      rows: [],
      rowKey,
      empty: 'Aucune visite.',
    }),
    V.DataTable,
    { caption: 'Visites', columns: tableColumns, rows: [], rowKey, empty: 'Aucune visite.' },
  ],
  [
    'DataTable chargement',
    r(R.DataTable, { caption: 'Visites', columns: tableColumns, rows: [], rowKey, loading: true }),
    V.DataTable,
    { caption: 'Visites', columns: tableColumns, rows: [], rowKey, loading: true },
  ],
  [
    'Pagination',
    r(R.Pagination, { page: 2, pageCount: 4, onPageChange: () => {} }),
    V.Pagination,
    { page: 2, pageCount: 4 },
  ],
  [
    'Pagination masquée',
    r(R.Pagination, { page: 1, pageCount: 1, onPageChange: () => {} }),
    V.Pagination,
    { page: 1, pageCount: 1 },
  ],
  ['OfflineBanner', r(R.OfflineBanner), V.OfflineBanner],
  ['Icon décorative', r(R.Icon, { icon: ReactGlyph }), V.Icon, { icon: VueGlyph }],
  [
    'Icon nommée',
    r(R.Icon, { icon: ReactGlyph, size: 24, label: 'Hors ligne' }),
    V.Icon,
    { icon: VueGlyph, size: 24, label: 'Hors ligne' },
  ],
  [
    'LanguageSwitch boutons',
    r(R.LanguageSwitch, { value: 'fr' }),
    V.LanguageSwitch,
    { modelValue: 'fr' },
  ],
  [
    'LanguageSwitch liens',
    r(R.LanguageSwitch, { value: 'bm', getHref: (l: string) => `/${l}/` }),
    V.LanguageSwitch,
    { modelValue: 'bm', getHref: (l: string) => `/${l}/` },
  ],
  [
    'SiteHeader',
    r(R.SiteHeader, { links, actions: 'CTA' }),
    V.SiteHeader,
    { links },
    { actions: () => 'CTA' },
  ],
  [
    'SiteHeader sans action',
    r(R.SiteHeader, { links, brandHref: '/fr/' }),
    V.SiteHeader,
    { links, brandHref: '/fr/' },
  ],
  [
    'Hero',
    r(R.Hero, {
      eyebrow: 'Logiciels',
      aside: 'Mali → Afrique',
      title: 'Titre.',
      lead: 'Accroche.',
      actions: 'A',
      media: 'M',
      mediaLegend: ['Réseau', 'Hors ligne'],
    }),
    V.Hero,
    {
      eyebrow: 'Logiciels',
      aside: 'Mali → Afrique',
      title: 'Titre.',
      lead: 'Accroche.',
      mediaLegend: ['Réseau', 'Hors ligne'],
    },
    { actions: () => 'A', media: () => 'M' },
  ],
  ['Hero minimal', r(R.Hero, { title: 'Titre.' }), V.Hero, { title: 'Titre.' }],
  [
    'Hero aside seul',
    r(R.Hero, { aside: 'Mali', title: 'Titre.' }),
    V.Hero,
    { aside: 'Mali', title: 'Titre.' },
  ],
  [
    'SiteFooter',
    r(R.SiteFooter, {
      columns: footerColumns,
      legal: '© 2026 NYEMA',
      tagline: 'Technologie utile.',
      extra: 'FR',
    }),
    V.SiteFooter,
    { columns: footerColumns, legal: '© 2026 NYEMA', tagline: 'Technologie utile.' },
    { extra: () => 'FR' },
  ],
  [
    'TextField compteur',
    r(R.TextField, {
      label: 'Note',
      maxLength: 200,
      showCount: true,
      value: 'abc',
      onChange: () => {},
    }),
    V.TextField,
    { label: 'Note', maxlength: 200, showCount: true, modelValue: 'abc' },
  ],
  ['Switch', r(R.Switch, { label: 'Hors ligne' }), V.Switch, { label: 'Hors ligne' }],
  [
    'Switch avec aide, activé',
    r(R.Switch, { label: 'Hors ligne', hint: 'Envoi différé.', checked: true, readOnly: true }),
    V.Switch,
    { label: 'Hors ligne', hint: 'Envoi différé.', modelValue: true, readonly: true },
  ],
  [
    'FileUpload',
    r(R.FileUpload, {
      label: 'Justificatif',
      hint: 'PDF, 5 Mo.',
      error: 'Trop lourd.',
      required: true,
      accept: 'application/pdf',
    }),
    V.FileUpload,
    {
      label: 'Justificatif',
      hint: 'PDF, 5 Mo.',
      error: 'Trop lourd.',
      required: true,
      accept: 'application/pdf',
    },
  ],
  [
    'DateField',
    r(R.DateField, { label: 'Visite', min: '2026-01-01', value: '2026-11-04', onChange: () => {} }),
    V.DateField,
    { label: 'Visite', min: '2026-01-01', modelValue: '2026-11-04' },
  ],
  [
    'Fieldset',
    r(
      R.Fieldset,
      { legend: 'Coopérative', description: 'Telle qu’enregistrée.', error: 'Incomplet.' },
      'champs',
    ),
    V.Fieldset,
    { legend: 'Coopérative', description: 'Telle qu’enregistrée.', error: 'Incomplet.' },
    'champs',
  ],
  ['FormRow', r(R.FormRow, null, 'a'), V.FormRow, {}, 'a'],
  ['FormRow 3 colonnes', r(R.FormRow, { columns: 3 }, 'a'), V.FormRow, { columns: 3 }, 'a'],
  ['FormActions', r(R.FormActions, null, 'a'), V.FormActions, {}, 'a'],
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
