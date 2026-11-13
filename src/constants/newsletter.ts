/**
 * Master switch for every public newsletter signup form on the site.
 *
 * Keep this `false` until the `newsletter` Edge Function is deployed AND the
 * sender is ready: a verified Resend domain plus the `NEWSLETTER_FROM`
 * secret (and `RESEND_API_KEY`). Without them the function deliberately
 * refuses signups (fails closed), so showing the form would just show
 * visitors an error. The /newsletter/confirm/ and /newsletter/unsubscribe/
 * pages are NOT gated by this flag — links already emailed must keep working.
 */
export const NEWSLETTER_ENABLED = false;
