import { AlertCircleIcon, CheckIcon, InfoIcon, TriangleAlertIcon } from "@/components/ui/icons";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage, Badge, Tag } from "@/components/ui";
import { t } from "@/lib/i18n";

function getAvatarGroupItems() {
  return [
    { src: "/avatar4.png", alt: t("designsystem.showcase.badgesAndTags.avatarAlt"), fallback: "EX" },
    { fallback: "DS", alt: t("designsystem.showcase.badgesAndTags.designSystemAvatarAlt") },
    { fallback: "AS", alt: t("designsystem.showcase.badgesAndTags.allisonAvatarAlt") },
    { fallback: "VP", alt: t("designsystem.showcase.badgesAndTags.v3PlatformAvatarAlt") },
  ];
}

export function BadgesShowcase() {
  const avatarGroupItems = getAvatarGroupItems();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-border bg-surface p-4 md:col-span-2">
        <h2 className="text-title-2 text-foreground-title">
          {t("designsystem.showcase.badgesAndTags.usageGuidanceTitle")}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-body-small-bold text-foreground-title">
              {t("designsystem.showcase.badgesAndTags.useBadgesForTitle")}
            </h3>
            <p className="mt-1 text-body-small text-foreground-muted">
              {t("designsystem.showcase.badgesAndTags.useBadgesForBody")}
            </p>
          </div>
          <div>
            <h3 className="text-body-small-bold text-foreground-title">
              {t("designsystem.showcase.badgesAndTags.useTagsForTitle")}
            </h3>
            <p className="mt-1 text-body-small text-foreground-muted">
              {t("designsystem.showcase.badgesAndTags.useTagsForBody")}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.badgesAndTags.avatarTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">{t("designsystem.showcase.badgesAndTags.avatarIntro")}</p>
        <div className="mt-3 flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/avatar4.png" alt={t("designsystem.showcase.badgesAndTags.avatarAlt")} />
            <AvatarFallback>EX</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12">
            <AvatarFallback>DS</AvatarFallback>
          </Avatar>
        </div>
        <div className="mt-4">
          <p className="text-body-extra-small text-foreground-muted">
            {t("designsystem.showcase.badgesAndTags.avatarGroupLabel")}
          </p>
          <div className="mt-2">
            <AvatarGroup items={avatarGroupItems} max={3} />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.badgesAndTags.badgesTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">{t("designsystem.showcase.badgesAndTags.badgesIntro")}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge label={t("designsystem.showcase.badgesAndTags.badgeDefault")} variant="default" />
          <Badge label={t("designsystem.showcase.badgesAndTags.badgeSubtle")} variant="subtle" />
          <Badge label={t("designsystem.showcase.badgesAndTags.badgeSuccess")} variant="success" />
          <Badge label={t("designsystem.showcase.badgesAndTags.badgeWarning")} variant="warning" />
          <Badge label={t("designsystem.showcase.badgesAndTags.badgeDestructive")} variant="destructive" />
          <Badge label={t("designsystem.showcase.badgesAndTags.badgeInfoDraft")} variant="info" />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge
            label={t("designsystem.showcase.badgesAndTags.badgeDefault")}
            variant="default"
            iconLeft={<CheckIcon className="h-3.5 w-3.5" />}
          />
          <Badge
            label={t("designsystem.showcase.badgesAndTags.badgeSubtle")}
            variant="subtle"
            iconLeft={<CheckIcon className="h-3.5 w-3.5" />}
          />
          <Badge
            label={t("designsystem.showcase.badgesAndTags.badgeSuccess")}
            variant="success"
            iconLeft={<CheckIcon className="h-3.5 w-3.5" />}
          />
          <Badge
            label={t("designsystem.showcase.badgesAndTags.badgeWarning")}
            variant="warning"
            iconLeft={<TriangleAlertIcon className="h-3.5 w-3.5" />}
          />
          <Badge
            label={t("designsystem.showcase.badgesAndTags.badgeDestructive")}
            variant="destructive"
            iconLeft={<AlertCircleIcon className="h-3.5 w-3.5" />}
          />
          <Badge
            label={t("designsystem.showcase.badgesAndTags.badgeInfoDraft")}
            variant="info"
            iconLeft={<InfoIcon className="h-3.5 w-3.5" />}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.badgesAndTags.tagsTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">{t("designsystem.showcase.badgesAndTags.tagsIntro")}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Tag label={t("designsystem.showcase.badgesAndTags.tagResearch")} />
          <Tag label={t("designsystem.showcase.badgesAndTags.tagCustomerQuote")} />
          <Tag label={t("designsystem.showcase.badgesAndTags.tagNeedsReview")} />
        </div>
      </div>
    </div>
  );
}
