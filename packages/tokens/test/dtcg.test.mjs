import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const dtcg = JSON.parse(readFileSync('dist/tokens.dtcg.json', 'utf8'));
const json = JSON.parse(readFileSync('dist/tokens.json', 'utf8'));
const TYPES = ['color', 'dimension', 'fontFamily', 'duration', 'cubicBezier', 'typography'];

const leaves = (node, path = []) =>
  '$value' in node
    ? [[path, node]]
    : Object.entries(node).flatMap(([k, v]) => (k.startsWith('$') ? [] : leaves(v, [...path, k])));

const sets = ['core', 'anthracite', 'paper'];
const tokens = sets.flatMap((set) => leaves(dtcg[set]).map(([path, t]) => [set, path, t]));
const get = (path) => path.split('.').reduce((node, key) => node?.[key], dtcg.core);

test('chaque variable CSS a son token DTCG', () => {
  const exported = new Set(tokens.map(([, , t]) => t.$extensions['com.nyema'].cssVar));
  const css = [
    ...Object.keys(json).filter((k) => k.startsWith('--')),
    ...Object.keys(json.themes.anthracite),
  ];
  assert.deepEqual(
    css.filter((name) => !exported.has(name)),
    [],
  );
});

test('types DTCG valides (seul font-stretch reste sans type)', () => {
  for (const [, path, t] of tokens) {
    if (path[0] === 'stretch') assert.equal(t.$type, undefined);
    else assert.ok(TYPES.includes(t.$type), `${path.join('.')} : ${t.$type}`);
  }
});

test('toutes les références {…} pointent vers un token core', () => {
  for (const [set, path, t] of tokens) {
    for (const [, ref] of JSON.stringify(t.$value).matchAll(/\{([a-z][\w.-]*)\}/g)) {
      assert.ok(get(ref)?.$value !== undefined, `${set}:${path.join('.')} → ${ref}`);
    }
  }
});

test('Tokens Studio : un thème par ensemble, core en source', () => {
  assert.deepEqual(dtcg.$metadata.tokenSetOrder, sets);
  for (const theme of dtcg.$themes) {
    assert.deepEqual(theme.selectedTokenSets, { core: 'source', [theme.id]: 'enabled' });
  }
});
