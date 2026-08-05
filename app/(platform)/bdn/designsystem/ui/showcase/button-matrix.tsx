import {
  ArrowRightIcon,
  InfoIcon,
  PencilIcon,
  PlusIcon,
  XIcon,
} from "@/components/ui/icons";
import type { ComponentType, ReactNode } from "react";
import { DestructiveRed, Ghost, IconButton, OutlineDestructive, OutlineNeutral, OutlinePrimary, PrimaryPink } from "@/components/ui";
import type { IconButtonVariant } from "@/components/ui/atoms/button/IconButton";
import { t } from "@/lib/i18n";

export type SizedButton = ComponentType<{
  size?: "large" | "medium" | "small";
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}>;

export function getSizedVariants(): { label: string; Component: SizedButton }[] {
  return [
  { label: t("designsystem.showcase.buttonMatrix.variantsPrimary"), Component: PrimaryPink as unknown as SizedButton },
  { label: t("designsystem.showcase.buttonMatrix.variantsOutline"), Component: OutlinePrimary as unknown as SizedButton },
  { label: t("designsystem.showcase.buttonMatrix.variantsOutlineNeutral"), Component: OutlineNeutral as unknown as SizedButton },
  { label: t("designsystem.showcase.buttonMatrix.variantsGhost"), Component: Ghost as unknown as SizedButton },
  { label: t("designsystem.showcase.buttonMatrix.variantsDestructive"), Component: DestructiveRed as unknown as SizedButton },
  { label: t("designsystem.showcase.buttonMatrix.variantsDestructiveOutline"), Component: OutlineDestructive as unknown as SizedButton },
];
}

export function getIconVariants(): {
  variant: IconButtonVariant;
  label: string;
  aria: string;
  iconLarge: ReactNode;
  iconSmall: ReactNode;
}[] {
  return [
  {
    variant: "primary",
    label: t("designsystem.showcase.buttonMatrix.variantsPrimary"),
    aria: t("designsystem.showcase.buttonMatrix.ariaAdd"),
    iconLarge: <PlusIcon className="h-5 w-5" />,
    iconSmall: <PlusIcon className="h-4 w-4" />,
  },
  {
    variant: "outline",
    label: t("designsystem.showcase.buttonMatrix.variantsOutline"),
    aria: t("designsystem.showcase.buttonMatrix.ariaEdit"),
    iconLarge: <PencilIcon className="h-5 w-5" />,
    iconSmall: <PencilIcon className="h-4 w-4" />,
  },
  {
    variant: "ghost",
    label: t("designsystem.showcase.buttonMatrix.variantsGhost"),
    aria: t("designsystem.showcase.buttonMatrix.ariaEdit"),
    iconLarge: <PencilIcon className="h-5 w-5" />,
    iconSmall: <PencilIcon className="h-4 w-4" />,
  },
  {
    variant: "outline-neutral",
    label: t("designsystem.showcase.buttonMatrix.variantsOutlineNeutral"),
    aria: t("designsystem.showcase.buttonMatrix.ariaMoreOptions"),
    iconLarge: <InfoIcon className="h-5 w-5" />,
    iconSmall: <InfoIcon className="h-4 w-4" />,
  },
  {
    variant: "destructive",
    label: t("designsystem.showcase.buttonMatrix.variantsDestructive"),
    aria: t("designsystem.showcase.common.delete"),
    iconLarge: <XIcon className="h-5 w-5" />,
    iconSmall: <XIcon className="h-4 w-4" />,
  },
  {
    variant: "outline-destructive",
    label: t("designsystem.showcase.buttonMatrix.variantsDestructiveOutline"),
    aria: t("designsystem.showcase.common.delete"),
    iconLarge: <XIcon className="h-5 w-5" />,
    iconSmall: <XIcon className="h-4 w-4" />,
  },
];
}

export const headerCellClass =
  "px-3 py-2.5 text-body-small font-bold text-foreground-title-subtle";
export const variantCellClass =
  "px-3 py-3 align-middle text-body-small-bold text-foreground-body w-44";
export const bodyCellClass = "px-3 py-3 align-middle text-body-small text-foreground-body";

/** Body row chrome for design-system / data tables. */
export const tableBodyRowClass =
  "border-b border-border last:border-b-0 transition-colors hover:bg-background";

function VariantRow({ label, Component }: { label: string; Component: SizedButton }) {
  return (
    <tr className={tableBodyRowClass}>
      <td className={variantCellClass}>{label}</td>
      <td className={bodyCellClass}>
        <Component size="large">{label}</Component>
      </td>
      <td className={bodyCellClass}>
        <Component size="medium">{label}</Component>
      </td>
      <td className={bodyCellClass}>
        <Component size="small">{label}</Component>
      </td>
    </tr>
  );
}

