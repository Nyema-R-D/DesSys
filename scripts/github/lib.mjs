// Client minimal de l'API GitHub (fetch natif, aucune dépendance) pour les workflows.
const token = process.env.GITHUB_TOKEN;
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? 'Nyema-R-D/DesSys').split('/');
export const repository = { owner, repo };

export async function gh(path, { method = 'GET', body } = {}) {
  const response = await fetch(
    `https://api.github.com${path.replace(':repo', `repos/${owner}/${repo}`)}`,
    {
      method,
      headers: {
        accept: 'application/vnd.github+json',
        'x-github-api-version': '2022-11-28',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...(body ? { 'content-type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    },
  );
  if (!response.ok && response.status !== 404 && response.status !== 422) {
    throw new Error(`${method} ${path} → ${response.status} ${await response.text()}`);
  }
  return response.status === 204 ? null : { status: response.status, data: await response.json() };
}

export async function paginate(path) {
  const items = [];
  for (let page = 1; ; page++) {
    const separator = path.includes('?') ? '&' : '?';
    const { data } = await gh(`${path}${separator}per_page=100&page=${page}`);
    items.push(...data);
    if (data.length < 100) return items;
  }
}

export const semver = (title) =>
  title
    .match(/^v(\d+)\.(\d+)\.(\d+)$/)
    ?.slice(1)
    .map(Number);
export const bySemver = (a, b) => {
  const [x, y] = [semver(a.title) ?? [999], semver(b.title) ?? [999]];
  for (let i = 0; i < 3; i++) if ((x[i] ?? 0) !== (y[i] ?? 0)) return (x[i] ?? 0) - (y[i] ?? 0);
  return 0;
};
