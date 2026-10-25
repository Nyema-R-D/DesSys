# Relecture du bamanankan · *Bamanankan sɛgɛsɛgɛli*

> Généré par `node scripts/i18n/bm-review.mjs` — ne pas modifier à la main. Issue #23 : la 1.0 attend cette relecture.

**178 textes** à relire, rédigés sans locuteur natif. Pour chaque ligne : cocher si correct, sinon indiquer la correction (dans la colonne prévue, en commentaire de PR, ou directement dans le fichier cité). Le français fait foi pour le sens.

Points d'attention signalés lors de la rédaction :

- vocabulaire technique sans équivalent établi (synchronisation, version, dépréciation, jalon, release) : faut-il un terme bamanankan, un emprunt, ou garder le français ?
- statuts produit : « Ɲinini » (recherche), « Misali » (prototype), « Kɔrɔbɔli » (pilote), « A bɛ sɔrɔ » (disponible) ;
- état réseau : « Ɛntɛrinɛti tɛ » (hors ligne), « Bɛnbaliya » (conflit de synchronisation) ;
- orthographe : graphie officielle malienne (ɛ, ɔ, ɲ, ŋ) et tons non notés.

## 1. Libellés d’interface (composants React et Vue)

Affichés dans les produits : priorité de relecture.

| ✓ | Composant | Clé | Français | Bamanankan proposé | Correction |
|---|---|---|---|---|---|
| ☐ | StatusBadge.tsx | `research` | Recherche | Ɲinini | |
| ☐ | StatusBadge.tsx | `prototype` | Prototype | Misali | |
| ☐ | StatusBadge.tsx | `pilot` | Pilote | Kɔrɔbɔli | |
| ☐ | StatusBadge.tsx | `available` | Disponible | A bɛ sɔrɔ | |
| ☐ | ConnectionStatus.tsx | `online` | Synchronisé | A bɛ ɲɔgɔn fɛ | |
| ☐ | ConnectionStatus.tsx | `offline` | Hors ligne | Ɛntɛrinɛti tɛ | |
| ☐ | ConnectionStatus.tsx | `syncing` | Synchronisation | A bɛ ka ɲɔgɔn sɔrɔ | |
| ☐ | ConnectionStatus.tsx | `conflict` | Conflit | Bɛnbaliya | |
| ☐ | ConnectionStatus.tsx | `pending` | {n} en attente | {n} bɛ makɔnɔni na | |

## 2. Documentation, gabarits et automatisation

### `.github/ISSUE_TEMPLATE/1-bug.yml`

- [ ] L9 — Merci ! Décrivez le problème de façon factuelle. · *I ni ce ! Fili in ɲɛfɔ ka jɛya.*
- [ ] L13 — label: Zone · Yɔrɔ
- [ ] L35 — label: Étapes pour reproduire · A kɛcogo
- [ ] L42 — label: Résultat attendu / obtenu · Min makɔnɔna / min sɔrɔla
- [ ] L48 — label: Contexte (navigateur, appareil, réseau) · Kunnafoni wɛrɛw

### `.github/ISSUE_TEMPLATE/2-feature.yml`

- [ ] L1 — name: Évolution · Fɛn kura
- [ ] L9 — label: Zone · Yɔrɔ

### `.github/ISSUE_TEMPLATE/3-component.yml`

- [ ] L9 — label: Nom du composant · Tɔgɔ
- [ ] L16 — label: Usages · Baarakɛcogo
- [ ] L28 — label: Définition de terminé · Banni taamasiyɛnw

### `.github/ISSUE_TEMPLATE/4-design-decision.yml`

- [ ] L1 — name: Décision de design · Desizɔn
- [ ] L9 — label: Question · Ɲininkali

### `.github/PULL_REQUEST_TEMPLATE.md`

- [ ] L11 — Vérifications · Sɛgɛsɛgɛliw

### `.github/labels.yml`

- [ ] L4 — description: 'Nouveauté · Fɛn kura'
- [ ] L10 — description: 'Documentation · Sɛbɛn'
- [ ] L55 — description: 'À qualifier · Ka sɛgɛsɛgɛ'
- [ ] L61 — description: 'En cours · A bɛ ka kɛ'

### `.github/workflows/pr.yml`

- [ ] L27 — `Ni PR tɔgɔ tɛ Conventional Commits cogo la.`,

### `.github/workflows/stale.yml`

