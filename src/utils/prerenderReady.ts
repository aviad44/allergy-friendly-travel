// Prerender.io's default snapshot timing (short, fixed timeout after page
// load) doesn't know to wait for a page's own async data fetch — it only
// waits indefinitely (up to its own max timeout) when the page explicitly
// sets `window.prerenderReady`. Pages that render their primary content
// from a client-side fetch (nothing meaningful in the initial DOM) should
// call markPrerenderNotReady() on mount and markPrerenderReady() once that
// fetch settles (success or failure) — otherwise bots that don't execute
// long enough may be served a near-empty page.
export function markPrerenderNotReady() {
  (window as any).prerenderReady = false;
}

export function markPrerenderReady() {
  (window as any).prerenderReady = true;
}
