import { mount } from '@vue/test-utils';
import App from './App.vue';

describe('App', () => {
  it('affiche le titre et l’état du réseau', () => {
    const wrapper = mount(App);
    expect(wrapper.get('h1').text()).toBe('%%TITLE%%');
    expect(wrapper.find('[role="status"]').exists()).toBe(true);
  });
});
