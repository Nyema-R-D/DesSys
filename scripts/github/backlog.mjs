// Génère le backlog et la feuille de route (FR + BM) à partir des jalons et issues GitHub.
// Sorties : <out>/Backlog.md, <out>/Feuille-de-route.md, <out>/BM-Baara-tow.md, <out>/BM-Sira-jiraminen.md
// et met à jour l'issue épinglée « Tableau de bord » (fonctionne même sans wiki).
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { bySemver, gh, paginate, repository } from './lib.mjs';

const out = process.argv[2] ?? 'build/wiki';
const updateDashboard = process.argv.includes('--dashboard');
const base = `https://github.com/${repository.owner}/${repository.repo}`;

const milestones = (await paginate('/:repo/milestones?state=all')).sort(bySemver);
const issues = (await paginate('/:repo/issues?state=all')).filter((i) => !i.pull_request);

const t = {
  fr: {
    backlog: 'Backlog',
    roadmap: 'Feuille de route',
    generated: 'Page générée automatiquement',
    open: 'ouvertes',
    closed: 'fermées',
    due: 'échéance',
    none: 'Sans jalon',
    done: 'Livré',
    progress: 'En cours',
    planned: 'Planifié',
    nothing: 'Rien pour l’instant.',
    priority: 'Priorité',
  },
  bm: {
    backlog: 'Baara tɔw',
    roadmap: 'Sira jiraminɛn',
    generated: 'Nin sɛbɛn in dilanna otomatiki la',
    open: 'dayɛlɛlen',
    closed: 'datugulen',
    due: 'waati laban',
    none: 'Jalon tɛ min na',
    done: 'A bɔra',
    progress: 'A bɛ ka kɛ',
    planned: 'A labɛnnen don',
    nothing: 'Foyi tɛ yen sisan.',
    priority: 'Ɲɛsin',
  },
};

const stamp = new Date().toISOString().slice(0, 16).replace('T', ' ') + ' UTC';
const labelsOf = (i) => i.labels.map((l) => l.name);
const priority = (i) =>
  ({ high: 0, medium: 1, low: 2 })[
    labelsOf(i)
      .find((l) => l.startsWith('priority:'))
      ?.split(':')[1]
  ] ?? 3;
const line = (i) =>
  `- [${i.state === 'closed' ? 'x' : ' '}] [#${i.number}](${i.html_url}) ${i.title}` +
  (labelsOf(i).filter((l) => !l.startsWith('status:')).length
    ? ` · ${labelsOf(i)
        .filter((l) => !l.startsWith('status:'))
        .map((l) => `\`${l}\``)
        .join(' ')}`
    : '');
const bar = (m) => {
  const total = m.open_issues + m.closed_issues;
  const pct = total ? Math.round((m.closed_issues / total) * 100) : 0;
  return `${'■'.repeat(Math.round(pct / 10))}${'□'.repeat(10 - Math.round(pct / 10))} ${pct} %`;
};
const stateOf = (m, l) =>
  m.state === 'closed' ? l.done : m.closed_issues > 0 ? l.progress : l.planned;

function backlog(l) {
  const parts = [`# ${l.backlog}\n`, `> ${l.generated} · ${stamp}\n`];
  for (const m of milestones.filter((m) => m.state === 'open')) {
    const items = issues
      .filter((i) => i.milestone?.number === m.number)
      .sort((a, b) => a.state.localeCompare(b.state) || priority(a) - priority(b));
    parts.push(`## [${m.title}](${m.html_url}) — ${bar(m)}\n`);
    if (m.description) parts.push(`${m.description}\n`);
    parts.push(items.length ? items.map(line).join('\n') + '\n' : `${l.nothing}\n`);
  }
  const loose = issues
    .filter((i) => !i.milestone && i.state === 'open')
    .sort((a, b) => priority(a) - priority(b));
  parts.push(`## ${l.none}\n`, loose.length ? loose.map(line).join('\n') + '\n' : `${l.nothing}\n`);
  return parts.join('\n');
}

function roadmap(l) {
  const rows = milestones.map(
    (m) =>
      `| [${m.title}](${m.html_url}) | ${stateOf(m, l)} | ${bar(m)} | ${m.open_issues} ${l.open} · ${m.closed_issues} ${l.closed} | ${m.due_on ? m.due_on.slice(0, 10) : '—'} |`,
  );
  return [
    `# ${l.roadmap}\n`,
    `> ${l.generated} · ${stamp}\n`,
    `| Version | État | Progression | Issues | ${l.due} |`,
    '|---|---|---|---|---|',
    ...rows,
    '',
    ...milestones.filter((m) => m.description).map((m) => `### ${m.title}\n\n${m.description}\n`),
  ].join('\n');
}

mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'Backlog.md'), backlog(t.fr));
writeFileSync(join(out, 'Feuille-de-route.md'), roadmap(t.fr));
writeFileSync(join(out, 'BM-Baara-tow.md'), backlog(t.bm));
writeFileSync(join(out, 'BM-Sira-jiraminen.md'), roadmap(t.bm));
console.log(`backlog : ${milestones.length} jalons, ${issues.length} issues → ${out}`);

if (updateDashboard) {
  const title = 'Tableau de bord · Baara jiracogo';
  const marker = '<!-- nyema:dashboard -->';
  const body = [
    marker,
    `Mis à jour automatiquement · *A bɛ yɛlɛma otomatiki la* — ${stamp}`,
    '',
    `[Wiki](${base}/wiki) · [Releases](${base}/releases) · [Jalons](${base}/milestones) · [CHANGELOG](${base}/blob/main/CHANGELOG.md)`,
    '',
    roadmap(t.fr).split('\n').slice(4).join('\n'),
    '---',
    backlog(t.fr).split('\n').slice(4).join('\n'),
  ].join('\n');
  const existing = issues.find((i) => i.state === 'open' && i.body?.startsWith(marker));
  if (existing) {
    await gh(`/:repo/issues/${existing.number}`, { method: 'PATCH', body: { body } });
    console.log(`tableau de bord mis à jour : #${existing.number}`);
  } else {
    const { data } = await gh('/:repo/issues', {
      method: 'POST',
      body: { title, body, labels: ['pinned'] },
    });
    console.log(`tableau de bord créé : #${data.number}`);
  }
}
