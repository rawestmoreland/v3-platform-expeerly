/**
 * Build lib/fixtures/video-reviews-data.json from data/video_rows.csv
 * and live www.expeerly.com metadata (og:video:actor).
 *
 * Usage: node scripts/build-video-review-fixtures.mjs
 */
import fs from "node:fs";

const CSV_PATH = "data/video_rows.csv";
const OUT_PATH = "lib/fixtures/video-reviews-data.json";

const REVIEW_IDS = [
  "100000001",
  "100000002",
  "100000003",
  "100000004",
  "100000005",
  "100000006",
];

const PATH_BY_ID = {
  "100000001": {
    categorySlug: "home-kitchen",
    brandSlug: "miele",
    productSlug: "triflex-perfomance",
    productName: "Miele Triflex Performance HX2 Cat & Dog",
  },
  "100000002": {
    categorySlug: "home-kitchen",
    brandSlug: "miele",
    productSlug: "triflex-perfomance",
    productName: "Miele Triflex Performance HX2 Cat & Dog",
  },
  "100000003": {
    categorySlug: "home-kitchen",
    brandSlug: "miele",
    productSlug: "triflex-perfomance",
    productName: "Miele Triflex Performance HX2 Cat & Dog",
  },
  "100000004": {
    categorySlug: "home-kitchen",
    brandSlug: "miele",
    productSlug: "triflex-perfomance",
    productName: "Miele Triflex Performance HX2 Cat & Dog",
  },
  "100000005": {
    categorySlug: "home-kitchen",
    brandSlug: "miele",
    productSlug: "triflex-perfomance",
    productName: "Miele Triflex Performance HX2 Cat & Dog",
  },
  "100000006": {
    categorySlug: "home-kitchen",
    brandSlug: "miele",
    productSlug: "triflex-perfomance",
    productName: "Miele Triflex Performance HX2 Cat & Dog",
  },
};

/** @param {string} text */
function parseCsvRecords(text) {
  const records = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || (char === "\r" && next === "\n")) {
      row.push(field);
      field = "";
      if (row.some((cell) => cell.length > 0)) records.push(row);
      row = [];
      if (char === "\r") i += 1;
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    records.push(row);
  }

  return records;
}

/** @param {string} raw */
function parseJsonField(raw) {
  if (!raw || raw === "null") return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

/** @param {unknown} blob */
function toLocalizedSiteTitle(blob) {
  if (!blob || typeof blob !== "object") return undefined;
  /** @type {Record<string, { title?: string }>} */
  const out = {};
  for (const [locale, value] of Object.entries(blob)) {
    if (value && typeof value === "object" && "title" in value) {
      out[locale] = { title: String(value.title) };
    }
  }
  return out;
}

/** @param {unknown} blob */
function toLocalizedDesc(blob) {
  if (!blob || typeof blob !== "object") return undefined;
  /** @type {Record<string, { desc?: string }>} */
  const out = {};
  for (const [locale, value] of Object.entries(blob)) {
    if (value && typeof value === "object") {
      if ("desc" in value) out[locale] = { desc: String(value.desc) };
      if ("text" in value && !("desc" in value)) out[locale] = { desc: String(value.text) };
    }
  }
  return out;
}

/** @param {unknown} blob */
function toLocalizedSummary(blob) {
  if (!blob || typeof blob !== "object") return undefined;
  /** @type {Record<string, { text?: string }>} */
  const out = {};
  for (const [locale, value] of Object.entries(blob)) {
    if (value && typeof value === "object" && "text" in value && value.text) {
      out[locale] = { text: String(value.text) };
    }
  }
  return out;
}

/** @param {unknown} blob */
function toTranscript(blob) {
  if (!blob || typeof blob !== "object") return {};
  /** @type {Record<string, { title?: string; text?: string }>} */
  const out = {};
  for (const [locale, value] of Object.entries(blob)) {
    if (value && typeof value === "object") {
      out[locale] = {
        title: "transcriptTitle" in value ? String(value.transcriptTitle) : undefined,
        text: "transcriptText" in value ? String(value.transcriptText) : undefined,
      };
    }
  }
  return out;
}

/** @param {unknown} blob */
function toFaqs(blob) {
  if (!blob || typeof blob !== "object") return [];
  const items = [];
  for (const entry of Object.values(blob)) {
    if (!entry || typeof entry !== "object") continue;
    /** @type {Record<string, { title?: string; text?: string }>} */
    const localized = {};
    for (const [locale, value] of Object.entries(entry)) {
      if (!value || typeof value !== "object") continue;
      const title = value.faqTitle ?? value.title;
      const text = value.faqAnswer ?? value.text;
      if (title && text) localized[locale] = { title: String(title), text: String(text) };
    }
    if (Object.keys(localized).length > 0) items.push(localized);
  }
  return items;
}

/** @param {string} reviewId */
async function fetchReviewerFromLivePage(reviewId) {
  const path = PATH_BY_ID[reviewId];
  if (!path) return undefined;
  const url = `https://www.expeerly.com/video-reviews/${path.categorySlug}/${path.brandSlug}/${path.productSlug}/${reviewId}`;
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "v3-platform-fixture-builder/1.0" },
    });
    const html = await res.text();
    const actor = html.match(/name="og:video:actor"\s+content="([^"]+)"/)?.[1];
    const thumb = html.match(/property="og:image"\s+content="(https:\/\/image\.mux\.com\/[^"]+)"/)?.[1];
    return { reviewerDisplayName: actor, posterUrl: thumb };
  } catch {
    return undefined;
  }
}

