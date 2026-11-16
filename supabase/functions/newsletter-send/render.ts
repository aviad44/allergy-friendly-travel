// Pure rendering helpers for the weekly newsletter (no Deno/network APIs, so
// they can be unit-tested in plain Node).
//
// CONTENT POLICY (CLAUDE.md): the newsletter is assembled ONLY from fields of
// real published articles — title, meta description, link, hero image. No
// hand-written or generated copy about hotels/restaurants, no quotes. The only
// static text is the generic intro/footer below.
//
// PHOTOS: Google Places Photos are licensed for on-site display with their
// attribution, not for redistribution in off-site marketing, so a hero image
// that is a Google Places photo is simply omitted from the email (see the same
// rule in social-poster/pinterest-poster).

export const SITE_URL = "https://www.allergy-free-travel.com";
export const MAX_ARTICLES_PER_ISSUE = 5;

export interface NewsletterArticle {
  id: string;
  title: string;
  slug: string | null;
  content_type: string | null;
  meta_description: string | null;
  hero_image_url: string | null;
  hero_image_credit: string | null;
}

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,150}$/;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isGooglePlacesPhotoUrl(url?: string | null): boolean {
  if (!url) return false;
  return /maps\.googleapis\.com\/maps\/api\/place\/photo/i.test(url);
}

/** https only, and never a Google Places photo. */
export function isUsableImageUrl(url?: string | null): url is string {
  if (!url) return false;
  if (isGooglePlacesPhotoUrl(url)) return false;
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

/** An article can go in the newsletter only if it has a safe slug and a title. */
export function isSendableArticle(a: NewsletterArticle): boolean {
  return !!a.slug && SLUG_RE.test(a.slug) && !!a.title && a.title.trim().length > 0;
}

/**
 * Live article URL. Trailing slash is mandatory (CLAUDE.md: the host
 * 301-redirects every non-root path to the slashed form). utm_* params are
 * stripped from canonicals by buildCanonical(), so they don't create duplicate
 * pages, and they let GA4 attribute newsletter traffic.
 */
export function articleUrl(a: NewsletterArticle, campaign: string): string {
  const base = a.content_type === "restaurant" ? "restaurants" : "destinations";
  return `${SITE_URL}/${base}/${a.slug}/?utm_source=newsletter&utm_medium=email&utm_campaign=${encodeURIComponent(campaign)}`;
}

export function buildSubject(articles: NewsletterArticle[]): string {
  const first = articles[0].title.trim();
  const title = first.length > 70 ? `${first.slice(0, 67).trimEnd()}...` : first;
  return `New allergy-friendly travel guides: ${title}`;
}

export interface RenderOptions {
  articles: NewsletterArticle[];
  /** Per-recipient unsubscribe page URL (with token). */
  unsubscribeUrl: string;
  /** Physical postal address required in the footer of commercial email. */
  postalAddress: string;
  /** e.g. "2026-11-17", used as utm_campaign. */
  campaign: string;
}

export function renderNewsletter(opts: RenderOptions): { html: string; text: string } {
  const { articles, unsubscribeUrl, postalAddress, campaign } = opts;

  const blocks = articles
    .map((a) => {
      const url = escapeHtml(articleUrl(a, campaign));
      const title = escapeHtml(a.title.trim());
      const desc = a.meta_description?.trim() ? escapeHtml(a.meta_description.trim()) : "";
      const image = isUsableImageUrl(a.hero_image_url)
        ? `<a href="${url}"><img src="${escapeHtml(a.hero_image_url)}" alt="${title}" width="552" style="display:block;width:100%;max-width:552px;height:auto;border-radius:8px;border:0"></a>` +
          (a.hero_image_credit?.trim()
            ? `<div style="font-size:11px;color:#9ca3af;margin-top:4px">${escapeHtml(a.hero_image_credit.trim())}</div>`
            : "")
        : "";
      return `<tr><td style="padding:24px 0;border-top:1px solid #e5e7eb">
        ${image}
        <h2 style="margin:16px 0 8px;font-size:20px;line-height:1.3"><a href="${url}" style="color:#115e59;text-decoration:none">${title}</a></h2>
        ${desc ? `<p style="margin:0 0 12px;font-size:15px;line-height:1.5;color:#374151">${desc}</p>` : ""}
        <a href="${url}" style="color:#0d9488;font-size:14px;font-weight:bold;text-decoration:none">Read the guide &rarr;</a>
      </td></tr>`;
    })
    .join("\n");

  const unsub = escapeHtml(unsubscribeUrl);
  const address = escapeHtml(postalAddress.trim()).replace(/\r?\n/g, "<br>");

  const html = `<!doctype html>
<html><body style="margin:0;background:#f9fafb;font-family:Arial,Helvetica,sans-serif;color:#1f2937">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb"><tr><td align="center" style="padding:24px 12px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:8px;padding:24px 24px 8px">
      <tr><td style="padding-bottom:16px">
        <div style="font-size:22px;font-weight:bold;color:#115e59">Allergy-Free Travel</div>
        <p style="margin:8px 0 0;font-size:15px;line-height:1.5;color:#374151">New hotel and restaurant guides for travelers with food allergies.</p>
      </td></tr>
      ${blocks}
      <tr><td style="padding:24px 0 16px;border-top:1px solid #e5e7eb;font-size:12px;line-height:1.6;color:#6b7280">
        You're receiving this because you subscribed at allergy-free-travel.com and confirmed your email address.<br>
        <a href="${unsub}" style="color:#0d9488">Unsubscribe</a> &middot; <a href="${SITE_URL}/" style="color:#0d9488">allergy-free-travel.com</a><br><br>
        ${address}
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  const textBlocks = articles
    .map((a) => {
      const desc = a.meta_description?.trim() ? `\n${a.meta_description.trim()}` : "";
      return `${a.title.trim()}${desc}\n${articleUrl(a, campaign)}`;
    })
    .join("\n\n");
  const text =
    `Allergy-Free Travel\nNew hotel and restaurant guides for travelers with food allergies.\n\n` +
    `${textBlocks}\n\n--\n` +
    `You're receiving this because you subscribed at allergy-free-travel.com and confirmed your email address.\n` +
    `Unsubscribe: ${unsubscribeUrl}\n\n${postalAddress.trim()}\n`;

  return { html, text };
}
