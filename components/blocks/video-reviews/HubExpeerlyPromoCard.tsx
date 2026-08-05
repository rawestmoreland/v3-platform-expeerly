import Link from "next/link";
import { outlineWhiteLinkClassName } from "@/components/ui/atoms/button/buttonClasses";
import { Text } from "@/components/ui/atoms/Text";
import { Card, CardTitle } from "@/components/ui/composites/Card";
import { PUBLIC_MENU_EXTERNAL_LINKS } from "@/lib/app-nav-config";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function HubExpeerlyPromoCard() {
  return (
    <Card surface="secondary" padding="medium">
      <CardTitle variant="heading-2" tone="on-dark">
        {t("player.brand.ctaTitle")}
      </CardTitle>
      <Text variant="body-small-muted" className="mt-2 text-foreground-on-dark/80">
        {t("player.brand.ctaDescription")}
      </Text>
      <Link
        href={PUBLIC_MENU_EXTERNAL_LINKS.forBrands}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          outlineWhiteLinkClassName("medium"),
          "mt-4 inline-flex no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
        )}
        aria-label={t("player.brand.ctaButtonAriaLabel")}
      >
        {t("player.brand.ctaButton")}
      </Link>
    </Card>
  );
}
