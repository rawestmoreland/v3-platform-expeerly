"use client";

import Link from "next/link";
import { primaryPinkClassName } from "@/components/ui/atoms/button/buttonClasses";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function ReviewerSubmitReviewCard() {
  return (
    <section className="rounded-lg border border-border bg-surface-muted p-5 text-left">
      <Heading as="h2" variant="title-1">
        {t("app.reviewerWelcome.submitReview.title")}
      </Heading>
      <Text variant="body-small-muted" className="mt-2">
        {t("app.reviewerWelcome.submitReview.body")}
      </Text>
      <Link
        href="/reviewer/submit-review"
        className={cn(primaryPinkClassName("small"), "mt-4 inline-flex w-full justify-center sm:w-auto")}
      >
        {t("app.reviewerWelcome.submitReview.cta")}
      </Link>
    </section>
  );
}
