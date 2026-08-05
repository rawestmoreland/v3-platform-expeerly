"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/atoms/Badge";
import { Heading } from "@/components/ui/atoms/Heading";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { PrimaryPink } from "@/components/ui/atoms/button/PrimaryPink";
import { OutlineNeutral } from "@/components/ui/atoms/button/OutlineNeutral";
import { Ghost } from "@/components/ui/atoms/button/Ghost";
import { primaryPinkClassName } from "@/components/ui/atoms/button/buttonClasses";
import {
  DialogWindow,
  DialogWindowContent,
} from "@/components/ui/composites/DialogWindow";
import { InputField } from "@/components/ui/molecules/InputField";
import type { ReviewerCampaignStatus } from "@/lib/fixtures/reviewer-campaigns";
import { completeCampaignOnboarding } from "@/lib/supabase/actions";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type ReviewerCampaignListItemProps = {
  brandLogoSrc: string;
  title: string;
  metaParts: string[];
  status: ReviewerCampaignStatus;
  endingSoon?: boolean;
  needsOnboarding?: boolean;
  className?: string;
};

type ApplyPhase = "idle" | "onboarding" | "applied";

export function ReviewerCampaignListItem({
  brandLogoSrc,
  title,
  metaParts,
  status: initialStatus,
  endingSoon = false,
  needsOnboarding = true,
  className,
}: ReviewerCampaignListItemProps) {
  const [status, setStatus] = useState(initialStatus);
  const [applyPhase, setApplyPhase] = useState<ApplyPhase>("idle");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [city, setCity] = useState("");
  const [onboardingError, setOnboardingError] = useState<string | undefined>();
  const [isSaving, setIsSaving] = useState(false);
  const [requiresOnboarding, setRequiresOnboarding] = useState(needsOnboarding);

  const isClosed = status === "closed";

  const handleApplyClick = () => {
    if (!requiresOnboarding) {
      setStatus("applied");
      setApplyPhase("applied");
      setDialogOpen(true);
      return;
    }
    setApplyPhase("onboarding");
    setDialogOpen(true);
  };

  const handleOnboardingContinue = async () => {
    if (!displayName.trim() || !city.trim()) {
      setOnboardingError(t("app.reviewerCampaignApply.onboarding.required"));
      return;
    }
    setOnboardingError(undefined);
    setIsSaving(true);
    const result = await completeCampaignOnboarding({ displayName, city });
    setIsSaving(false);

    if (!result.ok) {
      setOnboardingError(t("app.reviewerCampaignApply.onboarding.required"));
      return;
    }

    setRequiresOnboarding(false);
    setStatus("applied");
    setApplyPhase("applied");
  };

  return (
    <li
      className={cn(
        "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div
        className={cn(
          "flex min-w-0 flex-1 items-start gap-3",
          isClosed && "opacity-60",
        )}
      >
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-muted p-2">
          <Image
            src={brandLogoSrc}
            alt=""
            width={48}
            height={48}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <Heading
            as="h3"
            variant="title-3"
            className={cn("line-clamp-2", isClosed && "text-foreground-muted")}
          >
            {title}
          </Heading>
          <Text as="p" variant="body-extra-small-muted" className="mt-1 flex flex-wrap items-center gap-x-2">
            {metaParts.map((part, index) => (
              <span key={`${part}-${index}`} className="inline-flex items-center gap-2">
                {index > 0 ? <span aria-hidden>·</span> : null}
                {part}
              </span>
            ))}
          </Text>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-3 self-start sm:self-center">
        {endingSoon ? (
          <Badge
            label={t("app.reviewerCampaigns.endingSoon")}
            variant="warning"
            iconLeft={<Icon name="flame" size="sm" aria-hidden />}
          />
        ) : null}
        {status === "closed" ? (
          <Badge
            label={t("app.reviewerCampaigns.status.closed")}
            variant="subtle"
            iconLeft={<Icon name="circle-off" size="sm" aria-hidden />}
          />
        ) : null}
        {status === "open" ? (
          <PrimaryPink
            type="button"
            size="small"
            aria-label={t("app.reviewerCampaigns.applyAriaLabel", { campaign: title })}
            onClick={handleApplyClick}
          >
            {t("app.reviewerCampaigns.apply")}
          </PrimaryPink>
        ) : null}
        {status === "applied" ? (
          <Badge
            label={t("app.reviewerCampaigns.status.applied")}
            variant="subtle"
            iconLeft={<Icon name="check" size="sm" aria-hidden />}
          />
        ) : null}
      </div>

      <DialogWindow open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogWindowContent
          title={
            applyPhase === "onboarding"
              ? t("app.reviewerCampaignApply.onboarding.title")
              : t("app.reviewerCampaignApply.success.title")
          }
          description={
            applyPhase === "onboarding"
              ? t("app.reviewerCampaignApply.onboarding.description", { campaign: title })
              : t("app.reviewerCampaignApply.success.description", { campaign: title })
          }
          variant={applyPhase === "applied" ? "success" : "neutral"}
          footer={
            applyPhase === "onboarding" ? (
              <>
                <Ghost type="button" size="small" onClick={() => setDialogOpen(false)}>
                  {t("app.reviewerCampaignApply.actions.cancel")}
                </Ghost>
                <PrimaryPink
                  type="button"
                  size="small"
                  loading={isSaving}
                  disabled={isSaving}
                  onClick={() => void handleOnboardingContinue()}
                >
                  {t("app.reviewerCampaignApply.actions.completeAndApply")}
                </PrimaryPink>
              </>
            ) : (
              <>
                <OutlineNeutral type="button" size="small" onClick={() => setDialogOpen(false)}>
                  {t("app.reviewerCampaignApply.actions.close")}
                </OutlineNeutral>
                <Link
                  href="/reviewer/campaigns"
                  className={cn(primaryPinkClassName("small"))}
                  onClick={() => setDialogOpen(false)}
                >
                  {t("app.reviewerCampaignApply.actions.viewCampaigns")}
                </Link>
              </>
            )
          }
        >
          {applyPhase === "onboarding" ? (
            <div className="flex flex-col gap-4">
              <InputField
                label={t("app.reviewerCampaignApply.onboarding.displayNameLabel")}
                value={displayName}
                onChange={(event) => {
                  setDisplayName(event.target.value);
                  if (onboardingError) setOnboardingError(undefined);
                }}
                state={onboardingError ? "error" : "default"}
              />
              <InputField
                label={t("app.reviewerCampaignApply.onboarding.cityLabel")}
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                  if (onboardingError) setOnboardingError(undefined);
                }}
                hint={onboardingError}
                state={onboardingError ? "error" : "default"}
              />
            </div>
          ) : null}
        </DialogWindowContent>
      </DialogWindow>
    </li>
  );
}
