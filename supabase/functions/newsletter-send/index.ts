// Weekly newsletter sender (stage 2).
//
// Called by .github/workflows/newsletter-send.yml (Tuesdays 15:00 UTC) with
// the shared cron secret, like the other scheduled functions. POST JSON body:
//   {}                                  -> mode "send" (what the schedule does)
//   {"dry_run": true}                   -> report readiness + preview, change nothing
//   {"mode":"test","to":"a@b.com"}      -> send ONE preview email to that address;
//                                          records nothing, doesn't mark articles as sent
//   {"mode":"test","to":"...","dry_run":true} -> just render/validate
//
// Content: the newest published seo_articles that no earlier issue contained
// (max 5), using only their real title / meta description / link / hero image.
// See render.ts for the content and photo policies.
//
// Safety gates (the real send fails CLOSED):
//   - CRON_SHARED_SECRET must be set AND match x-cron-secret.
//   - NEWSLETTER_LIVE_SEND must be exactly "true". Until then scheduled runs
//     answer 200 {skipped:"live_send_disabled"}; flipping the secret to
//     anything else is the instant stop switch.
//   - NEWSLETTER_POSTAL_ADDRESS must be set (commercial-email footer).
//   - Confirmed subscribers must not exceed NEWSLETTER_MAX_RECIPIENTS
//     (default 100, i.e. Resend's free-tier daily limit). Over the cap we send
//     NOTHING (no partial sends); raising it is a deliberate decision, in the
//     same spirit as the Google/Tripadvisor cost ceilings.
//   - At most one issue per MIN_DAYS_BETWEEN_ISSUES days.
//   - A newsletter_deliveries row is written BEFORE each email is handed to the
//     provider and (issue_id, subscriber_id) is the primary key, so nobody can
//     get the same issue twice even if a run is interrupted and resumed.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  MAX_ARTICLES_PER_ISSUE,
  SITE_URL,
  articleUrl,
  buildSubject,
  isSendableArticle,
  renderNewsletter,
  type NewsletterArticle,
} from "./render.ts";

const RESEND_SEND_URL = "https://api.resend.com/emails";
const RESEND_BATCH_URL = "https://api.resend.com/emails/batch";
const BATCH_SIZE = 100; // Resend's batch maximum
const BATCH_DELAY_MS = 600; // stay under Resend's default 2 requests/second
const RUN_TIME_BUDGET_MS = 110_000; // Edge Functions are cut off at 150s
const DEFAULT_MAX_RECIPIENTS = 100;
const MIN_DAYS_BETWEEN_ISSUES = 5;
const RESUME_WINDOW_MS = 24 * 60 * 60 * 1000;
const POSTAL_PLACEHOLDER = "[Postal address not configured yet - test email only]";
const EMAIL_RE = /^[^\s@<>"',;:()\[\]\\]+@[^\s@<>"',;:()\[\]\\]+\.[^\s@<>"',;:()\[\]\\]{2,}$/;
const ARTICLE_COLUMNS =
  "id, title, slug, content_type, meta_description, hero_image_url, hero_image_credit, published_at, hotel_ids, restaurant_ids";

type ArticleRow = NewsletterArticle & { hotel_ids: string[] | null; restaurant_ids: string[] | null };

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  if (x.length !== y.length) return false;
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// deno-lint-ignore no-explicit-any
type Supabase = any;

async function fetchAll<T>(
  page: (from: number, to: number) => Promise<{ data: T[] | null; error: { message: string } | null }>,
): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await page(from, from + 999);
    if (error) throw new Error(error.message);
    out.push(...(data ?? []));
    if (!data || data.length < 1000) break;
  }
  return out;
}

/**
 * Adds "City, Country" to each article from the first hotel/restaurant it
 * links to (the same convention the site uses for an article's city). A lookup
 * failure is not fatal: the email just omits the location line.
 */
async function withLocations(supabase: Supabase, rows: ArticleRow[]): Promise<NewsletterArticle[]> {
  const firstIds = (key: "restaurant_ids" | "hotel_ids") =>
    [...new Set(rows.map((r) => r[key]?.[0]).filter((x): x is string => !!x))];
  const restIds = firstIds("restaurant_ids");
  const hotelIds = firstIds("hotel_ids");
  const empty = { data: [] as { id: string; city: string | null; country: string | null }[], error: null };
  const [rest, hotels] = await Promise.all([
    restIds.length ? supabase.from("restaurants").select("id, city, country").in("id", restIds) : empty,
    hotelIds.length ? supabase.from("hotels").select("id, city, country").in("id", hotelIds) : empty,
  ]);
  const label = new Map<string, string>();
  for (const place of [...(rest.data ?? []), ...(hotels.data ?? [])]) {
    const parts = [place.city, place.country].filter((x): x is string => typeof x === "string" && x.trim() !== "");
    if (parts.length) label.set(place.id, parts.map((x) => x.trim()).join(", "));
  }
  return rows.map((r) => {
    const placeId = r.content_type === "restaurant" ? r.restaurant_ids?.[0] : r.hotel_ids?.[0];
    // deno-lint-ignore no-unused-vars
    const { hotel_ids, restaurant_ids, ...article } = r;
    return { ...article, location: placeId ? label.get(placeId) ?? null : null };
  });
}

