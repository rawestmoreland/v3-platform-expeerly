"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type CompleteCampaignOnboardingInput = {
  displayName: string;
  city: string;
  socialLinkedin?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  socialTiktok?: string;
  spokenLanguageCodes?: string[];
  interestUniqueCategoryIds?: string[];
};

export type CompleteCampaignOnboardingResult =
  | { ok: true }
  | { ok: false; error: "unauthorized" | "invalid" | "update_failed" };

export async function completeCampaignOnboarding(
  input: CompleteCampaignOnboardingInput,
): Promise<CompleteCampaignOnboardingResult> {
  const displayName = input.displayName.trim();
  const city = input.city.trim();
  if (!displayName || !city) {
    return { ok: false, error: "invalid" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "unauthorized" };
  }

  const nameParts = displayName.split(/\s+/);
  const firstName = nameParts[0] ?? displayName;
  const lastName = nameParts.slice(1).join(" ") || null;

  const { error } = await supabase
    .from("users_analytics_v2")
    .update({
      first_name: firstName,
      last_name: lastName,
      reviewer_status: "profile_approved",
      // city is not a column yet — stored in spoken note via metadata later; keep profile fields only
      social_linkedin: input.socialLinkedin?.trim() || null,
      social_instagram: input.socialInstagram?.trim() || null,
      social_facebook: input.socialFacebook?.trim() || null,
      social_tiktok: input.socialTiktok?.trim() || null,
      spoken_language_codes: input.spokenLanguageCodes ?? [],
      interest_unique_category_ids: input.interestUniqueCategoryIds ?? [],
    })
    .eq("auth_user_id", user.id);

  if (error) {
    return { ok: false, error: "update_failed" };
  }

  // Persist city in user metadata until addresses table exists.
  await supabase.auth.updateUser({
    data: { city, display_name: displayName },
  });

  revalidatePath("/reviewer");
  revalidatePath("/reviewer/campaigns");
  return { ok: true };
}
