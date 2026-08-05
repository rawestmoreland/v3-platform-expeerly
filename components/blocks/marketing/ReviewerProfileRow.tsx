import { Text } from "@/components/ui/atoms/Text";
import { AvatarGroup } from "@/components/ui/composites/AvatarGroup";
import { IconTextCard } from "@/components/ui/composites/IconTextCard";
import type { ReviewerSummaryFixture } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const MAX_BRANDS = 6;

export type ReviewerProfileRowProps = {
  reviewer: ReviewerSummaryFixture;
  className?: string;
};

function reviewerInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
}

export function ReviewerProfileRow({ reviewer, className }: ReviewerProfileRowProps) {
  const brands = reviewer.brands.slice(0, MAX_BRANDS);
  const brandsLabel = brands
    .map((brand) => brand.brandName)
    .join(t("marketing.landing.reviewerBrandsSeparator"));

  return (
    <li className={cn(className)}>
      <IconTextCard
        iconWell={false}
        media={
          <AvatarGroup
            items={[
              {
                src: reviewer.reviewerAvatarUrl,
                alt: reviewer.reviewerDisplayName,
                fallback: reviewerInitials(reviewer.reviewerDisplayName),
              },
            ]}
            max={1}
            sizeClassName="h-12 w-12"
            reviewerRing
            aria-label={reviewer.reviewerDisplayName}
          />
        }
        title={reviewer.reviewerDisplayName}
        titleClassName="text-secondary"
        description={
          <>
            {reviewer.city ? (
              <Text as="p" variant="body-small-muted" className="mb-2">
                {reviewer.city}
              </Text>
            ) : null}
            {reviewer.quote ? (
              <Text
                as="p"
                variant="body-small-muted"
                className={cn("line-clamp-3", !reviewer.city && "mt-0")}
              >
                {reviewer.quote}
              </Text>
            ) : null}
          </>
        }
        footer={
          brandsLabel ? (
            <Text
              as="p"
              variant="body-extra-small-muted"
              className="line-clamp-2"
              aria-label={t("marketing.landing.reviewerBrandsListAriaLabel", {
                name: reviewer.reviewerDisplayName,
              })}
            >
              {brandsLabel}
            </Text>
          ) : undefined
        }
      />
    </li>
  );
}
