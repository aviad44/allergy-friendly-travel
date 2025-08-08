export function buildCanonical(input: string): string {
  try {
    const url = new URL(input);

    // Lowercase host and path
    url.hostname = url.hostname.toLowerCase();
    url.pathname = url.pathname.toLowerCase();

    // Strip known tracking params
    const paramsToRemove = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'gclid',
      'fbclid',
      'ref',
      'ref_src',
    ];

    paramsToRemove.forEach((p) => url.searchParams.delete(p));

    // Enforce trailing slash policy: only root has trailing slash
    if (url.pathname !== '/' && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.replace(/\/$/, '');
    }

    // Return without hash
    url.hash = '';
    return url.toString();
  } catch {
    // Fallback: attempt basic normalization
    if (!input) return '';
    const cleaned = input.split('#')[0].split('?')[0];
    return cleaned.endsWith('/') && cleaned !== '/' ? cleaned.slice(0, -1) : cleaned;
  }
}
