import { defineConfig } from '@playwright/test';

// Régression visuelle des stories. Les références (visual/__screenshots__) sont produites sous Linux,
// dans l'image Docker Playwright de la CI : ne pas les régénérer depuis un poste local.
export default defineConfig({
  testDir: './visual',
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never', outputFolder: 'visual-report' }]]
    : 'list',
  use: {
    baseURL: 'http://127.0.0.1:6007',
    viewport: { width: 1280, height: 800 },
  },
  expect: {
    toHaveScreenshot: { animations: 'disabled', maxDiffPixelRatio: 0.002 },
  },
  webServer: {
    command: 'pnpm exec vite preview --outDir storybook-static --port 6007 --strictPort',
    url: 'http://127.0.0.1:6007/index.json',
    reuseExistingServer: !process.env.CI,
  },
});
