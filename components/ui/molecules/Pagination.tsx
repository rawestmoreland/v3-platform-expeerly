import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Icon } from "../atoms/Icon";
import { IconButton } from "../atoms/button/IconButton";

export type PaginationItem = number | "ellipsis";

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  items?: readonly PaginationItem[];
  compact?: boolean;
  className?: string;
};

function paginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  items = paginationItems(currentPage, totalPages),
  compact = false,
  className,
}: PaginationProps) {
  return (
    <nav className={cn("flex items-center gap-2", className)} aria-label={t("ui.pagination.ariaLabel")}>
      <IconButton
        type="button"
        variant="outline-neutral"
        size="small"
        className="h-8 w-8"
        aria-label={t("ui.pagination.previousPage")}
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        icon={<Icon name="chevron-left" />}
      />

      {!compact && (
        <div className="flex items-center gap-1">
          {items.map((item, index) => {
            if (item === "ellipsis") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex h-8 w-8 items-center justify-center text-foreground-muted"
                  aria-hidden
                >
                  <Icon name="more-horizontal" />
                </span>
              );
            }

            const isActive = item === currentPage;

            return (
              <button
                key={item}
                type="button"
                className={cn(
                  "h-8 min-w-8 rounded-md px-2 text-body-extra-small-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
                  isActive
                    ? "bg-surface-active text-foreground-title"
                    : "text-foreground-title-subtle hover:bg-surface-hover hover:text-secondary",
                )}
                aria-current={isActive ? "page" : undefined}
                aria-label={t("ui.pagination.page", { n: item })}
                onClick={() => onPageChange?.(item)}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}

      <IconButton
        type="button"
        variant="outline-neutral"
        size="small"
        className="h-8 w-8"
        aria-label={t("ui.pagination.nextPage")}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        icon={<Icon name="chevron-right" />}
      />
    </nav>
  );
}
