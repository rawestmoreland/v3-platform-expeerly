import { ReviewsOverviewSection } from "@/components/blocks/video-reviews/ReviewsOverviewSections";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import {
  getCompaniesCampaignReviews,
  getCompaniesCommunityReviews,
} from "@/lib/fixtures/companies-all-reviews";
import { t } from "@/lib/i18n";

export function CompaniesAllReviewsScreen() {
  const communityReviews = getCompaniesCommunityReviews();
  const campaignReviews = getCompaniesCampaignReviews();
  const emptyTitle = t("app.companiesAllReviews.emptySectionTitle");
  const emptyMessage = t("app.companiesAllReviews.emptySection");

  const campaignMetaByReviewId = new Map(
    campaignReviews.map((entry) => [entry.review.publicReviewId, entry.campaignLabelKey]),
  );

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="text-center md:text-left">
        <Heading as="h1" variant="heading-2">
          {t("app.companiesAllReviews.title")}
        </Heading>
        <Text variant="body-regular" className="mt-3 max-w-2xl">
          {t("app.companiesAllReviews.description")}
        </Text>
      </div>

      <ReviewsOverviewSection
        icon="user"
        title={t("app.companiesAllReviews.community.title")}
        description={t("app.companiesAllReviews.community.description")}
        listLabel={t("app.companiesAllReviews.community.listAriaLabel")}
        reviews={communityReviews}
        emptyTitle={emptyTitle}
        emptyMessage={emptyMessage}
      />

      <ReviewsOverviewSection
        icon="megaphone"
        title={t("app.companiesAllReviews.campaign.title")}
        description={t("app.companiesAllReviews.campaign.description")}
        listLabel={t("app.companiesAllReviews.campaign.listAriaLabel")}
        reviews={campaignReviews.map((entry) => entry.review)}
        emptyTitle={emptyTitle}
        emptyMessage={emptyMessage}
        renderItemMeta={(review) => {
          const labelKey = campaignMetaByReviewId.get(review.publicReviewId);
          return labelKey ? t(labelKey) : undefined;
        }}
      />
    </div>
  );
}
