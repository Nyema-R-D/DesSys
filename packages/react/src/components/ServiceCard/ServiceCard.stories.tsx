import type { Meta, StoryObj } from '@storybook/react-vite';
import { ServiceCard, ServiceGrid } from './ServiceCard';

const services = [
  [
    'S/01',
    'Cadrage',
    'Atelier de 1 à 2 jours pour définir le périmètre, les priorités et les indicateurs d’un projet.',
  ],
  [
    'S/02',
    'Développement',
    'Applications web et mobiles, mobile-first, avec tests, sécurité de base et déploiement.',
  ],
  [
    'S/03',
    'Intégration',
    'Connexion de vos systèmes existants via des API documentées, sans tout remplacer.',
  ],
  [
    'S/04',
    'Audit',
    'Revue de sécurité, de sauvegarde et de configuration, avec une liste de corrections priorisées.',
  ],
  [
    'S/05',
    'Maintenance',
    'Mises à jour, sauvegardes, suivi des incidents et évolutions planifiées.',
  ],
] as const;

const meta = {
  title: 'Composants/ServiceCard',
  component: ServiceCard,
  args: {
    code: 'S/01',
    title: 'Cadrage',
    description: services[0][2],
    status: 'available',
    href: '#',
  },
  globals: { theme: 'paper' },
} satisfies Meta<typeof ServiceCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Carte: Story = {};
export const Grille: Story = {
  render: () => (
    <ServiceGrid>
      {services.map(([code, title, description]) => (
        <ServiceCard
          key={code}
          code={code}
          title={title}
          description={description}
          status="available"
          href="#"
        />
      ))}
    </ServiceGrid>
  ),
};
