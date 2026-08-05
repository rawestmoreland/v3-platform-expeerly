import type { ReactNode } from "react";
import { Carousel, CarouselTrack } from "@/components/ui/composites/Carousel";
import { cn } from "@/lib/utils";

export type EdgeCarouselProps = {
  id?: string;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
  trackClassName?: string;
};

/** Horizontal list carousel that extends flush to the viewport edges (mobile-first landing). */
export function EdgeCarousel({
  id,
  ariaLabel,
  children,
  className,
  trackClassName,
}: EdgeCarouselProps) {
  return (
    <Carousel variant="edgeBleed" className={className}>
      <CarouselTrack
        id={id}
        variant="edgeBleed"
        role="list"
        aria-label={ariaLabel}
        className={cn(trackClassName)}
      >
        {children}
      </CarouselTrack>
    </Carousel>
  );
}
