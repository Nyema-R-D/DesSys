import { mount } from '@vue/test-utils';
import axe from 'axe-core';
import { h, ref } from 'vue';
import {
  Accordion,
  Breadcrumb,
  Menu,
  Skeleton,
  Tooltip,
  Button,
  Checkbox,
  DateField,
  Fieldset,
  FileUpload,
  FormRow,
  Switch,
  Chip,
  ConnectionStatus,
  DataTable,
  Hero,
  LabRow,
  LanguageSwitch,
  Logo,
  OfflineBanner,
  Pagination,
  RadioGroup,
  Select,
  ServiceCard,
  SiteFooter,
  SiteHeader,
  StatusBadge,
  Tabs,
  TextField,
  Theme,
} from '../index';

const flush = () => new Promise((resolve) => setTimeout(resolve));

describe('Comportements Vue', () => {
  it('TextField : v-model dans les deux sens', async () => {
    const value = ref('Awa');
    const wrapper = mount(TextField, {
      props: {
        label: 'Nom',
        modelValue: value.value,
        'onUpdate:modelValue': (v: string | undefined) => (value.value = v ?? ''),
      },
    });
    const input = wrapper.get('input');
    expect(input.element.value).toBe('Awa');
    await input.setValue('Awa Traoré');
    expect(value.value).toBe('Awa Traoré');
  });

  it('TextField : la classe va au conteneur, les autres attributs au champ', () => {
    const wrapper = mount(TextField, {
      props: { label: 'Nom' },
      attrs: { class: 'extra', placeholder: 'Votre nom' },
    });
    expect(wrapper.classes()).toContain('extra');
    expect(wrapper.get('input').attributes('placeholder')).toBe('Votre nom');
  });

  it('Select et Checkbox : v-model', async () => {
    const select = mount(Select, {
      props: {
        label: 'Région',
        options: [
          { value: 'a', label: 'A' },
          { value: 'b', label: 'B' },
        ],
        modelValue: 'a',
      },
    });
    await select.get('select').setValue('b');
    expect(select.emitted('update:modelValue')?.[0]).toEqual(['b']);
    const box = mount(Checkbox, { props: { label: 'J’accepte', modelValue: false } });
    await box.get('input').setValue(true);
    expect(box.emitted('update:modelValue')?.[0]).toEqual([true]);
  });

  it('Button lien désactivé : pas de navigation', async () => {
    const onClick = vi.fn();
    const wrapper = mount(Button, {
      props: { href: '/x', disabled: true },
      attrs: { onClick },
      slots: { default: 'Indisponible' },
    });
    const event = new MouseEvent('click', { cancelable: true, bubbles: true });
    wrapper.element.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(wrapper.attributes('href')).toBeUndefined();
  });

  it('Switch, DateField : v-model', async () => {
    const toggle = mount(Switch, { props: { label: 'Hors ligne', modelValue: false } });
    await toggle.get('input').setValue(true);
    expect(toggle.emitted('update:modelValue')?.[0]).toEqual([true]);
    expect(toggle.get('input').attributes('role')).toBe('switch');
    const date = mount(DateField, { props: { label: 'Visite', modelValue: '2026-11-04' } });
    expect(date.get('input').element.value).toBe('2026-11-04');
    await date.get('input').setValue('2026-12-01');
    expect(date.emitted('update:modelValue')?.[0]).toEqual(['2026-12-01']);
  });

  it('FileUpload : émet les fichiers et les liste', async () => {
    const wrapper = mount(FileUpload, { props: { label: 'Justificatif' } });
    const input = wrapper.get('input');
    const pdf = new File(['x'.repeat(2048)], 'releve.pdf');
    Object.defineProperty(input.element, 'files', { value: [pdf] });
    await input.trigger('change');
    expect(wrapper.emitted('filesChange')?.[0]).toEqual([[pdf]]);
    expect(wrapper.get('li').text()).toBe('releve.pdf2 ko');
    await wrapper.get('.ny-file__zone').trigger('dragenter');
    expect(wrapper.get('.ny-file__zone').attributes('data-dragging')).toBe('');
  });

  it('Menu : clavier, sélection et retour du focus', async () => {
    const wrapper = mount(Menu, {
      props: {
        label: 'Actions',
        items: [
          { id: 'modifier', label: 'Modifier' },
          { id: 'exporter', label: 'Exporter', disabled: true },
          { id: 'supprimer', label: 'Supprimer' },
        ],
      },
      attachTo: document.body,
    });
    const trigger = wrapper.get('[aria-haspopup]');
    await trigger.trigger('keydown', { key: 'ArrowUp' });
    await flush();
    const items = wrapper.findAll('[role="menuitem"]');
    expect(document.activeElement).toBe(items[2]!.element);
    await wrapper.get('[role="menu"]').trigger('keydown', { key: 'ArrowDown' });
    await flush();
    expect(document.activeElement).toBe(items[0]!.element);
    await wrapper.get('[role="menu"]').trigger('keydown', { key: 'Escape' });
    expect(wrapper.get('[role="menu"]').attributes('hidden')).toBeDefined();
    expect(document.activeElement).toBe(trigger.element);
    await trigger.trigger('click');
    await items[2]!.trigger('click');
    expect(wrapper.emitted('select')?.[0]).toEqual(['supprimer']);
    wrapper.unmount();
  });

  it('Tooltip : décrit le déclencheur, s’ouvre au focus, se ferme avec Échap', async () => {
    const wrapper = mount(Tooltip, {
      props: { content: 'Envoi différé.' },
      slots: { default: () => h('button', { type: 'button' }, 'Attente') },
      attachTo: document.body,
    });
    const tip = wrapper.get('[role="tooltip"]');
    expect(wrapper.get('button').attributes('aria-describedby')).toBe(tip.attributes('id'));
    await wrapper.get('button').trigger('focusin');
    expect(tip.attributes('hidden')).toBeUndefined();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await flush();
    expect(tip.attributes('hidden')).toBeDefined();
    wrapper.unmount();
  });

  it('Button : slot trailing', () => {
    const wrapper = mount(Button, { slots: { default: 'Suivant', trailing: '↗' } });
    expect(wrapper.get('[aria-hidden="true"]').text()).toBe('↗');
  });
});

