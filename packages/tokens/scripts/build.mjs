// Génère dist/ à partir de src/tokens.json : CSS (variables), JS/TS (objet typé), JSON résolu.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const source = JSON.parse(readFileSync(join(root, 'src/tokens.json'), 'utf8'));

const flatten = (obj, prefix = []) =>
  Object.entries(obj).flatMap(([key, value]) =>
    key.startsWith('$')
      ? []
      : typeof value === 'object'
        ? flatten(value, [...prefix, key])
        : [[[...prefix, key], value]],
  );

const get = (path) => path.split('.').reduce((node, key) => node?.[key], source);
const resolve = (value) =>
  String(value).replace(/\{([^}]+)\}/g, (_, ref) => {
    const found = get(ref);
    if (typeof found !== 'string') throw new Error(`Référence de token inconnue : ${ref}`);
    return resolve(found);
  });

// Les couleurs primitives sont préfixées --ny-, le reste suit la nomenclature du design (--space-1, --type-h1…).
const cssName = (path) =>
  path[0] === 'color'
    ? `--ny-${path.slice(1).join('-')}`
    : [
          'font',
          'type',
          'stretch',
          'space',
          'radius',
          'motion',
          'focus',
          'control',
          'tracking',
          'border',
          'layout',
        ].includes(path[0])
      ? `--${path[0] === 'motion' || path[0] === 'layout' ? '' : `${path[0]}-`}${path.slice(1).join('-')}`
      : `--${path.join('-')}`;

const { themes, ...base } = source;
const baseVars = flatten(base).map(([path, value]) => [cssName(path), resolve(value)]);
const themeVars = (name) => Object.entries(themes[name]).map(([k, v]) => [`--${k}`, resolve(v)]);
const block = (selector, vars) =>
  `${selector}{\n${vars.map(([k, v]) => `  ${k}:${v};`).join('\n')}\n}\n`;

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

const header =
  '/* @nyema-r-d/tokens — fichier généré, ne pas modifier. Source : src/tokens.json */\n';
const css =
  header +
  block(':root', baseVars) +
  block(':root,[data-ny-theme="anthracite"]', [
    ...themeVars('anthracite'),
    ['color-scheme', 'dark'],
  ]) +
  block('[data-ny-theme="paper"]', [...themeVars('paper'), ['color-scheme', 'light']]);
writeFileSync(join(dist, 'tokens.css'), css);

writeFileSync(
  join(dist, 'fonts.css'),
  "@import url('https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=JetBrains+Mono:wght@400;500&display=swap');\n",
);

const resolved = {
  ...Object.fromEntries(baseVars),
  themes: {
    anthracite: Object.fromEntries(themeVars('anthracite')),
    paper: Object.fromEntries(themeVars('paper')),
  },
};
writeFileSync(join(dist, 'tokens.json'), JSON.stringify(resolved, null, 2) + '\n');

const tree = (obj) =>
  Object.fromEntries(
    Object.entries(obj)
      .filter(([k]) => !k.startsWith('$'))
      .map(([k, v]) => [k, typeof v === 'object' ? tree(v) : resolve(v)]),
  );
const tokens = tree(base);
const themeTree = { anthracite: tree(themes.anthracite), paper: tree(themes.paper) };
writeFileSync(
  join(dist, 'index.js'),
  `export const tokens = ${JSON.stringify(tokens, null, 2)};\nexport const themes = ${JSON.stringify(themeTree, null, 2)};\nexport const cssVar = (name) => \`var(--\${name})\`;\n`,
);
writeFileSync(
  join(dist, 'index.d.ts'),
  `export declare const tokens: ${JSON.stringify(tokens, null, 2)};\nexport declare const themes: ${JSON.stringify(themeTree, null, 2)};\nexport type ThemeName = keyof typeof themes;\nexport type SemanticToken = keyof (typeof themes)['anthracite'];\nexport declare const cssVar: (name: SemanticToken | (string & {})) => string;\n`,
);

cpSync(join(root, 'assets'), join(dist, 'assets'), { recursive: true });
console.log(`tokens : ${baseVars.length} primitives, ${Object.keys(themes).length} thèmes → dist/`);
