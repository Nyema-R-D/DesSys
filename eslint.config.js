import nyema from '@nyema-r-d/config/eslint';
import storybook from 'eslint-plugin-storybook';

export default [
  { ignores: ['**/dist/**', '**/storybook-static/**', '**/coverage/**', 'design/**'] },
  ...nyema,
  ...storybook.configs['flat/recommended'],
];
