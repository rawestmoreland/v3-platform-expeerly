import { HubBrandListCard } from "@/components/blocks/video-reviews/HubBrandListCard";
import { Heading } from "@/components/ui/atoms/Heading";
import type { BrandFixture } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";

export type HubAllBrandsSectionProps = {
  brands: BrandFixture[];
};

export function HubAllBrandsSection({ brands }: HubAllBrandsSectionProps) {
  const headingId = "hub-all-brands";

  return (
    <section aria-labelledby={headingId}>
      <Heading as="h2" variant="title-1" id={headingId}>
        {t("player.hub.allBrandsHeading")}
      </Heading>

      <ul
        className="mt-4 grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        aria-label={t("player.hub.allBrandsAriaLabel")}
      >
        {brands.map((brand) => (
          <HubBrandListCard key={brand.slug} brand={brand} />
        ))}
      </ul>
    </section>
  );
}
