import Image from "next/image";
import Link from "next/link";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import { VideoRatingThumbnailCard } from "@/components/ui";
import type { InterestCategoryRecord } from "@/lib/data/interest-categories-dev";
import type { ReviewFixture } from "@/lib/fixtures/video-reviews";
import { getLocale, t } from "@/lib/i18n";
import { pathnameWithLocale } from "@/lib/i18n/routing";
import { pickLocalized } from "@/lib/i18n/content";

export type CategoryScreenProps = {
  category: InterestCategoryRecord;
  reviews: ReviewFixture[];
};

export function CategoryScreen({ category, reviews }: CategoryScreenProps) {
  const locale = getLocale();
  const displayName =
    pickLocalized(category.displayName, locale, "title") ?? category.slugs.en;
  const bodyText = pickLocalized(category.bodyText, locale, "text");
  const footerText = pickLocalized(category.footerText, locale, "text");

  return (
    <div className="mx-auto w-full max-w-lg px-6 py-8 md:max-w-content md:px-16 md:py-10 lg:px-20">
      <Link
        href={pathnameWithLocale("/video-reviews/brand", locale)}
        className="text-body-small text-secondary underline-offset-4 hover:underline"
      >
        {t("player.category.backToHub")}
      </Link>

      <header className="mt-6 flex gap-4">
        {category.iconLink ? (
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-surface">
            <Image src={category.iconLink} alt="" fill className="object-contain p-1" unoptimized />
          </div>
        ) : null}
        <div className="min-w-0">
          <Heading as="h1" variant="heading-2">
            {displayName}
          </Heading>
          {bodyText ? (
            <Text variant="body-regular" className="mt-3 max-w-2xl">
              {bodyText}
            </Text>
          ) : null}
        </div>
      </header>

      {reviews.length > 0 ? (
        <section className="mt-10">
          <Heading as="h2" variant="heading-3">
            {t("player.category.reviewsHeading")}
          </Heading>
          <ul
            className="mt-5 flex gap-3 overflow-x-auto pb-2 md:gap-4"
            aria-label={t("player.category.reviewsHeading")}
          >
            {reviews.map((review) => (
              <li key={review.publicReviewId}>
                <VideoRatingThumbnailCard review={review} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {footerText ? (
        <Text variant="body-small-muted" className="mt-10 max-w-2xl">
          {footerText}
        </Text>
      ) : null}
    </div>
  );
}
