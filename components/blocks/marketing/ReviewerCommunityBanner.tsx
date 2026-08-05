import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/atoms/Heading";
import { outlineWhiteLinkClassName } from "@/components/ui/atoms/button/buttonClasses";
import { Text } from "@/components/ui/atoms/Text";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type ReviewerCommunityBannerProps = {
  className?: string;
};

export function ReviewerCommunityBanner({ className }: ReviewerCommunityBannerProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-lg bg-secondary px-5 py-5 md:flex-row md:items-start md:gap-6 md:px-8 md:py-6",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-3 md:flex-1 md:flex-row md:items-start md:gap-4">
        <Image
          src="/marketing/reviewer-community-avatars.png"
          alt={t("marketing.landing.communityBannerAvatarsAlt")}
          width={112}
          height={113}
          className="h-[113px] w-[112px] shrink-0 object-contain"
        />

        <div className="min-w-0 flex-1">
          <Heading as="h2" variant="title-2" className="text-foreground-on-dark">
            {t("marketing.landing.communityBanner")}
          </Heading>
          <Text as="p" variant="body-regular" className="mt-0.5 text-foreground-on-dark/80">
            {t("marketing.landing.communityBannerSub")}
          </Text>
        </div>
      </div>

      <Link
        href="/sign-in?sign-up"
        className={cn(
          outlineWhiteLinkClassName("medium"),
          "w-fit shrink-0 justify-center",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
        )}
        aria-label={t("marketing.landing.joinCommunityAriaLabel")}
      >
        {t("marketing.landing.joinCommunity")}
      </Link>
    </div>
  );
}
