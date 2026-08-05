// Avatar atom built on Radix UI providing image, fallback, and shape structure for user portraits.
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

/**
 * Avatar atom
 * - Shape + structure only
 * - Size controlled via className
 * - Image source passed directly to AvatarImage
 */
type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  reviewerRing?: boolean;
};

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, reviewerRing = false, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex shrink-0 overflow-hidden rounded-full",
      reviewerRing &&
        "after:pointer-events-none after:absolute after:inset-0 after:z-10 after:rounded-full after:border-[3px] after:border-tertiary after:content-['']",
      !reviewerRing &&
        "has-[img[data-state=loaded]]:after:pointer-events-none has-[img[data-state=loaded]]:after:absolute has-[img[data-state=loaded]]:after:inset-0 has-[img[data-state=loaded]]:after:z-10 has-[img[data-state=loaded]]:after:rounded-full has-[img[data-state=loaded]]:after:border-[3px] has-[img[data-state=loaded]]:after:border-tertiary has-[img[data-state=loaded]]:after:content-['']",
      className,
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("h-full w-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-secondary text-body-regular-bold text-foreground-on-dark",
      className,
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
