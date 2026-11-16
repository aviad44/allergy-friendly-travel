// Pure rendering helpers for the weekly newsletter (no Deno/network APIs, so
// they can be unit-tested in plain Node).
//
// CONTENT POLICY (CLAUDE.md): the newsletter is assembled ONLY from fields of
// real data — article title, meta description, link, hero image, and the
// city/country of the place the article is about. No hand-written or generated
// copy about hotels/restaurants, no quotes. The only static text is the generic
// header/footer labels below.
//
// PHOTOS: only images hosted on Unsplash or Pixabay are ever put in an email
// (see isUsableImageUrl). Google Places Photos are licensed for on-site display
// with their attribution, not for redistribution in off-site marketing, and the
// other hero images are mostly the restaurants' own website photos, which we
// don't have a licence to redistribute either. An article with no usable photo
// simply renders without one (the featured card gets a solid brand-colour
// header instead).
//
// LAYOUT: email-client safe (nested tables, inline styles, no scripts/CSS
// classes/hover/position tricks). The design is the owner's reference mock-up.

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
  /** "City, Country" of the first place the article links to (real DB data). */
  location?: string | null;
}

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,150}$/;

// Palette from the owner's reference design.
const GREEN = "#0d5c46";
const GREEN_DARK = "#0f2922";
const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

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

function hostOf(url: string): string | null {
  try {
    const u = new URL(url);
    return u.protocol === "https:" ? u.hostname.toLowerCase() : null;
  } catch {
    return null;
  }
}

/** https only, on an Unsplash/Pixabay host, and never a Google Places photo. */
export function isUsableImageUrl(url?: string | null): url is string {
  if (!url || isGooglePlacesPhotoUrl(url)) return false;
  const host = hostOf(url);
  if (!host) return false;
  return host === "images.unsplash.com" || host === "pixabay.com" || host.endsWith(".pixabay.com");
}

/**
 * Unsplash serves exact crops via query params, which gives every thumbnail
 * the same aspect ratio without CSS object-fit (unsupported in Outlook). Other
 * hosts are returned unchanged.
 */
export function croppedImageUrl(url: string, width: number, height: number): string {
  if (hostOf(url) !== "images.unsplash.com") return url;
  const u = new URL(url);
  u.searchParams.set("w", String(width));
  u.searchParams.set("h", String(height));
  u.searchParams.set("fit", "crop");
  u.searchParams.set("crop", "entropy");
  if (!u.searchParams.has("q")) u.searchParams.set("q", "80");
  return u.toString();
}

/** An article can go in the newsletter only if it has a safe slug and a title. */
export function isSendableArticle(a: NewsletterArticle): boolean {
  return !!a.slug && SLUG_RE.test(a.slug) && !!a.title && a.title.trim().length > 0;
}

/**
 * Source-tracking query string appended to EVERY link in the email that points
 * at the site (articles, images, header/footer links), so GA4 attributes the
 * visit to Source "newsletter" / Medium "email" / Campaign "<issue date>".
 * (The tokenized unsubscribe page is the one exception: it's not a visit we
 * want to measure.)
 */
export function trackingParams(campaign: string): string {
  return `utm_source=newsletter&utm_medium=email&utm_campaign=${encodeURIComponent(campaign)}`;
}

/** Homepage link carrying the same tracking parameters as the article links. */
export function siteHomeUrl(campaign: string): string {
  return `${SITE_URL}/?${trackingParams(campaign)}`;
}

