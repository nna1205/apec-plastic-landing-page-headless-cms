import { MetadataRoute } from "next";
import { request } from "@/lib/datocms";
import {
  PageStaticParamsDocument,
  ProductsDocument,
  SiteLocale,
} from "@/graphql/types/graphql";
import { routing } from "@/../i18n/routing";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "apecplastic.vercel.app"
  const locales = routing.locales as SiteLocale[];

  const { allPages } = await request(PageStaticParamsDocument, {});

  const { allProducts } = await request(ProductsDocument, {});

  // Generate URLs for pages
  const pageUrls = allPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `https://${domain}/${locale}/${page.slug}`,
      lastModified: new Date().toISOString(),
    }))
  );

  // Generate URLs for products
  const productUrls = allProducts.flatMap((product) =>
    locales.map((locale) => ({
      url: `https://${domain}/${locale}/products/${product.id}`,
      lastModified: new Date().toISOString(),
    }))
  );

  const result: MetadataRoute.Sitemap = [
    // Merge both page and product URLs and include homepage
    ...pageUrls,
    ...productUrls,
    { url: `https://${domain}`, lastModified: new Date().toISOString() },
  ]

  return result;
}
