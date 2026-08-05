"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/atoms/Avatar";
import { Icon } from "@/components/ui/atoms/Icon";
import { StarRating } from "@/components/ui/molecules/video-reviews/StarRating";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type MainVideoCardProps = {
  playbackId: string;
  posterUrl: string;
  title: string;
  reviewerName: string;
  reviewerDisplayName?: string;
  reviewerAvatarUrl: string;
  brandSlug: string;
  brandName: string;
  productName: string;
  starRating: number;
  className?: string;
};

export function MainVideoCard({
  playbackId,
  posterUrl,
  title,
  reviewerName,
  reviewerDisplayName,
  reviewerAvatarUrl,
  brandSlug,
  brandName,
  productName,
  starRating,
  className,
}: MainVideoCardProps) {
  const mp4Src = `https://stream.mux.com/${playbackId}/high.mp4`;
  const displayName = reviewerDisplayName ?? reviewerName;

  return (
    <div className={cn("relative w-full max-w-md max-md:max-w-none", className)}>
      <video
        className="aspect-[9/16] w-full border border-border bg-black shadow-sm max-md:rounded-none max-md:border-x-0 md:rounded-lg"
        controls
        playsInline
        preload="metadata"
        poster={posterUrl}
        aria-label={title || t("player.review.playAriaLabel")}
      >
        <source src={mp4Src} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-4 top-4 z-10 flex items-center gap-2 text-foreground-on-dark">
          <Avatar className="h-9 w-9 border border-border" reviewerRing>
            <AvatarImage src={reviewerAvatarUrl} alt="" />
            <AvatarFallback>{reviewerName.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <span className="text-body-small-bold drop-shadow-sm">{displayName}</span>
          <Icon name="badge-check" size="sm" className="text-foreground-on-dark" />
        </div>

        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end gap-3 text-foreground-on-dark">
          <div className="flex min-w-0 items-center gap-2">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={posterUrl} alt="" />
              <AvatarFallback>{brandName.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <Link
                href={`/video-reviews/brand/${brandSlug}`}
                className="pointer-events-auto line-clamp-2 text-body-small-bold drop-shadow-sm"
              >
                {productName}
              </Link>
              <StarRating rating={starRating} onDark className="mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
