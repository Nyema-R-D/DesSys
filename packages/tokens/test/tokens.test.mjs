import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

execFileSync('node', ['scripts/build.mjs']);
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