- [ ] L26 — Nin baara in ma lamaga tile 45 kɔnɔ ; n'a ma lamaga tile 14 kɔnɔ, a bɛ datugu.*
- [ ] L29 — Nin PR in ma lamaga tile 45 kɔnɔ ; n'a ma lamaga tile 14 kɔnɔ, a bɛ datugu.*

### `CONTRIBUTING.md`

- [ ] L1 — Contribuer · _Ka dɛmɛ_
- [ ] L14 — `feat:` | patch (0.0.x) | Nouveautés · Fɛn kuraw |
- [ ] L16 — `deprecate:` | patch (mineure après 1.0) | Dépréciations · A tɛna mɛn — voir la politique de dépréciation |
- [ ] L39 — 1. Baara bɛɛ bɛ daminɛ issue dɔ la.
- [ ] L41 — 3. Commit sɛbɛn _Conventional Commits_ cogo la.
- [ ] L42 — 4. PR dayɛlɛ, `Closes #n` sɛbɛn a kɔnɔ.
- [ ] L43 — 5. PR bɛ fara ɲɔgɔn kan _squash_ cogo la.
- [ ] L44 — 6. _release-please_ bɛ version kura labɛn otomatiki la.
- [ ] L46 — Tubabukan de ye sɛbɛn fɔlɔ ye. Ni i tɛ se ka bamanankan sɛbɛn, issue `i18n:bm` dayɛlɛ.

### `README.bm.md`

