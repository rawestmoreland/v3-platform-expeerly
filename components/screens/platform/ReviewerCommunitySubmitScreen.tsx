"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  lookupCommunityProductByEan,
  normalizeEan,
  type CommunityProductFixture,
} from "@/lib/fixtures/community-products";
import { addCommunitySubmission } from "@/lib/fixtures/reviewer-session";
import { Heading } from "@/components/ui/atoms/Heading";
import { Text } from "@/components/ui/atoms/Text";
import { PrimaryPink } from "@/components/ui/atoms/button/PrimaryPink";
import { OutlineNeutral } from "@/components/ui/atoms/button/OutlineNeutral";
import { Ghost } from "@/components/ui/atoms/button/Ghost";
import { Card } from "@/components/ui/composites/Card";
import { FileUploadField } from "@/components/ui/molecules/FileUploadField";
import { InputField } from "@/components/ui/molecules/InputField";
import { ProgressBar } from "@/components/ui/molecules/ProgressBar";
import { StarRating } from "@/components/ui/molecules/video-reviews/StarRating";
import { Label } from "@/components/ui/atoms/Label";
import { HintText } from "@/components/ui/atoms/HintText";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type SubmitStep = "ean" | "receipt" | "video" | "rating" | "confirm" | "success";

const STEPS: SubmitStep[] = ["ean", "receipt", "video", "rating", "confirm"];

const RECEIPT_ACCEPT = "image/*,.pdf,application/pdf";
const VIDEO_ACCEPT = "video/*";
const RECEIPT_MAX_BYTES = 10 * 1024 * 1024;
const VIDEO_MAX_BYTES = 500 * 1024 * 1024;

function stepProgress(step: SubmitStep): number {
  if (step === "success") return 100;
  const index = STEPS.indexOf(step);
  return Math.round(((index + 1) / STEPS.length) * 100);
}

function stepLabel(step: SubmitStep): string {
  switch (step) {
    case "ean":
      return t("app.reviewerCommunitySubmit.steps.ean");
    case "receipt":
      return t("app.reviewerCommunitySubmit.steps.receipt");
    case "video":
      return t("app.reviewerCommunitySubmit.steps.video");
    case "rating":
      return t("app.reviewerCommunitySubmit.steps.rating");
    case "confirm":
      return t("app.reviewerCommunitySubmit.steps.confirm");
    case "success":
      return t("app.reviewerCommunitySubmit.steps.success");
  }
}

