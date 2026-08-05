"use client";

import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type StarRatingProps = {
  rating: number;
  className?: string;
  onDark?: boolean;
  showScore?: boolean;
  size?: "default" | "large";
  /** When set, stars become an interactive 1–5 control. */
  onChange?: (rating: number) => void;
  name?: string;
  disabled?: boolean;
};

const starIconSize = {
  default: "md",
  large: "lg",
} as const;

const scoreVariant = {
  default: "body-small-muted",
  large: "body-regular",
} as const;

export function StarRating({
  rating,
  className,
  onDark = false,
  showScore = true,
  size = "default",
  onChange,
  name = "star-rating",
  disabled = false,
}: StarRatingProps) {
  const max = 5;
  const filled = Math.min(max, Math.max(0, Math.round(rating)));
  const isInteractive = typeof onChange === "function" && !disabled;

  if (isInteractive) {
    return (
      <fieldset
        className={cn("m-0 min-w-0 border-0 p-0", className)}
        disabled={disabled}
      >
        <legend className="sr-only">{t("player.review.ratingLabel")}</legend>
        <div className="flex items-center gap-2">
          <div
            className={cn("flex items-center", size === "large" ? "gap-1" : "gap-0.5")}
            role="radiogroup"
            aria-label={t("player.review.ratingLabel")}
          >
            {Array.from({ length: max }, (_, index) => {
              const value = index + 1;
              const isFilled = value <= filled;
              return (
                <label
                  key={value}
                  className={cn(
                    "inline-flex cursor-pointer rounded-sm",
                    "focus-within:outline-none focus-within:ring-2 focus-within:ring-focus focus-within:ring-offset-2 focus-within:ring-offset-surface",
                  )}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name={name}
                    value={value}
                    checked={filled === value}
                    onChange={() => onChange(value)}
                  />
                  <Icon
                    name="star"
                    size={starIconSize[size]}
                    className={cn(
                      isFilled ? "fill-warning text-warning" : "text-foreground-disabled",
                      "transition-colors",
                    )}
                    aria-hidden
                  />
                  <span className="sr-only">
                    {t("ui.starRating.valueLabel", { value, max })}
                  </span>
                </label>
              );
            })}
          </div>
          {showScore ? (
            <Text
              as="span"
              variant={scoreVariant[size]}
              className={onDark ? "text-foreground-on-dark" : undefined}
            >
              {filled > 0 ? `${filled}/${max}` : t("ui.starRating.unset")}
            </Text>
          ) : null}
        </div>
      </fieldset>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      aria-label={`${t("player.review.ratingLabel")}: ${filled}/${max}`}
    >
      <div className={cn("flex items-center", size === "large" ? "gap-1" : "gap-0.5")}>
        {Array.from({ length: max }, (_, index) => (
          <Icon
            key={index}
            name="star"
            size={starIconSize[size]}
            className={cn(
              index < filled ? "fill-warning text-warning" : "text-foreground-disabled",
            )}
          />
        ))}
      </div>
      {showScore ? (
        <Text
          as="span"
          variant={scoreVariant[size]}
          className={onDark ? "text-foreground-on-dark" : undefined}
        >
          {filled}/{max}
        </Text>
      ) : null}
    </div>
  );
}
