import Link from "next/link";
import { AppContentContainer } from "@/components/layout/AppContentContainer";
import { Text } from "@/components/ui/atoms/Text";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const FOOTER_EXTERNAL_LINKS = {
  termsCompanies: "https://www.get.expeerly.com/terms-and-conditions-companies",
  about: "https://www.get.expeerly.com/",
  termsReviewers: "https://www.get.expeerly.com/terms-and-conditions-creators",
  privacy: "https://www.get.expeerly.com/privacy-policy",
} as const;

const footerLinkClassName = cn(
  "text-body-small-bold text-foreground-title-subtle no-underline",
  "hover:text-secondary active:text-secondary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
);

type FooterLinkProps = {
  href: string;
  ariaLabel: string;
  children: string;
  external?: boolean;
};

function FooterLink({ href, ariaLabel, children, external = false }: FooterLinkProps) {
  if (external) {
    return (
      <Link
        href={href}
        className={footerLinkClassName}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </Link>
    );
  }

  return (
    <Link href={href} className={footerLinkClassName} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function AppFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <AppContentContainer className="py-8 md:py-10">
        <nav
          className="mx-auto grid w-full max-w-2xl grid-cols-2 gap-6 sm:grid-cols-3 sm:gap-4"
          aria-label={t("marketing.footer.navAriaLabel")}
        >
          <div className="flex flex-col gap-6">
            <FooterLink
              href="mailto:hello@expeerly.com"
              ariaLabel={t("marketing.footer.contactAriaLabel")}
            >
              {t("marketing.footer.contactLabel")}
            </FooterLink>
            <FooterLink
              href={FOOTER_EXTERNAL_LINKS.termsCompanies}
              ariaLabel={t("marketing.footer.termsCompaniesAriaLabel")}
              external
            >
              {t("marketing.footer.termsCompaniesLabel")}
            </FooterLink>
          </div>

          <div className="flex flex-col gap-6">
            <FooterLink
              href={FOOTER_EXTERNAL_LINKS.about}
              ariaLabel={t("marketing.footer.aboutAriaLabel")}
              external
            >
              {t("marketing.footer.aboutLabel")}
            </FooterLink>
            <FooterLink
              href={FOOTER_EXTERNAL_LINKS.termsReviewers}
              ariaLabel={t("marketing.footer.termsReviewersAriaLabel")}
              external
            >
              {t("marketing.footer.termsReviewersLabel")}
            </FooterLink>
          </div>

          <div className="col-span-2 flex flex-col gap-6 sm:col-span-1">
            <FooterLink
              href={FOOTER_EXTERNAL_LINKS.privacy}
              ariaLabel={t("marketing.footer.privacyAriaLabel")}
              external
            >
              {t("marketing.footer.privacyLabel")}
            </FooterLink>
            <Text as="p" variant="body-small-muted">
              {t("marketing.footer.copyright", { year })}
            </Text>
          </div>
        </nav>
      </AppContentContainer>
    </footer>
  );
}