/** Newest published articles that no earlier issue contained. */
async function pickArticles(supabase: Supabase, fallbackToNewest: boolean): Promise<NewsletterArticle[]> {
  const issues = await fetchAll<{ article_ids: string[] }>((f, t) =>
    supabase.from("newsletter_issues").select("article_ids").range(f, t)
  );
  const used = new Set(issues.flatMap((i) => i.article_ids ?? []));

  const { data, error } = await supabase
    .from("seo_articles")
    .select(ARTICLE_COLUMNS)
    .eq("status", "published")
    .not("slug", "is", null)
    .order("published_at", { ascending: false })
    .limit(80);
  if (error) throw new Error(error.message);

  const sendable = ((data ?? []) as ArticleRow[]).filter(isSendableArticle);
  const fresh = sendable.filter((a) => !used.has(a.id)).slice(0, MAX_ARTICLES_PER_ISSUE);
  const chosen = fresh.length > 0 || !fallbackToNewest ? fresh : sendable.slice(0, MAX_ARTICLES_PER_ISSUE);
  return await withLocations(supabase, chosen);
}

function oneClickUnsubscribeUrl(token: string): string {
  return `${Deno.env.get("SUPABASE_URL")}/functions/v1/newsletter?action=unsubscribe&token=${token}`;
}

