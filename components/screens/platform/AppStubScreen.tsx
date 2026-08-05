import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import { t } from "@/lib/i18n";

export type AppStubScreenProps = {
  titleKey: string;
  descriptionKey?: string;
};

export function AppStubScreen({
  titleKey,
  descriptionKey = "app.stub.description",
}: AppStubScreenProps) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4 text-center">
      <Heading as="h1" variant="heading-2">
        {t(titleKey)}
      </Heading>
      <Text variant="body-regular">{t(descriptionKey)}</Text>
    </div>
  );
}