function IconRow({
  variant,
  label,
  aria,
  iconLarge,
  iconSmall,
}: {
  variant: IconButtonVariant;
  label: string;
  aria: string;
  iconLarge: ReactNode;
  iconSmall: ReactNode;
}) {
  return (
    <tr className={tableBodyRowClass}>
      <td className={variantCellClass}>{label}</td>
      <td className={bodyCellClass}>
        <IconButton variant={variant} size="large" icon={iconLarge} aria-label={aria} />
      </td>
      <td className={bodyCellClass}>
        <IconButton variant={variant} size="medium" icon={iconSmall} aria-label={aria} />
      </td>
      <td className={bodyCellClass}>
        <IconButton variant={variant} size="small" icon={iconSmall} aria-label={aria} />
      </td>
    </tr>
  );
}

function WithIconRow({ label, Component }: { label: string; Component: SizedButton }) {
  return (
    <tr className={tableBodyRowClass}>
      <td className={variantCellClass}>{label}</td>
      <td className={bodyCellClass}>
        <Component iconLeft={<PlusIcon className="h-4 w-4" />}>{label}</Component>
      </td>
      <td className={bodyCellClass}>
        <Component iconRight={<ArrowRightIcon className="h-4 w-4" />}>{label}</Component>
      </td>
    </tr>
  );
}

function StatesRow({ label, Component }: { label: string; Component: SizedButton }) {
  return (
    <tr className={tableBodyRowClass}>
      <td className={variantCellClass}>{label}</td>
      <td className={bodyCellClass}>
        <Component>{label}</Component>
      </td>
      <td className={bodyCellClass}>
        <Component disabled>{label}</Component>
      </td>
      <td className={bodyCellClass}>
        <Component loading>{label}</Component>
      </td>
    </tr>
  );
}

/** Matrix tables used on the Buttons page and as a row-pattern reference on Tables & rows. */
export function ButtonSizingMatrix() {
  const sizedVariants = getSizedVariants();
  const iconVariants = getIconVariants();

  return (
    <div className="grid gap-8">
      <div>
        <h3 className="text-body-small-bold text-foreground-title">
          {t("designsystem.showcase.buttonMatrix.variantsSizesTitle")}
        </h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className={`${headerCellClass} w-44`}>{t("designsystem.showcase.buttonMatrix.colVariant")}</th>
                <th className={headerCellClass}>{t("designsystem.showcase.buttonMatrix.colLarge")}</th>
                <th className={headerCellClass}>{t("designsystem.showcase.buttonMatrix.colMedium")}</th>
                <th className={headerCellClass}>{t("designsystem.showcase.buttonMatrix.colSmall")}</th>
              </tr>
            </thead>
            <tbody>
              {sizedVariants.map((v) => (
                <VariantRow key={v.label} label={v.label} Component={v.Component} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.buttonMatrix.withIconsTitle")}</h3>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.buttonMatrix.withIconsIntro")}
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className={`${headerCellClass} w-44`}>{t("designsystem.showcase.buttonMatrix.colVariant")}</th>
                <th className={headerCellClass}>{t("designsystem.showcase.buttonMatrix.colIconLeft")}</th>
                <th className={headerCellClass}>{t("designsystem.showcase.buttonMatrix.colIconRight")}</th>
              </tr>
            </thead>
            <tbody>
              {sizedVariants.map((v) => (
                <WithIconRow key={v.label} label={v.label} Component={v.Component} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.buttonMatrix.iconOnlyTitle")}</h3>
        <p className="mt-1 text-body-small text-foreground-muted">
          {t("designsystem.showcase.buttonMatrix.iconOnlyIntro")}
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left">
            <thead>
              <tr className="border-b border-border">
                <th className={`${headerCellClass} w-44`}>{t("designsystem.showcase.buttonMatrix.colVariant")}</th>
                <th className={headerCellClass}>{t("designsystem.showcase.buttonMatrix.colLarge")}</th>
                <th className={headerCellClass}>{t("designsystem.showcase.buttonMatrix.colMedium")}</th>
                <th className={headerCellClass}>{t("designsystem.showcase.buttonMatrix.colSmall")}</th>
              </tr>
            </thead>
            <tbody>
              {iconVariants.map((v) => (
                <IconRow key={v.label} {...v} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function ButtonStatesTable() {
  const sizedVariants = getSizedVariants();

  return (
    <div>
      <h3 className="text-body-small-bold text-foreground-title">{t("designsystem.showcase.buttonMatrix.statesTitle")}</h3>
      <p className="mt-1 text-body-small text-foreground-muted">
        {t("designsystem.showcase.buttonMatrix.statesIntro")}
      </p>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border">
              <th className={`${headerCellClass} w-44`}>{t("designsystem.showcase.buttonMatrix.colVariant")}</th>
              <th className={headerCellClass}>{t("designsystem.showcase.buttonMatrix.colDefault")}</th>
              <th className={headerCellClass}>{t("designsystem.showcase.buttonMatrix.colDisabled")}</th>
              <th className={headerCellClass}>{t("designsystem.showcase.buttonMatrix.colLoading")}</th>
            </tr>
          </thead>
          <tbody>
            {sizedVariants.map((v) => (
              <StatesRow key={v.label} label={v.label} Component={v.Component} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
