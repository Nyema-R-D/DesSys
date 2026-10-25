// Concatène base.css et le CSS de chaque composant dans dist/styles.css.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const components = readdirSync(join(root, 'src/components'))
  .filter((file) => file.endsWith('.css'))
  .sort();
const parts = [
  ['base.css', readFileSync(join(root, 'src/base.css'), 'utf8')],
  ...components.map((file) => [
    `components/${file}`,
    readFileSync(join(root, 'src/components', file), 'utf8'),
  ]),
];

mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(
  join(root, 'dist/styles.css'),
  '/* @nyema-r-d/css — fichier généré, ne pas modifier. Requiert @nyema-r-d/tokens/tokens.css. */\n' +
    parts.map(([name, css]) => `/* ${name} */\n${css}`).join('\n'),
);
console.log(`css : base + ${components.length} composants → dist/styles.css`);
