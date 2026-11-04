import type { Meta, StoryObj } from '@storybook/react-vite';
import { createContext, useContext, useState } from 'react';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';
import { SiteHeader } from '../SiteHeader/SiteHeader';
import { LinkProvider, type LinkComponentProps } from './Link';

const meta = {
  title: 'Composants/LinkProvider',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;

const pages = [
  { href: '/evenements', label: 'Événements' },
  { href: '/cameras', label: 'Caméras' },
  { href: '/journal', label: 'Journal' },
];

// Routeur simulé : le clic change la page affichée sans recharger l'iframe.
const NavigateContext = createContext<(href: string) => void>(() => {});
function RouterLink({ href, onClick, ...props }: LinkComponentProps) {
  const navigate = useContext(NavigateContext);
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        event.preventDefault();
        navigate(href);
      }}
    />
  );
}

function Demo() {
  const [path, setPath] = useState('/evenements');
  const page = pages.find((p) => p.href === path) ?? pages[0]!;
  return (
    <NavigateContext.Provider value={setPath}>
      <LinkProvider component={RouterLink}>
        <SiteHeader links={pages.map((p) => ({ ...p, current: p.href === path }))} />
        <div style={{ padding: 'var(--space-6)' }}>
          <Breadcrumb items={[{ label: 'Console', href: '/evenements' }, { label: page.label }]} />
          <p>Page affichée par le routeur : {path}</p>
        </div>
      </LinkProvider>
    </NavigateContext.Provider>
  );
}

export const AvecRouteur: StoryObj = { render: () => <Demo /> };