serve(async (req) => {
  if (req.method !== "POST") return json({ ok: false, code: "method_not_allowed" }, 405);

  // ---- auth: fail CLOSED if the secret isn't configured.
  const cronSecret = Deno.env.get("CRON_SHARED_SECRET");
  if (!cronSecret) {
    console.error("newsletter-send: CRON_SHARED_SECRET not configured");
    return json({ ok: false, code: "not_configured" }, 503);
  }
  if (!safeEqual(req.headers.get("x-cron-secret") ?? "", cronSecret)) {
    return json({ ok: false, code: "unauthorized" }, 401);
  }

  let body: Record<string, unknown> = {};
  try {
    const parsed = await req.json();
    if (parsed && typeof parsed === "object") body = parsed as Record<string, unknown>;
  } catch {
    body = {};
  }
  const mode = body.mode === "test" ? "test" : "send";
  const dryRun = body.dry_run === true;

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return json({ ok: false, code: "not_configured" }, 503);
  const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("NEWSLETTER_FROM");
  const replyTo = Deno.env.get("NEWSLETTER_REPLY_TO") || null;
  const postalAddress = (Deno.env.get("NEWSLETTER_POSTAL_ADDRESS") ?? "").trim();
  const liveSend = Deno.env.get("NEWSLETTER_LIVE_SEND") === "true";
  const parsedCap = parseInt(Deno.env.get("NEWSLETTER_MAX_RECIPIENTS") ?? "", 10);
  const maxRecipients = Number.isFinite(parsedCap) && parsedCap > 0 ? parsedCap : DEFAULT_MAX_RECIPIENTS;
  const providerReady = !!resendApiKey && !!from;
  const campaign = new Date().toISOString().slice(0, 10);

  try {
    // =============================================================== test
    if (mode === "test") {
      const to = typeof body.to === "string" ? body.to.trim().toLowerCase() : "";
      if (!EMAIL_RE.test(to) || to.length > 254) return json({ ok: false, code: "invalid_to" }, 400);

      const articles = await pickArticles(supabase, true);
      if (articles.length === 0) return json({ ok: false, code: "no_articles" }, 409);

      const subject = `[TEST] ${buildSubject(articles)}`;
      const { html, text } = renderNewsletter({
        articles,
        unsubscribeUrl: `${SITE_URL}/newsletter/unsubscribe/`,
        postalAddress: postalAddress || POSTAL_PLACEHOLDER,
        campaign,
      });
      const preview = {
        subject,
        articles: articles.map((a) => ({ title: a.title, url: articleUrl(a, campaign) })),
        postal_address_configured: !!postalAddress,
      };
      if (dryRun) return json({ ok: true, dry_run: true, mode, ...preview });
      if (!providerReady) return json({ ok: false, code: "not_configured" }, 503);

      const res = await fetch(RESEND_SEND_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from,
          to: [to],
          subject,
          html,
          text,
          ...(replyTo ? { reply_to: replyTo } : {}),
        }),
      });
      if (!res.ok) {
        console.error("newsletter-send test failed:", res.status, (await res.text()).slice(0, 300));
        return json({ ok: false, code: "send_failed" }, 502);
      }
      return json({ ok: true, mode, sent_to_one_address: true, ...preview });
    }

    // =============================================================== send
    const now = Date.now();
    const { data: latest, error: latestErr } = await supabase
      .from("newsletter_issues")
      .select("id, created_at, status, subject, article_ids")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (latestErr) throw new Error(latestErr.message);

    const latestAge = latest ? now - new Date(latest.created_at).getTime() : Infinity;
    const resuming = !!latest && latest.status === "sending" && latestAge < RESUME_WINDOW_MS;

    let articles: NewsletterArticle[];
    if (resuming) {
      const { data, error } = await supabase
        .from("seo_articles")
        .select(ARTICLE_COLUMNS)
        .in("id", latest.article_ids);
      if (error) throw new Error(error.message);
      const byId = new Map(((data ?? []) as ArticleRow[]).map((a) => [a.id, a]));
      const ordered = (latest.article_ids as string[]).map((id) => byId.get(id)).filter(
        (a): a is ArticleRow => !!a && isSendableArticle(a),
      );
      articles = await withLocations(supabase, ordered);
    } else {
      articles = await pickArticles(supabase, false);
    }

    const { count: confirmedCount, error: countErr } = await supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .eq("status", "confirmed");
    if (countErr || confirmedCount === null) throw new Error(countErr?.message ?? "count failed");

    // Why we wouldn't send: "skip" reasons are expected and answer 200 (so the
    // weekly workflow doesn't go red); "blocking" ones are misconfiguration.
    const skip: string[] = [];
    const blocking: string[] = [];
    if (!liveSend) skip.push("live_send_disabled");
    if (!resuming && latestAge < MIN_DAYS_BETWEEN_ISSUES * 24 * 60 * 60 * 1000) skip.push("recent_issue");
    if (articles.length === 0) skip.push("no_new_articles");
    if (!providerReady) blocking.push("resend_not_configured");
    if (!postalAddress) blocking.push("postal_address_missing");
    if (confirmedCount > maxRecipients) blocking.push("over_recipient_cap");
    if (confirmedCount === 0) skip.push("no_confirmed_subscribers");

    const subject = articles.length ? buildSubject(articles) : null;
    const report = {
      mode,
      resuming,
      subject,
      articles: articles.map((a) => ({ title: a.title, url: articleUrl(a, campaign) })),
      confirmed_subscribers: confirmedCount,
      max_recipients: maxRecipients,
      skip_reasons: skip,
      blocking_problems: blocking,
    };

    if (dryRun) {
      return json({ ok: true, dry_run: true, would_send: skip.length === 0 && blocking.length === 0, ...report });
    }
    // Blocking problems only matter once we'd otherwise really send.
    if (skip.length > 0) return json({ ok: true, skipped: skip[0], ...report });
    if (blocking.length > 0) {
      console.error("newsletter-send blocked:", blocking.join(","));
      return json({ ok: false, code: blocking[0], ...report }, blocking[0] === "over_recipient_cap" ? 409 : 503);
    }

    // ---- create (or resume) the issue
    let issueId: string;
    if (resuming) {
      issueId = latest.id;
    } else {
      const { data: created, error: createErr } = await supabase
        .from("newsletter_issues")
        .insert({
          subject,
          article_ids: articles.map((a) => a.id),
          status: "sending",
          recipients_total: confirmedCount,
        })
        .select("id")
        .single();
      if (createErr || !created) throw new Error(createErr?.message ?? "issue insert failed");
      issueId = created.id;
    }

    // ---- who still needs this issue
    const [subscribers, done] = await Promise.all([
      fetchAll<{ id: string; email: string; unsubscribe_token: string }>((f, t) =>
        supabase
          .from("newsletter_subscribers")
          .select("id, email, unsubscribe_token")
          .eq("status", "confirmed")
          .order("created_at")
          .range(f, t)
      ),
      fetchAll<{ subscriber_id: string }>((f, t) =>
        supabase.from("newsletter_deliveries").select("subscriber_id").eq("issue_id", issueId).range(f, t)
      ),
    ]);
    const alreadyHandled = new Set(done.map((d) => d.subscriber_id));
    const pending = subscribers.filter((s) => !alreadyHandled.has(s.id));

    const started = Date.now();
    let timedOut = false;
    let batchError: string | null = null;
    let sentNow = 0;
    let failedNow = 0;

    for (let i = 0; i < pending.length; i += BATCH_SIZE) {
      if (Date.now() - started > RUN_TIME_BUDGET_MS) {
        timedOut = true;
        break;
      }
      const chunk = pending.slice(i, i + BATCH_SIZE);

      // Reserve first (at-most-once): only subscribers whose row we actually
      // inserted get an email.
      const { data: reserved, error: reserveErr } = await supabase
        .from("newsletter_deliveries")
        .upsert(
          chunk.map((s) => ({ issue_id: issueId, subscriber_id: s.id, status: "pending" })),
          { onConflict: "issue_id,subscriber_id", ignoreDuplicates: true },
        )
        .select("subscriber_id");
      if (reserveErr) {
        batchError = reserveErr.message;
        break;
      }
      const reservedIds = new Set((reserved ?? []).map((r: { subscriber_id: string }) => r.subscriber_id));
      const toSend = chunk.filter((s) => reservedIds.has(s.id));
      if (toSend.length === 0) continue;

      const payload = toSend.map((s) => {
        const { html, text } = renderNewsletter({
          articles,
          unsubscribeUrl: `${SITE_URL}/newsletter/unsubscribe/?token=${s.unsubscribe_token}`,
          postalAddress,
          campaign,
        });
        return {
          from,
          to: [s.email],
          subject,
          html,
          text,
          headers: {
            "List-Unsubscribe": `<${oneClickUnsubscribeUrl(s.unsubscribe_token)}>`,
            "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
          },
          ...(replyTo ? { reply_to: replyTo } : {}),
        };
      });

      let ok = false;
      let ids: (string | null)[] = [];
      let errorText = "";
      try {
        const res = await fetch(RESEND_BATCH_URL, {
          method: "POST",
          headers: { Authorization: `Bearer ${resendApiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const raw = await res.text();
        if (res.ok) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed?.data)) {
            ok = true;
            ids = parsed.data.map((d: { id?: string }) => d?.id ?? null);
          } else {
            errorText = `unexpected response: ${raw.slice(0, 200)}`;
          }
        } else {
          errorText = `HTTP ${res.status}: ${raw.slice(0, 300)}`;
        }
      } catch (e) {
        errorText = e instanceof Error ? e.message : String(e);
      }

      if (ok) {
        const { error: markErr } = await supabase.from("newsletter_deliveries").upsert(
          toSend.map((s, idx) => ({
            issue_id: issueId,
            subscriber_id: s.id,
            status: "sent",
            provider_message_id: ids[idx] ?? null,
          })),
          { onConflict: "issue_id,subscriber_id" },
        );
        if (markErr) console.error("newsletter-send: could not mark sent:", markErr.message);
        sentNow += toSend.length;
      } else {
        console.error("newsletter-send batch failed:", errorText);
        await supabase
          .from("newsletter_deliveries")
          .update({ status: "failed", error: errorText.slice(0, 500) })
          .eq("issue_id", issueId)
          .in("subscriber_id", toSend.map((s) => s.id));
        failedNow += toSend.length;
      }
      await sleep(BATCH_DELAY_MS);
    }

    // ---- close out the issue
    const countStatus = async (status: string) => {
      const { count } = await supabase
        .from("newsletter_deliveries")
        .select("subscriber_id", { count: "exact", head: true })
        .eq("issue_id", issueId)
        .eq("status", status);
      return count ?? 0;
    };
    const [sentTotal, failedTotal] = await Promise.all([countStatus("sent"), countStatus("failed")]);
    const finished = !timedOut && !batchError;
    await supabase
      .from("newsletter_issues")
      .update({
        sent_count: sentTotal,
        failed_count: failedTotal,
        ...(finished ? { status: "sent", completed_at: new Date().toISOString() } : {}),
      })
      .eq("id", issueId);

    // Non-2xx (so the scheduled workflow goes red) when the run broke or
    // nothing at all was delivered; partial failures still answer 200 and are
    // visible in failed_total / the issue row.
    const nothingDelivered = failedNow > 0 && sentNow === 0;
    return json(
      {
        ok: batchError === null && !nothingDelivered,
        issue_id: issueId,
        status: finished ? "sent" : "sending",
        sent_this_run: sentNow,
        failed_this_run: failedNow,
        sent_total: sentTotal,
        failed_total: failedTotal,
        needs_rerun: !finished,
        ...(batchError ? { error: batchError } : {}),
        ...report,
      },
      batchError ? 500 : nothingDelivered ? 502 : 200,
    );
  } catch (e) {
    console.error("newsletter-send error:", e instanceof Error ? e.message : e);
    return json({ ok: false, code: "server_error" }, 500);
  }
});
