/** Client-only prototype storage for community review drafts (until DB persistence). */

export type CommunitySubmissionDraft = {
  id: string;
  ean: string;
  productName: string;
  brandName: string;
  brandSlug: string;
  productSlug: string;
  categorySlug: string;
  receiptFileName: string;
  videoFileName: string;
  starRating: number;
  submittedAt: string;
};

const SUBMISSIONS_KEY = "expeerly.reviewer.communitySubmissions";

export function getCommunitySubmissions(): CommunitySubmissionDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CommunitySubmissionDraft[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addCommunitySubmission(
  submission: Omit<CommunitySubmissionDraft, "id" | "submittedAt">,
): CommunitySubmissionDraft {
  const next: CommunitySubmissionDraft = {
    ...submission,
    id: `community-${Date.now()}`,
    submittedAt: new Date().toISOString(),
  };
  const existing = getCommunitySubmissions();
  window.sessionStorage.setItem(SUBMISSIONS_KEY, JSON.stringify([next, ...existing]));
  return next;
}
