import type { Metadata } from "next";
import { AppStubScreen } from "@/components/screens";
import { t } from "@/lib/i18n";

const titleKey = "app.nav.accountSettings";

export const metadata: Metadata = {
  title: t(titleKey),
  description: t("app.stub.description"),
};

export default function BndAccountSettingsPage() {
  return <AppStubScreen titleKey={titleKey} />;
}
