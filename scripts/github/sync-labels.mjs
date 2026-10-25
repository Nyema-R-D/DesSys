// Synchronise les labels du dépôt avec .github/labels.yml (création et mise à jour, jamais de suppression).
import { readFileSync } from 'node:fs';
import { gh } from './lib.mjs';

const labels = readFileSync(new URL('../../.github/labels.yml', import.meta.url), 'utf8')
  .split(/^- /m)
  .slice(1)
  .map((block) =>
    Object.fromEntries([...block.matchAll(/(\w+): '([^']*)'/g)].map(([, k, v]) => [k, v])),
  );

for (const label of labels) {
  const existing = await gh(`/:repo/labels/${encodeURIComponent(label.name)}`);
  if (existing.status === 404) {
    await gh('/:repo/labels', { method: 'POST', body: label });
    console.log(`+ ${label.name}`);
  } else {
    await gh(`/:repo/labels/${encodeURIComponent(label.name)}`, {
      method: 'PATCH',
      body: { color: label.color, description: label.description },
    });
    console.log(`= ${label.name}`);
  }
}
