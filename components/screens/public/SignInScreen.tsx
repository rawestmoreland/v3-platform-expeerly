"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  Ghost,
  InputField,
  PrimaryPink,
  RadioGroupField,
  Text,
} from "@/components/ui";
import { createClient } from "@/lib/supabase/client";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type SignInScreenMode = "login" | "signup";

export interface SignInScreenProps {
  mode: SignInScreenMode;
}

type SignUpStep = "role" | "credentials" | "checkEmail";

const authLinkClassName = cn(
  "text-body-small-bold text-primary underline-offset-2 hover:text-primary-hover hover:underline",
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background",
);

function mapAuthError(message: string | undefined): string {
  const lower = (message ?? "").toLowerCase();
  if (lower.includes("invalid login") || lower.includes("invalid credentials")) {
    return t("app.auth.errors.invalidCredentials");
  }
  if (lower.includes("email not confirmed")) {
    return t("app.auth.errors.emailNotConfirmed");
  }
  if (lower.includes("already registered") || lower.includes("already been registered")) {
    return t("app.auth.errors.emailTaken");
  }
  if (lower.includes("password")) {
    return t("app.auth.errors.weakPassword");
  }
  return t("app.auth.errors.generic");
}

export function SignInScreen({ mode }: SignInScreenProps) {
  const router = useRouter();
  const formId = useId();
  const isSignUp = mode === "signup";

  const [signUpStep, setSignUpStep] = useState<SignUpStep>("role");
  const [role, setRole] = useState("reviewer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [formError, setFormError] = useState<string | undefined>();
  const [infoMessage, setInfoMessage] = useState<string | undefined>();
  const [isBusy, setIsBusy] = useState(false);

  const isReviewerFlow = isSignUp && role === "reviewer" && signUpStep !== "role";

  const cardTitle = (() => {
    if (!isSignUp) return t("app.auth.signIn.title");
    if (signUpStep === "checkEmail") return t("app.auth.signUp.checkEmail.title");
    if (signUpStep === "credentials") return t("app.auth.signUp.reviewerCredentials.title");
    return t("app.auth.signUp.title");
  })();

  const cardDescription = (() => {
    if (!isSignUp) return t("app.auth.signIn.description");
    if (signUpStep === "checkEmail") {
      return t("app.auth.signUp.checkEmail.description", { email });
    }
    if (signUpStep === "credentials") {
      return t("app.auth.signUp.reviewerCredentials.description");
    }
    return t("app.auth.signUp.description");
  })();

  const handleRoleContinue = () => {
    if (role === "reviewer") {
      setSignUpStep("credentials");
      setFormError(undefined);
      return;
    }
    router.push("/company");
  };

  const handleCredentialsSubmit = async () => {
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);
    setFormError(undefined);
    setIsBusy(true);

    try {
      const supabase = createClient();
      const emailRedirectTo = `${window.location.origin}/auth/callback?next=/reviewer`;
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo,
          data: { role: "reviewer" },
        },
      });

      if (error) {
        setFormError(mapAuthError(error.message));
        return;
      }

      // If email confirmations are disabled, session is returned immediately.
      if (data.session) {
        router.push("/reviewer");
        router.refresh();
        return;
      }

      setSignUpStep("checkEmail");
      setInfoMessage(undefined);
    } catch {
      setFormError(t("app.auth.errors.generic"));
    } finally {
      setIsBusy(false);
    }
  };

  const handleLoginSubmit = async () => {
    setFormError(undefined);
    setIsBusy(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setFormError(mapAuthError(error.message));
        return;
      }
      router.push("/reviewer");
      router.refresh();
    } catch {
      setFormError(t("app.auth.errors.generic"));
    } finally {
      setIsBusy(false);
    }
  };

  const handleResendConfirmation = async () => {
    setFormError(undefined);
    setInfoMessage(undefined);
    setIsBusy(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/reviewer`,
        },
      });
      if (error) {
        setFormError(mapAuthError(error.message));
        return;
      }
      setInfoMessage(t("app.auth.signUp.checkEmail.resent"));
    } catch {
      setFormError(t("app.auth.errors.generic"));
    } finally {
      setIsBusy(false);
    }
  };

  const submitLabel = (() => {
    if (!isSignUp) return t("app.auth.signIn.submit");
    if (signUpStep === "checkEmail") return t("app.auth.signUp.checkEmail.submit");
    if (signUpStep === "credentials") return t("app.auth.signUp.reviewerCredentials.submit");
    return t("app.auth.signUp.submit");
  })();

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isSignUp) {
      void handleLoginSubmit();
      return;
    }
    if (signUpStep === "role") {
      handleRoleContinue();
      return;
    }
    if (signUpStep === "credentials") {
      void handleCredentialsSubmit();
      return;
    }
    if (signUpStep === "checkEmail") {
      router.push("/sign-in");
    }
  };

  const showFooterToggle = !isReviewerFlow || signUpStep === "checkEmail";

  return (
    <div className="flex w-full min-h-main-below-header items-center justify-center px-6 py-10 md:py-16">
      <div className="w-full max-w-lg">
        <Card padding="medium" surface="default" className="shadow-sm">
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>

          <CardContent className="mt-6">
            <form id={formId} className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
              {isSignUp && signUpStep === "role" ? (
                <RadioGroupField
                  label={t("app.auth.signUp.roleLabel")}
                  name="signup-role"
                  value={role}
                  onValueChange={setRole}
                  options={[
                    {
                      value: "customer",
                      label: t("app.auth.signUp.roleCustomer"),
                    },
                    {
                      value: "reviewer",
                      label: t("app.auth.signUp.roleReviewer"),
                    },
                  ]}
                />
              ) : null}

              {!isSignUp ? (
                <>
                  <InputField
                    label={t("app.auth.signIn.emailLabel")}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t("app.auth.signIn.emailPlaceholder")}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <InputField
                    label={t("app.auth.signIn.passwordLabel")}
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    placeholder={t("app.auth.signIn.passwordPlaceholder")}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <div className="flex justify-end">
                    <Link href="#" className={authLinkClassName}>
                      {t("app.auth.signIn.forgotPassword")}
                    </Link>
                  </div>
                </>
              ) : null}

              {isSignUp && signUpStep === "credentials" ? (
                <>
                  <InputField
                    label={t("app.auth.signIn.emailLabel")}
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={t("app.auth.signIn.emailPlaceholder")}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <InputField
                    label={t("app.auth.signUp.reviewerCredentials.passwordLabel")}
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder={t("app.auth.signUp.reviewerCredentials.passwordPlaceholder")}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    state={passwordMismatch ? "error" : "default"}
                    required
                  />
                  <InputField
                    label={t("app.auth.signUp.reviewerCredentials.confirmPasswordLabel")}
                    type="password"
                    name="confirm-password"
                    autoComplete="new-password"
                    placeholder={t("app.auth.signUp.reviewerCredentials.confirmPasswordPlaceholder")}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    hint={
                      passwordMismatch
                        ? t("app.auth.signUp.reviewerCredentials.passwordMismatch")
                        : undefined
                    }
                    state={passwordMismatch ? "error" : "default"}
                    required
                  />
                </>
              ) : null}

              {isSignUp && signUpStep === "checkEmail" ? (
                <div className="flex justify-center">
                  <Ghost
                    type="button"
                    size="small"
                    disabled={isBusy}
                    loading={isBusy}
                    onClick={() => void handleResendConfirmation()}
                  >
                    {isBusy
                      ? t("app.auth.signUp.checkEmail.sending")
                      : t("app.auth.signUp.checkEmail.resend")}
                  </Ghost>
                </div>
              ) : null}

              {formError ? (
                <Text variant="body-small" className="text-destructive" role="alert">
                  {formError}
                </Text>
              ) : null}
              {infoMessage ? (
                <Text variant="body-small-muted" role="status">
                  {infoMessage}
                </Text>
              ) : null}

              <PrimaryPink
                type="submit"
                size="large"
                className="w-full"
                loading={isBusy}
                disabled={isBusy}
              >
                {submitLabel}
              </PrimaryPink>

              {isSignUp && signUpStep === "checkEmail" ? (
                <div className="text-center">
                  <Ghost
                    type="button"
                    size="small"
                    onClick={() => {
                      setSignUpStep("credentials");
                      setFormError(undefined);
                      setInfoMessage(undefined);
                    }}
                  >
                    {t("app.auth.signUp.checkEmail.changeEmail")}
                  </Ghost>
                </div>
              ) : null}
            </form>
          </CardContent>

          {showFooterToggle ? (
            <div className="mt-6 border-t border-border pt-5 text-center">
              <Text variant="body-small" as="span">
                {isSignUp ? t("app.auth.signUp.haveAccount") : t("app.auth.signIn.noAccount")}{" "}
                <Link
                  href={isSignUp ? "/sign-in" : "/sign-in?sign-up"}
                  className={authLinkClassName}
                >
                  {isSignUp ? t("app.auth.signUp.logInLink") : t("app.auth.signIn.registerLink")}
                </Link>
              </Text>
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
