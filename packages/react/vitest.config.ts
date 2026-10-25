import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.tsx'],
    css: false,
    // Le cache disque de Vitest fige le résultat d'import.meta.glob : de nouvelles stories
    // échapperaient silencieusement à l'audit d'accessibilité (src/test/a11y.test.tsx).
    fsModuleCache: false,
  },
});
