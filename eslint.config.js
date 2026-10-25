import nyema from '@nyema-r-d/config/eslint';
import storybook from 'eslint-plugin-storybook';

export default [
  { ignores: ['**/dist/**', '**/storybook-static/**', '**/coverage/**', 'design/**'] },
  ...nyema,
  ...storybook.configs['flat/recommended'],
  // Les composables Vue (useToast, useOnlineStatus…) s'appellent dans setup() : règles React hors sujet.
  {
    files: ['packages/vue/**'],
    rules: { 'react-hooks/rules-of-hooks': 'off' },
  },
];
