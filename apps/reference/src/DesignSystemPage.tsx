import {
  Accordion,
  Alert,
  Breadcrumb,
  Button,
  Checkbox,
  Chip,
  ChipGroup,
  Combobox,
  ConnectionStatus,
  Container,
  DataTable,
  DateField,
  Dialog,
  Drawer,
  Fieldset,
  FileUpload,
  FormActions,
  FormRow,
  LabRow,
  Logo,
  Mark,
  Menu,
  Pagination,
  PillarCard,
  Progress,
  RadioGroup,
  SectionLabel,
  Select,
  SignalGrid,
  Skeleton,
  Spinner,
  StatusBadge,
  Stepper,
  Switch,
  Tabs,
  TextField,
  Theme,
  ToastProvider,
  Tooltip,
  useToast,
  type DataTableColumn,
} from '@nyema-r-d/react';
import { useState, type ReactNode } from 'react';
import { communes, neutrals, spaces, statuses, typeScale, visits, type Visit } from './data';

const nav = [
  ['marque', 'Marque'],
  ['couleur', 'Couleur'],
  ['type', 'Typographie'],
  ['grille', 'Grille'],
  ['composants', 'Composants'],
  ['applications', 'Applications'],
  ['ton', 'Ton'],
] as const;

export function DesignSystemPage() {
  return (
    <Theme theme="paper" className="ref-page">
      <Container className="ref-container">
        <header className="ref-header">
          <div className="ref-header__brand">
            <Logo size={24} />
            <span className="ny-mono-label ref-muted">Design system · v{__APP_VERSION__}</span>
          </div>
          <nav aria-label="Sections" className="ref-nav ny-mono-label">
            {nav.map(([id, label]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>
        </header>

        <section className="ref-hero">
          <h1>
            Système
            <br />
            NYEMA.
          </h1>
          <p>
            Identité sobre, technologique et géométrique. Un seul accent, une grille de modules, un
            symbole construit sur le carré-nœud. Tout ce qui suit est dérivé du dossier de cadrage
            et validé par les fondateurs.
          </p>
        </section>

        <BrandSection />
        <ColorSection />
        <TypeSection />
        <GridSection />
        <ComponentsSection />
        <AppsSection />
        <ToneSection />
      </Container>
    </Theme>
  );
}

function SectionShell({
  id,
  index,
  label,
  children,
}: {
  id: string;
  index: number;
  label: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="ref-section" aria-labelledby={`${id}-title`}>
      <SectionLabel as="h2" id={`${id}-title`} index={index} className="ref-section__label">
        {label}
      </SectionLabel>
      {children}
    </section>
  );
}

function BrandSection() {
  return (
    <SectionShell id="marque" index={1} label="Marque">
      <div className="ref-grid ref-grid--wide">
        <Theme theme="anthracite" className="ref-tile ref-tile--hero">
          <Logo size={88} />
        </Theme>
        <div className="ref-tile ref-tile--construction">
          <div className="ref-construction-grid" aria-hidden="true" />
          <svg
            width="192"
            height="192"
            viewBox="0 0 48 48"
            className="ref-construction"
            aria-hidden="true"
          >
            <rect x="6" y="6" width="9" height="36" fill="var(--ny-ink-950)" />
            <polygon points="6,6 15,6 42,42 33,42" fill="var(--ny-ink-950)" />
            <rect x="33" y="18" width="9" height="24" fill="var(--ny-ink-950)" />
            <rect x="33" y="6" width="9" height="9" fill="var(--ny-laterite-500)" />
            <rect
              x="-3"
              y="-3"
              width="54"
              height="54"
              fill="none"
              stroke="var(--ny-laterite-500)"
              strokeWidth=".25"
              strokeDasharray="1 1"
            />
            <rect
              x="6"
              y="6"
              width="36"
              height="36"
              fill="none"
              stroke="var(--ny-status-research)"
              strokeWidth=".25"
            />
          </svg>
          <span className="ny-mono-label ref-muted ref-tile__caption">
            Grille 48 · barre = 9 = 1 module · nœud 9×9 · espace 3
          </span>
        </div>
      </div>
      <div className="ref-grid ref-grid--four">
        <div className="ref-tile ref-tile--laterite">
          <Mark size={72} tone="on-laterite" />
        </div>
        <div className="ref-tile ref-tile--white">
          <Mark size={72} tone="mono" />
        </div>
        <div className="ref-tile ref-tile--black">
          <Mark size={72} tone="mono" />
        </div>
        <div className="ref-tile ref-tile--sizes">
          {[16, 24, 32, 48].map((size) => (
            <Mark key={size} size={size} />
          ))}
        </div>
      </div>
      <div className="ref-grid ref-grid--four ref-captions ny-mono-label ref-muted">
        <span>Sur latérite : nœud papier</span>
        <span>Monochrome noir</span>
        <span>Monochrome blanc</span>
        <span>16 · 24 · 32 · 48 px — min. 16 px</span>
      </div>
      <p className="ref-note">
        Le symbole est un N dont l’angle supérieur droit se détache en un carré latérite : le nœud.
        Point de donnée, capteur, connexion qui revient. Logotype en Archivo 700, chasse 118 %,
        interlettrage +0,04em. Zone de protection : un module autour du symbole. Ne pas déformer, ne
        pas changer la couleur du nœud hors des cas ci-dessus, ne pas ajouter d’ombre ni de dégradé.
      </p>
    </SectionShell>
  );
}

function ColorSection() {
  return (
    <SectionShell id="couleur" index={2} label="Couleur">
      <div className="ref-swatches">
        {neutrals.map((c) => (
          <div key={c.token} className="ref-swatch">
            <div className="ref-swatch__chip" style={{ background: c.hex }} />
            <div className="ref-swatch__meta">
              <span className="ref-swatch__name">{c.name}</span>
              <code>{c.token}</code>
              <code>{c.hex}</code>
            </div>
          </div>
        ))}
      </div>
      <div className="ref-grid ref-grid--wide">
        <div className="ref-panel ref-panel--laterite">
          <span className="ny-mono-label">Accent unique</span>
          <div>
            <div className="ref-panel__title">Latérite</div>
            <code>--ny-laterite-500 · #E2602E · 400 #EE7A4B · 600 #BC481B</code>
          </div>
        </div>
        <Theme theme="anthracite" className="ref-panel">
          <span className="ny-mono-label ref-muted">Statuts — badges uniquement</span>
          <ul className="ref-status-list">
            {statuses.map(([label, hex]) => (
              <li key={label}>
                <span className="ref-status-list__dot" style={{ background: hex }} />
                {label} · {hex}
              </li>
            ))}
          </ul>
        </Theme>
      </div>
      <p className="ref-note">
        Anthracite pour le site, papier pour les documents. L’accent couvre 5 à 10 % d’une surface :
        CTA, nœud, index. Un aplat latérite pleine section est réservé au contact. Texte sur
        latérite toujours en ink-950.
      </p>
    </SectionShell>
  );
}

function TypeSection() {
  return (
    <SectionShell id="type" index={3} label="Typographie">
      <div className="ref-specimens">
        <div className="ref-specimen ref-specimen--sans">
          <div className="ref-specimen__glyph">Aa</div>
          <div className="ref-specimen__name">Archivo — variable</div>
          <code className="ref-muted">
            Graisse 100–900 · chasse 62–125 % · titres 110–118 %, texte 100 %
          </code>
        </div>
        <div className="ref-specimen ref-specimen--mono">
          <div className="ref-specimen__glyph">0x</div>
          <div className="ref-specimen__name">JetBrains Mono</div>
          <code className="ref-muted">Labels, codes produits, index, métadonnées</code>
        </div>
      </div>
      <div className="ref-type-scale">
        {typeScale.map((row) => (
          <div key={row.spec} className="ref-type-row">
            <code className="ref-type-row__spec ref-muted">{row.spec}</code>
            <span className={`ref-type-row__sample ${row.className}`}>{row.sample}</span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function GridSection() {
  return (
    <SectionShell id="grille" index={4} label="Grille, espacement, motif">
      <div className="ref-split">
        <div className="ref-spaces">
          {spaces.map((s) => (
            <div key={s.token} className="ref-space">
              <code className="ref-muted">{s.token}</code>
              <span className="ref-space__bar" style={{ width: s.width }} />
              <code>{s.px}</code>
            </div>
          ))}
        </div>
        <Theme theme="anthracite" className="ref-motif">
          <SignalGrid columns={16} rows={4} animated />
          <p className="ref-muted">
            Grille de signaux : modules carrés, écart 3 px. 7 % de modules latérite, 17 % papier, le
            reste à 6 %. Animée en douceur (600 ms) sur le hero, statique ailleurs.
          </p>
        </Theme>
      </div>
      <p className="ref-note">
        Conteneur 1360 px, gouttière fluide 20–56 px. Sections : colonne d’index (1/4) + contenu
        (3/4), qui se replient en une colonne sous 900 px. Angles vifs, filets 1 px, aucune ombre
        portée.
      </p>
    </SectionShell>
  );
}

function ComponentsSection() {
  const [need, setNeed] = useState('Développement');
  return (
    <SectionShell id="composants" index={5} label="Composants">
      <Theme theme="anthracite" className="ref-showcase">
        <div>
          <div className="ny-mono-label ref-showcase__label">
            Boutons — primaire · inversé · secondaire · lien · désactivé
          </div>
          <div className="ref-row">
            <Button href="#" trailing="→">
              Parler d’un projet
            </Button>
            <Button variant="inverse" trailing="→">
              Envoyer
            </Button>
            <Button variant="secondary" href="#">
              Découvrir nos solutions
            </Button>
            <Button variant="link" href="#" trailing="→">
              Lire la note
            </Button>
            <Button disabled>Indisponible</Button>
          </div>
        </div>

        <div>
          <div className="ny-mono-label ref-showcase__label">Badges de statut</div>
          <div className="ref-row">
            <StatusBadge status="research" />
            <StatusBadge status="prototype" />
            <StatusBadge status="pilot" />
            <StatusBadge status="available" />
          </div>
        </div>

        <div>
          <div className="ny-mono-label ref-showcase__label">Champs — repos · focus · erreur</div>
          <div className="ref-fields">
            <TextField label="Organisation" placeholder="Nom de la structure" />
            <TextField label="Nom" required defaultValue="Awa Traoré" />
            <TextField
              label="E-mail"
              required
              type="email"
              defaultValue="awa@"
              error="Adresse e-mail invalide."
            />
          </div>
        </div>

        <div>
          <div className="ny-mono-label ref-showcase__label">
            Sélection — liste · choix unique · consentement
          </div>
          <div className="ref-fields">
            <Select
              label="Région"
              placeholder="Choisir…"
              options={[
                { value: 'bamako', label: 'Bamako' },
                { value: 'segou', label: 'Ségou' },
                { value: 'sikasso', label: 'Sikasso' },
              ]}
            />
            <RadioGroup
              legend="Taille de l’organisation"
              defaultValue="pme"
              options={[
                { value: 'pme', label: 'PME' },
                { value: 'grande', label: 'Grande organisation' },
                { value: 'public', label: 'Administration' },
              ]}
            />
            <Checkbox label="J’accepte que mes informations soient utilisées pour répondre à ma demande." />
          </div>
        </div>

        <div>
          <div className="ny-mono-label ref-showcase__label">
            Ligne de laboratoire · carte de pilier
          </div>
          <div className="ref-lab">
            <div className="ref-lab__rows">
              <LabRow code="OFFLINE" title="Moteur de synchronisation hors ligne" status="research">
                Un agent de terrain enregistre ses visites sans connexion ; l’application
                synchronise et signale les conflits au retour du réseau.
              </LabRow>
            </div>
            <PillarCard
              className="ref-lab__card"
              index={2}
              title="Infrastructures numériques"
              description="Hébergement, sauvegarde, sécurité, synchronisation."
            />
          </div>
        </div>

        <div>
          <div className="ny-mono-label ref-showcase__label">
            Chips de sélection · label de section
          </div>
          <div className="ref-row">
            <ChipGroup aria-label="Type de besoin">
              {['Développement', 'Intégration', 'Audit'].map((option) => (
                <Chip key={option} selected={need === option} onClick={() => setNeed(option)}>
                  {option}
                </Chip>
              ))}
            </ChipGroup>
            <SectionLabel node index={2} className="ref-row__push">
              Offres disponibles
            </SectionLabel>
          </div>
        </div>
      </Theme>
      <p className="ref-note">
        Hover : fond ink-900 ou passage à l’accent. Focus clavier : contour latérite 2 px décalé de
        2 px. Transitions 140 ms (couleur) à 240 ms (fond), ease-out. Hauteurs de contrôle : 40
        (nav), 48 (champs), 52–56 (CTA).
      </p>
    </SectionShell>
  );
}

const visitColumns: DataTableColumn<Visit>[] = [
  { key: 'cooperative', header: 'Coopérative', sortable: true },
  { key: 'members', header: 'Membres', sortable: true, align: 'end', width: '120px' },
  { key: 'agent', header: 'Agent' },
  {
    key: 'state',
    header: 'Synchronisation',
    cell: (visit) => <ConnectionStatus state={visit.state} />,
  },
];

function AppsSection() {
  return (
    <SectionShell id="applications" index={6} label="Applications">
      <ToastProvider>
        <AppsShowcase />
      </ToastProvider>
      <p className="ref-note">
        Composants des outils métier : saisie sur le terrain, réseau instable, synchronisation
        différée. Mêmes tokens, même CSS (@nyema-r-d/css) en React et en Vue. Catalogue complet et
        états détaillés dans Storybook.
      </p>
    </SectionShell>
  );
}

function AppsShowcase() {
  const toast = useToast();
  const [commune, setCommune] = useState<string | null>('segou');
  const [page, setPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <Theme theme="anthracite" className="ref-showcase">
      <div>
        <div className="ny-mono-label ref-showcase__label">Fil d’Ariane · étapes</div>
        <div className="ref-stack">
          <Breadcrumb
            items={[
              { label: 'Coopératives', href: '#applications' },
              { label: 'Ségou', href: '#applications' },
              { label: 'Nouvelle visite' },
            ]}
          />
          <Stepper
            current="membres"
            steps={[
              { id: 'cooperative', label: 'Coopérative' },
              { id: 'membres', label: 'Membres' },
              { id: 'parcelles', label: 'Parcelles' },
              { id: 'envoi', label: 'Vérification et envoi' },
            ]}
          />
        </div>
      </div>

      <div>
        <div className="ny-mono-label ref-showcase__label">
          Formulaire — recherche · date · interrupteur · fichiers
        </div>
        <Fieldset legend="Visite" description="Telle que constatée sur place.">
          <FormRow columns={2}>
            <Combobox
              label="Commune"
              options={communes}
              value={commune}
              onChange={setCommune}
              placeholder="Rechercher une commune"
              hint="Tapez quelques lettres pour filtrer."
            />
            <DateField label="Date de la visite" defaultValue="2026-11-04" />
          </FormRow>
          <TextField label="Observations" multiline rows={3} maxLength={280} showCount />
          <Switch
            label="Envoyer dès le retour du réseau"
            defaultChecked
            hint="Sinon, envoi manuel."
          />
          <FileUpload label="Justificatifs" hint="PDF ou photo, 5 Mo maximum." multiple />
          <FormActions>
            <Button variant="secondary">Enregistrer le brouillon</Button>
            <Button trailing="→">Étape suivante</Button>
          </FormActions>
        </Fieldset>
      </div>

      <div>
        <div className="ny-mono-label ref-showcase__label">
          Messages · progression · état réseau
        </div>
        <div className="ref-stack">
          <Alert
            tone="warning"
            title="Conflit de synchronisation"
            action={
              <Button size="sm" variant="secondary">
                Comparer les versions
              </Button>
            }
          >
            La fiche de Ségou a été modifiée sur un autre appareil.
          </Alert>
          <Alert tone="error" title="Envoi impossible">
            Vérifiez les 2 champs signalés.
          </Alert>
          <div className="ref-fields">
            <Progress label="Synchronisation" value={64} hint="12 visites sur cet appareil." />
            <Progress label="Préparation de l’envoi" />
          </div>
          <div className="ref-row">
            <ConnectionStatus state="offline" pending={3} />
            <ConnectionStatus state="syncing" />
            <ConnectionStatus state="online" detail="09:42" />
            <Spinner label="Chargement des visites" />
            <Button
              variant="secondary"
              size="sm"
              onClick={() =>
                toast.show({ title: 'Visite enregistrée', description: 'Elle sera envoyée.' })
              }
            >
              Afficher une notification
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className="ny-mono-label ref-showcase__label">
          Données — onglets · tableau · pagination · actions
        </div>
        <Tabs
          label="Dossier de la coopérative"
          items={[
            {
              id: 'visites',
              label: 'Visites',
              content: (
                <div className="ref-stack">
                  <DataTable
                    caption="Visites de la semaine"
                    columns={visitColumns}
                    rows={visits}
                    rowKey={(visit) => visit.id}
                    defaultSort={{ key: 'members', direction: 'descending' }}
                  />
                  <div className="ref-row ref-row--between">
                    <Pagination page={page} pageCount={4} onPageChange={setPage} />
                    <div className="ref-row">
                      <Tooltip content="Les visites hors ligne partent au retour du réseau.">
                        <Button variant="link" size="sm">
                          Envoi différé ?
                        </Button>
                      </Tooltip>
                      <Menu
                        label="Actions"
                        align="end"
                        items={[
                          { id: 'exporter', label: 'Exporter en CSV' },
                          { id: 'dupliquer', label: 'Dupliquer' },
                          { id: 'supprimer', label: 'Supprimer', tone: 'danger' },
                        ]}
                        onSelect={(id) => id === 'supprimer' && setDialogOpen(true)}
                      />
                      <Button size="sm" onClick={() => setDrawerOpen(true)}>
                        Ouvrir le détail
                      </Button>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: 'chargement',
              label: 'Chargement',
              content: <Skeleton lines={4} />,
            },
            {
              id: 'aide',
              label: 'Aide',
              content: (
                <Accordion
                  exclusive
                  defaultOpen={['hors-ligne']}
                  items={[
                    {
                      id: 'hors-ligne',
                      title: 'Que se passe-t-il sans connexion ?',
                      content: 'Les visites restent sur l’appareil et partent au retour du réseau.',
                    },
                    {
                      id: 'conflit',
                      title: 'Comment résoudre un conflit ?',
                      content: 'Comparez les deux versions puis choisissez celle à conserver.',
                    },
                  ]}
                />
              ),
            },
          ]}
        />
      </div>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Supprimer la visite ?"
        footer={
          <>
            <Button variant="secondary" size="sm" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button size="sm" onClick={() => setDialogOpen(false)}>
              Supprimer
            </Button>
          </>
        }
      >
        Cette action est définitive.
      </Dialog>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Visite du 4 novembre"
        footer={
          <Button size="sm" onClick={() => setDrawerOpen(false)}>
            Fermer
          </Button>
        }
      >
        Coopérative de Ségou — 142 membres. Agent : A. Traoré.
      </Drawer>
    </Theme>
  );
}

function ToneSection() {
  return (
    <SectionShell id="ton" index={7} label="Ton éditorial">
      <div className="ref-grid ref-grid--wide">
        <div className="ref-tone">
          <div className="ny-mono-label ref-tone__title">On écrit</div>
          <ul>
            <li>« Un agent de terrain enregistre ses visites sans connexion. »</li>
            <li>Statut explicite sur chaque produit : Recherche, Prototype, Pilote, Disponible.</li>
            <li>Vouvoiement, phrases déclaratives, point final aux titres.</li>
            <li>
              Réalités opérationnelles : réseau instable, mobile, hors ligne, langues locales.
            </li>
          </ul>
        </div>
        <div className="ref-tone ref-tone--dont">
          <div className="ny-mono-label ref-tone__title">On n’écrit pas</div>
          <ul>
            <li>« La révolution de l’IA africaine. » — superlatifs, promesses non vérifiées.</li>
            <li>Clients, partenaires, chiffres ou adresses non confirmés.</li>
            <li>
              « Conforme », « souverain », « exact » sans vérification technique et juridique.
            </li>
            <li>Clichés visuels : savane, motifs ethniques décoratifs, photos de stock.</li>
          </ul>
        </div>
      </div>
    </SectionShell>
  );
}
