export type CommunityProductFixture = {
  ean: string;
  productName: string;
  brandName: string;
  brandSlug: string;
  productSlug: string;
  categorySlug: string;
  imageSrc?: string;
};

/** Prototype EAN catalog for community submit lookup. */
const COMMUNITY_PRODUCTS: CommunityProductFixture[] = [
  {
    ean: "4002512345678",
    productName: "Miele Triflex Performance HX2",
    brandName: "Miele",
    brandSlug: "miele",
    productSlug: "triflex-performance",
    categorySlug: "home-kitchen",
  },
  {
    ean: "8710103891234",
    productName: "Philips Sonicare 9900 Prestige",
    brandName: "Philips",
    brandSlug: "philips",
    productSlug: "sonicare-9900-prestige",
    categorySlug: "beauty-personal-care",
  },
  {
    ean: "4210201309876",
    productName: "Braun Series 9 Shaver",
    brandName: "Braun",
    brandSlug: "braun",
    productSlug: "series-9-shaver",
    categorySlug: "beauty-personal-care",
  },
  {
    ean: "8806094876543",
    productName: "Samsung Bespoke Refrigerator",
    brandName: "Samsung",
    brandSlug: "samsung",
    productSlug: "bespoke-refrigerator",
    categorySlug: "home-kitchen",
  },
];

export function normalizeEan(value: string): string {
  return value.replace(/\D/g, "");
}

export function lookupCommunityProductByEan(eanInput: string): CommunityProductFixture | undefined {
  const ean = normalizeEan(eanInput);
  if (!ean) return undefined;
  return COMMUNITY_PRODUCTS.find((product) => product.ean === ean);
}

export function getCommunityProductDemoEans(): string[] {
  return COMMUNITY_PRODUCTS.map((product) => product.ean);
}
