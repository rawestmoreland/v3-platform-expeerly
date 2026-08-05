import type { LucideIcon } from "@/components/ui/icons";
import {
  AlertCircleIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  BarcodeIcon,
  CheckIcon,
  ChevronDownIcon,
  CreditCardIcon,
  FacebookIcon,
  GiftIcon,
  GithubIcon,
  HeartIcon,
  InfoIcon,
  InstagramIcon,
  LinkedinIcon,
  MessageSquareIcon,
  MinusIcon,
  PackageCheckIcon,
  PackageIcon,
  PackageOpenIcon,
  PencilIcon,
  PlusIcon,
  ReceiptIcon,
  ScanBarcodeIcon,
  SearchIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StarIcon,
  StoreIcon,
  TagIcon,
  TagsIcon,
  ThumbsUpIcon,
  TruckIcon,
  TwitchIcon,
  TwitterIcon,
  UserIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { tableBodyRowClass } from "./button-matrix";
import { t } from "@/lib/i18n";

/** Round caps/joins; stroke scales up slightly on small pixels so outlines stay legible. */
const outlineCaps = {
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function strokeWidthForSize(px: 12 | 14 | 16 | 20 | 24): number {
  switch (px) {
    case 12:
      return 2.5;
    case 14:
      return 2.25;
    case 16:
    case 20:
    case 24:
      return 2;
    default:
      return 2;
  }
}

function DsLucide({
  icon: Icon,
  sizePx,
  className,
}: {
  icon: LucideIcon;
  sizePx: 12 | 14 | 16 | 20 | 24;
  className?: string;
}) {
  return (
    <Icon
      size={sizePx}
      className={cn("shrink-0 text-foreground-body", className)}
      strokeWidth={strokeWidthForSize(sizePx)}
      {...outlineCaps}
      aria-hidden
    />
  );
}

function getSizeRows() {
  return [
    { label: t("designsystem.showcase.iconography.sizeDense"), px: 12 as const, tailwind: t("designsystem.showcase.iconography.sizeDenseSpec"), usage: t("designsystem.showcase.iconography.sizeDenseUsage") },
    { label: t("designsystem.showcase.iconography.sizeBadge"), px: 14 as const, tailwind: t("designsystem.showcase.iconography.sizeBadgeSpec"), usage: t("designsystem.showcase.iconography.sizeBadgeUsage") },
    { label: t("designsystem.showcase.iconography.sizeDefault"), px: 16 as const, tailwind: t("designsystem.showcase.iconography.sizeDefaultSpec"), usage: t("designsystem.showcase.iconography.sizeDefaultUsage") },
    { label: t("designsystem.showcase.iconography.sizeLargeControl"), px: 20 as const, tailwind: t("designsystem.showcase.iconography.sizeLargeControlSpec"), usage: t("designsystem.showcase.iconography.sizeLargeControlUsage") },
    { label: t("designsystem.showcase.iconography.sizeDisplay"), px: 24 as const, tailwind: t("designsystem.showcase.iconography.sizeDisplaySpec"), usage: t("designsystem.showcase.iconography.sizeDisplayUsage") },
  ];
}

const glyphsInProduct: { name: string; icon: LucideIcon }[] = [
  { name: "Search", icon: SearchIcon },
  { name: "ChevronDown", icon: ChevronDownIcon },
  { name: "Plus", icon: PlusIcon },
  { name: "X", icon: XIcon },
  { name: "Check", icon: CheckIcon },
  { name: "Minus", icon: MinusIcon },
  { name: "Pencil", icon: PencilIcon },
  { name: "ArrowRight", icon: ArrowRightIcon },
  { name: "Info", icon: InfoIcon },
  { name: "AlertCircle", icon: AlertCircleIcon },
  { name: "User", icon: UserIcon },
];

const retailReviewGlyphs: { name: string; icon: LucideIcon }[] = [
  { name: "Store", icon: StoreIcon },
  { name: "ShoppingBag", icon: ShoppingBagIcon },
  { name: "ShoppingCart", icon: ShoppingCartIcon },
  { name: "Package", icon: PackageIcon },
  { name: "PackageCheck", icon: PackageCheckIcon },
  { name: "PackageOpen", icon: PackageOpenIcon },
  { name: "Truck", icon: TruckIcon },
  { name: "Receipt", icon: ReceiptIcon },
  { name: "CreditCard", icon: CreditCardIcon },
  { name: "Gift", icon: GiftIcon },
  { name: "Tag", icon: TagIcon },
  { name: "Tags", icon: TagsIcon },
  { name: "Barcode", icon: BarcodeIcon },
  { name: "ScanBarcode", icon: ScanBarcodeIcon },
  { name: "Star", icon: StarIcon },
  { name: "Heart", icon: HeartIcon },
  { name: "ThumbsUp", icon: ThumbsUpIcon },
  { name: "MessageSquare", icon: MessageSquareIcon },
  { name: "BadgeCheck", icon: BadgeCheckIcon },
];

const socialMediaGlyphs: { name: string; icon: LucideIcon }[] = [
  { name: "Instagram", icon: InstagramIcon },
  { name: "Youtube", icon: YoutubeIcon },
  { name: "Facebook", icon: FacebookIcon },
  { name: "Linkedin", icon: LinkedinIcon },
  { name: "Twitter", icon: TwitterIcon },
  { name: "Twitch", icon: TwitchIcon },
  { name: "Github", icon: GithubIcon },
];

const headerCell =
  "px-3 py-2.5 text-left text-body-small font-bold text-foreground-title-subtle";
const bodyCell = "px-3 py-3 align-middle text-body-small text-foreground-body";

export function IconographyShowcase() {
  const sizeRows = getSizeRows();

  return (
    <div className="grid gap-8">
      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.iconography.strokeCapsTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.iconography.strokeCapsIntro")}
        </p>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.iconography.opticalSizesTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.iconography.opticalSizesIntro")}
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className={headerCell}>{t("designsystem.showcase.iconography.colScale")}</th>
                <th className={headerCell}>{t("designsystem.showcase.iconography.colSpec")}</th>
                <th className={headerCell}>{t("designsystem.showcase.iconography.colSample")}</th>
                <th className={headerCell}>{t("designsystem.showcase.iconography.colTypicalUsage")}</th>
              </tr>
            </thead>
            <tbody>
              {sizeRows.map((row) => (
                <tr key={row.label} className={tableBodyRowClass}>
                  <td className={`${bodyCell} font-bold text-foreground-title`}>{row.label}</td>
                  <td className={`${bodyCell} text-foreground-muted tabular-nums`}>{row.tailwind}</td>
                  <td className={bodyCell}>
                    <span className="inline-flex items-center gap-3">
                      <DsLucide icon={PlusIcon} sizePx={row.px} />
                      <DsLucide icon={SearchIcon} sizePx={row.px} className="text-foreground-muted" />
                    </span>
                  </td>
                  <td className={`${bodyCell} text-foreground-muted`}>{row.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.iconography.glyphsTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.iconography.glyphsIntro")}
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {glyphsInProduct.map(({ name, icon: Glyph }) => (
            <li
              key={name}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface-muted px-3 py-4 text-center"
            >
              <DsLucide icon={Glyph} sizePx={16} />
              <span className="text-body-extra-small text-foreground-muted">{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.iconography.retailTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.iconography.retailIntro")}
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {retailReviewGlyphs.map(({ name, icon: Glyph }) => (
            <li
              key={name}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface-muted px-3 py-4 text-center"
            >
              <DsLucide icon={Glyph} sizePx={16} />
              <span className="text-body-extra-small text-foreground-muted">{name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.iconography.socialTitle")}</h2>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.iconography.socialIntro")}
        </p>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {socialMediaGlyphs.map(({ name, icon: Glyph }) => (
            <li
              key={name}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-surface-muted px-3 py-4 text-center"
            >
              <DsLucide icon={Glyph} sizePx={16} />
              <span className="text-body-extra-small text-foreground-muted">{name}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
