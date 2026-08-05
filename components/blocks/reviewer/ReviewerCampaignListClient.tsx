"use client";

import { useMemo, useState } from "react";
import {
  ReviewerCampaignListItem,
  type ReviewerCampaignListItemProps,
} from "@/components/blocks/reviewer/ReviewerCampaignListItem";
import { Card } from "@/components/ui/composites/Card";
import { Pagination } from "@/components/ui/molecules/Pagination";
import type { ReviewerCampaignRowData } from "@/lib/fixtures/reviewer-campaigns";
import { t } from "@/lib/i18n";

const PAGE_SIZE = 6;

export type ReviewerCampaignRow = ReviewerCampaignListItemProps & {
  id: string;
};

export type ReviewerCampaignListClientProps = {
  campaigns: ReviewerCampaignRowData[];
  needsOnboarding?: boolean;
};

export function ReviewerCampaignListClient({
  campaigns,
  needsOnboarding = true,
}: ReviewerCampaignListClientProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(campaigns.length / PAGE_SIZE));
  const pageCampaigns = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return campaigns.slice(start, start + PAGE_SIZE);
  }, [campaigns, currentPage]);

  return (
    <div>
      <Card padding="none" className="overflow-hidden">
        <ul aria-label={t("app.reviewerCampaigns.listAriaLabel")}>
          {pageCampaigns.map((campaign, index) => (
            <ReviewerCampaignListItem
              key={campaign.id}
              brandLogoSrc={campaign.brandLogoSrc}
              title={campaign.title}
              metaParts={campaign.metaParts}
              endingSoon={campaign.endingSoon}
              status={campaign.status}
              needsOnboarding={needsOnboarding}
              className={index > 0 ? "border-t border-border" : undefined}
            />
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
