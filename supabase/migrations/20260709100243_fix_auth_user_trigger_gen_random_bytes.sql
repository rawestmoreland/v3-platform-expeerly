-- Fix signup trigger: gen_random_bytes lives in extensions, not public.
-- search_path = public made encode(gen_random_bytes(...)) fail → Auth "Database error saving new user".

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
    encode(extensions.gen_random_bytes(12), 'hex'),
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
