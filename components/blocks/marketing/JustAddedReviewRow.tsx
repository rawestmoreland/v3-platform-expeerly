import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/atoms/Avatar";
import { Heading } from "@/components/ui/atoms/Heading";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { StarRating } from "@/components/ui/molecules/video-reviews/StarRating";
import {
  getReviewPlayerPath,
  getReviewProductImageSrc,
  type ReviewFixture,
} from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type JustAddedReviewRowProps = {
  review: ReviewFixture;
  timeAgoLabel: string;
  className?: string;
};

function reviewerInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

export function JustAddedReviewRow({ review, timeAgoLabel, className }: JustAddedReviewRowProps) {
  const reviewerLabel = review.reviewerDisplayName ?? review.reviewerName;
  const productImageSrc = getReviewProductImageSrc(review);

  return (
    <li className={cn("border-b border-border py-4 last:border-b-0", className)}>
      <Link
        href={getReviewPlayerPath(review)}
        className={cn(
          "flex items-start gap-4 no-underline",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-muted p-2">
          {productImageSrc ? (
            <Image
              src={productImageSrc}
              alt=""
              fill
              className="object-contain"
              sizes="56px"
            />
          ) : (
            <Icon name="image" size="md" className="text-foreground-muted" aria-hidden />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <Heading as="h3" variant="title-3" className="line-clamp-2">
            {review.productName}
          </Heading>
          <div className="mt-1 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <Avatar className="h-8 w-8 shrink-0 after:border-2" reviewerRing>
                <AvatarImage src={review.reviewerAvatarUrl} alt="" />
                <AvatarFallback className="text-body-extra-small-bold">
                  {reviewerInitials(reviewerLabel)}
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 items-center gap-2">
                <Text as="span" variant="body-extra-small-muted" className="text-body-extra-small-bold shrink-0">
                  {reviewerLabel}
                </Text>
                <Text as="span" variant="body-extra-small-muted" aria-hidden>
                  {t("marketing.landing.justAddedMetaSeparator")}
                </Text>
                <Text as="span" variant="body-extra-small-muted" className="shrink-0">
                  {timeAgoLabel}
                </Text>
              </div>
            </div>
            <StarRating rating={review.starRating} showScore={false} className="shrink-0" />
          </div>
        </div>
      </Link>
    </li>
  );
}
