import Image from "next/image";
import { StarRatingShowcase } from "@/app/(platform)/bdn/designsystem/ui/showcase/star-rating-showcase";
import { t } from "@/lib/i18n";

type AssetCard = {
  id: "logo" | "inverseLogo" | "logoSymbol" | "favicon";
  src: string;
  backgroundClassName: string;
  imageClassName: string;
};

const brandAssetDefs: AssetCard[] = [
  {
    id: "logo",
    src: "/expeerly-logo.svg",
    backgroundClassName: "bg-surface",
    imageClassName: "h-auto w-[180px]",
  },
  {
    id: "inverseLogo",
    src: "/expeerly-logo-negative.svg",
    backgroundClassName: "bg-tooltip",
    imageClassName: "h-auto w-[180px]",
  },
  {
    id: "logoSymbol",
    src: "/expeerly_reviewed_MINIMAL.svg",
    backgroundClassName: "bg-surface",
    imageClassName: "h-20 w-20",
  },
  {
    id: "favicon",
    src: "/expeerly_reviewed_MINIMAL.svg",
    backgroundClassName: "bg-surface",
    imageClassName: "h-8 w-8",
  },
];

function getBrandAssets() {
  return brandAssetDefs.map((asset) => ({
    ...asset,
    title: t(`designsystem.showcase.assets.${asset.id}.title`),
    description: t(`designsystem.showcase.assets.${asset.id}.description`),
    alt: t(`designsystem.showcase.assets.${asset.id}.alt`),
  }));
}

export function AssetsShowcase() {
  const brandAssets = getBrandAssets();

  return (
    <div className="grid gap-8">
      <div className="grid gap-6 md:grid-cols-2">
        {brandAssets.map((asset) => (
          <section key={asset.id} className="rounded-lg border border-border bg-surface p-5">
            <h2 className="text-title-2 text-foreground-title">{asset.title}</h2>
            <p className="mt-1 text-body-small text-foreground-muted">{asset.description}</p>
            <div
              className={`mt-4 flex min-h-40 items-center justify-center rounded-lg border border-border p-6 ${asset.backgroundClassName}`}
            >
              <Image
                src={asset.src}
                alt={asset.alt}
                width={220}
                height={100}
                className={asset.imageClassName}
              />
            </div>
            <code className="mt-3 block text-body-extra-small text-foreground-muted">{asset.src}</code>
          </section>
        ))}
      </div>

      <section>
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.assets.moleculesTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.assets.moleculesIntro")}
        </p>
        <div className="mt-4">
          <StarRatingShowcase />
        </div>
      </section>
    </div>
  );
}