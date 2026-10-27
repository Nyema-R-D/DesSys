# Composants

Package `@nyema-r-d/react`. Catalogue interactif : Storybook (`pnpm storybook`, ou l'archive `documentation-vX.Y.Z.zip` jointe à chaque release).

| Composant                     | Rôle                   | Points clés                                                                                                                                                      |
| ----------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Theme`                       | Racine de thème        | `theme="anthracite" \| "paper"`, imbriquable                                                                                                                     |
| `Mark`                        | Symbole NYEMA          | `tone="auto" \| "on-laterite" \| "mono"`, 16 px minimum, décoratif sans `title`                                                                                  |
| `Logo`                        | Symbole + logotype     | Archivo 700, chasse 118 %, +0,04em                                                                                                                               |
| `Button`                      | Action                 | `variant="primary" \| "inverse" \| "secondary" \| "link"`, `size="sm" \| "md" \| "lg"`, `fullWidth`, `href` → `<a>`, `trailing="→"`                              |
| `StatusBadge`                 | Statut produit         | `status="research" \| "prototype" \| "pilot" \| "available"`, `locale="fr" \| "bm"`, `variant="outline" \| "plain"`                                              |
| `TextField`                   | Saisie                 | `label`, `error` (annoncé), `hint`, `multiline` (zone de texte), `showCount` + `maxLength` (compteur)                                                            |
| `Select`                      | Liste déroulante       | native, mêmes états que `TextField`, `placeholder`                                                                                                               |
| `RadioGroup`                  | Choix unique           | `fieldset` + légende, `orientation="vertical" \| "horizontal"`                                                                                                   |
| `Checkbox`                    | Case à cocher          | native, accent latérite, `error` annoncé, libellé avec lien possible                                                                                             |
| `Switch`                      | Interrupteur           | case native en `role="switch"`, effet immédiat (pour un consentement : `Checkbox`), `hint`                                                                       |
| `FileUpload`                  | Fichiers               | champ natif sur toute la zone (clic, clavier, dépôt), liste nom + taille, `onFilesChange` ; validation via `error`                                               |
| `DateField`                   | Date                   | `input type="date"` natif : calendrier, langue et clavier du système, `min`/`max`                                                                                |
| `Fieldset`                    | Section de formulaire  | légende, `description`, `error` de groupe, tous annoncés                                                                                                         |
| `FormRow`, `FormActions`      | Mise en page           | `columns` maximum, une colonne quand un champ passerait sous 220 px ; barre d'actions                                                                            |
| `Chip`, `ChipGroup`           | Sélection              | `selected` → `aria-pressed`                                                                                                                                      |
| `SectionLabel`                | Label mono             | `index` (« 02 — »), `node` (carré-nœud)                                                                                                                          |
| `LabRow`                      | Ligne de laboratoire   | code, titre, statut, contenu dépliable (+ / −)                                                                                                                   |
| `PillarCard`                  | Carte de pilier        | index « /02 », titre, description, `href` optionnel                                                                                                              |
| `ServiceCard`, `ServiceGrid`  | Carte d'offre          | statut (`variant="plain"`), code `S/01`, titre, description, `href` ; grille à filets 1 px                                                                       |
| `Tag`, `TagList`              | Étiquette statique     | non interactive (pour une sélection : `Chip`)                                                                                                                    |
| `SignalGrid`                  | Motif de signaux       | 7 % latérite / 17 % papier, `animated` (respecte `prefers-reduced-motion`)                                                                                       |
| `Icon`                        | Icône Lucide           | `icon={WifiOff}`, `size` 16/20/24/32, trait 1,5 px constant, décorative sans `label` ; `lucide-react` en dépendance optionnelle                                  |
| `ConnectionStatus`            | État réseau et synchro | `state="online" \| "offline" \| "syncing" \| "conflict"`, `pending`, `detail`, `locale` ; `role="status"`                                                        |
| `OfflineBanner`               | Bannière hors ligne    | message rassurant par défaut, `action` (ex. Réessayer)                                                                                                           |
| `useOnlineStatus()`           | Hook                   | `true`/`false` selon les événements `online`/`offline` du navigateur                                                                                             |
| `Tabs`                        | Onglets                | motif ARIA, flèches / Début / Fin, onglets désactivés sautés, `value` contrôlée ou non                                                                           |
| `Dialog`                      | Modale                 | `<dialog>` natif (focus piégé, Échap, retour du focus), fermeture sur le fond, `footer`                                                                          |
| `ToastProvider`, `useToast()` | Notifications          | `show({ title, description, tone, duration })`, `info`/`success` (status) et `error` (alert, 8 s)                                                                |
| `DataTable`                   | Tableau de données     | `caption` obligatoire, colonnes (`cell`, `sortValue`, `sortable`, `align`), tri client (règles du français) ou `manual` (serveur), `loading`, `empty`, `density` |
| `Pagination`                  | Pagination             | `page`, `pageCount`, `onPageChange` ; masquée s'il n'y a qu'une page                                                                                             |
| `Breadcrumb`                  | Fil d'Ariane           | `items` (`label`, `href`) ; dernier élément = page courante (`aria-current`)                                                                                     |
| `Accordion`                   | Sections dépliables    | `<details>` natifs, `exclusive` (une seule ouverte, attribut `name`), `defaultOpen`                                                                              |
| `Skeleton`                    | Chargement             | `width`, `height`, `lines` ; masqué aux lecteurs d'écran, figé si mouvement réduit ; `aria-busy` sur la zone                                                     |
| `Tooltip`                     | Info-bulle             | survol et focus, Échap, survolable (WCAG 1.4.13), `placement` ; jamais d'information indispensable                                                               |
| `Menu`                        | Bouton de menu         | motif ARIA, flèches / Début / Fin, Échap rend le focus, `tone: 'danger'`, `align="end"`                                                                          |
| `Container`, `Section`        | Mise en page           | 1360 px ; index 1/4 + contenu 3/4, une colonne sous 900 px                                                                                                       |
| `SiteHeader`                  | En-tête de site        | collant, flou, `links` (`current` → `aria-current`), `actions`, menu replié sous 1040 px (Échap ferme)                                                           |
| `Hero`                        | Ouverture de page      | `eyebrow`, `aside`, `title` (h1 display), `lead`, `actions`, `media` + `mediaLegend`                                                                             |
| `SiteFooter`                  | Pied de page           | `columns` (navigations nommées), `legal`, `tagline`, `extra`                                                                                                     |
| `LanguageSwitch`              | Langue FR / BM         | mode bouton (`onChange`) ou lien (`getHref`, `hreflang`) ; langue active marquée du carré-nœud                                                                   |

## Exemple

```tsx
<Section index={3} label="Laboratoire">
  <LabRow code="OFFLINE" title="Moteur de synchronisation hors ligne" status="research">
    Un agent de terrain enregistre ses visites sans connexion.
  </LabRow>
</Section>
```

## Ajouter un composant

Ouvrez une issue « Nouveau composant ». Définition de terminé : composant + CSS à base de tokens, tests, story (deux thèmes, a11y sans erreur), export dans `src/index.ts`, page wiki mise à jour.
