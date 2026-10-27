export const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(' ');

/** Taille de fichier lisible : 820 ko, 1,4 Mo. */
export const formatFileSize = (bytes: number) => {
  const format = (n: number) =>
    new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 1 }).format(n);
  return bytes < 1024 * 1024
    ? `${format(Math.max(1, bytes / 1024))} ko`
    : `${format(bytes / 1024 / 1024)} Mo`;
};
