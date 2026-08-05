"use client";

import { useMemo, useState } from "react";
import { ReviewerDashboardReviewRow } from "@/components/blocks/reviewer/ReviewerDashboardReviewRow";
import { Card } from "@/components/ui/composites/Card";
import { Pagination } from "@/components/ui/molecules/Pagination";
import { getReviewerDashboardReviews } from "@/lib/fixtures/reviewer-dashboard";
import { t } from "@/lib/i18n";

const PAGE_SIZE = 8;

export function ReviewerDashboardReviewList() {
  const reviews = getReviewerDashboardReviews();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE));
  const pageReviews = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return reviews.slice(start, start + PAGE_SIZE);
  }, [reviews, currentPage]);

  return (
    <div>
      <Card padding="none" className="overflow-hidden px-4">
        <ul aria-label={t("app.reviewerDashboard.reviews.listAriaLabel")}>
          {pageReviews.map((item) => (
            <ReviewerDashboardReviewRow key={item.review.publicReviewId} item={item} />
          ))}
        </ul>
      </Card>
      {totalPages > 1 ? (
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      ) : null}
    </div>
  );
}
