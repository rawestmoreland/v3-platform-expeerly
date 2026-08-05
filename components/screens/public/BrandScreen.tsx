import { BrandReviewerCtaSection } from "@/components/blocks/video-reviews/BrandReviewerCtaSection";
import { BrandReviewsGrid } from "@/components/blocks/video-reviews/BrandReviewsGrid";
import { BrandScreenHeader } from "@/components/blocks/video-reviews/BrandScreenHeader";
import { Text } from "@/components/ui/atoms/Text";
import { getCategoryByEnglishSlug } from "@/lib/data/interest-categories-dev";
import { buildBrandReviewFilterOptions, getBrandReviewerAvatars } from "@/lib/fixtures/brand-reviews-grid";
import {
  getBrandBodyText,
  getBrandProductCount,
  getBrandProductGroupItems,
  type BrandFixture,
  type ReviewFixture,
} from "@/lib/fixtures/video-reviews";
import { getLocale } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n/content";

export type BrandScreenProps = {
  brand: BrandFixture;
  reviews: ReviewFixture[];
};

export function BrandScreen({ brand, reviews }: BrandScreenProps) {
  const locale = getLocale();
  const bodyText = getBrandBodyText(brand);
  const footerText = pickLocalized(brand.footerText, locale, "text");
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? reviews.reduce((sum, review) => sum + review.starRating, 0) / reviewCount
      : null;
  const productCount = getBrandProductCount(brand.slug, reviews);
  const filterOptions = buildBrandReviewFilterOptions(reviews, (categorySlug) => {
    const category = getCategoryByEnglishSlug(categorySlug);
    return pickLocalized(category?.displayName, locale, "title") ?? categorySlug;
  });
  const reviewerAvatars = getBrandReviewerAvatars(reviews);
  const productThumbnails = getBrandProductGroupItems(brand.slug, reviews);

  return (
    <div className="mx-auto w-full max-w-lg px-6 py-8 md:max-w-content md:px-16 md:py-10 lg:px-20">
      <BrandScreenHeader
        brand={brand}
        bodyText={bodyText}
        reviewCount={reviewCount}
        averageRating={averageRating}
        productCount={productCount}
        reviewerAvatars={reviewerAvatars}
        productThumbnails={productThumbnails}
      />

      <BrandReviewsGrid reviews={reviews} filterOptions={filterOptions} />

      <BrandReviewerCtaSection brandName={brand.name} />

      {footerText ? (
        <footer className="mt-12 border-t border-border pt-8">
          <Text variant="body-small-muted">{footerText}</Text>
        </footer>
      ) : null}
    </div>
  );
}
