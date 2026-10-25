import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';
import {
  DataTable,
  Dialog,
  LabRow,
  LanguageSwitch,
  Pagination,
  SiteHeader,
  Tabs,
  ToastProvider,
  useOnlineStatus,
  useToast,
} from '../index';

describe('Comportements Vue — applications', () => {
  it('Tabs : flèches et Début, onglets désactivés sautés', async () => {
    const wrapper = mount(Tabs, {
      attachTo: document.body,
      props: {
        label: 'Dossier',
        items: [
          { id: 'a', label: 'Résumé' },
          { id: 'b', label: 'Archives', disabled: true },
          { id: 'c', label: 'Réglages' },
        ],
      },
      slots: { a: 'A', b: 'B', c: 'C' },
    });
    await wrapper.get('[role="tablist"]').trigger('keydown', { key: 'ArrowRight' });
    const tabs = wrapper.findAll('[role="tab"]');
    expect(tabs[2]!.attributes('aria-selected')).toBe('true');
    expect(document.activeElement).toBe(tabs[2]!.element);
    await wrapper.get('[role="tablist"]').trigger('keydown', { key: 'Home' });
    expect(tabs[0]!.attributes('aria-selected')).toBe('true');
    wrapper.unmount();
  });

  it('Dialog : ouverture modale et fermeture (bouton, Échap)', async () => {
    const wrapper = mount(Dialog, {
      props: { open: false, title: 'Supprimer ?' },
      slots: { default: 'Corps' },
    });
    const dialog = wrapper.get('dialog').element as HTMLDialogElement;
    expect(dialog.open).toBe(false);
    await wrapper.setProps({ open: true });
    expect(dialog.open).toBe(true);
    await wrapper.get('button[aria-label="Fermer"]').trigger('click');
    await wrapper.get('dialog').trigger('cancel');
    expect(wrapper.emitted('close')).toHaveLength(2);
  });

  it('Toast : show, durée, alerte pour une erreur', async () => {
    vi.useFakeTimers();
    const Trigger = defineComponent({
      setup() {
        const toast = useToast();
        return () =>
          h(
            'button',
            { onClick: () => toast.show({ title: 'Échec de l’envoi.', tone: 'error' }) },
            'Envoyer',
          );
      },
    });
    const wrapper = mount({ render: () => h(ToastProvider, null, () => h(Trigger)) });
    await wrapper.get('button').trigger('click');
    expect(wrapper.get('[role="alert"]').text()).toContain('Échec de l’envoi.');
    vi.advanceTimersByTime(8000);
    await nextTick();
    expect(wrapper.find('[role="alert"]').exists()).toBe(false);
    vi.useRealTimers();
  });

  it('useToast exige un ToastProvider', () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    const Lost = defineComponent({ setup: () => (useToast(), () => null) });
    expect(() => mount(Lost)).toThrow('ToastProvider');
  });

  it('DataTable : tri au clic (aria-sort) selon les règles du français', async () => {
    const wrapper = mount(DataTable, {
      props: {
        caption: 'Visites',
        columns: [{ key: 'cooperative', header: 'Coopérative', sortable: true }],
        rows: [
          { id: '1', cooperative: 'Ségou' },
          { id: '2', cooperative: 'bamako' },
          { id: '3', cooperative: 'Sikasso' },
        ],
        rowKey: (row: unknown) => (row as { id: string }).id,
      },
    });
    await wrapper.get('th button').trigger('click');
    expect(wrapper.get('th').attributes('aria-sort')).toBe('ascending');
    expect(wrapper.findAll('tbody td').map((td) => td.text())).toEqual([
      'bamako',
      'Ségou',
      'Sikasso',
    ]);
  });

  it('Pagination, LanguageSwitch, LabRow : évènements v-model', async () => {
    const pagination = mount(Pagination, { props: { page: 2, pageCount: 3 } });
    await pagination.findAll('button')[1]!.trigger('click');
    expect(pagination.emitted('update:page')?.[0]).toEqual([3]);

    const languages = mount(LanguageSwitch, { props: { modelValue: 'fr' } });
    await languages.findAll('button')[1]!.trigger('click');
    expect(languages.emitted('update:modelValue')?.[0]).toEqual(['bm']);

    const row = mount(LabRow, {
      props: { code: 'AI', title: 'Langues', status: 'research' },
      slots: { default: 'Détail' },
    });
    await row.get('button').trigger('click');
    expect(row.get('button').attributes('aria-expanded')).toBe('true');
    expect(row.get('.ny-lab-row__panel').attributes('hidden')).toBeUndefined();
  });

  it('SiteHeader : menu ouvert puis fermé par Échap', async () => {
    const wrapper = mount(SiteHeader, { props: { links: [{ href: '#a', label: 'A' }] } });
    const toggle = wrapper.get('.ny-site-header__toggle');
    await toggle.trigger('click');
    expect(toggle.attributes('aria-expanded')).toBe('true');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await nextTick();
    expect(toggle.attributes('aria-expanded')).toBe('false');
  });

  it('useOnlineStatus suit les évènements online / offline', async () => {
    const onLine = vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(true);
    const Probe = defineComponent({
      setup: () => {
        const online = useOnlineStatus();
        return () => h('p', String(online.value));
      },
    });
    const wrapper = mount(Probe);
    expect(wrapper.text()).toBe('true');
    onLine.mockReturnValue(false);
    window.dispatchEvent(new Event('offline'));
    await nextTick();
    expect(wrapper.text()).toBe('false');
    onLine.mockRestore();
  });
});
