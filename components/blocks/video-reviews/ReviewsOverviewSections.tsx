import { Icon } from "@/components/ui/atoms/Icon";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import { EmptyState } from "@/components/ui/composites/EmptyState";
import { VideoRatingThumbnailCard } from "@/components/ui";
import type { IconName } from "@/components/ui/icons";
import type { ReviewFixture } from "@/lib/fixtures/video-reviews";
import { cn } from "@/lib/utils";

export function ReviewsOverviewStrip({
  icon,
  reviews,
  listLabel,
  emptyTitle,
  emptyMessage,
  renderItemMeta,
}: {
  icon: IconName;
  reviews: ReviewFixture[];
  listLabel: string;
  emptyTitle: string;
  emptyMessage: string;
  renderItemMeta?: (review: ReviewFixture) => string | undefined;
}) {
  if (reviews.length === 0) {
    return (
      <EmptyState
        className="mt-4"
        icon={<Icon name={icon} size="md" aria-hidden />}
        title={emptyTitle}
        description={emptyMessage}
      />
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
  emptyTitle,
  emptyMessage,
  renderItemMeta,
}: {
  icon: IconName;
  title: string;
  description: string;
  listLabel: string;
  reviews: ReviewFixture[];
  emptyTitle: string;
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
        icon={icon}
        reviews={reviews}
        listLabel={listLabel}
        emptyTitle={emptyTitle}
        emptyMessage={emptyMessage}
        renderItemMeta={renderItemMeta}
      />
    </section>
  );
}
