import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/atoms/Badge";
import { Heading } from "@/components/ui/atoms/Heading";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { StarRating } from "@/components/ui/molecules/video-reviews/StarRating";
import type { ReviewerDashboardReviewFixture } from "@/lib/fixtures/reviewer-dashboard";
import { getMuxPosterUrl, getReviewPlayerPath } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type ReviewerDashboardReviewRowProps = {
  item: ReviewerDashboardReviewFixture;
  className?: string;
};

function formatViewCount(count: number): string {
  if (count >= 1000) {
    const value = count / 1000;
    const formatted = Number.isInteger(value) ? String(value) : value.toFixed(1).replace(/\.0$/, "");
    return t("app.reviewerDashboard.reviews.viewsThousands", { count: formatted });
  }

  return t("app.reviewerDashboard.reviews.viewsCount", { count });
}

function formatTimeAgo(hours: number): string {
  if (hours >= 168) {
    return t("app.reviewerDashboard.reviews.timeAgoWeeks", { count: Math.round(hours / 168) });
  }

  if (hours >= 24) {
    return t("app.reviewerDashboard.reviews.timeAgoDays", { count: Math.round(hours / 24) });
  }

  return t("app.reviewerDashboard.reviews.timeAgoHours", { count: hours });
}

export function ReviewerDashboardReviewRow({ item, className }: ReviewerDashboardReviewRowProps) {
  const { review, productNameKey, timeAgoHours, views, status } = item;
  const posterUrl = getMuxPosterUrl(review.playbackId);
  const viewCount = status === "in_review" ? 0 : views;

  const productName = productNameKey ? t(productNameKey) : review.productName;

  return (
    <li className={cn("border-b border-border py-4 last:border-b-0", className)}>
      <Link
        href={getReviewPlayerPath(review)}
        className={cn(
          "flex items-center gap-4 no-underline",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-muted">
          <Image src={posterUrl} alt="" fill className="object-cover" sizes="56px" unoptimized />
          <div
            className="absolute inset-0 flex items-center justify-center bg-background/20"
            aria-hidden
          >
            <Icon name="play-square" size="sm" className="text-foreground-on-dark" />
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <Heading as="h3" variant="title-3" className="line-clamp-2">
            {productName}
          </Heading>
          <Text as="p" variant="body-extra-small-muted" className="mt-1">
            {review.brandName}
            {t("marketing.landing.justAddedMetaSeparator")}
            {formatTimeAgo(timeAgoHours)}
          </Text>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="flex flex-col items-end gap-1">
            <StarRating rating={review.starRating} showScore={false} />
            <Text as="span" variant="body-extra-small-muted">
              {formatViewCount(viewCount)}
            </Text>
          </div>
          <Badge
            label={t(
              status === "live"
                ? "app.reviewerDashboard.reviews.status.live"
                : "app.reviewerDashboard.reviews.status.inReview",
            )}
            variant={status === "live" ? "success" : "warning"}
          />
        </div>
      </Link>
    </li>
  );
}
