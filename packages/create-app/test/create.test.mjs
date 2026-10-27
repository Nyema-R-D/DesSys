import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { createApp, FRAMEWORKS, isValidName, loadVersions } from '../src/create.mjs';

const work = mkdtempSync(join(tmpdir(), 'nyema-create-'));
after(() => rmSync(work, { recursive: true, force: true }));

for (const framework of FRAMEWORKS) {
  test(`${framework} : arborescence complète, sans marqueur restant`, () => {
    const directory = join(work, `outil-${framework}`);
    const files = createApp({
      directory,
      name: `outil-${framework}`,
      title: 'Suivi des visites',
      framework,
    });
    for (const expected of [
      '.github/workflows/ci.yml',
      '.github/workflows/release.yml',
      '.gitignore',
      '.npmrc',
      '.nvmrc',
      '.prettierrc.json',
      '.release-please-manifest.json',
      'CLAUDE.md',
      'README.bm.md',
      'README.md',
      'eslint.config.js',
      'index.html',
      'package.json',
      'pnpm-workspace.yaml',
      'public/favicon.svg',
      'src/app.css',
    ]) {
      assert.ok(files.includes(expected), expected);
    }
    assert.ok(!files.some((file) => /(^|\/)_/.test(file)), 'fichier « _ » non renommé');
    for (const file of files.filter((f) => !f.endsWith('.svg'))) {
      const content = readFileSync(join(directory, file), 'utf8');
      assert.doesNotMatch(content, /%%[A-Z_]+%%/, file);
    }
    assert.match(readFileSync(join(directory, 'index.html'), 'utf8'), /<title>Suivi des visites</);
  });

  test(`${framework} : dépendances versionnées depuis le monorepo`, () => {
    const directory = join(work, `deps-${framework}`);
    createApp({ directory, name: 'deps', framework });
    const pkg = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'));
    const { designSystem, versions, packageManager } = loadVersions();
    assert.equal(pkg.packageManager, packageManager);
    assert.equal(pkg.dependencies[`@nyema-r-d/${framework}`], `^${designSystem}`);
    assert.equal(pkg.dependencies[framework], versions[framework]);
    for (const [dep, range] of Object.entries({ ...pkg.dependencies, ...pkg.devDependencies })) {
      assert.match(range, /^[\^~]?\d/, `${dep} : ${range}`);
    }
  });
}

test('refuse un nom invalide, un framework inconnu ou un dossier non vide', () => {
  assert.equal(isValidName('Mon Outil'), false);
  assert.equal(isValidName('suivi-visites'), true);
  assert.throws(() => createApp({ directory: join(work, 'x'), name: 'x', framework: 'svelte' }));
  const directory = join(work, 'plein');
  createApp({ directory, name: 'plein', framework: 'react' });
  assert.throws(() => createApp({ directory, name: 'plein', framework: 'react' }), /pas vide/);
});

test('les versions imposées remplacent celles du monorepo (archives locales)', () => {
  const directory = join(work, 'local');
  createApp({
    directory,
    name: 'local',
    framework: 'vue',
    overrides: { '@nyema-r-d/vue': 'file:/tmp/vue.tgz' },
  });
  const pkg = JSON.parse(readFileSync(join(directory, 'package.json'), 'utf8'));
  assert.equal(pkg.dependencies['@nyema-r-d/vue'], 'file:/tmp/vue.tgz');
});

test('le favicon est le symbole latérite des tokens', () => {
  const favicon = readFileSync(new URL('../templates/shared/public/favicon.svg', import.meta.url));
  const mark = readFileSync(
    new URL('../../tokens/assets/nyema-mark-laterite.svg', import.meta.url),
  );
  assert.ok(favicon.equals(mark));
  assert.ok(readdirSync(new URL('../templates', import.meta.url)).includes('shared'));
});
