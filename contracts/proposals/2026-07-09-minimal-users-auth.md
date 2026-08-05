# Proposal: minimal users + Auth link (v3)

**Status:** approved 2026-07-09 — migration written to `supabase/migrations/20260709095307_minimal_users_analytics_v2_auth.sql`; `contracts/schema.dbml` updated. Apply to the linked v3 project with `supabase db push` (or dashboard).

**Scope:** enums + `users_analytics_v2` (full column set from current DBML) + `auth_user_id` / `auth_method` + RLS + signup trigger.

**Not included:** campaigns, asset_groups, products, storage, legacy bootstrap.

---

## Proposed DBML additions (apply to `users_analytics_v2` after approval)

```dbml
  auth_user_id uuid [unique, note: 'FK → auth.users.id; set by signup trigger or seed']
  auth_method auth_method_enum [default: 'email', note: 'How the linked Auth user signed up; v1 email only']
```

Place after `bubble_id` (or before `email`). Keep existing columns unchanged.

---

## Proposed migration SQL

Filename when approved: `supabase/migrations/YYYYMMDDHHMMSS_minimal_users_analytics_v2_auth.sql`

```sql
-- Minimal v3 users surface for reviewer Auth (email/password).
-- Target: new v3 Supabase project only.

create extension if not exists "pgcrypto";

do $$ begin
  create type public.auth_method_enum as enum ('google', 'facebook', 'email');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.users_analytics_role_enum as enum ('reviewer', 'company', 'super_admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.email_verification_status_enum as enum ('unverified', 'pending', 'verified');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.reviewer_profile_status_enum as enum (
    'approval_pending',
    'onboarding_incomplete',
    'profile_approved',
    'profile_rejected',
    'onboarding_closed_due'
  );
exception when duplicate_object then null;
end $$;

create sequence if not exists public.users_analytics_v2_id_seq;

create table if not exists public.users_analytics_v2 (
  id bigint primary key default nextval('public.users_analytics_v2_id_seq'::regclass),
  bubble_id text unique,
  auth_user_id uuid unique references auth.users (id) on delete cascade,
  auth_method public.auth_method_enum default 'email',
  first_name text,
  last_name text,
  age integer,
  email text,
  email_verification_status public.email_verification_status_enum not null default 'unverified',
  avatar_url text,
  phone_number text,
  social_linkedin text,
  social_instagram text,
  social_facebook text,
  social_tiktok text,
  reviewer_rating real,
  sample_image_bucket_urls text[],
  sample_video_bucket_urls text[],
  interest_unique_category_ids text[] default '{}'::text[],
  spoken_language_codes text[] default '{}'::text[],
  stripe_connect_account_id text,
  role public.users_analytics_role_enum,
  hubspot_owner text not null default 'theresa@expeerly.com'::text,
  reviewer_status public.reviewer_profile_status_enum,
  company_id text,
  company_analytics_id bigint,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now()
);

create index if not exists users_analytics_v2_auth_user_id_idx
  on public.users_analytics_v2 (auth_user_id);

create index if not exists users_analytics_v2_email_idx
  on public.users_analytics_v2 (email);

create or replace function public.set_users_analytics_v2_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists users_analytics_v2_set_updated_at on public.users_analytics_v2;
create trigger users_analytics_v2_set_updated_at
before update on public.users_analytics_v2
for each row execute function public.set_users_analytics_v2_updated_at();

create or replace function public.handle_auth_user_created()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta_role text := coalesce(new.raw_user_meta_data ->> 'role', 'reviewer');
  app_role public.users_analytics_role_enum;
  verification public.email_verification_status_enum;
begin
  begin
    app_role := meta_role::public.users_analytics_role_enum;
  exception when others then
    app_role := 'reviewer';
  end;

  if new.email_confirmed_at is not null then
    verification := 'verified';
  else
    verification := 'pending';
  end if;

  insert into public.users_analytics_v2 (
    bubble_id,
    auth_user_id,
    auth_method,
    email,
    first_name,
    last_name,
    role,
    reviewer_status,
    email_verification_status
  ) values (
    encode(gen_random_bytes(12), 'hex'),
    new.id,
    'email',
    new.email,
    nullif(new.raw_user_meta_data ->> 'first_name', ''),
    nullif(new.raw_user_meta_data ->> 'last_name', ''),
    app_role,
    case when app_role = 'reviewer' then 'onboarding_incomplete'::public.reviewer_profile_status_enum else null end,
    verification
  )
  on conflict (auth_user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_auth_user_created();

alter table public.users_analytics_v2 enable row level security;

drop policy if exists users_analytics_v2_select_own on public.users_analytics_v2;
create policy users_analytics_v2_select_own
  on public.users_analytics_v2
  for select
  to authenticated
  using (auth.uid() = auth_user_id);

drop policy if exists users_analytics_v2_update_own on public.users_analytics_v2;
create policy users_analytics_v2_update_own
  on public.users_analytics_v2
  for update
  to authenticated
  using (auth.uid() = auth_user_id)
  with check (auth.uid() = auth_user_id);

-- No insert/delete for authenticated; profile rows come from trigger or service role.
```

---

## Approval checklist

Reply with **approve** (or request edits) to:

1. Write the migration under `supabase/migrations/`
2. Patch `contracts/schema.dbml` with `auth_user_id` + `auth_method`
3. Run against the linked v3 project (`supabase db push` / dashboard)
