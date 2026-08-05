import "server-only";

import { ReviewerCampaignListClient } from "@/components/blocks/reviewer/ReviewerCampaignListClient";
import { getReviewerCampaignRows } from "@/lib/fixtures/reviewer-campaigns-server";
import { getCurrentReviewerProfile } from "@/lib/supabase/auth";

export async function ReviewerCampaignList() {
  const profile = await getCurrentReviewerProfile();
  return (
    <ReviewerCampaignListClient
      campaigns={getReviewerCampaignRows()}
      needsOnboarding={profile?.needsOnboarding ?? true}
    />
  );
}
