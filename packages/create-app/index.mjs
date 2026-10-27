#!/usr/bin/env node
// pnpm create @nyema-r-d/app mon-outil [--framework react|vue] [--title "Mon outil"]
import { basename, resolve } from 'node:path';
import { createInterface } from 'node:readline/promises';
import { parseArgs } from 'node:util';
import { createApp, FRAMEWORKS, isValidName } from './src/create.mjs';

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    framework: { type: 'string', short: 'f' },
    title: { type: 'string', short: 't' },
    help: { type: 'boolean', short: 'h' },
  },
});

if (values.help) {
  console.log(`Créer un outil NYEMA · NYEMA baarakɛminɛn kura dabɔ

  pnpm create @nyema-r-d/app <dossier> [--framework react|vue] [--title "Nom affiché"]
`);
  process.exit(0);
}

const interactive = process.stdin.isTTY && process.stdout.isTTY;
const prompt = interactive
  ? createInterface({ input: process.stdin, output: process.stdout })
  : null;
const ask = async (question, fallback) =>
  (prompt ? (await prompt.question(`${question} (${fallback}) `)).trim() : '') || fallback;

try {
  const directory = resolve(positionals[0] ?? (await ask('Dossier du projet ?', 'outil-nyema')));
  const name = basename(directory);
  if (!isValidName(name))
    throw new Error(`Nom invalide : « ${name} » (minuscules, chiffres, tirets).`);
  const framework =
    values.framework ?? (await ask(`Framework (${FRAMEWORKS.join(' / ')}) ?`, 'react'));
  const title = values.title ?? (await ask('Nom affiché ?', name));
  prompt?.close();

  const files = createApp({ directory, name, title, framework });
  console.log(`
${files.length} fichiers créés dans ${directory}

  cd ${positionals[0] ?? name}
  git init
  pnpm config set //npm.pkg.github.com/:_authToken "$(gh auth token)"   # une fois
  pnpm install
  pnpm dev

Guide : https://github.com/Nyema-R-D/DesSys/wiki/Kit-de-demarrage
`);
} catch (error) {
  prompt?.close();
  console.error(`✖ ${error.message}`);
  process.exit(1);
}
