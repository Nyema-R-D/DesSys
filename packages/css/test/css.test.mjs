import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
const styles = readFileSync('dist/styles.css', 'utf8');
const withoutComments = styles.replace(/\/\*[\s\S]*?\*\//g, '');
const tokens = readFileSync(require.resolve('@nyema-r-d/tokens/tokens.css'), 'utf8');

const defined = new Set([...tokens.matchAll(/(--[a-z0-9-]+):/g)].map((m) => m[1]));
for (const m of styles.matchAll(/(--[a-z0-9-]+):/g)) defined.add(m[1]);

test('chaque variable utilisée est définie (tokens, localement) ou a une valeur de repli', () => {
  // var(--x, repli) : variable fixée par le composant (attribut style), avec repli pour le HTML pur.
  const used = new Set([...styles.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((m) => m[1]));
  const missing = [...used].filter((name) => !defined.has(name));
  assert.deepEqual(missing, []);
});

test('styles.css contient chaque composant', () => {
  for (const file of readdirSync('src/components'))
    assert.ok(styles.includes(`/* components/${file} */`), file);
});

test('aucune couleur codée en dur hors des exceptions documentées', () => {
  // Exceptions : voiles rgba de la grille de signaux et du fond de modale (dérivés d'ink/papier).
  const allowed = ['SignalGrid.css', 'Dialog.css'];
  for (const file of readdirSync('src/components').filter((f) => !allowed.includes(f))) {
    const css = readFileSync(`src/components/${file}`, 'utf8');
    assert.doesNotMatch(css, /#[0-9a-fA-F]{3,6}\b|rgba?\(/, file);
  }
});

test('toutes les classes sont préfixées ny-', () => {
  const classes = [...withoutComments.matchAll(/\.([a-z][a-z0-9_-]*)/g)].map((m) => m[1]);
  assert.deepEqual(
    classes.filter((c) => !c.startsWith('ny-')),
    [],
  );
});
