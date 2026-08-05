import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import { t } from "@/lib/i18n";

export function CompaniesHomeScreen() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4 text-center">
      <Heading as="h1" variant="heading-2">
        {t("app.companiesHome.title")}
      </Heading>
      <Text variant="body-regular">{t("app.companiesHome.description")}</Text>
    </div>
  );
}
