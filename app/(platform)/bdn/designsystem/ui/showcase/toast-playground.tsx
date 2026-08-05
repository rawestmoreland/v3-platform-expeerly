"use client";

import { OutlinePrimary, Toaster } from "@/components/ui";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/molecules/feedback/toast";
import { t } from "@/lib/i18n";

export function ToastPlayground() {
  return (
    <>
      <Toaster />
      <div className="flex flex-wrap gap-2">
        <OutlinePrimary
          type="button"
          size="small"
          onClick={() =>
            void toast({
              description: t("designsystem.showcase.toastPlayground.defaultDescription"),
            })
          }
        >
          {t("designsystem.showcase.toastPlayground.defaultToast")}
        </OutlinePrimary>
        <OutlinePrimary
          type="button"
          size="small"
          onClick={() =>
            void toast({
              variant: "success",
              description: t("designsystem.showcase.toastPlayground.successDescription"),
            })
          }
        >
          {t("designsystem.showcase.toastPlayground.successToast")}
        </OutlinePrimary>
        <OutlinePrimary
          type="button"
          size="small"
          onClick={() =>
            void toast({
              variant: "destructive",
              description: t("designsystem.showcase.toastPlayground.destructiveDescription"),
            })
          }
        >
          {t("designsystem.showcase.toastPlayground.destructiveToast")}
        </OutlinePrimary>
        <OutlinePrimary
          type="button"
          size="small"
          onClick={() =>
            void toast({
              description: t("designsystem.showcase.toastPlayground.archivedDescription"),
              action: (
                <ToastAction altText={t("designsystem.showcase.toastPlayground.undoAltText")}>
                  {t("designsystem.showcase.common.undo")}
                </ToastAction>
              ),
            })
          }
        >
          {t("designsystem.showcase.toastPlayground.toastWithAction")}
        </OutlinePrimary>
      </div>
    </>
  );
}
