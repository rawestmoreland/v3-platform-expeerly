import Link from "next/link";
import { PageCanvas } from "@/components/layout/PageCanvas";
import { primaryPinkClassName } from "@/components/ui/atoms/button/buttonClasses";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function PublicNotFound() {
  return (
    <PageCanvas>
      <div className="mx-auto flex w-full max-w-content flex-col items-center px-6 py-16 text-center md:px-16">
        <Heading as="h1" variant="heading-2">
          {t("player.notFound.title")}
        </Heading>
        <Text variant="body-small-muted" className="mt-2">
          {t("player.notFound.description")}
        </Text>
        <Link
          href="/"
          className={cn(
            primaryPinkClassName("medium"),
            "mt-8 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          {t("player.notFound.backHome")}
        </Link>
      </div>
    </PageCanvas>
  );
}
