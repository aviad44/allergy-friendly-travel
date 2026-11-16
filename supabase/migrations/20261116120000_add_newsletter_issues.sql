-- Newsletter stage 2: a log of every issue we send and, per issue, what
-- happened for each subscriber.
--
-- Both tables get RLS enabled AT CREATION with no policies and no grants for
-- anon/authenticated: they reference subscribers (personal data) and are only
-- ever touched by the `newsletter-send` Edge Function via the service role.
create table if not exists public.newsletter_issues (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  subject text not null,
  -- The seo_articles included in this issue. Used to make sure the same
  -- article is never sent twice.
  article_ids uuid[] not null,
  -- 'sending' = created, not every subscriber processed yet (a run that hits
  -- its time budget leaves it here and the next run resumes it).
  status text not null default 'sending' check (status in ('sending', 'sent')),
  recipients_total integer not null default 0,
  sent_count integer not null default 0,
  failed_count integer not null default 0
);
create index if not exists newsletter_issues_created_at_idx
  on public.newsletter_issues (created_at desc);

create table if not exists public.newsletter_deliveries (
  issue_id uuid not null references public.newsletter_issues (id) on delete cascade,
  subscriber_id uuid not null references public.newsletter_subscribers (id) on delete cascade,
  -- 'pending' is written BEFORE the email is handed to the provider. The
  -- primary key then guarantees a subscriber can't be sent the same issue
  -- twice, even if a run is interrupted and resumed (at-most-once delivery:
  -- a row stuck in 'pending' means "outcome unknown, deliberately not retried").
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed')),
  provider_message_id text,
  error text check (error is null or char_length(error) <= 500),
  created_at timestamptz not null default now(),
  primary key (issue_id, subscriber_id)
);
-- Foreign key coverage (and fast "has this subscriber been mailed?" lookups).
create index if not exists newsletter_deliveries_subscriber_id_idx
  on public.newsletter_deliveries (subscriber_id);

alter table public.newsletter_issues enable row level security;
alter table public.newsletter_deliveries enable row level security;

revoke all on public.newsletter_issues from anon, authenticated;
revoke all on public.newsletter_deliveries from anon, authenticated;
