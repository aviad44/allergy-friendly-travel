export function buildCanonical(input: string): string {
  try {
    const url = new URL(input);

    // Lowercase host and path
    url.hostname = url.hostname.toLowerCase();
    url.pathname = url.pathname.toLowerCase();

    // Strip known tracking/non-canonical params. Any param not stripped
    // here produces a *different* self-referencing canonical URL (e.g.
    // "?lang=fr" was left in, so Google indexed it as a separate duplicate
    // of the base page instead of folding it in) — /search-results is the
    // one route that intentionally varies its canonical by query params
    // (destination/allergies), and it passes its own explicit canonical
    // string rather than relying on this list, so it's unaffected.
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
      'lang',
      'source',
      'via',
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
