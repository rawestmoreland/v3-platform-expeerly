import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage, Badge, OutlineNeutral } from "@/components/ui";
import { Text } from "@/components/ui/atoms/Text";
import { getReviewerHref, type ReviewerSummaryFixture } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function reviewerInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

export type ReviewPlayerReviewerPanelProps = {
  reviewer: ReviewerSummaryFixture;
  categoryLabel?: string;
  showFollow?: boolean;
  showCategory?: boolean;
  className?: string;
};

export function ReviewPlayerReviewerPanel({
  reviewer,
  categoryLabel,
  showFollow = true,
  showCategory = true,
  className,
}: ReviewPlayerReviewerPanelProps) {
  const displayName = reviewer.reviewerDisplayName;
  const reviewerHref = getReviewerHref(reviewer.reviewerName);
  const reviewCountLabel = t(
    reviewer.reviewCount === 1 ? "player.brand.reviewCountInline" : "player.brand.reviewsCountInline",
    { count: reviewer.reviewCount },
  );

  return (
    <div className={cn("flex w-full max-w-md flex-col gap-4", className)}>
      <div className="flex items-center gap-3">
        <Link
          href={reviewerHref}
          className={cn(
            "shrink-0 rounded-full no-underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          )}
          aria-label={t("player.review.reviewerProfileAriaLabel", { reviewer: displayName })}
        >
          <Avatar className="h-12 w-12" reviewerRing>
            <AvatarImage src={reviewer.reviewerAvatarUrl} alt="" />
            <AvatarFallback className="text-body-small-bold">
              {reviewerInitials(displayName)}
            </AvatarFallback>
          </Avatar>
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            href={reviewerHref}
            className={cn(
              "no-underline hover:underline",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            )}
          >
            <Text as="p" variant="body-small" className="font-bold text-foreground-title">
              {displayName}
            </Text>
          </Link>
          <Text as="p" variant="body-extra-small-muted">
            {reviewer.city
              ? `${reviewer.city}${t("marketing.landing.justAddedMetaSeparator")}${reviewCountLabel}`
              : reviewCountLabel}
          </Text>
        </div>

        {showFollow ? (
          <OutlineNeutral type="button" size="small" className="shrink-0">
            {t("player.review.follow")}
          </OutlineNeutral>
        ) : null}
      </div>

      {showCategory && categoryLabel ? (
        <div className="flex flex-wrap gap-2">
          <Badge label={categoryLabel} variant="default" />
        </div>
      ) : null}
    </div>
  );
}
