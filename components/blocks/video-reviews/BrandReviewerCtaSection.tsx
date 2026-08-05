import Link from "next/link";
import { Heading } from "@/components/ui/atoms/Heading";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { primaryPinkClassName } from "@/components/ui/atoms/button/buttonClasses";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type BrandReviewerCtaSectionProps = {
  brandName: string;
};

export function BrandReviewerCtaSection({ brandName }: BrandReviewerCtaSectionProps) {
  const onboardingHref = `/sign-in?sign-up`;

  return (
    <>
      <section className="mt-10 rounded-lg border border-border bg-surface-muted p-5">
        <Heading as="h2" variant="title-1">
          {t("player.brand.ownProductTitle", { brand: brandName })}
        </Heading>
        <Text variant="body-small-muted" className="mt-2 max-w-2xl">
          {t("player.brand.ownProductDescription")}
        </Text>
        <Link
          href={onboardingHref}
          className={cn(
            primaryPinkClassName("medium"),
            "mt-4 inline-flex w-full justify-center no-underline sm:w-auto",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface-muted",
          )}
          aria-label={t("player.brand.becomeReviewerAriaLabel")}
        >
          {t("player.brand.becomeReviewer")}
        </Link>
      </section>

      <Link
        href={onboardingHref}
        className={cn(
          primaryPinkClassName("large"),
          "fixed bottom-24 right-6 z-40 h-14 w-14 rounded-full p-0 shadow-md md:bottom-8 md:right-8",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        aria-label={t("player.brand.reviewerFabAriaLabel", { brand: brandName })}
      >
        <Icon name="circle-play" size="lg" aria-hidden />
      </Link>
    </>
  );
}
