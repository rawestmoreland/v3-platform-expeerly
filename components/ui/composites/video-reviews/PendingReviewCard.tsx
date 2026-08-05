import Image from "next/image";
import Link from "next/link";
import { Text } from "@/components/ui/atoms/Text";
import { primaryPinkClassName } from "@/components/ui/atoms/button/buttonClasses";
import { Card } from "@/components/ui/composites/Card";
import type { ReviewOpportunityFixture } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type PendingReviewCardProps = {
  opportunity: ReviewOpportunityFixture;
  className?: string;
  reviewHref?: string;
  hideBrandName?: boolean;
};

export function PendingReviewCard({
  opportunity,
  className,
  reviewHref,
  hideBrandName = false,
}: PendingReviewCardProps) {
  const href = reviewHref ?? `/video-reviews/brand/${opportunity.brandSlug}`;

  return (
    <Card padding="small" className={cn("flex w-44 shrink-0 flex-col gap-3", className)}>
      <div className="relative h-24 overflow-hidden rounded-lg bg-surface-muted p-2">
        <Image
          src={opportunity.imageSrc}
          alt=""
          fill
          className="object-contain"
          sizes="176px"
        />
      </div>
      <div className="min-w-0">
        {hideBrandName ? null : (
          <Text as="p" variant="body-extra-small-muted">
            {opportunity.brandName}
          </Text>
        )}
        <Text
          as="p"
          variant="body-small"
          className={cn(
            "text-body-small-bold line-clamp-2 text-foreground-title",
            !hideBrandName && "mt-0.5",
          )}
        >
          {opportunity.productName}
        </Text>
      </div>
      <Link
        href={href}
        className={cn(
          primaryPinkClassName("small"),
          "w-full justify-center no-underline",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        aria-label={t("marketing.landing.reviewItAriaLabel", { product: opportunity.productName })}
      >
        {t("marketing.landing.reviewIt")}
      </Link>
    </Card>
  );
}
