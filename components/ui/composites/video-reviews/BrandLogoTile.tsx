import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type BrandLogoTileProps = {
  href: string;
  logoSrc: string;
  brandName: string;
  ariaLabel: string;
  className?: string;
};

export function BrandLogoTile({
  href,
  logoSrc,
  brandName,
  ariaLabel,
  className,
}: BrandLogoTileProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "inline-flex h-14 w-28 shrink-0 items-center justify-center rounded-lg border border-border bg-surface px-3",
        "no-underline transition-colors hover:border-border-focus",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <Image
        src={logoSrc}
        alt={brandName}
        width={96}
        height={40}
        className="max-h-8 max-w-full object-contain grayscale"
      />
    </Link>
  );
}
