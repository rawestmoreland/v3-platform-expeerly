"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Heading } from "@/components/ui/atoms/Heading";
import { Icon } from "@/components/ui/atoms/Icon";
import { IconButton } from "@/components/ui/atoms/button/IconButton";
import { Text } from "@/components/ui/atoms/Text";
import { Accordion } from "@/components/ui/composites/Accordion";
import { Card } from "@/components/ui/composites/Card";
import { StarRating } from "@/components/ui";
import type { BrandFixture, ReviewFixture, ReviewerSummaryFixture } from "@/lib/fixtures/video-reviews";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ReviewBrandSummaryCard } from "./ReviewBrandSummaryCard";
import { ReviewPlayerReviewerPanel } from "./ReviewPlayerReviewerPanel";

type ReviewTab = "details" | "transcript";

function DetailField({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: ReactNode;
  valueClassName?: string;
}) {
  return (
    <div>
      <Text variant="body-small" className="font-semibold text-foreground-title">
        {label}
      </Text>
      <div className={cn("mt-1 text-body-small text-foreground-body", valueClassName)}>{value}</div>
    </div>
  );
}

function ReviewTabButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative inline-flex h-10 shrink-0 items-center justify-center rounded-t-lg px-4 text-body-small-bold transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
        active
          ? "font-bold text-foreground-title"
          : "text-foreground-title-subtle hover:text-secondary",
      )}
    >
      <span
        className={cn(
          "relative",
          active &&
            "after:absolute after:bottom-[-10px] after:left-[-2px] after:h-[3px] after:w-[calc(100%+4px)] after:rounded-full after:bg-primary",
        )}
      >
        {label}
      </span>
    </button>
  );
}

export type ReviewPlayerDetailPanelProps = {
  review: ReviewFixture;
  brand?: BrandFixture;
  productHref: string;
  reviewerSummary?: ReviewerSummaryFixture;
  categoryLabel?: string;
  reviewedLabel: string;
  transcriptText?: string;
  faqEntries: Array<{ title: string; text: string }>;
};

export function ReviewPlayerDetailPanel({
  review,
  brand,
  productHref,
  reviewerSummary,
  categoryLabel,
  reviewedLabel,
  transcriptText,
  faqEntries,
}: ReviewPlayerDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<ReviewTab>("details");
  const brandHref = `/video-reviews/brand/${review.brandSlug}`;
  const hasTranscript = Boolean(transcriptText);

  async function handleShare() {
    const url = window.location.href;
    const shareData = {
      title: t("player.review.shareTitle", { product: review.productName }),
      url,
    };

    if (typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }

    if (typeof navigator.clipboard?.writeText === "function") {
      await navigator.clipboard.writeText(url);
    }
  }

  return (
    <div className="min-w-0 flex-1">
      <div className="shrink-0">
        <div className="flex items-baseline gap-3">
          <Heading as="h1" variant="heading-2" className="min-w-0 flex-1">
            {review.productName}
          </Heading>
          <IconButton
            type="button"
            variant="outline-neutral"
            size="medium"
            aria-label={t("player.review.shareAriaLabel")}
            icon={<Icon name="share" size="md" />}
            onClick={() => {
              void handleShare();
            }}
            className="shrink-0"
          />
        </div>

        <div className="mt-3">
          <StarRating rating={review.starRating} size="large" />
        </div>

        {reviewerSummary ? (
          <ReviewPlayerReviewerPanel
            reviewer={reviewerSummary}
            showFollow={false}
            showCategory={false}
            className="mt-5 max-w-none"
          />
        ) : null}
      </div>

      {hasTranscript ? (
        <nav aria-label={t("player.review.tabsAriaLabel")} className="mt-6 shrink-0 border-b border-border">
          <div className="flex gap-1">
            <ReviewTabButton
              label={t("player.review.detailsTab")}
              active={activeTab === "details"}
              onClick={() => setActiveTab("details")}
            />
            <ReviewTabButton
              label={t("player.review.transcriptTab")}
              active={activeTab === "transcript"}
              onClick={() => setActiveTab("transcript")}
            />
          </div>
        </nav>
      ) : null}

      <div className="pt-6">
        {activeTab === "details" || !hasTranscript ? (
          <>
            <section>
              <Heading as="h2" variant="title-4" className="mb-4">
                {t("player.review.productDetails")}
              </Heading>
              <div className="grid grid-cols-2 gap-4">
                <DetailField
                  label={t("player.review.brandName")}
                  value={
                    <Link href={brandHref} className="text-secondary no-underline hover:underline">
                      {review.brandName}
                    </Link>
                  }
                />
                <DetailField
                  label={t("player.review.productName")}
                  value={
                    <Link href={productHref} className="text-secondary no-underline hover:underline">
                      {review.productName}
                    </Link>
                  }
                />
                {categoryLabel ? (
                  <DetailField label={t("player.review.category")} value={categoryLabel} />
                ) : null}
                <DetailField
                  label={t("player.review.gtinEan")}
                  value={review.product?.gtinEan ?? t("player.review.notAvailable")}
                />
                <DetailField
                  label={t("player.review.vendorProductNumber")}
                  value={review.product?.vendorProductNumber ?? t("player.review.notAvailable")}
                />
                <DetailField label={t("player.review.reviewed")} value={reviewedLabel} />
              </div>
            </section>

            {faqEntries.length > 0 ? (
              <section className="mt-8">
                <Heading as="h2" variant="title-bold" className="mb-4">
                  {t("player.review.faqHeading")}
                </Heading>
                <Accordion
                  size="small"
                  items={faqEntries.map((faq, index) => ({
                    id: `faq-${index}`,
                    title: faq.title,
                    content: faq.text,
                  }))}
                />
              </section>
            ) : null}

            {brand ? <ReviewBrandSummaryCard brand={brand} /> : null}
          </>
        ) : null}

        {activeTab === "transcript" && hasTranscript ? (
          <section aria-label={t("player.review.transcriptTab")}>
            <Card padding="small" surface="muted">
              <Text as="p" variant="body-regular" className="whitespace-pre-wrap text-foreground-body">
                {transcriptText}
              </Text>
            </Card>
          </section>
        ) : null}
      </div>
    </div>
  );
}
