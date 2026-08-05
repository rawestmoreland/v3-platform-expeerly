"use client";

import { t } from "@/lib/i18n";
import {
  DateField,
  InputField,
  OutlinePrimary,
  SelectField,
  SelectItem,
  TextareaField,
} from "@/components/ui";

/** Design-system demo: stacked fields with 32px vertical gap (`gap-8`). */
export function InputsFormSpacingDemo() {
  return (
    <form
      className="flex max-w-md flex-col gap-8"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <InputField label={t("designsystem.showcase.common.labelFullName")} placeholder={t("designsystem.showcase.common.placeholderJaneDoe")} hint={t("designsystem.showcase.common.hintRequired")} />
      <InputField label={t("designsystem.showcase.common.labelEmail")} type="email" placeholder={t("designsystem.showcase.common.placeholderEmail")} hint={t("designsystem.showcase.common.hintEmailPrivacy")} />
      <DateField label={t("designsystem.showcase.common.labelStartDate")} hint={t("designsystem.showcase.common.hintPickDate")} />
      <SelectField label={t("designsystem.showcase.common.labelRegion")} placeholder={t("designsystem.showcase.common.placeholderRegion")}>
        <SelectItem value="na">{t("designsystem.showcase.common.northAmerica")}</SelectItem>
        <SelectItem value="eu">{t("designsystem.showcase.common.europe")}</SelectItem>
        <SelectItem value="apac">{t("designsystem.showcase.common.asiaPacific")}</SelectItem>
      </SelectField>
      <TextareaField label={t("designsystem.showcase.common.labelNotes")} placeholder={t("designsystem.showcase.common.placeholderNotes")} hint={t("designsystem.showcase.common.hintBrief")} rows={3} />
      <div>
        <OutlinePrimary type="submit" size="medium">
          Submit
        </OutlinePrimary>
      </div>
    </form>
  );
}
