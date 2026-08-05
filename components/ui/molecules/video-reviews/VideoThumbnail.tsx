import Image from "next/image";
import { Icon } from "@/components/ui/atoms/Icon";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/composites/Tooltip";
import { StarRating } from "@/components/ui/molecules/video-reviews/StarRating";
import { Text } from "@/components/ui/atoms/Text";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type VideoThumbnailProps = {
  posterUrl: string;
  brandLogoSrc: string;
  brandName: string;
  productName: string;
  starRating: number;
  showBrandLogo?: boolean;
  showGiftedBadge?: boolean;
  className?: string;
};

export function VideoThumbnail({
  posterUrl,
  brandLogoSrc,
  brandName,
  productName,
  starRating,
  showBrandLogo = true,
  showGiftedBadge = false,
  className,
}: VideoThumbnailProps) {
  return (
    <div
      className={cn(
        "relative aspect-[9/16] w-40 min-w-40 shrink-0 overflow-hidden rounded-lg border border-border",
        className,
      )}
    >
      <Image
        src={posterUrl}
        alt=""
        fill
        className="object-cover"
        sizes="160px"
        unoptimized
      />

      <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
        <Icon name="play-square" size="xl" className="text-foreground-on-dark" />
      </div>

      {showGiftedBadge ? (
        <div className="absolute right-2 top-2 z-10">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface/95 text-secondary shadow-sm">
                  <Icon name="gift" size="sm" aria-hidden />
                </span>
              </TooltipTrigger>
              <TooltipContent>{t("marketing.landing.giftedLabel")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="flex items-center gap-2">
          {showBrandLogo ? (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-surface p-1">
              <Image
                src={brandLogoSrc}
                alt={brandName}
                width={24}
                height={24}
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}
          <StarRating rating={starRating} onDark showScore={false} />
        </div>
        <Text
          as="p"
          variant="body-small"
          className="mt-1.5 line-clamp-2 text-body-small-bold text-foreground-on-dark"
        >
          {productName}
        </Text>
      </div>
    </div>
  );
}
