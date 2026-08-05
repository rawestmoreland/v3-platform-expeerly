import * as React from "react";
import { cn } from "@/lib/utils";

export type CarouselVariant = "default" | "edgeBleed";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CarouselVariant;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative",
        variant === "edgeBleed" && "-mx-6 md:-mx-16 lg:-mx-20",
        className,
      )}
      {...props}
    />
  ),
);
Carousel.displayName = "Carousel";

export interface CarouselTrackProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CarouselVariant;
}

const CarouselTrack = React.forwardRef<HTMLDivElement, CarouselTrackProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2",
        "[-webkit-overflow-scrolling:touch]",
        variant === "default" && "gap-4 pb-3",
        variant === "edgeBleed" && "gap-3 pl-6 pr-6 md:gap-6 md:pl-16 md:pr-16 lg:pl-20 lg:pr-20",
        className,
      )}
      {...props}
    />
  ),
);
CarouselTrack.displayName = "CarouselTrack";

export type CarouselItemSize = "multi" | "compact" | "shrink";

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: CarouselItemSize;
}

const carouselItemSizeClasses: Record<CarouselItemSize, string> = {
  multi: "w-[85%] sm:w-[45%] lg:w-[31%]",
  compact: "w-full",
  shrink: "shrink-0",
};

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, size = "multi", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("shrink-0 snap-start", carouselItemSizeClasses[size], className)}
      {...props}
    />
  ),
);
CarouselItem.displayName = "CarouselItem";

export { Carousel, CarouselTrack, CarouselItem };
