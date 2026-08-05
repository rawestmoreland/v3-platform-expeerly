"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/atoms/Icon";
import { IconButton } from "@/components/ui/atoms/button/IconButton";
import { Carousel, CarouselTrack } from "@/components/ui/composites/Carousel";
import { cn } from "@/lib/utils";

export type LandingEdgeCarouselProps = {
  id?: string;
  ariaLabel: string;
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
  showRightButton?: boolean;
};

/**
 * Landing carousel aligned to page content gutters.
 * Keeps atomic EdgeCarousel behavior but removes viewport edge bleed.
 */
export function LandingEdgeCarousel({
  id,
  ariaLabel,
  children,
  className,
  trackClassName,
  showRightButton = true,
}: LandingEdgeCarouselProps) {
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (!id) return;
    const track = document.getElementById(id);
    if (!track) return;

    const update = () => {
      const remaining = track.scrollWidth - track.clientWidth - track.scrollLeft;
      setCanScrollRight(remaining > 4);
    };

    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [id, children]);

  const handleNext = () => {
    if (!id) return;
    const track = document.getElementById(id);
    if (!track) return;
    track.scrollBy({ left: Math.max(track.clientWidth * 0.75, 220), behavior: "smooth" });
  };

  return (
    <div className="relative -mx-6 md:mx-0">
      <Carousel aria-label={ariaLabel} className={className}>
        <CarouselTrack
          id={id}
          role="list"
          aria-label={ariaLabel}
          className={cn("gap-3 pl-6 pr-6 md:gap-6 md:pl-0 md:pr-0", trackClassName)}
        >
          {children}
        </CarouselTrack>
      </Carousel>

      {canScrollRight ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background to-transparent"
          />
          {showRightButton ? (
            <div className="absolute inset-y-0 right-2 z-20 flex items-center md:right-0">
              <IconButton
                type="button"
                variant="outline-neutral"
                size="medium"
                icon={<Icon name="chevron-right" size="md" aria-hidden />}
                aria-label={ariaLabel}
                onClick={handleNext}
                className="shadow-md"
              />
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
