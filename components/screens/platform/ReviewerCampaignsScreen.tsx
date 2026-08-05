import { LandingSectionHeader } from "@/components/blocks/marketing/LandingSectionHeader";
import { ReviewerCampaignList } from "@/components/blocks/reviewer/ReviewerCampaignList";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import { t } from "@/lib/i18n";

export function ReviewerCampaignsScreen() {
  return (
    <div className="mx-auto flex w-full max-w-content flex-col gap-8">
      <div className="text-center md:text-left">
        <Heading as="h1" variant="heading-2">
          {t("app.reviewerCampaigns.title")}
        </Heading>
        <Text variant="body-regular" className="mt-3 max-w-2xl">
          {t("app.reviewerCampaigns.description")}
        </Text>
      </div>

      <section aria-labelledby="reviewer-campaigns-list-heading">
        <LandingSectionHeader
          title={t("app.reviewerCampaigns.listHeading")}
          description={t("app.reviewerCampaigns.footerNote")}
          headingId="reviewer-campaigns-list-heading"
          className="mb-4"
        />
        <ReviewerCampaignList />
      </section>
    </div>
  );
}
