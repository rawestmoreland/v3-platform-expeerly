"use client";

import {
  InPageAlert,
  OutlinePrimary,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { ToastPlayground } from "./toast-playground";
import { t } from "@/lib/i18n";

export function FeedbackShowcase() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-border bg-surface p-4 md:col-span-2">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.feedback.usageGuidanceTitle")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.feedback.useAlertsForTitle")}</h3>
            <p className="mt-1 text-body-small text-foreground-muted">
              {t("designsystem.showcase.feedback.useAlertsForBody")}
            </p>
          </div>
          <div>
            <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.feedback.useToastsForTitle")}</h3>
            <p className="mt-1 text-body-small text-foreground-muted">
              {t("designsystem.showcase.feedback.useToastsForBody")}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4 md:col-span-2">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.feedback.inPageAlertsTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.feedback.inPageAlertsIntro")}
        </p>
        <div className="mt-3 grid gap-3">
          <InPageAlert
            header={t("designsystem.showcase.feedback.defaultAlertHeader")}
            description={t("designsystem.showcase.feedback.defaultAlertDescription")}
            onClose={() => {}}
          />
          <InPageAlert
            variant="destructive"
            header={t("designsystem.showcase.feedback.destructiveAlertHeader")}
            description={t("designsystem.showcase.feedback.destructiveAlertDescription")}
            onClose={() => {}}
          />
          <InPageAlert
            variant="warning"
            header={t("designsystem.showcase.feedback.warningAlertHeader")}
            description={t("designsystem.showcase.feedback.warningAlertDescription")}
            onClose={() => {}}
          />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4 md:col-span-2">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.feedback.toastsTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.feedback.toastsIntro")}
        </p>
        <div className="mt-4">
          <ToastPlayground />
        </div>
      </div>

      <div className="rounded-lg border border-border bg-surface p-4 md:col-span-2">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.feedback.tooltipsTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.feedback.tooltipsIntro")}
        </p>
        <TooltipProvider>
          <div className="mt-3 flex flex-wrap gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <OutlinePrimary size="small">{t("designsystem.showcase.feedback.defaultTooltipTrigger")}</OutlinePrimary>
              </TooltipTrigger>
              <TooltipContent>
                {t("designsystem.showcase.feedback.defaultTooltipContent")}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <OutlinePrimary size="small">{t("designsystem.showcase.feedback.placementTooltipTrigger")}</OutlinePrimary>
              </TooltipTrigger>
              <TooltipContent side="right">
                {t("designsystem.showcase.feedback.placementTooltipContent")}
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

    </div>
  );
}
