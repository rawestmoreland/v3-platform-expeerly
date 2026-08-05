import Link from "next/link";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import { primaryPinkClassName } from "@/components/ui/atoms/button/buttonClasses";
import { Card } from "@/components/ui/composites/Card";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type ReviewStickyBuyBarProps = {
  brandName: string;
  productName: string;
};

export function ReviewStickyBuyBar({ brandName, productName }: ReviewStickyBuyBarProps) {
  const onboardingHref = `/sign-in?sign-up`;

  return (
    <Card className="mt-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <Heading as="h2" variant="title-4">
            {t("player.review.stickyOwnProductQuestion")}
          </Heading>
          <Text as="p" variant="body-small-muted" className="mt-1">
            {t("player.review.stickyOwnProductDescription", { product: productName })}
          </Text>
        </div>
        <Link
          href={onboardingHref}
          className={cn(
            primaryPinkClassName("medium"),
            "w-full shrink-0 justify-center no-underline sm:w-auto",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          )}
          aria-label={t("marketing.landing.reviewItAriaLabel", { product: productName })}
        >
          {t("marketing.landing.reviewIt")}
        </Link>
      </div>
    </Card>
  );
}
