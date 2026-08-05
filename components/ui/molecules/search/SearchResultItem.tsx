// SearchResultItem molecule that renders a single tappable row in a search results list.
"use client";

import * as React from "react";
import { cn } from "../../../../lib/utils";

export interface SearchResultItemProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
}

export const SearchResultItem = React.forwardRef<
  HTMLDivElement,
  SearchResultItemProps
>(({ children, disabled = false, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="option"
      aria-selected="false"
      aria-disabled={disabled}
      className={cn(
        // layout — match SelectItem
        "flex w-full items-center rounded-md px-3 py-2",
        // typography
        "text-body-small text-foreground-title-subtle",
        // interaction
        "select-none outline-none focus:outline-none",
        !disabled &&
          "cursor-pointer hover:bg-surface-hover hover:text-secondary focus:bg-surface-hover focus:text-secondary",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

SearchResultItem.displayName = "SearchResultItem";
