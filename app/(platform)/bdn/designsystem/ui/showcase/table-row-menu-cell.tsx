"use client";

import { MoreHorizontalIcon } from "@/components/ui/icons";
import { IconButton, OutlineDestructive, OutlinePrimary } from "@/components/ui";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/composites/Popover";
import { t } from "@/lib/i18n";

/** Row affordance: icon-only trigger (ellipsis) aligned right, opens a sample actions menu. */
export function TableRowMenuCell() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          variant="ghost"
          size="small"
          icon={
            <MoreHorizontalIcon
              className="h-4 w-4"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            />
          }
          aria-label={t("designsystem.showcase.common.openRowMenu")}
        />
      </PopoverTrigger>
      <PopoverContent align="end" sideOffset={4} className="w-56 p-2">
        <div className="flex flex-col gap-0.5" role="menu">
          <OutlinePrimary type="button" size="small" className="h-9 w-full justify-start font-normal">
            {t("designsystem.showcase.tableRowMenu.viewDetails")}
          </OutlinePrimary>
          <OutlinePrimary type="button" size="small" className="h-9 w-full justify-start font-normal">
            {t("designsystem.showcase.tableRowMenu.duplicate")}
          </OutlinePrimary>
          <OutlineDestructive type="button" size="small" className="h-9 w-full justify-start font-normal">
            {t("designsystem.showcase.tableRowMenu.archive")}
          </OutlineDestructive>
        </div>
      </PopoverContent>
    </Popover>
  );
}