describe('Accessibilité Vue (axe-core)', () => {
  const samples = () => [
    h(Logo),
    h(Button, { trailing: '→' }, () => 'Parler d’un projet'),
    h(Button, { href: '#', variant: 'link' }, () => 'Lire la note'),
    h(StatusBadge, { status: 'pilot' }),
    h(TextField, { label: 'E-mail', required: true, error: 'Adresse invalide.' }),
    h(Select, {
      label: 'Région',
      options: [{ value: 'a', label: 'Bamako' }],
      placeholder: 'Choisir…',
    }),
    h(Checkbox, { label: 'J’accepte' }),
    h(Chip, { selected: true }, () => 'Audit'),
    h(ConnectionStatus, { state: 'syncing', pending: 2 }),
    h(RadioGroup, { legend: 'Taille', options: [{ value: 'a', label: 'PME' }], modelValue: 'a' }),
    h(LabRow, { code: 'AI', title: 'Langues', status: 'research' }, () => 'Détail'),
    h(ServiceCard, {
      code: 'S/01',
      title: 'Cadrage',
      status: 'available',
      href: '#',
      headingLevel: 2,
    }),
    h(
      Tabs,
      {
        label: 'Dossier',
        items: [
          { id: 'a', label: 'Résumé' },
          { id: 'b', label: 'Visites' },
        ],
      },
      { a: () => 'A', b: () => 'B' },
    ),
    h(DataTable, {
      caption: 'Visites',
      columns: [{ key: 'n', header: 'Nom', sortable: true }],
      rows: [{ n: 'Ségou' }],
      rowKey: (row: unknown) => (row as { n: string }).n,
    }),
    h(Pagination, { page: 1, pageCount: 3 }),
    h(OfflineBanner),
    h(LanguageSwitch, { modelValue: 'fr' }),
    h(Switch, { label: 'Hors ligne', hint: 'Envoi différé.' }),
    h(FileUpload, { label: 'Justificatif', hint: 'PDF.', error: 'Trop lourd.' }),
    h(Breadcrumb, { items: [{ label: 'Coopératives', href: '#c' }, { label: 'Ségou' }] }),
    h(
      Accordion,
      { items: [{ id: 'a', title: 'Question' }], defaultOpen: ['a'] },
      { a: () => 'Réponse' },
    ),
    h(Skeleton, { lines: 2 }),
    h(Tooltip, { content: 'Aide' }, () => h('button', { type: 'button' }, 'Info')),
    h(Menu, { label: 'Actions', items: [{ id: 'a', label: 'Modifier' }] }),
    h(Fieldset, { legend: 'Coopérative', description: 'Telle qu’enregistrée.' }, () =>
      h(FormRow, { columns: 2 }, () => [
        h(TextField, { label: 'Nom' }),
        h(DateField, { label: 'Création' }),
      ]),
    ),
  ];
  const landmarks = () => [
    h(SiteHeader, { links: [{ href: '#a', label: 'Solutions' }] }),
    h(Hero, { title: 'Titre.', eyebrow: 'Logiciels' }),
    h(SiteFooter, {
      columns: [{ title: 'Légal', links: [{ href: '#m', label: 'Mentions' }] }],
      legal: '© 2026 NYEMA',
    }),
  ];

  let wrapper: ReturnType<typeof mount> | undefined;
  afterEach(() => wrapper?.unmount());

  it.each(['anthracite', 'paper'] as const)('aucune violation, thème %s', async (theme) => {
    wrapper = mount(
      {
        render: () => {
          const [header, hero, footer] = landmarks();
          return h(Theme, { theme }, () => [header, h('main', [hero, ...samples()]), footer]);
        },
      },
      { attachTo: document.body },
    );
    const { violations } = await axe.run(wrapper.element as Element, {
      rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
    });
    expect(violations.map((v) => `${v.id} : ${v.help}`)).toEqual([]);
  });
});
