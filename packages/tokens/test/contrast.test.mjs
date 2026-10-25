// Audit WCAG 2.2 des paires de tokens (issue #22). 1.4.3 : texte ≥ 4,5:1 ; 1.4.11 : éléments graphiques ≥ 3:1.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const tokens = JSON.parse(readFileSync('dist/tokens.json', 'utf8'));

const parse = (color, background) => {
  const hex = color.match(/^#([0-9a-f]{6})$/i);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16));
  const [r, g, b, a] = color
    .match(/rgba\((\d+),(\d+),(\d+),([\d.]+)\)/)
    .slice(1)
    .map(Number);
  const base = parse(background);
  return [r, g, b].map((v, i) => v * a + base[i] * (1 - a));
};
const luminance = (rgb) =>
  rgb
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
const contrast = (fg, bg) => {
  const [a, b] = [luminance(parse(fg, bg)), luminance(parse(bg))];
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

const TEXT = ['text-primary', 'text-secondary', 'text-tertiary', 'accent-text', 'danger'];
const SURFACES = ['surface-page', 'surface-raised'];
const GRAPHICS = [
  'accent',
  'status-research',
  'status-prototype',
  'status-pilot',
  'status-available',
];
// Exceptions connues, en attente de décision (issue #41) : filets des composants interactifs.
const PENDING = ['line-strong', 'line-subtle'];

for (const theme of ['anthracite', 'paper']) {
  const v = (name) => tokens.themes[theme][`--${name}`];

  test(`${theme} : texte ≥ 4,5:1 sur chaque surface (1.4.3)`, () => {
    for (const fg of TEXT)
      for (const bg of SURFACES) {
        const ratio = contrast(v(fg), v(bg));
        assert.ok(ratio >= 4.5, `${fg} sur ${bg} : ${ratio.toFixed(2)}`);
      }
    for (const [fg, bg] of [
      ['text-on-accent', 'accent'],
      ['text-on-accent', 'accent-hover'],
      ['text-inverse', 'surface-inverse'],
    ]) {
      const ratio = contrast(v(fg), v(bg));
      assert.ok(ratio >= 4.5, `${fg} sur ${bg} : ${ratio.toFixed(2)}`);
    }
  });

  test(`${theme} : statuts, accent et focus ≥ 3:1 (1.4.11)`, () => {
    for (const fg of [...GRAPHICS]) {
      const ratio = contrast(v(fg), v('surface-page'));
      assert.ok(ratio >= 3, `${fg} : ${ratio.toFixed(2)}`);
    }
    assert.ok(contrast(tokens['--focus-ring-color'], v('surface-page')) >= 3, 'anneau de focus');
  });

  test(`${theme} : exceptions en attente (#41) toujours sous le seuil`, () => {
    // Si ce test échoue, l'exception est résolue : retirez-la de PENDING.
    for (const line of PENDING) assert.ok(contrast(v(line), v('surface-page')) < 3, line);
  });
}
