import type { Metadata } from "next";
import type { ReactNode } from "react";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t("designsystem.meta.layoutTitle"),
  robots: { index: false, follow: false },
};

export default function DesignSystemLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto w-full max-w-content px-6 py-8 md:px-16 lg:px-20">{children}</div>
    </div>
  );
}
