import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { PageCanvas } from "@/components/layout/PageCanvas";
import { ReviewScreen } from "@/components/screens";
import {
  getCategoryByEnglishSlug,
  getCategorySlug,
} from "@/lib/data/interest-categories-dev";
import { getReviewPlayerPath } from "@/lib/fixtures/video-reviews";
import { getReviewByPath } from "@/lib/fixtures/video-reviews-server";
import { applyRequestLocale } from "@/lib/i18n/request";
import { t } from "@/lib/i18n";
import { pickLocalized } from "@/lib/i18n/content";

type ReviewPageProps = {
  params: Promise<{
    categorySlug: string;
    brandSlug: string;
    productSlug: string;
    reviewId: string;
  }>;
};

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const locale = await applyRequestLocale();
  const resolved = await params;
  const review = getReviewByPath(resolved, locale);
  if (!review) return { title: t("player.notFound.title") };
  return {
    title: pickLocalized(review.pageTitle, locale, "title") ?? review.productName,
    description: pickLocalized(review.metaDescription, locale, "desc"),
  };
}

export default async function ReviewPlayerPage({ params }: ReviewPageProps) {
  const locale = await applyRequestLocale();
  const resolved = await params;
  const review = getReviewByPath(resolved, locale);
  if (!review) notFound();

  const category = getCategoryByEnglishSlug(review.categorySlug);
  if (category) {
    const canonicalCategorySlug = getCategorySlug(category, locale);
    if (resolved.categorySlug !== canonicalCategorySlug) {
      redirect(getReviewPlayerPath(review, locale));
    }
  }

  return (
    <PageCanvas>
      <ReviewScreen review={review} />
    </PageCanvas>
  );
}
