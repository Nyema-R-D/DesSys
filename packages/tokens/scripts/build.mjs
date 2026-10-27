// Génère dist/ à partir de src/tokens.json : CSS (variables), JS/TS (objet typé), JSON résolu.
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
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

// Export W3C Design Tokens (DTCG), lisible par Tokens Studio pour Figma et Style Dictionary :
// un ensemble « core » (primitives) et un ensemble par thème, références {…} conservées.
const families = (value) => value.split(',').map((f) => f.trim().replace(/^'|'$/g, ''));
const dtcg = (path, value) => {
  const group = path[0];
  const token = (type, $value, extra = {}) => ({
    ...(type ? { $type: type } : {}),
    $value,
    ...extra,
    $extensions: { 'com.nyema': { cssVar: cssName(path) } },
  });
  if (group === 'color') return token('color', value);
  if (group === 'focus') return token(path[1] === 'ring-color' ? 'color' : 'dimension', value);
  if (group === 'font') return token('fontFamily', families(value));
  if (group === 'motion')
    return path[1].startsWith('dur')
      ? token('duration', value)
      : token('cubicBezier', value.match(/[\d.]+/g).map(Number));
  if (group === 'stretch')
    return token(null, value, { $description: 'font-stretch (largeur Archivo) — sans type DTCG' });
  if (group === 'type') {
    const [, weight, size, lineHeight, family] = value.match(
      /^(\d+) (.+)\/([\d.]+) var\(--font-(\w+)\)$/,
    );
    return token('typography', {
      fontFamily: `{font.${family}}`,
      fontWeight: Number(weight),
      fontSize: size,
      lineHeight: Number(lineHeight),
    });
  }
  return token('dimension', value);
};
const nest = (entries) => {
  const out = {};
  for (const [path, value] of entries) {
    let node = out;
    for (const key of path.slice(0, -1)) node = node[key] ??= {};
    node[path.at(-1)] = value;
  }
  return out;
};
const themeSet = (name) =>
  Object.fromEntries(
    Object.entries(themes[name]).map(([k, v]) => [
      k,
      { $type: 'color', $value: v, $extensions: { 'com.nyema': { cssVar: `--${k}` } } },
    ]),
  );
writeFileSync(
  join(dist, 'tokens.dtcg.json'),
  JSON.stringify(
    {
      core: nest(flatten(base).map(([path, value]) => [path, dtcg(path, value)])),
      anthracite: themeSet('anthracite'),
      paper: themeSet('paper'),
      $themes: Object.keys(themes).map((name) => ({
        id: name,
        name,
        selectedTokenSets: { core: 'source', [name]: 'enabled' },
      })),
      $metadata: { tokenSetOrder: ['core', ...Object.keys(themes)] },
    },
    null,
    2,
  ) + '\n',
);

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

// Polices auto-hébergées (hors ligne, sans Google Fonts) : sous-ensembles latin et latin-ext,
// ce dernier couvrant les caractères bamanankan (ɛ, ɔ, ɲ, ŋ).
const require = createRequire(import.meta.url);
const fontSources = [
  { pkg: '@fontsource-variable/archivo', css: ['wdth.css'], family: 'Archivo' },
  {
    pkg: '@fontsource/jetbrains-mono',
    css: ['latin-400.css', 'latin-500.css', 'latin-ext-400.css', 'latin-ext-500.css'],
    family: 'JetBrains Mono',
  },
];
mkdirSync(join(dist, 'fonts'), { recursive: true });
const faces = [];
for (const { pkg, css, family } of fontSources) {
  const dir = dirname(require.resolve(`${pkg}/package.json`));
  for (const file of css) {
    const blocks = readFileSync(join(dir, file), 'utf8').match(/@font-face\s*{[^}]+}/g) ?? [];
    for (const block of blocks) {
      const font = block.match(/url\(\.\/files\/([^)]+\.woff2)\)/)?.[1];
      if (!font || !/-latin(-ext)?-/.test(font)) continue;
      cpSync(join(dir, 'files', font), join(dist, 'fonts', font));
      faces.push(
        block
          .replace(/font-family: '[^']+'/, `font-family: '${family}'`)
          .replace('./files/', './fonts/'),
      );
    }
  }
  cpSync(join(dir, 'LICENSE'), join(dist, 'fonts', `LICENSE-${family.replace(/\s/g, '')}.txt`));
}
writeFileSync(
  join(dist, 'fonts-local.css'),
  `/* Archivo et JetBrains Mono — SIL Open Font License 1.1 (voir fonts/LICENSE-*). */\n${faces.join('\n')}\n`,
);
console.log(
  `tokens : ${baseVars.length} primitives, ${Object.keys(themes).length} thèmes, ${faces.length} @font-face → dist/`,
);
