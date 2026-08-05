import Link from "next/link";
import { Icon } from "@/components/ui/atoms/Icon";
import { Text } from "@/components/ui/atoms/Text";
import { IconTextCard } from "@/components/ui/composites/IconTextCard";
import { PUBLIC_MENU_EXTERNAL_LINKS } from "@/lib/app-nav-config";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type B2BPromoRowProps = {
  className?: string;
};

type PromoTileProps = {
  href: string;
  iconName: "megaphone" | "store";
  title: string;
  body: string;
};

function PromoTile({ href, iconName, title, body }: PromoTileProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "block h-full rounded-lg no-underline",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
      aria-label={t("marketing.landing.learnMoreAriaLabel")}
    >
      <IconTextCard
        className="h-full transition-colors hover:border-border-focus"
        media={<Icon name={iconName} size="lg" aria-hidden />}
        title={title}
        titleVariant="title-2"
        description={
          <>
            <Text as="p" variant="body-extra-small-muted">
              {body}
            </Text>
            <Text as="span" variant="body-small" className="text-body-small-bold mt-2 inline-block text-secondary">
              {t("marketing.landing.learnMore")}
            </Text>
          </>
        }
      />
    </Link>
  );
}

export function B2BPromoRow({ className }: B2BPromoRowProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-6 sm:grid-cols-2", className)}>
      <PromoTile
        href={PUBLIC_MENU_EXTERNAL_LINKS.forBrands}
        iconName="megaphone"
        title={t("marketing.landing.forBrandsTitle")}
        body={t("marketing.landing.forBrandsBody")}
      />
      <PromoTile
        href={PUBLIC_MENU_EXTERNAL_LINKS.forRetailers}
        iconName="store"
        title={t("marketing.landing.forRetailersTitle")}
        body={t("marketing.landing.forRetailersBody")}
      />
    </div>
  );
}
