"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/atoms/Icon";
import { outlineNeutralLinkClassName, type ButtonSize } from "@/components/ui/atoms/button/buttonClasses";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/composites/Popover";
import { cn } from "@/lib/utils";

export type SingleSelectFilterOption = {
  value: string;
  label: string;
};

export type SingleSelectFilterButtonProps = {
  label: string;
  ariaLabel: string;
  options: SingleSelectFilterOption[];
  value?: string;
  onValueChange: (value?: string) => void;
  clearAriaLabel?: string;
  size?: ButtonSize;
  className?: string;
  popoverAlign?: "start" | "center" | "end";
};

export function SingleSelectFilterButton({
  label,
  ariaLabel,
  options,
  value,
  onValueChange,
  clearAriaLabel,
  size = "medium",
  className,
  popoverAlign = "end",
}: SingleSelectFilterButtonProps) {
  const [open, setOpen] = useState(false);

  const activeOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value],
  );
  const isSelected = Boolean(activeOption);

  const triggerLabel = activeOption?.label ?? label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          aria-expanded={open}
          onClick={(event) => {
            if (!isSelected) {
              return;
            }
            event.preventDefault();
            onValueChange(undefined);
            setOpen(false);
          }}
          className={cn(
            outlineNeutralLinkClassName(size),
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
            className,
          )}
        >
          <span className="truncate">{triggerLabel}</span>
          <Icon
            name={isSelected ? "x" : "chevron-down"}
            size="sm"
            aria-label={isSelected ? (clearAriaLabel ?? ariaLabel) : undefined}
            className={cn("shrink-0 transition-transform", open && !isSelected && "rotate-180")}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent align={popoverAlign} className="w-56 p-2">
        <ul className="flex flex-col gap-1">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onValueChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left text-body-small",
                  option.value === value
                    ? "bg-surface-active font-bold text-foreground-title"
                    : "text-foreground-title-subtle hover:bg-surface-hover hover:text-secondary",
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
