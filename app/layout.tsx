import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { ClientLocaleBoundary } from "@/components/i18n/ClientLocaleBoundary";
import { LayoutShell } from "@/components/layout";
import { applyRequestLocale } from "@/lib/i18n/request";
import { t } from "@/lib/i18n";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  await applyRequestLocale();
  return {
    title: t("app.layout.title"),
    description: t("app.layout.description"),
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await applyRequestLocale();

  return (
    <html lang={locale}>
      <body className={`${mulish.variable} antialiased`}>
        <ClientLocaleBoundary locale={locale}>
          <LayoutShell>{children}</LayoutShell>
        </ClientLocaleBoundary>
      </body>
    </html>
  );
}
