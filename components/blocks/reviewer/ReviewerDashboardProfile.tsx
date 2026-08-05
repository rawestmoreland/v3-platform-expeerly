import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/atoms/Avatar";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import type { ReviewerDashboardProfileFixture } from "@/lib/fixtures/reviewer-dashboard";
import { t } from "@/lib/i18n";

export type ReviewerDashboardProfileProps = {
  profile: ReviewerDashboardProfileFixture;
};

export function ReviewerDashboardProfile({ profile }: ReviewerDashboardProfileProps) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16" reviewerRing>
        {profile.avatarSrc ? <AvatarImage src={profile.avatarSrc} alt="" /> : null}
        <AvatarFallback className="text-body-regular-bold">{profile.initials}</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <Heading as="h1" variant="heading-2">
          {t("app.reviewerDashboard.profile.greeting", { name: profile.displayName })}
        </Heading>
        <Text as="p" variant="body-small-muted" className="mt-1">
          {t(profile.roleLocationKey)}
        </Text>
      </div>
    </div>
  );
}
