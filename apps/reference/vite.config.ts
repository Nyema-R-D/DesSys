import react from '@vitejs/plugin-react';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

const { version } = JSON.parse(
  readFileSync(new URL('../../packages/react/package.json', import.meta.url), 'utf8'),
);

// BASE_PATH est fourni par la CI pour GitHub Pages (ex. /DesSys/).
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  define: { __APP_VERSION__: JSON.stringify(version) },
});
