import 'server-only';

import { createClient } from '@/lib/supabase/server';
import {
  isProfileApproved,
  needsCampaignOnboarding,
  type UsersAnalyticsV2,
} from '@/lib/supabase/types';
import type { User } from '@supabase/supabase-js';

export type CurrentReviewerProfile = UsersAnalyticsV2 & {
  authUser: User;
  isApproved: boolean;
  needsOnboarding: boolean;
};

export async function getSessionUser(): Promise<User | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentReviewerProfile(): Promise<CurrentReviewerProfile | null> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return null;
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
      .from('users_analytics_v2')
      .select(
        'id, bubble_id, auth_user_id, auth_method, first_name, last_name, age, email, email_verification_status, avatar_url, phone_number, social_linkedin, social_instagram, social_facebook, social_tiktok, interest_unique_category_ids, spoken_language_codes, role, reviewer_status, company_id, company_analytics_id, created_at, updated_at',
      )
      .eq('auth_user_id', user.id)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    const profile = data as UsersAnalyticsV2;

    const verified = Boolean(user.email_confirmed_at);
    if (verified && profile.email_verification_status !== 'verified') {
      await supabase
        .from('users_analytics_v2')
        .update({ email_verification_status: 'verified' })
        .eq('auth_user_id', user.id);
      profile.email_verification_status = 'verified';
    }

    return {
      ...profile,
      authUser: user,
      isApproved: isProfileApproved(profile.reviewer_status),
      needsOnboarding: needsCampaignOnboarding(profile.reviewer_status),
    };
  } catch {
    return null;
  }
}
