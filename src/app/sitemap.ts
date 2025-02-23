import { MetadataRoute } from "next";
import { request } from "@/lib/datocms";
import {
  PageStaticParamsDocument,
  ProductsDocument,
  type SiteLocale,
} from "@/graphql/types/graphql";
import { routing } from "@/../i18n/routing";

export async function GET(): Promise<MetadataRoute.Sitemap> {
  const locales = routing.locales as SiteLocale[];

  // Fetch all pages from DatoCMS
  const { allPages } = await request(PageStaticParamsDocument, {});

  // Fetch all products from DatoCMS
  const { allProducts } = await request(ProductsDocument, {});

  // Generate URLs for pages
  const pageUrls = allPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `https://yourdomain.com/${locale}/${page.slug}`,
      lastModified: new Date().toISOString(),
    }))
  );

  // Generate URLs for products
  const productUrls = allProducts.flatMap((product) =>
    locales.map((locale) => ({
      url: `https://yourdomain.com/${locale}/products/${product.id}`,
      lastModified: new Date().toISOString(),
    }))
  );

  // Merge both page and product URLs and include homepage
  return [
    ...pageUrls,
    ...productUrls,
    { url: "https://yourdomain.com", lastModified: new Date().toISOString() },
  ];
}
