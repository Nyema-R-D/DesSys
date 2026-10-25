// Après une release : en-tête bilingue des notes, liens vers le jalon, commentaire sur les issues livrées,
// fermeture du jalon et création du jalon suivant s'il n'existe pas.
import { bySemver, gh, paginate, repository } from './lib.mjs';

const tag = process.argv[2];
if (!tag) throw new Error('usage : release-notes.mjs vX.Y.Z');
const base = `https://github.com/${repository.owner}/${repository.repo}`;

const { data: release } = await gh(`/:repo/releases/tags/${tag}`);
const milestones = await paginate('/:repo/milestones?state=all');
const milestone = milestones.find((m) => m.title === tag);
const delivered = milestone
  ? (await paginate(`/:repo/issues?milestone=${milestone.number}&state=closed`)).filter(
      (i) => !i.pull_request,
    )
  : [];

const header = [
  '<!-- nyema:release-header -->',
  `**NYEMA Design System ${tag}**`,
  '',
  `🇫🇷 Version publiée automatiquement. Packages : \`@nyema-r-d/tokens\`, \`@nyema-r-d/react\`, \`@nyema-r-d/config\` (GitHub Packages).`,
  `🇲🇱 *Nin version in bɔra otomatiki la. Packages : \`@nyema-r-d/tokens\`, \`@nyema-r-d/react\`, \`@nyema-r-d/config\`.*`,
  '',
  `Jalon · *Jalon* : ${milestone ? `[${tag}](${milestone.html_url})` : '—'} · [Wiki](${base}/wiki) · [CHANGELOG](${base}/blob/${tag}/CHANGELOG.md)`,
  '',
  delivered.length
    ? `### Issues livrées · *Baara banninw*\n\n${delivered.map((i) => `- #${i.number} ${i.title}`).join('\n')}\n`
    : '',
  '---',
  '',
].join('\n');

if (!release.body?.includes('nyema:release-header')) {
  await gh(`/:repo/releases/${release.id}`, {
    method: 'PATCH',
    body: { body: header + (release.body ?? '') },
  });
}

for (const issue of delivered) {
  await gh(`/:repo/issues/${issue.number}/comments`, {
    method: 'POST',
    body: {
      body: `Livré dans [${tag}](${release.html_url}). · *A bɔra [${tag}](${release.html_url}) la.*`,
    },
  });
}

if (milestone?.state === 'open') {
  await gh(`/:repo/milestones/${milestone.number}`, { method: 'PATCH', body: { state: 'closed' } });
  console.log(`jalon ${tag} fermé`);
}

// Garantit qu'un jalon de patch suivant existe pour accueillir le travail courant.
const [major, minor, patch] = tag.slice(1).split('.').map(Number);
const next = `v${major}.${minor}.${patch + 1}`;
if (
  !milestones.some((m) => m.title === next) &&
  !milestones.filter((m) => m.state === 'open').sort(bySemver).length
) {
  await gh('/:repo/milestones', {
    method: 'POST',
    body: { title: next, description: 'Jalon créé automatiquement après la release précédente.' },
  });
  console.log(`jalon ${next} créé`);
}
console.log(`release ${tag} : ${delivered.length} issues livrées`);