export function ReviewerCommunitySubmitScreen() {
  const router = useRouter();
  const [step, setStep] = useState<SubmitStep>("ean");
  const [eanInput, setEanInput] = useState("");
  const [eanError, setEanError] = useState<string | undefined>();
  const [matchedProduct, setMatchedProduct] = useState<CommunityProductFixture | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptError, setReceiptError] = useState<string | undefined>();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoError, setVideoError] = useState<string | undefined>();
  const [starRating, setStarRating] = useState(0);
  const [ratingError, setRatingError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = useMemo(() => stepProgress(step), [step]);

  const handleEanContinue = () => {
    const product = lookupCommunityProductByEan(eanInput);
    if (!product) {
      setMatchedProduct(null);
      setEanError(t("app.reviewerCommunitySubmit.ean.notFound"));
      return;
    }
    setEanError(undefined);
    setMatchedProduct(product);
    setStep("receipt");
  };

  const handleReceiptContinue = () => {
    if (!receiptFile) {
      setReceiptError(t("app.reviewerCommunitySubmit.receipt.required"));
      return;
    }
    setReceiptError(undefined);
    setStep("video");
  };

  const handleVideoContinue = () => {
    if (!videoFile) {
      setVideoError(t("app.reviewerCommunitySubmit.video.required"));
      return;
    }
    setVideoError(undefined);
    setStep("rating");
  };

  const handleRatingContinue = () => {
    if (starRating < 1) {
      setRatingError(t("app.reviewerCommunitySubmit.rating.required"));
      return;
    }
    setRatingError(undefined);
    setStep("confirm");
  };

  const handleSubmit = () => {
    if (!matchedProduct || !receiptFile || !videoFile || starRating < 1) return;
    setIsSubmitting(true);
    window.setTimeout(() => {
      addCommunitySubmission({
        ean: matchedProduct.ean,
        productName: matchedProduct.productName,
        brandName: matchedProduct.brandName,
        brandSlug: matchedProduct.brandSlug,
        productSlug: matchedProduct.productSlug,
        categorySlug: matchedProduct.categorySlug,
        receiptFileName: receiptFile.name,
        videoFileName: videoFile.name,
        starRating,
      });
      setIsSubmitting(false);
      setStep("success");
    }, 600);
  };

  return (
    <div className="mx-auto flex w-full max-w-content flex-col gap-8">
      <div className="text-center md:text-left">
        <Heading as="h1" variant="heading-2">
          {t("app.reviewerCommunitySubmit.title")}
        </Heading>
        <Text variant="body-regular" className="mt-3 max-w-2xl">
          {t("app.reviewerCommunitySubmit.description")}
        </Text>
      </div>

      {step !== "success" ? (
        <ProgressBar
          value={progress}
          label={stepLabel(step)}
          className="max-w-xl"
        />
      ) : null}

      <Card padding="medium" className="max-w-xl">
        {step === "ean" ? (
          <div className="flex flex-col gap-5">
            <div>
              <Heading as="h2" variant="title-2">
                {t("app.reviewerCommunitySubmit.ean.title")}
              </Heading>
              <Text variant="body-small-muted" className="mt-2">
                {t("app.reviewerCommunitySubmit.ean.description")}
              </Text>
            </div>
            <InputField
              label={t("app.reviewerCommunitySubmit.ean.label")}
              name="ean"
              inputMode="numeric"
              autoComplete="off"
              placeholder={t("app.reviewerCommunitySubmit.ean.placeholder")}
              value={eanInput}
              onChange={(event) => {
                setEanInput(normalizeEan(event.target.value));
                if (eanError) setEanError(undefined);
              }}
              hint={eanError}
              state={eanError ? "error" : "default"}
            />
            <Text variant="body-extra-small-muted">
              {t("app.reviewerCommunitySubmit.ean.demoHint")}
            </Text>
            <div className="flex flex-wrap gap-3">
              <PrimaryPink type="button" size="medium" onClick={handleEanContinue}>
                {t("app.reviewerCommunitySubmit.actions.continue")}
              </PrimaryPink>
              <OutlineNeutral type="button" size="medium" onClick={() => router.push("/reviewer")}>
                {t("app.reviewerCommunitySubmit.actions.cancel")}
              </OutlineNeutral>
            </div>
          </div>
        ) : null}

        {step === "receipt" && matchedProduct ? (
          <div className="flex flex-col gap-5">
            <div>
              <Heading as="h2" variant="title-2">
                {t("app.reviewerCommunitySubmit.receipt.title")}
              </Heading>
              <Text variant="body-small-muted" className="mt-2">
                {t("app.reviewerCommunitySubmit.receipt.description")}
              </Text>
            </div>
            <MatchedProductSummary product={matchedProduct} />
            <FileUploadField
              label={t("app.reviewerCommunitySubmit.receipt.label")}
              hint={t("app.reviewerCommunitySubmit.receipt.hint")}
              accept={RECEIPT_ACCEPT}
              maxSizeBytes={RECEIPT_MAX_BYTES}
              state={receiptError ? "error" : "default"}
              error={receiptError}
              onFilesChange={(files) => {
                setReceiptFile(files[0] ?? null);
                if (files[0]) setReceiptError(undefined);
              }}
            />
            <div className="flex flex-wrap gap-3">
              <PrimaryPink type="button" size="medium" onClick={handleReceiptContinue}>
                {t("app.reviewerCommunitySubmit.actions.continue")}
              </PrimaryPink>
              <Ghost type="button" size="medium" onClick={() => setStep("ean")}>
                {t("app.reviewerCommunitySubmit.actions.back")}
              </Ghost>
            </div>
          </div>
        ) : null}

        {step === "video" && matchedProduct ? (
          <div className="flex flex-col gap-5">
            <div>
              <Heading as="h2" variant="title-2">
                {t("app.reviewerCommunitySubmit.video.title")}
              </Heading>
              <Text variant="body-small-muted" className="mt-2">
                {t("app.reviewerCommunitySubmit.video.description")}
              </Text>
            </div>
            <MatchedProductSummary product={matchedProduct} />
            <FileUploadField
              label={t("app.reviewerCommunitySubmit.video.label")}
              hint={t("app.reviewerCommunitySubmit.video.hint")}
              accept={VIDEO_ACCEPT}
              maxSizeBytes={VIDEO_MAX_BYTES}
              state={videoError ? "error" : "default"}
              error={videoError}
              onFilesChange={(files) => {
                setVideoFile(files[0] ?? null);
                if (files[0]) setVideoError(undefined);
              }}
            />
            <div className="flex flex-wrap gap-3">
              <PrimaryPink type="button" size="medium" onClick={handleVideoContinue}>
                {t("app.reviewerCommunitySubmit.actions.continue")}
              </PrimaryPink>
              <Ghost type="button" size="medium" onClick={() => setStep("receipt")}>
                {t("app.reviewerCommunitySubmit.actions.back")}
              </Ghost>
            </div>
          </div>
        ) : null}

        {step === "rating" && matchedProduct ? (
          <div className="flex flex-col gap-5">
            <div>
              <Heading as="h2" variant="title-2">
                {t("app.reviewerCommunitySubmit.rating.title")}
              </Heading>
              <Text variant="body-small-muted" className="mt-2">
                {t("app.reviewerCommunitySubmit.rating.description")}
              </Text>
            </div>
            <MatchedProductSummary product={matchedProduct} />
            <div className="flex flex-col gap-2">
              <Label>{t("app.reviewerCommunitySubmit.rating.label")}</Label>
              <StarRating
                rating={starRating}
                size="large"
                name="community-review-rating"
                onChange={(value) => {
                  setStarRating(value);
                  if (ratingError) setRatingError(undefined);
                }}
              />
              {ratingError ? (
                <HintText className="text-destructive">{ratingError}</HintText>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryPink type="button" size="medium" onClick={handleRatingContinue}>
                {t("app.reviewerCommunitySubmit.actions.continue")}
              </PrimaryPink>
              <Ghost type="button" size="medium" onClick={() => setStep("video")}>
                {t("app.reviewerCommunitySubmit.actions.back")}
              </Ghost>
            </div>
          </div>
        ) : null}

        {step === "confirm" && matchedProduct && receiptFile && videoFile && starRating >= 1 ? (
          <div className="flex flex-col gap-5">
            <div>
              <Heading as="h2" variant="title-2">
                {t("app.reviewerCommunitySubmit.confirm.title")}
              </Heading>
              <Text variant="body-small-muted" className="mt-2">
                {t("app.reviewerCommunitySubmit.confirm.description")}
              </Text>
            </div>
            <dl className="grid gap-3 text-left">
              <SummaryRow
                label={t("app.reviewerCommunitySubmit.confirm.product")}
                value={`${matchedProduct.brandName} · ${matchedProduct.productName}`}
              />
              <SummaryRow
                label={t("app.reviewerCommunitySubmit.confirm.ean")}
                value={matchedProduct.ean}
              />
              <SummaryRow
                label={t("app.reviewerCommunitySubmit.confirm.receipt")}
                value={receiptFile.name}
              />
              <SummaryRow
                label={t("app.reviewerCommunitySubmit.confirm.video")}
                value={videoFile.name}
              />
              <div>
                <dt>
                  <Text variant="body-extra-small-muted">
                    {t("app.reviewerCommunitySubmit.confirm.rating")}
                  </Text>
                </dt>
                <dd className="mt-1">
                  <StarRating rating={starRating} showScore size="default" />
                </dd>
              </div>
            </dl>
            <Text variant="body-extra-small-muted">
              {t("app.reviewerCommunitySubmit.confirm.moderationNote")}
            </Text>
            <div className="flex flex-wrap gap-3">
              <PrimaryPink
                type="button"
                size="medium"
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {t("app.reviewerCommunitySubmit.actions.submit")}
              </PrimaryPink>
              <Ghost type="button" size="medium" onClick={() => setStep("rating")}>
                {t("app.reviewerCommunitySubmit.actions.back")}
              </Ghost>
            </div>
          </div>
        ) : null}

        {step === "success" ? (
          <div className="flex flex-col gap-5">
            <div>
              <Heading as="h2" variant="title-2">
                {t("app.reviewerCommunitySubmit.success.title")}
              </Heading>
              <Text variant="body-small-muted" className="mt-2">
                {t("app.reviewerCommunitySubmit.success.description")}
              </Text>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryPink
                type="button"
                size="medium"
                onClick={() => router.push("/reviewer/myreviews")}
              >
                {t("app.reviewerCommunitySubmit.success.viewMyReviews")}
              </PrimaryPink>
              <OutlineNeutral type="button" size="medium" onClick={() => router.push("/reviewer")}>
                {t("app.reviewerCommunitySubmit.success.backHome")}
              </OutlineNeutral>
            </div>
          </div>
        ) : null}
      </Card>

      {step !== "success" ? (
        <Text variant="body-extra-small-muted" className="max-w-xl">
          <Link href="/reviewer" className={cn("underline-offset-2 hover:underline")}>
            {t("app.reviewerCommunitySubmit.actions.backHome")}
          </Link>
        </Text>
      ) : null}
    </div>
  );
}

function MatchedProductSummary({ product }: { product: CommunityProductFixture }) {
  return (
    <div className="rounded-lg border border-border bg-surface-muted p-4">
      <Text variant="body-extra-small-muted">{t("app.reviewerCommunitySubmit.matched.label")}</Text>
      <Text variant="body-small" className="mt-1 text-body-small-bold text-foreground-title">
        {product.brandName} · {product.productName}
      </Text>
      <Text variant="body-extra-small-muted" className="mt-1">
        {t("app.reviewerCommunitySubmit.matched.ean", { ean: product.ean })}
      </Text>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt>
        <Text variant="body-extra-small-muted">{label}</Text>
      </dt>
      <dd>
        <Text variant="body-small" className="mt-0.5 text-body-small-bold text-foreground-title">
          {value}
        </Text>
      </dd>
    </div>
  );
}
