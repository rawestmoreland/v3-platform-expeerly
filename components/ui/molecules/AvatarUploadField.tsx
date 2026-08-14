// AvatarUploadField molecule for click-to-change circular profile picture upload.
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/Avatar";
import { HintText } from "../atoms/HintText";
import { Icon } from "../atoms/Icon";
import { Label } from "../atoms/Label";

export interface AvatarUploadFieldProps {
  label: string;
  requiredLabel?: string;
  hint?: string;
  accept?: string;
  state?: "default" | "error";
  error?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  onFileChange?: (file: File | null) => void;
}

export function AvatarUploadField({
  label,
  requiredLabel,
  hint,
  accept = "image/*",
  state = "default",
  error,
  disabled = false,
  id,
  className,
  onFileChange,
}: AvatarUploadFieldProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const [previewUrl, setPreviewUrl] = React.useState<string | undefined>();
  const isError = state === "error" || Boolean(error);
  const hintId = hint ? `${inputId}-hint` : undefined;
  const messageId = error ? `${inputId}-error` : hintId;

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function handleFile(file: File | undefined) {
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return file ? URL.createObjectURL(file) : undefined;
    });
    onFileChange?.(file ?? null);
  }

  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <Label htmlFor={inputId} className="mb-1" disabled={disabled}>
        {label}
        {requiredLabel ? (
          <span className="block text-body-small font-normal text-foreground-muted">
            {requiredLabel}
          </span>
        ) : null}
      </Label>

      <input
        id={inputId}
        type="file"
        accept={accept}
        disabled={disabled}
        aria-invalid={isError}
        aria-describedby={messageId}
        className="sr-only"
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      <label
        htmlFor={inputId}
        className={cn(
          "group relative mt-2 flex h-24 w-24 cursor-pointer items-center justify-center rounded-full",
          "focus-within:ring-2 focus-within:ring-focus focus-within:ring-offset-2 focus-within:ring-offset-surface",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <Avatar
          className={cn(
            "h-24 w-24 border border-border bg-surface-active",
            isError && "border-border-error",
          )}
        >
          {previewUrl ? <AvatarImage src={previewUrl} alt="" /> : null}
          <AvatarFallback className="bg-surface-active text-secondary">
            <Icon name="user" size="xl" />
          </AvatarFallback>
        </Avatar>
        <span
          className={cn(
            "absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface bg-primary text-foreground-on-dark transition-colors",
            "group-hover:bg-primary-hover",
          )}
        >
          <Icon name="pencil" size="sm" />
        </span>
      </label>

      {error ? (
        <HintText id={`${inputId}-error`} className="mt-2 text-destructive">
          {error}
        </HintText>
      ) : hint ? (
        <HintText id={hintId} className="mt-2 max-w-56">
          {hint}
        </HintText>
      ) : null}
    </div>
  );
}
