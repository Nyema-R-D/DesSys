import { mount } from '@vue/test-utils';
import axe from 'axe-core';
import { h, ref } from 'vue';
import {
  Button,
  Checkbox,
  Chip,
  ConnectionStatus,
  Logo,
  Select,
  StatusBadge,
  TextField,
  Theme,
} from '../index';

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
  ];

  it.each(['anthracite', 'paper'] as const)('aucune violation, thème %s', async (theme) => {
    const wrapper = mount(
      { render: () => h(Theme, { theme }, () => h('main', samples())) },
      { attachTo: document.body },
    );
    const { violations } = await axe.run(wrapper.element as Element, {
      rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
    });
    expect(violations.map((v) => `${v.id} : ${v.help}`)).toEqual([]);
    wrapper.unmount();
  });
});