function reviewerFirstName(displayName) {
  if (!displayName) return "Reviewer";
  return displayName.trim().split(/\s+/)[0] ?? "Reviewer";
}

async function main() {
  const csv = fs.readFileSync(CSV_PATH, "utf8");
  const [header, ...rows] = parseCsvRecords(csv);
  const col = Object.fromEntries(header.map((name, index) => [name, index]));

  const reviews = [];

  for (const reviewId of REVIEW_IDS) {
    const row = rows.find((r) => r[col.id] === reviewId);
    if (!row) {
      console.warn(`Missing CSV row for ${reviewId}`);
      continue;
    }

    const path = PATH_BY_ID[reviewId];
    const live = await fetchReviewerFromLivePage(reviewId);
    const playbackId = row[col.playbackId];
    const starRating = Number(row[col.starRating]);
    const videoUrl = row[col.videoUrl];
    const resolution = row[col.resolution];
    const published = row[col.published] === "true";

    reviews.push({
      publicReviewId: reviewId,
      ...path,
      brandName: "Miele",
      playbackId,
      videoUrl,
      posterUrl:
        live?.posterUrl ?? `https://image.mux.com/${playbackId}/thumbnail.png?width=1280&height=720`,
      reviewerAvatarUrl: `https://image.mux.com/${playbackId}/thumbnail.jpg?width=200&height=200&fit_mode=smartcrop`,
      starRating: Number.isFinite(starRating) ? starRating : 0,
      resolution,
      published,
      reviewerDisplayName: live?.reviewerDisplayName,
      reviewerName: reviewerFirstName(live?.reviewerDisplayName),
      videoTitle: toLocalizedSiteTitle(parseJsonField(row[col.videoTitle])),
      pageTitle: toLocalizedSiteTitle(parseJsonField(row[col.siteTitle])),
      metaDescription: toLocalizedDesc(parseJsonField(row[col.metaDescription])),
      summary: toLocalizedSummary(parseJsonField(row[col.summary])),
      transcript: toTranscript(parseJsonField(row[col.transcript])),
      faqs: toFaqs(parseJsonField(row[col.faqs])),
      product: {
        gtinEan: "4002512345678",
        vendorProductNumber: "11828560",
        buyLink: "https://www.miele.com/",
      },
    });
  }

  const avgRating =
    reviews.reduce((sum, review) => sum + review.starRating, 0) / (reviews.length || 1);

  const brands = [
    {
      slug: "miele",
      name: "Miele",
      logoSrc: "/brand-logos/miele.svg",
      websiteUrl: "https://www.miele.com/",
      rating: Math.round(avgRating * 10) / 10,
      reviewsCount: reviews.length,
      siteTitle: {
        en: { title: "Miele Video Reviews" },
        de: { title: "Miele Video-Bewertungen" },
      },
      metaDescription: {
        en: {
          desc: "Watch authentic Miele product video reviews from real expeerly testers.",
        },
      },
      bodyText: {
        en: {
          text: "Discover honest video reviews of Miele home appliances from real expeerly testers. From cordless vacuums to kitchen essentials, see how products perform in everyday use before you buy.",
        },
        de: {
          text: "Entdecke ehrliche Video-Bewertungen von Miele Haushaltsgeräten von echten expeerly Testern. Sieh, wie Produkte im Alltag abschneiden, bevor du kaufst.",
        },
      },
      footerText: {
        en: {
          text: "Miele video reviews on Expeerly are created by independent testers sharing personal experiences. Ratings and opinions reflect individual use cases.",
        },
      },
    },
    {
      slug: "dyson",
      name: "Dyson",
      logoSrc: "/brand-logos/dyson.svg",
      websiteUrl: "https://www.dyson.com/",
      rating: 4.6,
      reviewsCount: 0,
      siteTitle: { en: { title: "Dyson Video Reviews" } },
      metaDescription: {
        en: { desc: "Watch authentic Dyson product video reviews from real expeerly testers." },
      },
      bodyText: {
        en: {
          text: "Discover honest video reviews of Dyson home technology from real expeerly testers before you buy.",
        },
      },
    },
    {
      slug: "bamix",
      name: "Bamix",
      logoSrc: "/brand-logos/bamix.svg",
      websiteUrl: "https://www.bamix.com/",
      rating: 4.7,
      reviewsCount: 0,
      siteTitle: { en: { title: "Bamix Video Reviews" } },
      metaDescription: {
        en: { desc: "Watch authentic Bamix product video reviews from real expeerly testers." },
      },
      bodyText: {
        en: {
          text: "See how Bamix kitchen tools perform in real homes through independent expeerly video reviews.",
        },
      },
    },
    {
      slug: "canon",
      name: "Canon",
      logoSrc: "/brand-logos/canon.svg",
      websiteUrl: "https://www.canon.com/",
      rating: 4.5,
      reviewsCount: 0,
      siteTitle: { en: { title: "Canon Video Reviews" } },
      metaDescription: {
        en: { desc: "Watch authentic Canon product video reviews from real expeerly testers." },
      },
      bodyText: {
        en: {
          text: "Watch Canon video reviews on expeerly – cameras, printers and more to help you find what fits your needs. On expeerly you'll find video reviews of Canon products from the official online store – whether cameras, printers, lenses or accessories. You'll quickly see the key features, how the devices perform in daily use, and if they suit your needs. The store offers a wide range, free shipping from CHF 30 and usually 2 years warranty on hardware.",
        },
      },
    },
  ];

  const payload = { brands, reviews };
  fs.writeFileSync(OUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Wrote ${reviews.length} reviews to ${OUT_PATH}`);
}

main();
