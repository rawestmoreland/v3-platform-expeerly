import type { Metadata } from "next";
import { PageCanvas } from "@/components/layout/PageCanvas";
import { SignInScreen, type SignInScreenMode } from "@/components/screens";
import { t } from "@/lib/i18n";

type SignInPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function resolveMode(searchParams: Record<string, string | string[] | undefined>): SignInScreenMode {
  return "sign-up" in searchParams ? "signup" : "login";
}

export async function generateMetadata({ searchParams }: SignInPageProps): Promise<Metadata> {
  const params = await searchParams;
  const isSignUp = resolveMode(params) === "signup";

  return {
    title: isSignUp ? t("app.auth.signUp.metaTitle") : t("app.auth.signIn.metaTitle"),
    description: isSignUp
      ? t("app.auth.signUp.metaDescription")
      : t("app.auth.signIn.metaDescription"),
  };
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const mode = resolveMode(params);

  return (
    <PageCanvas>
      <SignInScreen mode={mode} />
    </PageCanvas>
  );
}
