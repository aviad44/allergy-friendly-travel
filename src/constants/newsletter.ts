/**
 * Master switch for every public newsletter signup form on the site.
 *
 * Turned on 2026-11-16 after the `newsletter` Edge Function was deployed, the
 * sender was ready (verified Resend domain `news.allergy-free-travel.com`
 * plus the `NEWSLETTER_FROM` secret and `RESEND_API_KEY`) and the full
 * signup -> confirm -> unsubscribe flow was verified live. If the sender
 * ever breaks, set this back to `false`: the function fails closed without
 * them, so leaving the form up would just show visitors an error. The /newsletter/confirm/ and /newsletter/unsubscribe/
 * pages are NOT gated by this flag — links already emailed must keep working.
 */
export const NEWSLETTER_ENABLED = true;
