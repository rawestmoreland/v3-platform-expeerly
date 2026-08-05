// SearchField molecule that combines an Input atom with a search icon for venue search inputs.
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "../../atoms/Icon";
import { HintText } from "../../atoms/HintText";
import { Input } from "../../atoms/Input";

export interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Accessible name for the search input. Not rendered visually; passed as aria-label. */
  label?: string;
  state?: "default" | "highlighted" | "error";
  hint?: string;
  onSearchSubmit?: () => void;
}

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    { label, state = "default", hint, disabled, className, id, onSearchSubmit, onKeyDown, ...props },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className="flex flex-col">
        <div className="relative">
          <Input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-label={label}
            aria-invalid={state === "error"}
            aria-describedby={state === "error" ? hintId : undefined}
            className={cn(
              "peer pr-10", // space for icon
              state === "highlighted" &&
                "border-[1.5px] border-border-focus focus:border-border-focus",
              state === "error" &&
                "bg-destructive-subtle border-[1.5px] border-border-error focus:border-border-error",
              className,
            )}
            onKeyDown={(event) => {
              if (event.key === "Enter" && onSearchSubmit) {
                event.preventDefault();
                onSearchSubmit();
              }
              onKeyDown?.(event);
            }}
            {...props}
          />

          {onSearchSubmit ? (
            <button
              type="button"
              disabled={disabled}
              onClick={onSearchSubmit}
              aria-label={label}
              className={cn(
                "absolute right-3 top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center",
                !disabled &&
                  state !== "highlighted" &&
                  state !== "error" &&
                  "text-foreground-muted hover:text-foreground-body",
                !disabled && state === "highlighted" && "text-foreground-accent",
                !disabled && state === "error" && "text-destructive",
                disabled && "cursor-not-allowed text-foreground-disabled",
              )}
            >
              <Icon name="search" />
            </button>
          ) : (
            <span
              className={cn(
                "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2",
                "h-4 w-4 flex items-center justify-center", // ✅ true optical centering
                // default
                "text-foreground-muted",
                // focused/active
                !disabled &&
                  state !== "highlighted" &&
                  state !== "error" &&
                  "peer-focus:text-foreground-body",
                // highlighted
                !disabled && state === "highlighted" && "text-foreground-accent",
                // error
                !disabled && state === "error" && "text-destructive",
                // disabled
                disabled && "text-foreground-disabled",
              )}
            >
              <Icon name="search" />
            </span>
          )}
        </div>

        {state === "error" && hint && (
          <HintText id={hintId} role="alert" className="mt-2 text-destructive">
            {hint}
          </HintText>
        )}
      </div>
    );
  },
);

SearchField.displayName = "SearchField";
