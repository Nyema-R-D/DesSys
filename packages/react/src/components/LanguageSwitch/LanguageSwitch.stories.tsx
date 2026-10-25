import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSwitch } from './LanguageSwitch';

const meta = {
  title: 'Structure/LanguageSwitch',
  component: LanguageSwitch,
  args: { value: 'fr' },
} satisfies Meta<typeof LanguageSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Boutons: Story = {};
export const Liens: Story = { args: { value: 'bm', getHref: (lang: string) => `#${lang}` } };
