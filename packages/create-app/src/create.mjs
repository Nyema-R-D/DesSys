// Génère un outil NYEMA à partir des modèles : shared/ + react/ ou vue/.
// Un nom de fichier qui commence par « _ » devient « . » (npm ne publie pas .gitignore ni .npmrc).
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const FRAMEWORKS = ['react', 'vue'];
const BINARY = /\.(png|ico|woff2?)$/;

/** Dépendances de chaque modèle ; les versions viennent de dist/versions.json. */
const DEPENDENCIES = {
  react: {
    dependencies: ['@nyema-r-d/react', '@nyema-r-d/tokens', 'react', 'react-dom'],
    devDependencies: [
      '@testing-library/jest-dom',
      '@testing-library/react',
      '@types/react',
      '@types/react-dom',
      '@vitejs/plugin-react',
      'eslint-plugin-react-hooks',
    ],
  },
  vue: {
    dependencies: ['@nyema-r-d/tokens', '@nyema-r-d/vue', 'vue'],
    devDependencies: ['@vitejs/plugin-vue', '@vue/test-utils', 'vue-tsc'],
  },
  shared: {
    devDependencies: [
      '@commitlint/cli',
      '@commitlint/config-conventional',
      '@eslint/js',
      '@nyema-r-d/config',
      '@types/node',
      'eslint',
      'globals',
      'jsdom',
      'lefthook',
      'prettier',
      'typescript',
      'typescript-eslint',
      'vite',
      'vitest',
    ],
  },
};

export const loadVersions = () =>
  JSON.parse(readFileSync(join(root, 'dist/versions.json'), 'utf8'));

/** Nom de paquet npm valide : minuscules, chiffres, tirets. */
export const isValidName = (name) => /^[a-z0-9][a-z0-9-]{0,62}$/.test(name);

const walk = (dir) =>
  readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

const target = (path) =>
  path
    .split('/')
    .map((part) => (part.startsWith('_') ? `.${part.slice(1)}` : part))
    .join('/');

/**
 * @param {object} options
 * @param {string} options.directory dossier à créer (doit être absent ou vide)
 * @param {string} options.name nom du paquet
 * @param {string} [options.title] nom affiché
 * @param {'react' | 'vue'} options.framework
 * @param {Record<string, string>} [options.overrides] versions imposées (tests : archives locales)
 * @returns {string[]} fichiers créés, relatifs au dossier
 */
export function createApp({ directory, name, title = name, framework, overrides = {} }) {
  if (!isValidName(name))
    throw new Error(`Nom invalide : « ${name} » (minuscules, chiffres, tirets).`);
  if (!FRAMEWORKS.includes(framework)) throw new Error(`Framework inconnu : ${framework}.`);
  if (existsSync(directory) && readdirSync(directory).length)
    throw new Error(`Le dossier ${directory} n'est pas vide.`);

  const data = loadVersions();
  const version = (dep) => {
    if (overrides[dep]) return overrides[dep];
    if (dep.startsWith('@nyema-r-d/')) return `^${data.designSystem}`;
    const range = data.versions[dep];
    if (!range) throw new Error(`Version introuvable pour ${dep} : relancer le build.`);
    return range;
  };
  const pick = (kind) =>
    Object.fromEntries(
      [...(DEPENDENCIES[framework][kind] ?? []), ...(DEPENDENCIES.shared[kind] ?? [])]
        .sort()
        .map((dep) => [dep, version(dep)]),
    );
  const values = {
    NAME: name,
    TITLE: title,
    DS_VERSION: data.designSystem,
    NODE: data.node,
    FRAMEWORK: framework === 'vue' ? 'Vue' : 'React',
  };
  const fill = (text) => text.replace(/%%([A-Z_]+)%%/g, (match, key) => values[key] ?? match);

  const created = [];
  for (const source of ['shared', framework]) {
    const base = join(root, 'templates', source);
    for (const file of walk(base)) {
      const out = join(directory, target(relative(base, file)));
      mkdirSync(dirname(out), { recursive: true });
      const content = readFileSync(file);
      writeFileSync(out, BINARY.test(file) ? content : fill(content.toString('utf8')));
      created.push(relative(directory, out));
    }
  }

  const manifest = {
    name,
    version: '0.0.0',
    private: true,
    type: 'module',
    packageManager: data.packageManager,
    engines: { node: `>=${data.node}` },
    scripts: {
      dev: 'vite',
      build: framework === 'vue' ? 'vue-tsc --noEmit && vite build' : 'tsc && vite build',
      preview: 'vite preview',
      typecheck: framework === 'vue' ? 'vue-tsc --noEmit' : 'tsc',
      lint: 'eslint . --max-warnings=0',
      format: 'prettier --write .',
      'format:check': 'prettier --check .',
      test: 'vitest run',
      check: 'pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build',
      prepare: 'lefthook install || true',
    },
    dependencies: pick('dependencies'),
    devDependencies: pick('devDependencies'),
  };
  writeFileSync(join(directory, 'package.json'), JSON.stringify(manifest, null, 2) + '\n');
  created.push('package.json');
  return created.sort();
}
