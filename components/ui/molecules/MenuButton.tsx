"use client";

import { Icon } from "@/components/ui/atoms/Icon";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function MenuButton({ isOpen, onClick, className }: MenuButtonProps) {
  return (
    <button
      type="button"
      aria-label={isOpen ? t("app.menuButton.close") : t("app.menuButton.open")}
      aria-expanded={isOpen}
      aria-controls="right-menu"
      onClick={onClick}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center text-foreground-title transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus",
        className,
      )}
    >
      <Icon name="menu" size="lg" />
    </button>
  );
}
