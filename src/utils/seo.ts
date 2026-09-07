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

    // Enforce trailing slash policy: every path gets one (root already has
    // it). This matches what the static host actually serves: the build's
    // prerender step writes dist/<route>/index.html for every route, and
    // the host 301-redirects a no-slash request to the trailing-slash form
    // — verified live across the site (/about, /destinations/toronto, every
    // destination/restaurant guide). A canonical tag that itself points to
    // a URL which immediately redirects is a real, confirmed cause of pages
    // showing up excluded in Search Console. Previously this stripped the
    // trailing slash instead — the opposite of what the host does.
    if (!url.pathname.endsWith('/')) {
      url.pathname = `${url.pathname}/`;
    }

    // Return without hash
    url.hash = '';
    return url.toString();
  } catch {
    // Fallback: attempt basic normalization
    if (!input) return '';
    const cleaned = input.split('#')[0].split('?')[0];
    return cleaned.endsWith('/') ? cleaned : `${cleaned}/`;
  }
}
