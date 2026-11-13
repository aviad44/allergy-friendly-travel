// Newsletter signup with double opt-in.
//
// One public endpoint, three actions (POST JSON body {action, ...}):
//   subscribe   {email, source?, website?}  -> stores a *pending* row and emails
//                                              a confirmation link
//   confirm     {token}                     -> pending -> confirmed (the consent record)
//   unsubscribe {token}                     -> any -> unsubscribed
//
// The confirm/unsubscribe links in emails point at SPA pages
// (/newsletter/confirm/, /newsletter/unsubscribe/) that POST here when the
// visitor clicks a button. They are deliberately NOT one-click GET endpoints:
// corporate mail scanners prefetch every link in an email, which would
// auto-confirm (or auto-unsubscribe) people who never clicked anything.
//
// Safety properties (this is a public, unauthenticated endpoint that makes us
// send email to arbitrary addresses, so it is a mail-bombing / spam-relay
// target unless constrained):
//   - Fails CLOSED: no NEWSLETTER_FROM sender configured => 503, nothing stored.
//   - Never reveals whether an address is already subscribed (identical
//     {ok:true} for new / pending / confirmed / unsubscribed).
//   - Per-address resend cooldown + a GLOBAL cap on confirmation emails per
//     hour, so the endpoint can't be used to flood a victim or burn the
//     Resend quota. If the cap can't be checked, the signup is refused.
//   - Honeypot field for naive bots.
//   - Email addresses are never written to logs.
//   - Table has RLS enabled with no policies; only this function (service
//     role) can touch it.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const SITE_URL = "https://www.allergy-free-travel.com";

/** A visitor who already got a confirmation email can't trigger another one for this long. */
const RESEND_COOLDOWN_MS = 60 * 60 * 1000;
/** A confirmation link stops working this long after it was emailed. */
const CONFIRM_LINK_TTL_MS = 7 * 24 * 60 * 60 * 1000;
/**
 * Global ceiling on confirmation emails per rolling hour. Our own guard, in
 * the same spirit as the Google/Tripadvisor cost ceilings: a bot hammering the
 * form hits this long before it can hurt the sender reputation or the Resend
 * quota. Raising it is a deliberate decision, not a tweak.
 */
const MAX_CONFIRMATION_EMAILS_PER_HOUR = 30;

const EMAIL_RE = /^[^\s@<>"',;:()\[\]\\]+@[^\s@<>"',;:()\[\]\\]+\.[^\s@<>"',;:()\[\]\\]{2,}$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SOURCE_RE = /^[a-z0-9_-]{1,64}$/;

function corsHeadersFor(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") ?? "";
  const allowed =
    origin === SITE_URL ||
    origin === "https://allergy-free-travel.com" ||
    // Netlify deploy previews: deploy-preview-N--<site>.netlify.app
    /^https:\/\/[a-z0-9-]+--[a-z0-9-]+\.netlify\.app$/.test(origin) ||
    /^http:\/\/localhost:\d+$/.test(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : SITE_URL,
    "Vary": "Origin",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function json(req: Request, body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeadersFor(req), "Content-Type": "application/json" },
  });
}

