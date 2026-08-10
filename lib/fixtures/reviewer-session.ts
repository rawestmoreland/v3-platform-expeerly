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

const EMPTY_SUBMISSIONS: CommunitySubmissionDraft[] = [];

let cachedRaw: string | null = null;
let cachedSubmissions: CommunitySubmissionDraft[] = EMPTY_SUBMISSIONS;

/**
 * useSyncExternalStore snapshot — returns a cached, referentially stable array
 * unless sessionStorage actually changed, so it's safe to call on every render.
 */
export function getCommunitySubmissions(): CommunitySubmissionDraft[] {
  if (typeof window === "undefined") return EMPTY_SUBMISSIONS;

  let raw: string | null;
  try {
    raw = window.sessionStorage.getItem(SUBMISSIONS_KEY);
  } catch {
    raw = null;
  }

  if (raw === cachedRaw) return cachedSubmissions;

  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as CommunitySubmissionDraft[]) : EMPTY_SUBMISSIONS;
    cachedSubmissions = Array.isArray(parsed) ? parsed : EMPTY_SUBMISSIONS;
  } catch {
    cachedSubmissions = EMPTY_SUBMISSIONS;
  }
  return cachedSubmissions;
}

export function getServerCommunitySubmissions(): CommunitySubmissionDraft[] {
  return EMPTY_SUBMISSIONS;
}

/** No live cross-tab push for sessionStorage within the same tab; the `storage` event only fires in other tabs, which is still useful to pick up. */
export function subscribeCommunitySubmissions(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
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
  cachedRaw = null;
  return next;
}
