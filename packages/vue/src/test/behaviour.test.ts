import { mount } from '@vue/test-utils';
import axe from 'axe-core';
import { defineComponent, h, nextTick, ref } from 'vue';
import {
  Accordion,
  Alert,
  Breadcrumb,
  Menu,
  Skeleton,
  Tooltip,
  Button,
  Checkbox,
  Combobox,
  DateField,
  Fieldset,
  FileUpload,
  Progress,
  Spinner,
  FormRow,
  Switch,
  Stepper,
  Chip,
  ConnectionStatus,
  DataTable,
  Hero,
  LabRow,
  LanguageSwitch,
  LinkProvider,
  Logo,
  OfflineBanner,
  Pagination,
  PolygonEditor,
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

  it('LinkProvider : les liens de SiteHeader passent par le routeur et ferment le menu', async () => {
    const visited: string[] = [];
    const RouterLink = defineComponent({
      props: { href: { type: String, required: true } },
      setup(props, { slots }) {
        return () =>
          h(
            'a',
            {
              href: props.href,
              'data-router': '',
              onClick: (event: MouseEvent) => {
                event.preventDefault();
                visited.push(props.href);
              },
            },
            slots.default?.(),
          );
      },
    });
    const links = [{ href: '/cameras', label: 'Caméras' }];
    const wrapper = mount(
      { render: () => h(LinkProvider, { component: RouterLink }, () => h(SiteHeader, { links })) },
      { attachTo: document.body },
    );
    const toggle = wrapper.get('button');
    await toggle.trigger('click');
    const panel = wrapper.get(`#${toggle.attributes('aria-controls')}`);
    const link = panel.get('a');
    expect(link.attributes()).toMatchObject({
      'data-router': '',
      class: expect.stringContaining('ny-site-header__link'),
    });
    await link.trigger('click');
    expect(visited).toEqual(['/cameras']);
    expect(toggle.attributes('aria-expanded')).toBe('false');
    wrapper.unmount();
  });

  it('PolygonEditor : v-model:polygon, clavier et focus', async () => {
    const polygon = ref<[number, number][]>([
      [0.1, 0.1],
      [0.5, 0.1],
      [0.3, 0.5],
    ]);
    const wrapper = mount(
      {
        render: () =>
          h(PolygonEditor, {
            label: 'Zone Quai',
            polygon: polygon.value,
            'onUpdate:polygon': (value: [number, number][]) => (polygon.value = value),
          }),
      },
      { attachTo: document.body },
    );
    const first = wrapper.get('[data-index="0"]');
    await first.trigger('keydown', { key: 'ArrowRight' });
    expect(polygon.value[0]).toEqual([0.105, 0.1]);
    await first.trigger('keydown', { key: 'Enter' });
    await nextTick();
    expect(polygon.value).toHaveLength(4);
    expect(document.activeElement).toBe(wrapper.get('[data-index="1"]').element);
    await wrapper.get('[data-index="1"]').trigger('keydown', { key: 'Delete' });
    await nextTick();
    expect(polygon.value).toHaveLength(3);
    expect(wrapper.get('[role="status"]').text()).toBe('');
    wrapper.unmount();
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

  it('FileUpload : barre d’avancement par fichier', async () => {
    const wrapper = mount(FileUpload, {
      props: {
        label: 'Justificatif',
        getProgress: (file: File) => (file.name === 'releve.pdf' ? 40 : undefined),
      },
    });
    const input = wrapper.get('input');
    const files = [new File(['x'], 'releve.pdf'), new File(['y'], 'photo.jpg')];
    Object.defineProperty(input.element, 'files', { value: files });
    await input.trigger('change');
    const bars = wrapper.findAll('progress');
    expect(bars).toHaveLength(1);
    expect(bars[0]!.attributes('aria-label')).toBe('Envoi de releve.pdf');
    expect((bars[0]!.element as HTMLProgressElement).value).toBe(40);
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

  it('Combobox : filtre, clavier, choix et effacement', async () => {
    const wrapper = mount(Combobox, {
      props: {
        label: 'Commune',
        options: [
          { value: 'bamako', label: 'Bamako' },
          { value: 'segou', label: 'Ségou' },
          { value: 'sikasso', label: 'Sikasso', disabled: true },
        ],
        modelValue: null,
      },
      attachTo: document.body,
    });
    const input = wrapper.get('[role="combobox"]');
    await input.setValue('seg');
    expect(input.attributes('aria-expanded')).toBe('true');
    expect(wrapper.findAll('[role="option"]').map((o) => o.text())).toEqual(['Ségou']);
    await input.setValue('');
    await input.trigger('keydown', { key: 'ArrowUp' });
    const options = wrapper.findAll('[role="option"]');
    expect(input.attributes('aria-activedescendant')).toBe(options[1]!.attributes('id'));
    await input.trigger('keydown', { key: 'Enter' });
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['segou']);
    await wrapper.setProps({ modelValue: 'segou' });
    expect((input.element as HTMLInputElement).value).toBe('Ségou');
    await input.setValue('Kayes');
    expect(wrapper.get('[role="status"]').text()).toBe('Aucun résultat');
    await input.trigger('keydown', { key: 'Escape' });
    expect((input.element as HTMLInputElement).value).toBe('Ségou');
    await input.setValue('');
    await input.trigger('blur');
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([null]);
    wrapper.unmount();
  });

  it('Alert : rôle selon le ton et événement dismiss', async () => {
    const wrapper = mount(Alert, {
      props: { tone: 'error', title: 'Envoi impossible', dismissible: true },
      slots: { default: 'Vérifiez les champs.' },
    });
    expect(wrapper.get('[role="alert"]').text()).toContain('Erreur');
    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('dismiss')).toHaveLength(1);
    const info = mount(Alert, { slots: { default: 'Info.' } });
    expect(info.find('[role="status"]').exists()).toBe(true);
    expect(info.find('button').exists()).toBe(false);
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
    h(Progress, { label: 'Synchronisation', value: 64, hint: 'Wi-Fi' }),
    h(Progress, { label: 'Préparation' }),
    h(Spinner),
    h(Stepper, {
      steps: [
        { id: 'a', label: 'Coopérative' },
        { id: 'b', label: 'Membres' },
      ],
      current: 'b',
    }),
    h(Combobox, {
      label: 'Commune',
      options: [{ value: 'bamako', label: 'Bamako' }],
      hint: 'Filtrer',
    }),
    h(Alert, { tone: 'warning', title: 'Conflit', dismissible: true }, () => 'Détail'),
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
