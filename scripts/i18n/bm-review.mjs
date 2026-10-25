// Recense tous les textes en bamanankan du dépôt pour la relecture native (#23).
// Sortie : docs/i18n/relecture-bm.md — une case à cocher par texte, avec la source française quand elle existe.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

// Caractères propres au bamanankan (absents du français) : repère fiable d'un texte BM.
const BM = /[ɛɔɲŋƐƆƝŊ]/;
const files = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
  .split('\n')
  .filter((f) => /\.(md|mdx|ts|tsx|vue|yml|json|mjs)$/.test(f))
  .filter(
    (f) =>
      !/^(CHANGELOG\.md|pnpm-lock\.yaml|docs\/i18n\/|scripts\/i18n\/)/.test(f) &&
      !f.includes('__screenshots__'),
  )
  // Fichiers qui citent les caractères BM sans être des traductions.
  .filter(
    (f) =>
      !['packages/tokens/scripts/build.mjs', 'packages/tokens/test/tokens.test.mjs'].includes(f),
  );

// Fichiers entièrement en bamanankan : toutes leurs lignes de texte sont à relire.
const bmOnly = (f) => f === 'README.bm.md' || /^docs\/wiki\/bm\//.test(f);
const textLines = (lines) => {
  let code = false;
  return lines.map((line, i) => {
    if (line.trim().startsWith('```')) code = !code;
    return { n: i + 1, line, code: code || line.trim().startsWith('```') };
  });
};

const clean = (line) =>
  line
    .trim()
    .replace(/^[-*>|#\s]+/, '')
    .replace(/\s+/g, ' ');
const sections = [];
let total = 0;

// 1. Libellés d'interface : paires FR / BM exactes.
const pairs = [];
for (const file of [
  'packages/react/src/components/StatusBadge/StatusBadge.tsx',
  'packages/react/src/components/ConnectionStatus/ConnectionStatus.tsx',
]) {
  const source = readFileSync(file, 'utf8');
  const fr = Object.fromEntries(
    [...(source.match(/fr: \{([^}]+)\}/)?.[1] ?? '').matchAll(/(\w+): '([^']+)'/g)].map((m) => [
      m[1],
      m[2],
    ]),
  );
  const bm = Object.fromEntries(
    [...(source.match(/bm: \{([^}]+)\}/)?.[1] ?? '').matchAll(/(\w+): '([^']+)'/g)].map((m) => [
      m[1],
      m[2],
    ]),
  );
  for (const key of Object.keys(bm)) pairs.push([file.split('/').at(-1), key, fr[key], bm[key]]);
}
pairs.push(['ConnectionStatus.tsx', 'pending', '{n} en attente', '{n} bɛ makɔnɔni na']);
total += pairs.length;
sections.push(
  '## 1. Libellés d’interface (composants React et Vue)\n\n' +
    'Affichés dans les produits : priorité de relecture.\n\n' +
    '| ✓ | Composant | Clé | Français | Bamanankan proposé | Correction |\n|---|---|---|---|---|---|\n' +
    pairs.map(([c, k, fr, bm]) => `| ☐ | ${c} | \`${k}\` | ${fr} | ${bm} | |`).join('\n'),
);

// 2. Tous les autres textes, fichier par fichier.
const byFile = [];
for (const file of files) {
  const lines = textLines(readFileSync(file, 'utf8').split('\n'));
  const hits = lines
    .filter(({ code }) => !code)
    .map(({ n, line }) => ({ n, text: clean(line) }))
    .filter(({ text }) => /[a-zA-Zɛɔ]/.test(text) && !/^-+$|^[-|: ]+$/.test(text))
    .filter(
      ({ text }) =>
        (bmOnly(file) || BM.test(text)) && !/statusLabels|connectionLabels|bm: \{/.test(text),
    );
  if (hits.length) byFile.push([file, hits]);
}
total += byFile.reduce((sum, [, hits]) => sum + hits.length, 0);
sections.push(
  '## 2. Documentation, gabarits et automatisation\n\n' +
    byFile
      .map(
        ([file, hits]) =>
          `### \`${file}\`\n\n` +
          hits.map(({ n, text }) => `- [ ] L${n} — ${text.slice(0, 240)}`).join('\n'),
      )
      .join('\n\n'),
);

const doc = `# Relecture du bamanankan · *Bamanankan sɛgɛsɛgɛli*

> Généré par \`node scripts/i18n/bm-review.mjs\` — ne pas modifier à la main. Issue #23 : la 1.0 attend cette relecture.

**${total} textes** à relire, rédigés sans locuteur natif. Pour chaque ligne : cocher si correct, sinon indiquer la correction (dans la colonne prévue, en commentaire de PR, ou directement dans le fichier cité). Le français fait foi pour le sens.

Points d'attention signalés lors de la rédaction :

- vocabulaire technique sans équivalent établi (synchronisation, version, dépréciation, jalon, release) : faut-il un terme bamanankan, un emprunt, ou garder le français ?
- statuts produit : « Ɲinini » (recherche), « Misali » (prototype), « Kɔrɔbɔli » (pilote), « A bɛ sɔrɔ » (disponible) ;
- état réseau : « Ɛntɛrinɛti tɛ » (hors ligne), « Bɛnbaliya » (conflit de synchronisation) ;
- orthographe : graphie officielle malienne (ɛ, ɔ, ɲ, ŋ) et tons non notés.

${sections.join('\n\n')}
`;
writeFileSync('docs/i18n/relecture-bm.md', doc);
console.log(`relecture BM : ${total} textes → docs/i18n/relecture-bm.md`);