- [ ] L1 — <p align="center">
- [ ] L2 — <img src="packages/tokens/assets/nyema-mark-light.svg" width="72" alt="NYEMA" />
- [ ] L3 — </p>
- [ ] L5 — NYEMA jiracogo sariyaw (Design system)
- [ ] L7 — [🇫🇷 Français](README.md) · 🇲🇱 Bamanankan
- [ ] L9 — ⚠️ Nin bamanankan sɛbɛn in ka kan ka sɛgɛsɛgɛ bamanankanfɔla dɔ fɛ. · _Traduction à relire par un locuteur natif (issue `i18n:bm`)._
- [ ] L11 — NYEMA ka taamasiyɛn, a kulɛrw, a sɛbɛnni cogo ani a komponanw bɛ nin dépôt in kɔnɔ. Ɲɛgɛn kelen dɔrɔn : latérite `#E2602E`. NYEMA ka porogaramu, baarakɛminɛn, app ani site bɛɛ bɛ nin sariyaw de labaara.
- [ ] L13 — Cogoya : **sigibagaw y'a sɔn** (oktɔburu 2026, #20) — a sigilen bɛ dossier de cadrage kan.
- [ ] L15 — Packages
- [ ] L17 — Package | A baara |
- [ ] L19 — `@nyema-r-d/tokens` | Kulɛrw, sɛbɛnni, yɔrɔ, lamagali ; thème anthracite ni papier. |
- [ ] L20 — `@nyema-r-d/react` | React komponanw. |
- [ ] L21 — `@nyema-r-d/config` | TypeScript, ESLint, Prettier, Commitlint labɛnw. |
- [ ] L22 — `apps/reference` | Design system ka sɛbɛn jiralen. |
- [ ] L24 — K'a labaara porozɛ dɔ kɔnɔ
- [ ] L42 — Baara kɛcogo
- [ ] L51 — Otomatiki
- [ ] L53 — Commit bɛɛ ka kan ka sɛbɛn _Conventional Commits_ cogo la.
- [ ] L54 — PR bɛɛ bɛ sɛgɛsɛgɛ CI fɛ.
- [ ] L55 — _release-please_ bɛ version ni CHANGELOG labɛn ; PR de release fara ɲɔgɔn kan, version kura bɛ bɔ otomatiki la.
- [ ] L56 — Jalon = version. Baara tɔw ni sira jiraminɛn bɛ yɛlɛma otomatiki la wiki kɔnɔ.
- [ ] L58 — Kunnafoni wɛrɛw : [wiki](https://github.com/Nyema-R-D/DesSys/wiki) · [docs/wiki/bm](docs/wiki/bm).

### `SECURITY.md`

- [ ] L5 — _Ni i ye lakanali fili dɔ ye, a kana sɛbɛn issue kɔnɔ. **Security → Report a vulnerability** labaara._

### `docs/migrations/MODELE.md`

- [ ] L5 — Résumé · _A kɔrɔ_

### `docs/wiki/_Footer.md`

- [ ] L1 — Généré depuis `docs/wiki` — modifiez le dépôt, pas le wiki. · _Sɛbɛn in bɛ bɔ `docs/wiki` kɔnɔ._

### `docs/wiki/_Sidebar.md`

- [ ] L16 — [Daminɛ](BM-Daminen)
- [ ] L20 — [Version ni bɔli](BM-Version-ni-boli)
- [ ] L23 — [Baara tɔw](BM-Baara-tow) · [Sira jiraminɛn](BM-Sira-jiraminen)

### `docs/wiki/bm/BM-Daminen.md`

- [ ] L1 — NYEMA jiracogo sariyaw
- [ ] L3 — ⚠️ Nin bamanankan sɛbɛnw ka kan ka sɛgɛsɛgɛ bamanankanfɔla dɔ fɛ. Tubabukan sɛbɛn de ye sɛbɛn fɔlɔ ye. · _Traduction à relire ; le français fait foi._
- [ ] L5 — [🇫🇷 Français](Home)
- [ ] L7 — NYEMA ka taamasiyɛn, a kulɛrw, a sɛbɛnni cogo ani a komponanw bɛ yan. NYEMA ka porogaramu ni app bɛɛ bɛ u labaara.
- [ ] L9 — Sariya kunbabaw
- [ ] L11 — Ɲɛgɛn kelen** : latérite `#E2602E`.
- [ ] L12 — Thème fila** : anthracite (site, app), papier (sɛbɛnw).
- [ ] L13 — Cogoya** : kɛrɛw tɛ kuru, ja tɛ, kare jɛnsɛnnenw.
- [ ] L14 — Tiɲɛ** : porogaramu bɛɛ ka cogoya bɛ jira (Ɲinini, Misali, Kɔrɔbɔli, A bɛ sɔrɔ).
- [ ] L16 — Sɛbɛnw
- [ ] L18 — [Tokens](BM-Tokens)
- [ ] L19 — [Komponanw](BM-Komponanw)
- [ ] L20 — [Version ni bɔli](BM-Version-ni-boli)
- [ ] L21 — [Otomatiki](BM-Otomatiki)
- [ ] L22 — [Baara tɔw](BM-Baara-tow) · [Sira jiraminɛn](BM-Sira-jiraminen)

### `docs/wiki/bm/BM-Ka-dabila.md`

- [ ] L1 — Fɛn minnu bɛna dabila (dépréciation)
- [ ] L3 — ⚠️ Bamanankan sɛbɛn — ka sɛgɛsɛgɛ. · [🇫🇷 Version française](Politique-de-depreciation)
- [ ] L5 — 1. Fɛn dɔ bɛ fɔ ko a bɛna dabila version fitinin (mineure) dɔ kɔnɔ.
- [ ] L6 — 2. Lasɔmini bɛ jira developpeur ma (`warnDeprecated`), production tɛ.
- [ ] L7 — 3. Fɛn kura bɛ di o version kelen kɔnɔ.
- [ ] L8 — 4. A bɛ to yen version fitinin kelen ni kalo 3 ye, ka sɔrɔ ka bɔ version belebele (majeure) nata la dɔrɔn.
- [ ] L9 — 5. Commit bɛ sɛbɛn ni `deprecate:` ye.

### `docs/wiki/bm/BM-Komponanw.md`

- [ ] L1 — Komponanw
- [ ] L3 — ⚠️ Bamanankan sɛbɛn — ka sɛgɛsɛgɛ. · [🇫🇷 Version française](Composants)
- [ ] L5 — Package `@nyema-r-d/react`.
- [ ] L7 — Komponan | A baara |
- [ ] L9 — `Theme` | Thème sugandi (anthracite walima paper) |
- [ ] L10 — `Mark`, `Logo` | NYEMA taamasiyɛn |
- [ ] L11 — `Button` | Butɔn |
- [ ] L12 — `StatusBadge` | Porogaramu cogoya (`locale="bm"` bɛ bamanankan tɔgɔw jira) |
- [ ] L13 — `TextField` | Sɛbɛnni yɔrɔ |
- [ ] L14 — `Select`, `RadioGroup`, `Checkbox` | Sugandili (formulaire) |
- [ ] L15 — `Chip`, `ChipGroup` | Sugandili |
- [ ] L16 — `SectionLabel` | Label |
- [ ] L17 — `LabRow` | Laboratoire ka sira |
- [ ] L18 — `PillarCard` | Kartu |
- [ ] L19 — `ServiceCard`, `Tag` | Baara kartu, taamasiyɛn |
- [ ] L20 — `SignalGrid` | Taamasiyɛn kare |
- [ ] L21 — `Icon` | Ja fitinin (Lucide) |
- [ ] L22 — `ConnectionStatus`, `OfflineBanner` | Ɛntɛrinɛti cogoya, ɲɔgɔn sɔrɔli |
- [ ] L23 — `Tabs`, `Dialog`, `Toast` | Onglets, modale, kunnafoni fitinin |
- [ ] L24 — `DataTable`, `Pagination` | Kunnafoniw tabulo, ɲɛw |
- [ ] L25 — `Container`, `Section` | Ɲɛ labɛncogo |
- [ ] L26 — `SiteHeader`, `Hero`, `SiteFooter` | Site ka kɔrɔ, a daminɛ, a laban |
- [ ] L27 — `LanguageSwitch` | Kan sugandi (FR / BM) |

### `docs/wiki/bm/BM-Otomatiki.md`

- [ ] L1 — Otomatiki (CI/CD)
- [ ] L3 — ⚠️ Bamanankan sɛbɛn — ka sɛgɛsɛgɛ. · [🇫🇷 Version française](Automatisation-CI-CD)
- [ ] L5 — Workflow | A baara |
- [ ] L7 — `ci.yml` | PR bɛɛ sɛgɛsɛgɛ : format, lint, types, tests, build |
- [ ] L8 — `pr.yml` | PR tɔgɔ, labels, jalon |
- [ ] L9 — `release.yml` | Version kura bɔli |
- [ ] L10 — `wiki.yml` | Wiki, baara tɔw, sira jiraminɛn |
- [ ] L11 — `stale.yml` | Baara minnu ma lamaga, olu datugu |
- [ ] L13 — I ka ɔridinatɛri kan : `pnpm check` bɛ CI kelen kɛ.

### `docs/wiki/bm/BM-Tokens.md`

- [ ] L1 — Tokens
- [ ] L3 — ⚠️ Bamanankan sɛbɛn — ka sɛgɛsɛgɛ. · [🇫🇷 Version française](Tokens)
- [ ] L5 — Tokens bɛɛ sɛbɛnnen bɛ `packages/tokens/src/tokens.json` kɔnɔ. Build bɛ `tokens.css`, `index.js` ani `tokens.json` dilan. `dist/` kana yɛlɛma.
- [ ] L7 — Kulɛrw
- [ ] L9 — Token | Kulɛr | A baara |
- [ ] L11 — `--ny-ink-950` | `#0E0F0E` | Site ka kɔfɛ |
- [ ] L12 — `--ny-paper-100` | `#F2F0EA` | Sɛbɛnw ka kɔfɛ |
- [ ] L13 — `--ny-laterite-500` | `#E2602E` | **Ɲɛgɛn kelen** |
- [ ] L14 — `--ny-status-*` | `#7FA6E0` `#D9B04E` `#E2602E` `#5FC08A` | **Badge dɔrɔn** |
- [ ] L16 — Komponanw bɛ token sémantiques labaara (`--accent`, `--text-primary`, `--surface-page`…) : u bɛ yɛlɛma ni `data-ny-theme` yɛlɛmana.
- [ ] L18 — Yɔrɔ (espacement)
- [ ] L20 — `--space-1` … `--space-10` : 4, 8, 12, 16, 24, 32, 48, 64, 96, 144 px.

### `docs/wiki/bm/BM-Version-ni-boli.md`

- [ ] L1 — Version ni bɔli
- [ ] L3 — ⚠️ Bamanankan sɛbɛn — ka sɛgɛsɛgɛ. · [🇫🇷 Version française](Versionnage-et-publication)
- [ ] L5 — Package bɛɛ bɛ version kelen de ta (misali la `v0.0.1`).
- [ ] L6 — Commit bɛɛ bɛ sɛbɛn _Conventional Commits_ cogo la (`feat:`, `fix:`…).
- [ ] L7 — _release-please_ bɛ PR de release labɛn : version kura ani CHANGELOG (tubabukan ni bamanankan).
- [ ] L8 — Ni PR in fara ɲɔgɔn kan : tag, release, packages, sɛbɛnw ani wiki bɛ bɔ otomatiki la.
- [ ] L9 — Jalon kelen bɛ version kelen kama. Release bɔlen kɔ, jalon bɛ datugu otomatiki la.
- [ ] L11 — Ka version dɔ wajibiya : `Release-As: X.Y.Z` sɛbɛn commit ka laban dakun na.

### `docs/wiki/bm/BM-Vue.md`

- [ ] L1 — Vue
- [ ] L3 — ⚠️ Bamanankan sɛbɛn — ka sɛgɛsɛgɛ. · [🇫🇷 Version française](Vue)
- [ ] L5 — Package `@nyema-r-d/vue` : Vue 3 komponanw. U ni React komponanw bɛ HTML kelen ni CSS kelen de labaara.
- [ ] L11 — React komponan bɛɛ bɛ Vue la fana.
- [ ] L13 — Kɔrɔbɔli dɔ bɛ a lajɛ ko Vue ni React bɛ HTML kelen dilan.

### `packages/config/README.md`

- [ ] L3 — Configuration partagée de l'écosystème NYEMA. · _NYEMA baarakɛminɛnw ka labɛn min bɛ tila._

### `packages/react/src/Introduction.mdx`

- [ ] L9 — _Bamanankan :_ NYEMA ka jiracogo sariyaw. Ɲɛgɛn kelen, kare jɛnsɛnnen, taamasiyɛn min sigilen bɛ kare-nɔɔn kan.

### `packages/react/src/components/ConnectionStatus/ConnectionStatus.tsx`

- [ ] L17 — online: 'A bɛ ɲɔgɔn fɛ',
- [ ] L18 — offline: 'Ɛntɛrinɛti tɛ',
- [ ] L19 — syncing: 'A bɛ ka ɲɔgɔn sɔrɔ',
- [ ] L20 — conflict: 'Bɛnbaliya',
- [ ] L46 — : `${pending} bɛ makɔnɔni na`

### `packages/vue/src/components/ConnectionStatus.vue`

- [ ] L15 — : `${props.pending} bɛ makɔnɔni na`

### `packages/vue/src/utils.ts`

- [ ] L19 — online: 'A bɛ ɲɔgɔn fɛ',
- [ ] L20 — offline: 'Ɛntɛrinɛti tɛ',
- [ ] L21 — syncing: 'A bɛ ka ɲɔgɔn sɔrɔ',
- [ ] L22 — conflict: 'Bɛnbaliya',

### `release-please-config.json`

- [ ] L9 — "pull-request-header": "Publication automatique · *Bɔli otomatiki*\n\nFusionner cette PR crée le tag, la release GitHub, publie les packages et déploie la documentation.\n*Ni nin PR in fara ɲɔgɔn kan, tag, release, packages ani sɛbɛnw bɛ bɔ
- [ ] L13 — "section": "Nouveautés · Fɛn kuraw"
- [ ] L25 — "section": "Dépréciations · A tɛna mɛn"
- [ ] L29 — "section": "Retours arrière · Segin kɔ"
- [ ] L33 — "section": "Refonte · Labɛn kura"
- [ ] L37 — "section": "Documentation · Sɛbɛnw"
- [ ] L41 — "section": "Construction · Jɔli"
- [ ] L53 — "section": "Tests · Kɔrɔbɔliw",

### `scripts/github/backlog.mjs`

- [ ] L31 — backlog: 'Baara tɔw',
- [ ] L32 — roadmap: 'Sira jiraminɛn',
- [ ] L33 — generated: 'Nin sɛbɛn in dilanna otomatiki la',
- [ ] L34 — open: 'dayɛlɛlen',
- [ ] L37 — none: 'Jalon tɛ min na',
- [ ] L38 — done: 'A bɔra',
- [ ] L39 — progress: 'A bɛ ka kɛ',
- [ ] L40 — planned: 'A labɛnnen don',
- [ ] L41 — nothing: 'Foyi tɛ yen sisan.',
- [ ] L42 — priority: 'Ɲɛsin',
- [ ] L115 — `Mis à jour automatiquement · *A bɛ yɛlɛma otomatiki la* — ${stamp}`,

### `scripts/github/release-notes.mjs`

- [ ] L23 — `🇲🇱 *Nin version in bɔra otomatiki la. Packages : \`@nyema-r-d/tokens\`, \`@nyema-r-d/react\`, \`@nyema-r-d/config\`.*`,
- [ ] L45 — body: `Livré dans [${tag}](${release.html_url}). · *A bɔra [${tag}](${release.html_url}) la.*`,
