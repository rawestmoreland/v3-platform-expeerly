"use client";

import Image from "next/image";
import * as React from "react";
import { LandingEdgeCarousel } from "@/components/blocks/marketing/LandingEdgeCarousel";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { Badge, Carousel, CarouselItem, CarouselTrack, IconButton } from "@/components/ui";
import { cn } from "@/lib/utils";
import { t } from "@/lib/i18n";

const carouselItemDefs = [
  { id: "reviewedProduct", image: "/expeerly_reviewed_MINIMAL.svg", dark: false },
  { id: "brandAsset", image: "/expeerly-logo.svg", dark: false },
  { id: "inverseMark", image: "/expeerly-logo-negative.svg", dark: true },
  { id: "symbol", image: "/expeerly_reviewed_MINIMAL.svg", dark: false },
  { id: "starAsset", image: "/expeerly_star.svg", dark: false },
] as const;

function getCarouselItems() {
  return carouselItemDefs.map((item) => ({
    ...item,
    title: t(`designsystem.showcase.carousels.items.${item.id}.title`),
    description: t(`designsystem.showcase.carousels.items.${item.id}.description`),
    badge: t(`designsystem.showcase.carousels.items.${item.id}.badge`),
  }));
}

type CarouselItemData = ReturnType<typeof getCarouselItems>[number];

function CarouselCard({ item }: { item: CarouselItemData }) {
  return (
    <article className="h-full overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      <div
        className={`flex h-36 items-center justify-center p-6 ${
          item.dark ? "bg-tooltip" : "bg-surface-muted"
        }`}
      >
        <Image
          src={item.image}
          alt=""
          width={180}
          height={96}
          className="max-h-24 w-auto max-w-full"
        />
      </div>
      <div className="p-4">
        <h3 className="text-body-regular-bold text-foreground-title">{item.title}</h3>
        <p className="mt-2 text-body-small text-foreground-muted">{item.description}</p>
        <div className="mt-3">
          <Badge label={item.badge} variant="subtle" />
        </div>
      </div>
    </article>
  );
}


function MultiItemCarouselExample() {
  const carouselItems = getCarouselItems();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const trackRef = React.useRef<HTMLDivElement | null>(null);

  function goToItem(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), carouselItems.length - 1);

    setActiveIndex(nextIndex);
    itemRefs.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  function updateActiveIndex() {
    const track = trackRef.current;

    if (!track) return;

    const nearestIndex = itemRefs.current.reduce((nearest, item, index) => {
      if (!item) return nearest;

      const nearestItem = itemRefs.current[nearest];
      const currentDistance = Math.abs(item.offsetLeft - track.scrollLeft);
      const nearestDistance = nearestItem
        ? Math.abs(nearestItem.offsetLeft - track.scrollLeft)
        : Number.POSITIVE_INFINITY;

      return currentDistance < nearestDistance ? index : nearest;
    }, 0);

    setActiveIndex(nearestIndex);
  }

  return (
    <Carousel className="mt-4" aria-label={t("designsystem.showcase.carousels.featuredAriaLabel")}>
      <CarouselTrack ref={trackRef} onScroll={updateActiveIndex}>
        {carouselItems.map((item, index) => (
          <CarouselItem
            key={item.title}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            size="multi"
          >
            <CarouselCard item={item} />
          </CarouselItem>
        ))}
      </CarouselTrack>

      <div className="mt-4 flex items-center justify-between gap-4">
        <IconButton
          type="button"
          variant="outline-neutral"
          size="small"
          icon={<ChevronLeftIcon className="h-4 w-4" />}
          aria-label={t("designsystem.showcase.carousels.previousAriaLabel")}
          disabled={activeIndex === 0}
          onClick={() => goToItem(activeIndex - 1)}
        />

        <div className="flex items-center justify-center gap-2" aria-label={t("designsystem.showcase.carousels.positionAriaLabel")}>
          {carouselItems.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={item.title}
                type="button"
                className={cn(
                  "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  isActive ? "w-5 bg-secondary" : "w-2 bg-border hover:bg-secondary",
                )}
                aria-label={t("designsystem.showcase.carousels.showItemAriaLabel", { index: index + 1 })}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goToItem(index)}
              />
            );
          })}
        </div>

        <IconButton
          type="button"
          variant="outline-neutral"
          size="small"
          icon={<ChevronRightIcon className="h-4 w-4" />}
          aria-label={t("designsystem.showcase.carousels.nextAriaLabel")}
          disabled={activeIndex === carouselItems.length - 1}
          onClick={() => goToItem(activeIndex + 1)}
        />
      </div>
    </Carousel>
  );
}

