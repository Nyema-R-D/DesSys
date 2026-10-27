// Relève dans le monorepo les versions des dépendances utilisées par les modèles : un outil
// généré démarre exactement avec les versions testées ici (Dependabot les fait évoluer ensemble).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const repo = join(root, '../..');
const read = (path) => JSON.parse(readFileSync(join(repo, path), 'utf8'));
const manifests = [
  'package.json',
  'packages/react/package.json',
  'packages/vue/package.json',
  'apps/reference/package.json',
].map(read);

const versions = {};
for (const { dependencies = {}, devDependencies = {} } of manifests) {
  for (const [name, range] of Object.entries({ ...devDependencies, ...dependencies })) {
    if (!range.startsWith('workspace:')) versions[name] ??= range;
  }
}
const self = read('packages/create-app/package.json');
const data = {
  designSystem: self.version,
  packageManager: read('package.json').packageManager,
  node: readFileSync(join(repo, '.nvmrc'), 'utf8').trim(),
  versions: Object.fromEntries(Object.entries(versions).sort(([a], [b]) => a.localeCompare(b))),
};
mkdirSync(join(root, 'dist'), { recursive: true });
writeFileSync(join(root, 'dist/versions.json'), JSON.stringify(data, null, 2) + '\n');
console.log(`create-app : ${Object.keys(versions).length} versions relevées → dist/versions.json`);
