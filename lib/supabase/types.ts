export type UsersAnalyticsRole = "reviewer" | "company" | "super_admin";

export type ReviewerProfileStatus =
  | "approval_pending"
  | "onboarding_incomplete"
  | "profile_approved"
  | "profile_rejected"
  | "onboarding_closed_due";

export type EmailVerificationStatus = "unverified" | "pending" | "verified";

export type AuthMethod = "google" | "facebook" | "email";

/** Row shape for public.users_analytics_v2 (minimal Auth surface). */
export type UsersAnalyticsV2 = {
  id: number;
  bubble_id: string | null;
  auth_user_id: string | null;
  auth_method: AuthMethod | null;
  first_name: string | null;
  last_name: string | null;
  age: number | null;
  email: string | null;
  email_verification_status: EmailVerificationStatus;
  avatar_url: string | null;
  phone_number: string | null;
  role: UsersAnalyticsRole | null;
  reviewer_status: ReviewerProfileStatus | null;
  company_id: string | null;
  company_analytics_id: number | null;
  created_at: string;
  updated_at: string;
};

export function isProfileApproved(status: ReviewerProfileStatus | null | undefined): boolean {
  return status === "profile_approved";
}

export function needsCampaignOnboarding(
  status: ReviewerProfileStatus | null | undefined,
): boolean {
  return status !== "profile_approved";
}
