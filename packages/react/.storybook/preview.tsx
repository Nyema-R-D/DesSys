import type { Preview } from '@storybook/react-vite';
import '@nyema-r-d/tokens/fonts.css';
import '@nyema-r-d/tokens/tokens.css';
import { Theme, type ThemeName } from '../src';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Thème NYEMA',
      toolbar: {
        title: 'Thème',
        icon: 'contrast',
        items: [
          { value: 'anthracite', title: 'Anthracite (site, apps)' },
          { value: 'paper', title: 'Papier (documents)' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: 'anthracite' },
  decorators: [
    (Story, context) => (
      <Theme theme={context.globals.theme as ThemeName} style={{ padding: 32, minHeight: '100%' }}>
        <Story />
      </Theme>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    controls: { expanded: true },
    a11y: { test: 'error' },
  },
  tags: ['autodocs'],
};

export default preview;
