/** Point en coordonnées normalisées : [x, y] dans [0, 1], depuis le coin haut gauche. */
export type PolygonPoint = [number, number];

const clamp = (value: number) => Math.min(1, Math.max(0, value));
/** 4 décimales : un dixième de pixel sur une image 4K, et un fichier de configuration lisible. */
const round = (value: number) => Math.round(clamp(value) * 10_000) / 10_000;

export const toPoint = (x: number, y: number): PolygonPoint => [round(x), round(y)];

export const setPoint = (polygon: PolygonPoint[], index: number, x: number, y: number) =>
  polygon.map((p, i) => (i === index ? toPoint(x, y) : p));

export const removePoint = (polygon: PolygonPoint[], index: number) =>
  polygon.filter((_, i) => i !== index);

/** Insère un point après `index`, au milieu du segment vers le point suivant. */
export function insertAfter(polygon: PolygonPoint[], index: number): PolygonPoint[] {
  const [x1, y1] = polygon[index]!;
  const [x2, y2] = polygon[(index + 1) % polygon.length]!;
  const mid = polygon.length === 1 ? toPoint(x1 + 0.05, y1) : toPoint((x1 + x2) / 2, (y1 + y2) / 2);
  return [...polygon.slice(0, index + 1), mid, ...polygon.slice(index + 1)];
}

const format = (value: number) =>
  `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(value * 100)}\u202f%`;

/** Nom accessible d'un point : « Point 2 : 12,5 % depuis la gauche, 40 % depuis le haut ». */
export const defaultPointLabel = (index: number, [x, y]: PolygonPoint) =>
  `Point ${index + 1} : ${format(x)} depuis la gauche, ${format(y)} depuis le haut`;

/** Message d'état (annoncé) : zone incomplète ou nombre maximal atteint, sinon vide. */
export function defaultStatus(count: number, min: number, max: number) {
  if (count < min)
    return `Zone incomplète : au moins ${min} points, ${count} ${count > 1 ? 'placés' : 'placé'}.`;
  if (count >= max) return `Nombre maximal de points atteint (${max}).`;
  return '';
}

export const KEY_STEP = 0.005;
export const KEY_BIG_STEP = 0.05;