function CompactCarouselExample() {
  const carouselItems = getCarouselItems();
  const compactCarouselItems = carouselItems.slice(0, 3);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const itemRefs = React.useRef<Array<HTMLDivElement | null>>([]);

  function goToItem(index: number) {
    const nextIndex = Math.min(Math.max(index, 0), compactCarouselItems.length - 1);

    setActiveIndex(nextIndex);
    itemRefs.current[nextIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
  }

  return (
    <Carousel className="mt-4 max-w-md" aria-label={t("designsystem.showcase.carousels.compactAriaLabel")}>
      <CarouselTrack className="pb-0">
        {compactCarouselItems.map((item, index) => (
          <CarouselItem
            key={item.title}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            size="compact"
          >
            <CarouselCard item={item} />
          </CarouselItem>
        ))}
      </CarouselTrack>

      <div className="mt-4 flex items-center justify-between gap-4">
        <IconButton
          type="button"
          variant="outline-neutral"
          size="small"
          icon={<ChevronLeftIcon className="h-4 w-4" />}
          aria-label={t("designsystem.showcase.carousels.previousAriaLabel")}
          disabled={activeIndex === 0}
          onClick={() => goToItem(activeIndex - 1)}
        />

        <div className="flex items-center justify-center gap-2" aria-label={t("designsystem.showcase.carousels.positionAriaLabel")}>
          {compactCarouselItems.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={item.title}
                type="button"
                className={cn(
                  "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
                  isActive ? "w-5 bg-secondary" : "w-2 bg-border hover:bg-secondary",
                )}
                aria-label={t("designsystem.showcase.carousels.showItemAriaLabel", { index: index + 1 })}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goToItem(index)}
              />
            );
          })}
        </div>

        <IconButton
          type="button"
          variant="outline-neutral"
          size="small"
          icon={<ChevronRightIcon className="h-4 w-4" />}
          aria-label={t("designsystem.showcase.carousels.nextAriaLabel")}
          disabled={activeIndex === compactCarouselItems.length - 1}
          onClick={() => goToItem(activeIndex + 1)}
        />
      </div>
    </Carousel>
  );
}

function LandingEdgeCarouselExample() {
  const carouselItems = getCarouselItems();

  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <LandingEdgeCarousel
        id="designsystem-landing-edge"
        ariaLabel={t("designsystem.showcase.carousels.landingEdgeAriaLabel")}
        showRightButton
      >
        {carouselItems.map((item) => (
          <CarouselItem key={item.title} size="shrink" role="listitem">
            <article className="w-40 overflow-hidden rounded-lg border border-border bg-surface">
              <div
                className={cn(
                  "flex h-56 items-center justify-center p-4",
                  item.dark ? "bg-tooltip" : "bg-surface-muted",
                )}
              >
                <Image src={item.image} alt="" width={120} height={64} className="max-h-20 w-auto max-w-full" />
              </div>
              <div className="p-3">
                <p className="line-clamp-2 text-body-small-bold text-foreground-title">{item.title}</p>
              </div>
            </article>
          </CarouselItem>
        ))}
      </LandingEdgeCarousel>
    </div>
  );
}

export function CarouselsShowcase() {
  return (
    <div className="grid gap-8">
      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.carousels.multiItemTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.carousels.multiItemIntro")}
        </p>
        <MultiItemCarouselExample />
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.carousels.compactTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.carousels.compactIntro")}
        </p>
        <CompactCarouselExample />
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.carousels.landingEdgeTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.carousels.landingEdgeIntro")}
        </p>
        <LandingEdgeCarouselExample />
      </section>
    </div>
  );
}
