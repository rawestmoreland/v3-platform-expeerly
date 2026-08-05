import { EdgeCarousel, PendingReviewCard, CarouselItem, SectionHeader } from "@/components/ui";
import type { ReviewOpportunityFixture } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";

export type BrandProductNeedingReview = ReviewOpportunityFixture & {
  reviewCount: number;
};

export type BrandProductsNeedingReviewsSectionProps = {
  brandName: string;
  products: BrandProductNeedingReview[];
};

export function BrandProductsNeedingReviewsSection({
  brandName,
  products,
}: BrandProductsNeedingReviewsSectionProps) {
  if (products.length === 0) {
    return null;
  }

  const headingId = "brand-products-needing-reviews";

  return (
    <section className="mt-10" aria-labelledby={headingId}>
      <SectionHeader title={t("player.brand.productsNeedingReviewsHeading")} headingId={headingId} />
      <EdgeCarousel
        id={headingId}
        ariaLabel={t("player.brand.productsNeedingReviewsHeading")}
        className="mt-4"
      >
        {products.map((product) => (
          <CarouselItem key={product.id} size="shrink" role="listitem">
            <PendingReviewCard
              opportunity={product}
              hideBrandName
              reviewHref="/sign-in?sign-up"
            />
          </CarouselItem>
        ))}
      </EdgeCarousel>
    </section>
  );
}
