import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

const css = readFileSync('dist/tokens.css', 'utf8');
const json = JSON.parse(readFileSync('dist/tokens.json', 'utf8'));

test("l'accent unique est la latérite #E2602E", () => {
  assert.match(css, /--ny-laterite-500:#E2602E;/);
  assert.equal(json.themes.anthracite['--accent'], '#E2602E');
});

test('aucune référence {…} non résolue', () => {
  assert.doesNotMatch(css, /\{[a-z]/);
});

test('les deux thèmes exposent les mêmes tokens sémantiques', () => {
  assert.deepEqual(
    Object.keys(json.themes.anthracite).sort(),
    Object.keys(json.themes.paper).sort(),
  );
});

test('les noms historiques du design sont conservés', () => {
  for (const name of [
    '--space-1',
    '--space-10',
    '--radius-0',
    '--container',
    '--gutter',
    '--dur-fast',
    '--ease-out',
    '--font-sans',
    '--type-label',
    '--stretch-display',
  ]) {
    assert.ok(css.includes(`${name}:`), name);
  }
});

test('les polices locales couvrent latin et latin-ext pour les deux familles', () => {
  const fonts = readFileSync('dist/fonts-local.css', 'utf8');
  for (const family of ["'Archivo'", "'JetBrains Mono'"])
    assert.ok(fonts.includes(`font-family: ${family}`), family);
  for (const url of fonts.match(/url\(\.\/fonts\/[^)]+\)/g)) {
    assert.ok(existsSync(`dist/${url.slice(6, -1)}`), url);
  }
  // U+025B (ɛ) est dans la plage latin-ext : nécessaire au bamanankan.
  assert.match(fonts, /U\+0100-02BA|U\+0100-02AF/);
});
