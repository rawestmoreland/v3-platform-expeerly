import Link from "next/link";
import { VideoThumbnail } from "@/components/ui/molecules/video-reviews/VideoThumbnail";
import { getBrandBySlug, getReviewPlayerPath, type ReviewFixture } from "@/lib/fixtures/video-reviews";
import { cn } from "@/lib/utils";

export type VideoRatingThumbnailCardProps = {
  review: ReviewFixture;
  hideBrandLogo?: boolean;
  showGiftedBadge?: boolean;
  className?: string;
  thumbnailClassName?: string;
};

export function VideoRatingThumbnailCard({
  review,
  hideBrandLogo = false,
  showGiftedBadge = false,
  className,
  thumbnailClassName,
}: VideoRatingThumbnailCardProps) {
  const brand = getBrandBySlug(review.brandSlug);
  const brandLogoSrc = brand?.logoSrc ?? review.posterUrl;

  return (
    <Link
      href={getReviewPlayerPath(review)}
      className={cn(
        "block shrink-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <VideoThumbnail
        posterUrl={review.posterUrl}
        brandLogoSrc={brandLogoSrc}
        brandName={review.brandName}
        productName={review.productName}
        starRating={review.starRating}
        showBrandLogo={!hideBrandLogo}
        showGiftedBadge={showGiftedBadge}
        className={thumbnailClassName}
      />
    </Link>
  );
}
