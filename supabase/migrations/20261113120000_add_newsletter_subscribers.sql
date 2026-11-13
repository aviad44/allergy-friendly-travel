-- Newsletter subscribers (double opt-in).
--
-- RLS is enabled AT CREATION with deliberately NO policies: anon/authenticated
-- have no access at all, and every read/write goes through the `newsletter`
-- Edge Function using the service role (which bypasses RLS). This table holds
-- personal data (email addresses), so it must never be readable through the
-- public API — see the tripadvisor_cache incident in CLAUDE.md.
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  -- Always stored lowercased + trimmed by the Edge Function; the check
  -- constraint enforces it so the unique index below can't be bypassed.
  email text not null
    check (email = lower(btrim(email)) and char_length(email) between 3 and 254),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'unsubscribed')),
  -- Which signup form produced this row (e.g. 'footer', 'article'), so we
  -- can tell which placements actually bring subscribers in.
  source text check (source is null or char_length(source) <= 64),
  -- Single-use-ish secrets embedded in email links. Separate tokens so a
  -- leaked unsubscribe link can't be used to (re)confirm and vice versa.
  confirm_token uuid not null default gen_random_uuid(),
  unsubscribe_token uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now(),
  -- When the latest confirmation email went out; drives the resend
  -- cooldown, the confirm-link expiry and the global hourly send cap.
  confirmation_sent_at timestamptz,
  -- Evidence of the opt-in click (the consent record).
  confirmed_at timestamptz,
  unsubscribed_at timestamptz
);

create unique index if not exists newsletter_subscribers_email_key
  on public.newsletter_subscribers (email);
create unique index if not exists newsletter_subscribers_confirm_token_key
  on public.newsletter_subscribers (confirm_token);
create unique index if not exists newsletter_subscribers_unsubscribe_token_key
  on public.newsletter_subscribers (unsubscribe_token);
-- Supports the "confirmation emails sent in the last hour" global cap.
create index if not exists newsletter_subscribers_confirmation_sent_at_idx
  on public.newsletter_subscribers (confirmation_sent_at);

alter table public.newsletter_subscribers enable row level security;

-- Belt and braces on top of "RLS with no policies": also drop the default
-- table grants so the PostgREST roles can't even attempt access.
revoke all on public.newsletter_subscribers from anon, authenticated;
