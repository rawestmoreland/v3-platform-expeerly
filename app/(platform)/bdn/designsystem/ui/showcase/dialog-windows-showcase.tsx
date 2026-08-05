"use client";

import {
  DestructiveRed,
  DialogWindow,
  DialogWindowClose,
  DialogWindowContent,
  DialogWindowTrigger,
  OutlineNeutral,
  OutlinePrimary,
  PrimaryPink,
} from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/composites/Popover";
import { t } from "@/lib/i18n";

export function DialogWindowsShowcase() {
  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.dialogWindows.usageGuidanceTitle")}</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.dialogWindows.useDialogsForTitle")}</h3>
            <p className="mt-1 text-body-small text-foreground-muted">
              {t("designsystem.showcase.dialogWindows.useDialogsForBody")}
            </p>
          </div>
          <div>
            <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.dialogWindows.usePopoversForTitle")}</h3>
            <p className="mt-1 text-body-small text-foreground-muted">
              {t("designsystem.showcase.dialogWindows.usePopoversForBody")}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.dialogWindows.dialogsTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.dialogWindows.dialogsIntro")}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <DialogWindow>
            <DialogWindowTrigger asChild>
              <OutlinePrimary size="small">{t("designsystem.showcase.dialogWindows.neutralDialogTrigger")}</OutlinePrimary>
            </DialogWindowTrigger>
            <DialogWindowContent
              title={t("designsystem.showcase.dialogWindows.confirmChangesTitle")}
              description={t("designsystem.showcase.dialogWindows.confirmChangesDescription")}
              footer={
                <>
                  <DialogWindowClose asChild>
                    <OutlineNeutral size="medium">{t("designsystem.showcase.common.cancel")}</OutlineNeutral>
                  </DialogWindowClose>
                  <DialogWindowClose asChild>
                    <PrimaryPink size="medium">{t("designsystem.showcase.common.confirm")}</PrimaryPink>
                  </DialogWindowClose>
                </>
              }
            />
          </DialogWindow>

          <DialogWindow>
            <DialogWindowTrigger asChild>
              <OutlinePrimary size="small">{t("designsystem.showcase.dialogWindows.successDialogTrigger")}</OutlinePrimary>
            </DialogWindowTrigger>
            <DialogWindowContent
              variant="success"
              title={t("designsystem.showcase.dialogWindows.changesSavedTitle")}
              description={t("designsystem.showcase.dialogWindows.changesSavedDescription")}
              footer={
                <DialogWindowClose asChild>
                  <PrimaryPink size="medium">{t("designsystem.showcase.common.done")}</PrimaryPink>
                </DialogWindowClose>
              }
            />
          </DialogWindow>

          <DialogWindow>
            <DialogWindowTrigger asChild>
              <OutlinePrimary size="small">{t("designsystem.showcase.dialogWindows.destructiveDialogTrigger")}</OutlinePrimary>
            </DialogWindowTrigger>
            <DialogWindowContent
              variant="destructive"
              title={t("designsystem.showcase.dialogWindows.deleteItemTitle")}
              description={t("designsystem.showcase.dialogWindows.deleteItemDescription")}
              footer={
                <>
                  <DialogWindowClose asChild>
                    <OutlineNeutral size="medium">{t("designsystem.showcase.common.cancel")}</OutlineNeutral>
                  </DialogWindowClose>
                  <DialogWindowClose asChild>
                    <DestructiveRed size="medium">{t("designsystem.showcase.common.delete")}</DestructiveRed>
                  </DialogWindowClose>
                </>
              }
            />
          </DialogWindow>

          <DialogWindow>
            <DialogWindowTrigger asChild>
              <OutlinePrimary size="small">{t("designsystem.showcase.dialogWindows.largeDialogTrigger")}</OutlinePrimary>
            </DialogWindowTrigger>
            <DialogWindowContent
              title={t("designsystem.showcase.dialogWindows.reviewCampaignTitle")}
              description={t("designsystem.showcase.dialogWindows.reviewCampaignDescription")}
              className="max-w-3xl"
              footer={
                <>
                  <DialogWindowClose asChild>
                    <OutlineNeutral size="medium">{t("designsystem.showcase.common.cancel")}</OutlineNeutral>
                  </DialogWindowClose>
                  <DialogWindowClose asChild>
                    <PrimaryPink size="medium">{t("designsystem.showcase.common.saveChanges")}</PrimaryPink>
                  </DialogWindowClose>
                </>
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-border bg-surface-muted p-4">
                  <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.dialogWindows.campaignSummaryTitle")}</h3>
                  <p className="mt-2 text-body-small text-foreground-muted">
                    {t("designsystem.showcase.dialogWindows.campaignSummaryBody")}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-surface-muted p-4">
                  <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.dialogWindows.nextActionTitle")}</h3>
                  <p className="mt-2 text-body-small text-foreground-muted">
                    {t("designsystem.showcase.dialogWindows.nextActionBody")}
                  </p>
                </div>
              </div>
            </DialogWindowContent>
          </DialogWindow>

          <DialogWindow>
            <DialogWindowTrigger asChild>
              <OutlinePrimary size="small">{t("designsystem.showcase.dialogWindows.customWidthTrigger")}</OutlinePrimary>
            </DialogWindowTrigger>
            <DialogWindowContent
              title={t("designsystem.showcase.dialogWindows.smallModalTitle")}
              description={t("designsystem.showcase.dialogWindows.smallModalDescription")}
              className="max-w-sm"
              footer={
                <DialogWindowClose asChild>
                  <PrimaryPink size="medium">{t("designsystem.showcase.common.done")}</PrimaryPink>
                </DialogWindowClose>
              }
            />
          </DialogWindow>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.dialogWindows.popoversTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.dialogWindows.popoversIntro")}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <OutlinePrimary size="small">{t("designsystem.showcase.dialogWindows.defaultPopoverTrigger")}</OutlinePrimary>
            </PopoverTrigger>
            <PopoverContent align="start">
              <p className="text-body-small-bold">{t("designsystem.showcase.dialogWindows.defaultPopoverTitle")}</p>
              <p className="mt-1 text-body-small text-foreground-muted">
                {t("designsystem.showcase.dialogWindows.defaultPopoverBody")}
              </p>
            </PopoverContent>
          </Popover>
        </div>
      </section>
    </div>
  );
}
