import { Icon } from "@/components/ui/atoms/Icon";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import { VideoRatingThumbnailCard } from "@/components/ui";
import type { IconName } from "@/components/ui/icons";
import type { ReviewFixture } from "@/lib/fixtures/video-reviews";
import { cn } from "@/lib/utils";

export function ReviewsOverviewStrip({
  reviews,
  listLabel,
  emptyMessage,
  renderItemMeta,
}: {
  reviews: ReviewFixture[];
  listLabel: string;
  emptyMessage: string;
  renderItemMeta?: (review: ReviewFixture) => string | undefined;
}) {
  if (reviews.length === 0) {
    return (
      <Text variant="body-small-muted" className="mt-4">
        {emptyMessage}
      </Text>
    );
  }

  return (
    <ul
      className="mt-5 flex gap-3 overflow-x-auto pb-2 md:gap-4"
      aria-label={listLabel}
    >
      {reviews.map((review) => {
        const meta = renderItemMeta?.(review);

        return (
          <li key={review.publicReviewId} className="flex shrink-0 flex-col gap-2">
            <VideoRatingThumbnailCard review={review} />
            {meta ? (
              <Text variant="body-small-muted" className="max-w-40 text-center">
                {meta}
              </Text>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

export function ReviewsOverviewSection({
  icon,
  title,
  description,
  listLabel,
  reviews,
  emptyMessage,
  renderItemMeta,
}: {
  icon: IconName;
  title: string;
  description: string;
  listLabel: string;
  reviews: ReviewFixture[];
  emptyMessage: string;
  renderItemMeta?: (review: ReviewFixture) => string | undefined;
}) {
  return (
    <section className="text-left">
      <div className="flex gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-secondary",
          )}
          aria-hidden
        >
          <Icon name={icon} size="lg" />
        </div>
        <div className="min-w-0 flex-1">
          <Heading as="h2" variant="heading-3">
            {title}
          </Heading>
          <Text variant="body-small-muted" className="mt-1">
            {description}
          </Text>
        </div>
      </div>
      <ReviewsOverviewStrip
        reviews={reviews}
        listLabel={listLabel}
        emptyMessage={emptyMessage}
        renderItemMeta={renderItemMeta}
      />
    </section>
  );
}
