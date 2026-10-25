import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

let reactHooks;
try {
  reactHooks = (await import('eslint-plugin-react-hooks')).default;
} catch {
  reactHooks = null;
}

/** Configuration ESLint « flat » commune à tous les projets NYEMA. */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      eqeqeq: ['error', 'smart'],
    },
  },
  ...(reactHooks
    ? [reactHooks.configs.flat['recommended-latest'] ?? reactHooks.configs.flat.recommended]
    : []),
];
