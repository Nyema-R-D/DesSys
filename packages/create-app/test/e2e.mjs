// Bout en bout : génère un outil React et un outil Vue, les installe sur les archives des
// paquets construits dans ce dépôt (pnpm pack), puis y lance `pnpm check` comme leur CI.
// Prérequis : pnpm build:packages.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApp, FRAMEWORKS } from '../src/create.mjs';

const repo = new URL('../../..', import.meta.url).pathname;
const work = mkdtempSync(join(tmpdir(), 'nyema-e2e-'));
const run = (cmd, args, cwd) => {
  console.log(`\n$ ${cmd} ${args.join(' ')}   (${cwd})`);
  // Aucun paquet n'est lu sur GitHub Packages : toutes les dépendances @nyema-r-d sont locales.
  execFileSync(cmd, args, {
    cwd,
    stdio: 'inherit',
    env: { ...process.env, NODE_AUTH_TOKEN: 'e2e' },
  });
};

const frameworks = process.argv.slice(2).length ? process.argv.slice(2) : FRAMEWORKS;
try {
  const tarballs = join(work, 'tarballs');
  for (const pkg of ['tokens', 'config', ...frameworks]) {
    run('pnpm', ['pack', '--pack-destination', tarballs], join(repo, 'packages', pkg));
  }
  const overrides = Object.fromEntries(
    readdirSync(tarballs).map((file) => [
      `@nyema-r-d/${file.replace(/^nyema-r-d-(.+)-\d+\.\d+\.\d+.*\.tgz$/, '$1')}`,
      `file:${join(tarballs, file)}`,
    ]),
  );
  for (const framework of frameworks) {
    const directory = join(work, `outil-${framework}`);
    createApp({
      directory,
      name: `outil-${framework}`,
      title: 'Outil de test',
      framework,
      overrides,
    });
    run('pnpm', ['install', '--no-frozen-lockfile'], directory);
    run('pnpm', ['check'], directory);
  }
  console.log(`\n✔ Kit de démarrage vérifié : ${frameworks.join(', ')}`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
