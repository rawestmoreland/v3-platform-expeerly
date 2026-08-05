import { getBrandBySlug } from "@/lib/fixtures/video-reviews";
import { formatUiDate, t } from "@/lib/i18n";

export type ReviewerCampaignStatus = "open" | "applied" | "closed";

export type ReviewerCampaignRowData = {
  id: string;
  brandLogoSrc: string;
  title: string;
  metaParts: string[];
  endingSoon?: boolean;
  status: ReviewerCampaignStatus;
};

export type ReviewerCampaignItemId =
  | "mieleCordlessLaunch"
  | "mieleHomeKitchen"
  | "dysonAirwrap"
  | "philipsAirfryer"
  | "samsungBespoke"
  | "boschPowerTools"
  | "canonMirrorless"
  | "sonyHeadphones"
  | "garminFitnessWatch";

export type ReviewerCampaignFixture = {
  id: string;
  brandSlug: string;
  categorySlug: string;
  itemId: ReviewerCampaignItemId;
  dueAt: string;
  endingSoon?: boolean;
  status: ReviewerCampaignStatus;
};

const CAMPAIGN_DUE_TIME_ZONE = "Europe/Zurich";

function campaignItemKey(itemId: ReviewerCampaignItemId, field: "title" | "reward" | "language") {
  return `app.reviewerCampaigns.items.${itemId}.${field}` as const;
}

const REVIEWER_CAMPAIGNS: ReviewerCampaignFixture[] = [
  {
    id: "miele-cordless-launch",
    brandSlug: "miele",
    categorySlug: "home-kitchen",
    itemId: "mieleCordlessLaunch",
    dueAt: "2026-06-17T10:00:00+02:00",
    endingSoon: true,
    status: "open",
  },
  {
    id: "miele-home-kitchen",
    brandSlug: "miele",
    categorySlug: "home-kitchen",
    itemId: "mieleHomeKitchen",
    dueAt: "2026-07-15T23:59:00+02:00",
    status: "applied",
  },
  {
    id: "dyson-airwrap",
    brandSlug: "dyson",
    categorySlug: "beauty-personal-care",
    itemId: "dysonAirwrap",
    dueAt: "2026-08-10T18:00:00+02:00",
    status: "open",
  },
  {
    id: "philips-airfryer",
    brandSlug: "philips",
    categorySlug: "home-kitchen",
    itemId: "philipsAirfryer",
    dueAt: "2026-08-22T12:00:00+02:00",
    status: "open",
  },
  {
    id: "samsung-bespoke",
    brandSlug: "samsung",
    categorySlug: "home-kitchen",
    itemId: "samsungBespoke",
    dueAt: "2026-09-01T09:00:00+02:00",
    status: "applied",
  },
  {
    id: "bosch-power-tools",
    brandSlug: "bosch",
    categorySlug: "home-kitchen",
    itemId: "boschPowerTools",
    dueAt: "2026-09-15T17:00:00+02:00",
    status: "open",
  },
  {
    id: "canon-mirrorless",
    brandSlug: "canon",
    categorySlug: "electronics-gadgets",
    itemId: "canonMirrorless",
    dueAt: "2026-08-28T18:00:00+02:00",
    status: "open",
  },
  {
    id: "sony-headphones",
    brandSlug: "sony",
    categorySlug: "electronics-gadgets",
    itemId: "sonyHeadphones",
    dueAt: "2026-09-05T12:00:00+02:00",
    status: "open",
  },
  {
    id: "garmin-fitness-watch",
    brandSlug: "garmin",
    categorySlug: "sports-outdoors",
    itemId: "garminFitnessWatch",
    dueAt: "2026-09-20T10:00:00+02:00",
    status: "open",
  },
];

function calendarDayInTimeZone(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatCampaignDueLabel(dueAt: string): string {
  const due = new Date(dueAt);
  const isToday =
    calendarDayInTimeZone(due, CAMPAIGN_DUE_TIME_ZONE) ===
    calendarDayInTimeZone(new Date(), CAMPAIGN_DUE_TIME_ZONE);

  if (isToday) {
    const time = new Intl.DateTimeFormat("en-GB", {
      timeZone: CAMPAIGN_DUE_TIME_ZONE,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(due);

    return t("app.reviewerCampaigns.dueToday", { time: `${time} CET` });
  }

  const date = formatUiDate(due, {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: CAMPAIGN_DUE_TIME_ZONE,
  });

  return t("app.reviewerCampaigns.dueOnDate", { date });
}

export function getReviewerCampaignTitleKey(itemId: ReviewerCampaignItemId) {
  return campaignItemKey(itemId, "title");
}

export function getReviewerCampaignRewardKey(itemId: ReviewerCampaignItemId) {
  return campaignItemKey(itemId, "reward");
}

export function getReviewerCampaignLanguageKey(itemId: ReviewerCampaignItemId) {
  return campaignItemKey(itemId, "language");
}

export function getReviewerCampaigns(): Array<
  ReviewerCampaignFixture & { brandName: string; brandLogoSrc: string }
> {
  return REVIEWER_CAMPAIGNS.flatMap((campaign) => {
    const brand = getBrandBySlug(campaign.brandSlug);
    if (!brand) {
      return [];
    }

    return [
      {
        ...campaign,
        brandName: brand.name,
        brandLogoSrc: brand.logoSrc,
      },
    ];
  });
}
