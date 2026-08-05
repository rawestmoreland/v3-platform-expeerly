"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/atoms/Icon";
import { cn } from "@/lib/utils";

export type RightMenuSubmenuItem = {
  id: string;
  label: string;
  onClick?: () => void;
};

export interface RightMenuItemProps {
  icon?: ReactNode;
  label: string;
  onClick?: () => void;
  nested?: boolean;
  submenu?: readonly RightMenuSubmenuItem[];
  defaultSubmenuOpen?: boolean;
  submenuIndicator?: "down" | "right";
}

export function RightMenuItem({
  icon,
  label,
  onClick,
  nested = false,
  submenu,
  defaultSubmenuOpen = false,
  submenuIndicator = "down",
}: RightMenuItemProps) {
  const hasSubmenu = Boolean(submenu?.length);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(defaultSubmenuOpen);

  const handleClick = () => {
    if (hasSubmenu) {
      setIsSubmenuOpen((open) => !open);
      return;
    }

    onClick?.();
  };

  const row = (
    <button
      type="button"
      onClick={handleClick}
      aria-expanded={hasSubmenu ? isSubmenuOpen : undefined}
      className={cn(
        "flex h-10 w-full items-center rounded-lg px-2 py-2 text-left text-foreground-body transition-colors hover:bg-surface-hover",
        icon ? "gap-4" : "gap-0",
        nested && "pl-8",
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="min-w-0 flex-1 truncate text-body-small-bold">{label}</span>
      {hasSubmenu ? (
        <span className="shrink-0">
          <Icon
            name={submenuIndicator === "right" ? "chevron-right" : "chevron-down"}
            size="md"
            className={cn(
              "text-foreground-title transition-transform duration-200",
              submenuIndicator === "down" && isSubmenuOpen && "rotate-180",
              submenuIndicator === "right" && isSubmenuOpen && "rotate-90",
            )}
          />
        </span>
      ) : null}
    </button>
  );

  if (nested) {
    return row;
  }

  if (!hasSubmenu) {
    return row;
  }

  return (
    <div className="flex flex-col gap-1">
      {row}
      {isSubmenuOpen
        ? submenu?.map((item) => (
            <RightMenuItem key={item.id} label={item.label} nested onClick={item.onClick} />
          ))
        : null}
    </div>
  );
}