function confirmationEmail(confirmUrl: string) {
  const subject = "Confirm your subscription to Allergy-Free Travel";
  const text =
    `Thanks for signing up for the Allergy-Free Travel newsletter.\n\n` +
    `Please confirm your email address by opening this link:\n${confirmUrl}\n\n` +
    `The link works for 7 days. If you didn't sign up, just ignore this email — ` +
    `you won't be subscribed and we won't email you again.\n\n` +
    `Allergy-Free Travel\n${SITE_URL}/`;
  const html = `<!doctype html>
<html><body style="font-family:Arial,Helvetica,sans-serif;color:#1f2937;max-width:560px;margin:0 auto;padding:24px">
  <h2 style="color:#115e59;margin:0 0 16px">Confirm your subscription</h2>
  <p>Thanks for signing up for the Allergy-Free Travel newsletter &mdash; evidence-based hotel and restaurant guides for travelers with food allergies.</p>
  <p>Please confirm your email address:</p>
  <p style="margin:24px 0"><a href="${confirmUrl}" style="background:#0d9488;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;display:inline-block">Confirm my subscription</a></p>
  <p style="font-size:13px;color:#6b7280">Or paste this link into your browser:<br><a href="${confirmUrl}" style="color:#0d9488;word-break:break-all">${confirmUrl}</a></p>
  <p style="font-size:13px;color:#6b7280">The link works for 7 days. If you didn't sign up, just ignore this email &mdash; you won't be subscribed and we won't email you again.</p>
  <p style="font-size:13px;color:#6b7280">Allergy-Free Travel &middot; <a href="${SITE_URL}/" style="color:#0d9488">allergy-free-travel.com</a></p>
</body></html>`;
  return { subject, text, html };
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeadersFor(req) });
  }
  if (req.method !== "POST") {
    return json(req, { ok: false, code: "method_not_allowed" }, 405);
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
    if (!body || typeof body !== "object") throw new Error("not an object");
  } catch {
    return json(req, { ok: false, code: "invalid_request" }, 400);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) {
    console.error("newsletter: Supabase env missing");
    return json(req, { ok: false, code: "not_configured" }, 503);
  }
  const supabase = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const action = body.action;

  // ---------------------------------------------------------------- confirm
  if (action === "confirm") {
    const token = typeof body.token === "string" ? body.token : "";
    if (!UUID_RE.test(token)) return json(req, { ok: false, code: "invalid_token" }, 400);

    const { data: row, error } = await supabase
      .from("newsletter_subscribers")
      .select("id, status, confirmation_sent_at")
      .eq("confirm_token", token)
      .maybeSingle();
    if (error) {
      console.error("newsletter confirm lookup failed:", error.message);
      return json(req, { ok: false, code: "server_error" }, 500);
    }
    if (!row) return json(req, { ok: false, code: "invalid_token" }, 404);
    if (row.status === "confirmed") return json(req, { ok: true, already: true });
    // An old confirmation link must not resurrect someone who unsubscribed.
    if (row.status !== "pending") return json(req, { ok: false, code: "invalid_token" }, 404);

    const sentAt = row.confirmation_sent_at ? new Date(row.confirmation_sent_at).getTime() : 0;
    if (!sentAt || Date.now() - sentAt > CONFIRM_LINK_TTL_MS) {
      return json(req, { ok: false, code: "expired" }, 410);
    }

    const { error: updErr } = await supabase
      .from("newsletter_subscribers")
      .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
      .eq("id", row.id)
      .eq("status", "pending");
    if (updErr) {
      console.error("newsletter confirm update failed:", updErr.message);
      return json(req, { ok: false, code: "server_error" }, 500);
    }
    return json(req, { ok: true });
  }

  // ------------------------------------------------------------ unsubscribe
  if (action === "unsubscribe") {
    const token = typeof body.token === "string" ? body.token : "";
    if (!UUID_RE.test(token)) return json(req, { ok: false, code: "invalid_token" }, 400);

    const { data: row, error } = await supabase
      .from("newsletter_subscribers")
      .select("id, status")
      .eq("unsubscribe_token", token)
      .maybeSingle();
    if (error) {
      console.error("newsletter unsubscribe lookup failed:", error.message);
      return json(req, { ok: false, code: "server_error" }, 500);
    }
    if (!row) return json(req, { ok: false, code: "invalid_token" }, 404);
    if (row.status === "unsubscribed") return json(req, { ok: true, already: true });

    const { error: updErr } = await supabase
      .from("newsletter_subscribers")
      .update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() })
      .eq("id", row.id);
    if (updErr) {
      console.error("newsletter unsubscribe update failed:", updErr.message);
      return json(req, { ok: false, code: "server_error" }, 500);
    }
    return json(req, { ok: true });
  }

  // -------------------------------------------------------------- subscribe
  if (action === "subscribe") {
    // Honeypot: real visitors never see or fill this field. Pretend success
    // so a bot gets no signal, store nothing, send nothing.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return json(req, { ok: true });
    }

    const rawEmail = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    if (rawEmail.length < 3 || rawEmail.length > 254 || !EMAIL_RE.test(rawEmail)) {
      return json(req, { ok: false, code: "invalid_email" }, 400);
    }
    const email = rawEmail;
    const source =
      typeof body.source === "string" && SOURCE_RE.test(body.source) ? body.source : null;

    // Fail closed: without a configured sender we could not deliver the
    // confirmation, so don't collect addresses we can't confirm.
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const from = Deno.env.get("NEWSLETTER_FROM");
    if (!resendApiKey || !from) {
      console.error("newsletter: RESEND_API_KEY / NEWSLETTER_FROM not configured");
      return json(req, { ok: false, code: "not_configured" }, 503);
    }

    // Global hourly cap on confirmation emails. If we can't verify the count,
    // refuse (fail closed).
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: capErr } = await supabase
      .from("newsletter_subscribers")
      .select("id", { count: "exact", head: true })
      .gt("confirmation_sent_at", hourAgo);
    if (capErr || count === null) {
      console.error("newsletter cap check failed:", capErr?.message);
      return json(req, { ok: false, code: "try_later" }, 503);
    }
    if (count >= MAX_CONFIRMATION_EMAILS_PER_HOUR) {
      console.warn(`newsletter: hourly confirmation cap reached (${count})`);
      return json(req, { ok: false, code: "try_later" }, 429);
    }

    const { data: existing, error: selErr } = await supabase
      .from("newsletter_subscribers")
      .select("id, status, confirmation_sent_at")
      .eq("email", email)
      .maybeSingle();
    if (selErr) {
      console.error("newsletter lookup failed:", selErr.message);
      return json(req, { ok: false, code: "server_error" }, 500);
    }

    let rowId: string;
    let confirmToken: string;
    const nowIso = new Date().toISOString();

    if (!existing) {
      const { data: inserted, error: insErr } = await supabase
        .from("newsletter_subscribers")
        .insert({ email, source, status: "pending", confirmation_sent_at: nowIso })
        .select("id, confirm_token")
        .single();
      if (insErr || !inserted) {
        // 23505 = unique violation: a concurrent request created it first.
        if (insErr?.code === "23505") return json(req, { ok: true });
        console.error("newsletter insert failed:", insErr?.message);
        return json(req, { ok: false, code: "server_error" }, 500);
      }
      rowId = inserted.id;
      confirmToken = inserted.confirm_token;
    } else {
      // Already confirmed: say nothing, send nothing (no mail-bombing a
      // subscriber, and no hint to a third party that they're on the list).
      if (existing.status === "confirmed") return json(req, { ok: true });

      const lastSent = existing.confirmation_sent_at
        ? new Date(existing.confirmation_sent_at).getTime()
        : 0;
      if (lastSent && Date.now() - lastSent < RESEND_COOLDOWN_MS) {
        return json(req, { ok: true });
      }

      // pending (link expired / lost) or unsubscribed (explicitly re-signing
      // up): back to pending with a fresh confirm token. A fresh double
      // opt-in click is required either way.
      const { data: updated, error: updErr } = await supabase
        .from("newsletter_subscribers")
        .update({
          status: "pending",
          confirm_token: crypto.randomUUID(),
          confirmation_sent_at: nowIso,
          unsubscribed_at: null,
          ...(source ? { source } : {}),
        })
        .eq("id", existing.id)
        .select("id, confirm_token")
        .single();
      if (updErr || !updated) {
        console.error("newsletter re-pending failed:", updErr?.message);
        return json(req, { ok: false, code: "server_error" }, 500);
      }
      rowId = updated.id;
      confirmToken = updated.confirm_token;
    }

    const confirmUrl = `${SITE_URL}/newsletter/confirm/?token=${confirmToken}`;
    const msg = confirmationEmail(confirmUrl);
    try {
      const resend = new Resend(resendApiKey);
      const res = await resend.emails.send({
        from,
        to: [email],
        subject: msg.subject,
        html: msg.html,
        text: msg.text,
      });
      if ("error" in res && res.error) throw new Error(JSON.stringify(res.error));
    } catch (e) {
      console.error("newsletter confirmation send failed:", e instanceof Error ? e.message : e);
      // Release the cooldown/cap reservation so the visitor can retry.
      await supabase
        .from("newsletter_subscribers")
        .update({ confirmation_sent_at: null })
        .eq("id", rowId);
      return json(req, { ok: false, code: "send_failed" }, 502);
    }

    return json(req, { ok: true });
  }

  return json(req, { ok: false, code: "invalid_action" }, 400);
});
