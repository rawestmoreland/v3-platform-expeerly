// ComboboxField composite — multi-select field combining a FieldTrigger popover,
// a searchable CheckboxField list, and removable Tag chips for selected values.
"use client";

import * as React from "react";
import { Icon } from "@/components/ui/atoms/Icon";
import { HintText } from "@/components/ui/atoms/HintText";
import { Label } from "@/components/ui/atoms/Label";
import { Tag } from "@/components/ui/atoms/Tag";
import { CheckboxField } from "@/components/ui/molecules/CheckboxField";
import { fieldTriggerClasses } from "@/components/ui/molecules/FieldTrigger";
import { SearchField } from "@/components/ui/molecules/search/SearchField";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/composites/Popover";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type ComboboxOption = {
  value: string;
  label: string;
};

export interface ComboboxFieldProps {
  label: string;
  placeholder?: string;
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  options: ComboboxOption[];
  hint?: string;
  state?: "default" | "highlighted" | "error";
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyLabel?: string;
  hideLabel?: boolean;
  className?: string;
}

/** Multi-select field: FieldTrigger + Popover + CheckboxField list + removable Tag chips. */
export function ComboboxField({
  label,
  placeholder,
  values,
  defaultValues,
  onValuesChange,
  options,
  hint,
  state = "default",
  disabled = false,
  searchable = true,
  searchPlaceholder,
  emptyLabel,
  hideLabel = false,
  className,
}: ComboboxFieldProps) {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  // support controlled + uncontrolled, same convention as SelectField
  const [internalValues, setInternalValues] = React.useState<string[]>(defaultValues ?? []);
  const values_ = values ?? internalValues;

  const setValues = (next: string[]) => {
    if (values === undefined) {
      setInternalValues(next);
    }
    onValuesChange?.(next);
  };

  const selectedOptions = React.useMemo(
    () => options.filter((option) => values_.includes(option.value)),
    [options, values_],
  );

  const filteredOptions = React.useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return options;
    return options.filter((option) => option.label.toLowerCase().includes(needle));
  }, [options, query]);

  const hasValue = selectedOptions.length > 0;
  const hintId = hint ? `${id}-hint` : undefined;

  const toggleValue = (value: string) => {
    setValues(
      values_.includes(value) ? values_.filter((v) => v !== value) : [...values_, value],
    );
  };

  const removeValue = (value: string) => {
    setValues(values_.filter((v) => v !== value));
  };

  const triggerLabel = hasValue
    ? t("ui.comboboxField.selectedCount", { count: selectedOptions.length })
    : placeholder;

  return (
    <div className={cn("flex flex-col", className)}>
      <Label
        id={`${id}-label`}
        htmlFor={id}
        className={cn("mb-1", hideLabel && "sr-only")}
        disabled={disabled}
      >
        {label}
      </Label>

      <Popover open={open} onOpenChange={(next) => !disabled && setOpen(next)}>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            type="button"
            id={id}
            aria-labelledby={`${id}-label`}
            aria-expanded={open}
            aria-describedby={hintId}
            disabled={disabled}
            className={cn(
              fieldTriggerClasses({ state, disabled, isFilled: hasValue, open }),
              "w-full justify-between",
            )}
          >
            <span className={cn("truncate text-left", !hasValue && "text-foreground-muted")}>
              {triggerLabel}
            </span>
            <Icon
              name="chevron-down"
              size="sm"
              className={cn(
                "ml-2 shrink-0 transition-transform",
                open && "rotate-180",
                !disabled && state !== "highlighted" && open && "text-foreground-accent",
              )}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] min-w-64 p-2"
        >
          {searchable ? (
            <div className="mb-2">
              <SearchField
                label={searchPlaceholder ?? t("ui.comboboxField.searchPlaceholder")}
                placeholder={searchPlaceholder ?? t("ui.comboboxField.searchPlaceholder")}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
          ) : null}

          <ul
            className="flex max-h-[40dvh] flex-col gap-0.5 overflow-y-auto"
            role="listbox"
            aria-multiselectable="true"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-body-small text-foreground-muted">
                {emptyLabel ?? t("ui.comboboxField.emptyLabel")}
              </li>
            ) : (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="rounded-md px-2 py-1 hover:bg-surface-hover"
                  role="option"
                  aria-selected={values_.includes(option.value)}
                >
                  <CheckboxField
                    label={option.label}
                    checked={values_.includes(option.value)}
                    onCheckedChange={() => toggleValue(option.value)}
                  />
                </li>
              ))
            )}
          </ul>
        </PopoverContent>
      </Popover>

      {hasValue ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedOptions.map((option) => (
            <Tag
              key={option.value}
              label={option.label}
              onRemove={disabled ? undefined : () => removeValue(option.value)}
              disabled={disabled}
            />
          ))}
        </div>
      ) : null}

      {hint ? (
        <HintText id={hintId} className={cn("mt-2", state === "error" && "text-destructive")}>
          {hint}
        </HintText>
      ) : null}
    </div>
  );
}
