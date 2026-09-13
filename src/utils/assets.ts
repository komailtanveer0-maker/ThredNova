/**
 * Helper to resolve static assets and public URLs reliably across all hosting environments,
 * including GitHub Pages subpaths (e.g. https://username.github.io/repository-name/).
 */
export function getAssetUrl(path: string | undefined): string {
  if (!path) return '';
  
  // Return external or inline data URLs untouched
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // If already relative to current directory
  if (path.startsWith('./')) {
    return path;
  }

  // Strip leading slash
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || './';
  const prefix = base.endsWith('/') ? base : `${base}/`;
  return `${prefix}${clean}`;
}
