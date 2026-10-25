import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';

interface IndexEntry {
  id: string;
  type: 'story' | 'docs';
}

const index = JSON.parse(
  readFileSync(new URL('../storybook-static/index.json', import.meta.url), 'utf8'),
) as { entries: Record<string, IndexEntry> };
const stories = Object.values(index.entries).filter((entry) => entry.type === 'story');

for (const theme of ['anthracite', 'paper'] as const) {
  for (const story of stories) {
    test(`${story.id} › ${theme}`, async ({ page }) => {
      // Mouvement réduit : la grille de signaux reste statique, la capture est déterministe.
      await page.emulateMedia({ reducedMotion: 'reduce' });
      // Les stories « Mobile » sont capturées à la largeur d'un téléphone.
      if (story.id.endsWith('--mobile')) await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`/iframe.html?id=${story.id}&viewMode=story&globals=theme:${theme}`);
      await page.locator('#storybook-root > *').first().waitFor();
      await page.evaluate(() => document.fonts.ready);
      await expect(page).toHaveScreenshot(`${story.id}--${theme}.png`, { fullPage: true });
    });
  }
}
