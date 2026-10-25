import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { SiteFooter } from './SiteFooter';

function Langues() {
  const [lang, setLang] = useState('fr');
  return <LanguageSwitch value={lang} onChange={setLang} />;
}

const meta = {
  title: 'Structure/SiteFooter',
  component: SiteFooter,
  decorators: [
    (Story) => (
      <div style={{ margin: -32 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    columns: [
      {
        title: 'NYEMA',
        links: [
          { href: '#apropos', label: 'À propos' },
          { href: '#solutions', label: 'Solutions' },
          { href: '#laboratoire', label: 'Laboratoire' },
          { href: '#industries', label: 'Industries' },
        ],
      },
      {
        title: 'Ressources',
        links: [
          { href: '#articles', label: 'Articles' },
          { href: '#notes', label: 'Notes techniques' },
          { href: '#actualites', label: 'Actualités' },
        ],
      },
      {
        title: 'Légal',
        links: [
          { href: '#mentions', label: 'Mentions légales' },
          { href: '#confidentialite', label: 'Confidentialité' },
          { href: '#cookies', label: 'Cookies' },
        ],
      },
    ],
    legal: '© 2026 NYEMA',
    tagline: 'Technologie utile. Souveraineté numérique. Impact africain.',
    extra: <Langues />,
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Complet: Story = {};