/** Teaser: whitespace collapsed, cut at a word boundary. */
export function shortDescription(desc: string | null | undefined, max = 140): string {
  const d = (desc ?? "").replace(/\s+/g, " ").trim();
  if (!d || d.length <= max) return d;
  const cut = d.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

/**
 * Live article URL. Trailing slash is mandatory (CLAUDE.md: the host
 * 301-redirects every non-root path to the slashed form). utm_* params are
 * stripped from canonicals by buildCanonical(), so they don't create duplicate
 * pages, and they let GA4 attribute newsletter traffic.
 */
export function articleUrl(a: NewsletterArticle, campaign: string): string {
  const base = a.content_type === "restaurant" ? "restaurants" : "destinations";
  return `${SITE_URL}/${base}/${a.slug}/?${trackingParams(campaign)}`;
}

export function buildSubject(articles: NewsletterArticle[]): string {
  const first = articles[0].title.trim();
  const title = first.length > 70 ? `${first.slice(0, 67).trimEnd()}...` : first;
  return `New allergy-friendly travel guides: ${title}`;
}

/** Header label + tagline adapt to what's actually in the issue. */
export function issueLabels(articles: NewsletterArticle[]): { badge: string; tagline: string } {
  const kinds = new Set(articles.map((a) => (a.content_type === "restaurant" ? "restaurant" : "hotel")));
  if (kinds.size === 1 && kinds.has("restaurant")) {
    return { badge: "New Restaurant Guides", tagline: "Restaurant guides for travelers with food allergies" };
  }
  if (kinds.size === 1 && kinds.has("hotel")) {
    return { badge: "New Hotel Guides", tagline: "Hotel guides for travelers with food allergies" };
  }
  return { badge: "New Guides", tagline: "Hotel and restaurant guides for travelers with food allergies" };
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

/**
 * Uniform text blocks so a mixed-length issue doesn't look ragged on a phone.
 * clampStyle(): at most `lines` lines, with an ellipsis where the client
 * supports -webkit-line-clamp (Apple Mail, iOS, most webmail), and a hard
 * max-height cut-off everywhere else. minHeight pads short text to the same
 * height so neighbouring blocks line up.
 */
function clampStyle(lines: number, fontPx: number, lineHeight: number, minHeight = false): string {
  const h = Math.ceil(fontPx * lineHeight * lines);
  return `display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:${lines};overflow:hidden;max-height:${h}px${minHeight ? `;min-height:${h}px` : ""}`;
}

/**
 * A title that always stays on ONE line and ends with "…" if it doesn't fit:
 * a fixed-layout table cell with nowrap + text-overflow (a plain block with
 * nowrap would stretch the card instead). Clients that ignore text-overflow
 * (e.g. desktop Outlook) just wrap it, which degrades gracefully.
 */
function oneLineTitle(url: string, title: string, fontPx: number, color: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="table-layout:fixed;width:100%"><tr><td style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font:bold ${fontPx}px/1.4 ${SANS};color:${color}"><a href="${url}" style="color:${color};text-decoration:none">${title}</a></td></tr></table>`;
}

function image(src: string, href: string, radius: number, border: string): string {
  return `<a href="${href}" style="text-decoration:none"><img src="${escapeHtml(src)}" alt="" width="100%" style="display:block;width:100%;height:auto;border:${border};border-radius:${radius}px"></a>`;
}

function featuredCard(a: NewsletterArticle, campaign: string): string {
  const url = escapeHtml(articleUrl(a, campaign));
  const title = escapeHtml(a.title.trim());
  const desc = shortDescription(a.meta_description, 140);
  const loc = a.location?.trim() ? escapeHtml(a.location.trim()) : "";
  const hasImage = isUsableImageUrl(a.hero_image_url);

  // Over a photo the pill is brand green; on the solid-green header block it
  // needs a lighter green or it would vanish into the background.
  const badge = `<span style="display:inline-block;background:${hasImage ? GREEN : "#1f7f62"};color:#ffffff;font:600 11px/1 ${SANS};padding:6px 12px;border-radius:99px">&#9733; Featured Guide</span>`;
  const locLine = loc
    ? `<div style="font:600 12px/1.3 ${SANS};letter-spacing:.06em;text-transform:uppercase;color:${hasImage ? GREEN : "#bfe3d6"};margin-top:12px">${loc}</div>`
    : "";
  // The featured title is large, so it may take up to two lines (one line at
  // 22px would cut most titles after ~25 characters on a phone).
  const titleLink = (color: string, size: number) =>
    `<div style="margin-top:8px;font:bold ${size}px/1.3 ${SANS};${clampStyle(2, size, 1.3)}"><a href="${url}" style="color:${color};text-decoration:none">${title}</a></div>`;

  // With a photo: image on top, then badge/location/title/teaser/button below.
  // Without one: a solid brand-colour block carries badge/location/title.
  const top = hasImage
    ? `<tr><td style="padding:0">${image(croppedImageUrl(a.hero_image_url as string, 1100, 384), url, 0, "0")}</td></tr>
       <tr><td style="padding:22px 22px 0">${badge}${locLine}${titleLink(GREEN_DARK, 20)}</td></tr>`
    : `<tr><td bgcolor="${GREEN}" style="background:${GREEN};padding:26px 22px 24px">${badge}${locLine}${titleLink("#ffffff", 22)}</td></tr>`;

  return `<tr><td style="padding:24px 24px 8px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;border-spacing:0;background:#f6faf8;border:1px solid #dce8e3;border-radius:12px;overflow:hidden">
      ${top}
      <tr><td style="padding:${hasImage ? "12px" : "18px"} 22px 22px">
        ${desc ? `<div style="font:14px/1.6 ${SANS};color:#4a5d57;${clampStyle(3, 14, 1.6)}">${escapeHtml(desc)}</div>` : ""}
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:16px"><tr>
          <td bgcolor="${GREEN}" style="background:${GREEN};border-radius:8px"><a href="${url}" style="display:inline-block;padding:10px 18px;font:600 13px/1 ${SANS};color:#ffffff;text-decoration:none">Read Full Guide &rarr;</a></td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>`;
}

function listItem(a: NewsletterArticle, campaign: string, first: boolean): string {
  const url = escapeHtml(articleUrl(a, campaign));
  const title = escapeHtml(a.title.trim());
  const desc = shortDescription(a.meta_description, 130);
  const loc = a.location?.trim() ? escapeHtml(a.location.trim()) : "";
  const img = isUsableImageUrl(a.hero_image_url)
    ? `<div style="padding-bottom:14px">${image(croppedImageUrl(a.hero_image_url as string, 1104, 320), url, 12, "1px solid #f1f5f9")}</div>`
    : "";
  return `<tr><td style="padding:20px 24px;${first ? "" : "border-top:1px solid #eef3f1"}">
    ${img}
    ${loc ? `<div style="font:600 11px/1.3 ${SANS};letter-spacing:.05em;text-transform:uppercase;color:${GREEN}">${loc}</div>` : ""}
    <div style="margin-top:4px">${oneLineTitle(url, title, 16, GREEN_DARK)}</div>
    ${desc ? `<div style="font:13px/1.6 ${SANS};color:#556963;margin-top:6px;${clampStyle(2, 13, 1.6, true)}">${escapeHtml(desc)}</div>` : ""}
    <div style="margin-top:8px"><a href="${url}" style="font:600 12px/1 ${SANS};color:${GREEN};text-decoration:none">Explore guide &rarr;</a></div>
  </td></tr>`;
}

export function renderNewsletter(opts: RenderOptions): { html: string; text: string } {
  const { articles, unsubscribeUrl, postalAddress, campaign } = opts;
  const home = escapeHtml(siteHomeUrl(campaign));
  const labels = issueLabels(articles);
  const [lead, ...rest] = articles;

  const sectionLabel = rest.length
    ? `<tr><td style="padding:16px 24px 6px">
         <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
           <td style="white-space:nowrap;padding-right:12px;font:bold 12px/1 ${SANS};letter-spacing:.06em;text-transform:uppercase;color:#6d827b">More New Destination Guides</td>
           <td width="100%" valign="middle" style="font-size:0;line-height:0;border-top:1px solid #eef3f1">&nbsp;</td>
         </tr></table>
       </td></tr>`
    : "";
  const items = rest.map((a, i) => listItem(a, campaign, i === 0)).join("\n");

  const unsub = escapeHtml(unsubscribeUrl);
  const address = escapeHtml(postalAddress.trim()).replace(/\r?\n/g, "<br>");

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Allergy-Free Travel</title></head>
<body style="margin:0;padding:0;background:#f4f7f6">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f6"><tr><td align="center" style="padding:24px 12px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;border-collapse:separate;border-spacing:0;background:#ffffff;border:1px solid #e2ebe8;border-radius:16px;overflow:hidden">
      <tr><td align="center" style="padding:32px 24px 24px;border-bottom:1px solid #eef3f1">
        <div style="font:bold 12px/1 ${SANS};letter-spacing:.12em;text-transform:uppercase;color:${GREEN}"><span style="font-size:10px">&#9679;</span>&nbsp; ${escapeHtml(labels.badge)}</div>
        <div style="margin-top:10px"><a href="${home}" style="font:bold 26px/1.2 ${SANS};color:${GREEN_DARK};text-decoration:none">Allergy-Free Travel</a></div>
        <div style="font:13px/1.5 ${SANS};color:#5c706a;margin-top:6px">${escapeHtml(labels.tagline)}</div>
      </td></tr>
      ${featuredCard(lead, campaign)}
      ${sectionLabel}
      ${items}
      <tr><td align="center" style="background:#f8fbfa;border-top:1px solid #eef3f1;padding:24px;font:12px/1.6 ${SANS};color:#748781">
        You're receiving this because you subscribed at <a href="${home}" style="color:${GREEN};font-weight:600">allergy-free-travel.com</a> and confirmed your email address.<br>
        <a href="${unsub}" style="color:#748781;text-decoration:underline">Unsubscribe</a><br><br>
        ${address}
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  const textBlocks = articles
    .map((a) => {
      const desc = shortDescription(a.meta_description, 200);
      const loc = a.location?.trim() ? `${a.location.trim()}\n` : "";
      return `${loc}${a.title.trim()}${desc ? `\n${desc}` : ""}\n${articleUrl(a, campaign)}`;
    })
    .join("\n\n");
  const text =
    `Allergy-Free Travel - ${labels.badge}\n${labels.tagline}\n\n${textBlocks}\n\n--\n` +
    `You're receiving this because you subscribed at allergy-free-travel.com and confirmed your email address.\n` +
    `Unsubscribe: ${unsubscribeUrl}\n\n${postalAddress.trim()}\n`;

  return { html, text };
}
