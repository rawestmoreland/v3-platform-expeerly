"use client";

// Tag atom — removable label based on the default Badge treatment.
import * as React from "react";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import { IconButton } from "./button/IconButton";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: string;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
  removeAriaLabel?: string;
  disabled?: boolean;
}

export function Tag({
  label,
  onRemove,
  removeAriaLabel,
  disabled = false,
  className,
  ...props
}: TagProps) {
  const removeLabel = removeAriaLabel ?? t("ui.tag.removeAriaLabel", { label });

  return (
    <span
      className={cn(
        "inline-flex h-[32px] items-center justify-center gap-1 rounded-lg bg-surface-hover px-4 transition-colors",
        "text-body-extra-small text-foreground-title-subtle",
        !disabled && "hover:bg-background hover:text-foreground-title",
        disabled && "opacity-60",
        className,
      )}
      {...props}
    >
      {label}
      {onRemove ? (
        <IconButton
          type="button"
          variant="ghost-neutral"
          size="small"
          aria-label={removeLabel}
          disabled={disabled}
          icon={<Icon name="x" size="sm" />}
          className="-mr-1 h-4 w-4 min-h-0 min-w-0 p-0 text-current hover:bg-foreground-title-subtle/10"
          onClick={onRemove}
        />
      ) : (
        <Icon name="x" size="sm" className="-mr-1 shrink-0" />
      )}
    </span>
  );
}
