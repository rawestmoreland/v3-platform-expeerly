-- RLS policies on users_analytics_v2 (20260709095307) were never paired with
-- table-level GRANTs, so `authenticated` requests fail with 42501 "permission
-- denied for table users_analytics_v2" regardless of policy — Postgres checks
-- both. This silently broke getCurrentReviewerProfile() (lib/supabase/auth.ts)
-- for every logged-in reviewer, which in turn made the existing
-- reviewer_status onboarding gate (ReviewerCampaignList, completeCampaignOnboarding)
-- unreachable.

grant select, update on public.users_analytics_v2 to authenticated;
