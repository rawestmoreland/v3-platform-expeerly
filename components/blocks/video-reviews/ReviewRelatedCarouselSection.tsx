import { LandingEdgeCarousel } from "@/components/blocks/marketing/LandingEdgeCarousel";
import { CarouselItem, SectionHeader, VideoRatingThumbnailCard } from "@/components/ui";
import type { ReviewFixture } from "@/lib/fixtures/video-reviews";

export type ReviewRelatedCarouselSectionProps = {
  heading: string;
  reviews: ReviewFixture[];
  className?: string;
};

export function ReviewRelatedCarouselSection({
  heading,
  reviews,
  className,
}: ReviewRelatedCarouselSectionProps) {
  if (reviews.length === 0) {
    return null;
  }

  const headingId = `review-carousel-${heading.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section aria-labelledby={headingId} className={className}>
      <SectionHeader title={heading} headingId={headingId} />
      <LandingEdgeCarousel
        id={`${headingId}-track`}
        ariaLabel={heading}
        className="mt-4"
      >
        {reviews.map((item) => (
          <CarouselItem key={item.publicReviewId} size="shrink" role="listitem">
            <VideoRatingThumbnailCard review={item} />
          </CarouselItem>
        ))}
      </LandingEdgeCarousel>
    </section>
  );
}
