"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heading } from "@/components/ui/atoms/Heading";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { Badge } from "@/components/ui/atoms/Badge";
import { Card } from "@/components/ui/composites/Card";
import { primaryPinkClassName } from "@/components/ui/atoms/button/buttonClasses";
import { StarRating } from "@/components/ui/molecules/video-reviews/StarRating";
import {
  getCommunitySubmissions,
  type CommunitySubmissionDraft,
} from "@/lib/fixtures/reviewer-session";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ReviewerCommunitySubmissionsSection() {
  const [submissions, setSubmissions] = useState<CommunitySubmissionDraft[]>([]);

  useEffect(() => {
    setSubmissions(getCommunitySubmissions());
  }, []);

  return (
    <section aria-labelledby="reviewer-community-submissions-heading">
      <div className="flex items-start gap-3">
        <Icon name="receipt" size="md" className="mt-1 shrink-0 text-foreground-title" aria-hidden />
        <div>
          <Heading as="h2" id="reviewer-community-submissions-heading" variant="title-2">
            {t("app.reviewerMyReviews.communitySubmitted.title")}
          </Heading>
          <Text variant="body-small-muted" className="mt-1 max-w-2xl">
            {t("app.reviewerMyReviews.communitySubmitted.description")}
          </Text>
        </div>
      </div>

      {submissions.length === 0 ? (
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Text variant="body-small-muted">{t("app.reviewerMyReviews.emptySection")}</Text>
          <Link
            href="/reviewer/submit-review"
            className={cn(primaryPinkClassName("small"), "inline-flex w-full justify-center sm:w-auto")}
          >
            {t("app.reviewerMyReviews.communitySubmitted.cta")}
          </Link>
        </div>
      ) : (
        <Card padding="none" className="mt-5 overflow-hidden">
          <ul aria-label={t("app.reviewerMyReviews.communitySubmitted.listAriaLabel")}>
            {submissions.map((submission, index) => (
              <li
                key={submission.id}
                className={cn(
                  "flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between",
                  index > 0 && "border-t border-border",
                )}
              >
                <div className="min-w-0">
                  <Text variant="body-small" className="text-body-small-bold text-foreground-title">
                    {submission.brandName} · {submission.productName}
                  </Text>
                  <Text variant="body-extra-small-muted" className="mt-1">
                    {t("app.reviewerMyReviews.communitySubmitted.eanMeta", {
                      ean: submission.ean,
                    })}
                  </Text>
                  <Text variant="body-extra-small-muted" className="mt-0.5">
                    {t("app.reviewerMyReviews.communitySubmitted.filesMeta", {
                      receipt: submission.receiptFileName,
                      video: submission.videoFileName,
                    })}
                  </Text>
                  {typeof submission.starRating === "number" && submission.starRating > 0 ? (
                    <div className="mt-2">
                      <StarRating rating={submission.starRating} showScore size="default" />
                    </div>
                  ) : null}
                </div>
                <Badge
                  label={t("app.reviewerMyReviews.communitySubmitted.statusInReview")}
                  variant="warning"
                />
              </li>
            ))}
          </ul>
        </Card>
      )}
    </section>
  );
}
