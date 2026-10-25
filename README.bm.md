<p align="center">
  <img src="packages/tokens/assets/nyema-mark-light.svg" width="72" alt="NYEMA" />
</p>

# NYEMA jiracogo sariyaw (Design system)

[🇫🇷 Français](README.md) · 🇲🇱 Bamanankan

> ⚠️ Nin bamanankan sɛbɛn in ka kan ka sɛgɛsɛgɛ bamanankanfɔla dɔ fɛ. · _Traduction à relire par un locuteur natif (issue `i18n:bm`)._

NYEMA ka taamasiyɛn, a kulɛrw, a sɛbɛnni cogo ani a komponanw bɛ nin dépôt in kɔnɔ. Ɲɛgɛn kelen dɔrɔn : latérite `#E2602E`. NYEMA ka porogaramu, baarakɛminɛn, app ani site bɛɛ bɛ nin sariyaw de labaara.

> Cogoya : **sigibagaw y'a sɔn** (oktɔburu 2026, #20) — a sigilen bɛ dossier de cadrage kan.

## Packages

| Package             | A baara                                                       |
| ------------------- | ------------------------------------------------------------- |
| `@nyema-r-d/tokens` | Kulɛrw, sɛbɛnni, yɔrɔ, lamagali ; thème anthracite ni papier. |
| `@nyema-r-d/react`  | React komponanw.                                              |
| `@nyema-r-d/config` | TypeScript, ESLint, Prettier, Commitlint labɛnw.              |
| `apps/reference`    | Design system ka sɛbɛn jiralen.                               |

## K'a labaara porozɛ dɔ kɔnɔ

```bash
echo "@nyema-r-d:registry=https://npm.pkg.github.com" >> .npmrc
pnpm add @nyema-r-d/react @nyema-r-d/tokens
```

```tsx
import '@nyema-r-d/tokens/fonts-local.css';
import '@nyema-r-d/tokens/tokens.css';
import '@nyema-r-d/react/styles.css';
import { Theme, Button } from '@nyema-r-d/react';

<Theme theme="anthracite">
  <Button trailing="→">Parler d’un projet</Button>
</Theme>;
```

## Baara kɛcogo

```bash
pnpm install
pnpm dev          # sɛbɛn jiralen
pnpm storybook    # Storybook
pnpm check        # sɛgɛsɛgɛli bɛɛ (CI kelen)
```

## Otomatiki

- Commit bɛɛ ka kan ka sɛbɛn _Conventional Commits_ cogo la.
- PR bɛɛ bɛ sɛgɛsɛgɛ CI fɛ.
- _release-please_ bɛ version ni CHANGELOG labɛn ; PR de release fara ɲɔgɔn kan, version kura bɛ bɔ otomatiki la.
- Jalon = version. Baara tɔw ni sira jiraminɛn bɛ yɛlɛma otomatiki la wiki kɔnɔ.

Kunnafoni wɛrɛw : [wiki](https://github.com/Nyema-R-D/DesSys/wiki) · [docs/wiki/bm](docs/wiki/bm).
