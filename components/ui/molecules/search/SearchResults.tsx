// SearchResults molecule that renders a scrollable container for a list of search result items.
"use client";

import * as React from "react";
import { cn } from "../../../../lib/utils";

export interface SearchResultsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Max height before scroll */
  maxHeight?: number;
}

export const SearchResults = React.forwardRef<
  HTMLDivElement,
  SearchResultsProps
>(({ children, maxHeight = 264, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="listbox"
      className={cn(
        "mt-[2px]", // match SelectField sideOffset
        // positioning is handled by parent (SearchField / controller)
        "w-full rounded-lg",
        // visuals — match SelectField.Content
        "border border-border bg-surface py-1 text-body-small shadow-md",
        // spacing + scroll — match SelectField.Viewport
        "flex flex-col gap-0.5 overflow-y-auto px-2",
        className,
      )}
      style={{ maxHeight }}
      {...props}
    >
      {children}
    </div>
  );
});

SearchResults.displayName = "SearchResults";
