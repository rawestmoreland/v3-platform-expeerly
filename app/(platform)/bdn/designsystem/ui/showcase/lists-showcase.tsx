import { ContentListItem, OutlinePrimary } from "@/components/ui";
import { t } from "@/lib/i18n";

function getListItems() {
  return [
  {
    title: t("designsystem.showcase.lists.expeerlyReviewedTitle"),
    description: t("designsystem.showcase.lists.expeerlyReviewedDescription"),
    image: "/expeerly_reviewed_MINIMAL.svg",
    action: t("designsystem.showcase.common.viewDetails"),
  },
  {
    title: t("designsystem.showcase.lists.brandAssetTitle"),
    description: t("designsystem.showcase.lists.brandAssetDescription"),
    image: "/expeerly-logo.svg",
    action: t("designsystem.showcase.lists.openAction"),
  },
] as const;
}


export function ListsShowcase() {
  const listItems = getListItems();
  return (
    <div className="grid gap-6">
      <section className="rounded-lg border border-border bg-surface p-5">
        <h2 className="text-title-2 text-foreground-title">{t("designsystem.showcase.lists.imageListItemTitle")}</h2>
        <p className="mt-1 max-w-2xl text-body-small text-foreground-muted">
          {t("designsystem.showcase.lists.imageListItemIntro")}
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface">
          <ul className="divide-y divide-border">
            {listItems.map((item) => (
              <ContentListItem
                key={item.title}
                imageSrc={item.image}
                title={item.title}
                description={item.description}
                action={
                  <OutlinePrimary type="button" size="small">
                    {item.action}
                  </OutlinePrimary>
                }
              />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
