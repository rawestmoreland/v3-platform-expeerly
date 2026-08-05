import { BrandListCard } from "@/components/ui/composites/video-reviews/BrandListCard";
import type { BrandFixture } from "@/lib/fixtures/video-reviews";
import { cn } from "@/lib/utils";

export type HubBrandListCardProps = {
  brand: BrandFixture;
  className?: string;
};

export function HubBrandListCard({ brand, className }: HubBrandListCardProps) {
  return (
    <li className={cn(className)}>
      <BrandListCard brand={brand} />
    </li>
  );
}
