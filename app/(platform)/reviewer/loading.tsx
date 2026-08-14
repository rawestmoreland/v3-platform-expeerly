import { Skeleton } from "@/components/ui/atoms/Skeleton";

/**
 * Suspense fallback for the /reviewer segment. `ReviewerWelcomeScreen` awaits
 * getCurrentReviewerProfile() (a real Supabase round-trip) before it knows
 * whether to render the onboarding step or the dashboard, so this covers that
 * wait instead of leaving the page blank.
 */
export default function ReviewerLoading() {
  return (
    <div className="mx-auto flex w-full max-w-content flex-col gap-8">
      <div className="flex items-center gap-4">
        <Skeleton className="h-16 w-16 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Skeleton className="h-20 rounded-lg" />
        <Skeleton className="h-20 rounded-lg" />
        <Skeleton className="h-20 rounded-lg" />
      </div>

      <Skeleton className="h-32 rounded-lg" />
      <Skeleton className="h-48 rounded-lg" />
    </div>
  );
}
