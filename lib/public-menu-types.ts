export type PublicMenuCatalogItem = {
  id: string;
  label: string;
  href: string;
};

export type PublicMenuCatalog = {
  brands: PublicMenuCatalogItem[];
  categories: PublicMenuCatalogItem[];
};
