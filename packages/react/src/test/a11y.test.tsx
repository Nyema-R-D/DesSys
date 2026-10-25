// Accessibilité : chaque story est rendue dans les deux thèmes puis auditée par axe-core.
// Le contraste des couleurs n'est pas calculable dans jsdom ; il est suivi par l'audit dédié (#22).
import { composeStories, setProjectAnnotations } from '@storybook/react-vite';
import { cleanup, render } from '@testing-library/react';
import axe from 'axe-core';
import type { ComponentType } from 'react';
import { Theme, type ThemeName } from '../components/Theme/Theme';
import * as preview from '../../.storybook/preview';

setProjectAnnotations(preview);

type StoryModule = Parameters<typeof composeStories>[0];
const modules = import.meta.glob<StoryModule>('../**/*.stories.tsx', { eager: true });
const themes: ThemeName[] = ['anthracite', 'paper'];

const cases = Object.entries(modules).flatMap(([file, mod]) =>
  Object.entries(composeStories(mod)).flatMap(([name, Story]) =>
    themes.map((theme) => ({
      id: `${file.replace(/^.*\//, '')} › ${name} › ${theme}`,
      Story: Story as ComponentType,
      theme,
    })),
  ),
);

describe('Accessibilité des stories (axe-core)', () => {
  afterEach(cleanup);

  it('couvre toutes les stories', () => {
    expect(cases.length).toBeGreaterThan(40);
  });

  it.each(cases)('$id', async ({ Story, theme }) => {
    const { container } = render(
      <Theme theme={theme}>
        <main>
          <Story />
        </main>
      </Theme>,
    );
    const { violations } = await axe.run(container, {
      rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
    });
    const report = violations.map(
      (v) =>
        `${v.id} (${v.impact}) : ${v.help} → ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
    );
    expect(report).toEqual([]);
  });
});
