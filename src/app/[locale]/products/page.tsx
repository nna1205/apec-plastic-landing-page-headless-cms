import CategoryFilter from "@/components/Category";
import ProductResult from "@/components/Product/ProductResult";
import ProductResultBanner from "@/components/Product/ProductResultBanner";
import { request } from "@/lib/datocms";
import {
  PageDocument,
  ProductsDocument,
  type SiteLocale,
} from "@/graphql/types/graphql";
import { routing } from "@/../i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { toNextMetadata } from "@/utils/SEO";
import { notFound } from "next/navigation";
import { cache } from "react";

interface SearchQueryProps {
  type: string;
  value: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: SiteLocale }>;
}) {
  const { slug, locale } = await params;
  const fallbackLocale = routing.defaultLocale;
  const pageData = await request(PageDocument, {
    slug: slug,
    locale: locale,
    fallbackLocale: [fallbackLocale],
  });

  if (!pageData.page) {
    notFound();
  }

  return toNextMetadata(pageData.page?._seoMetaTags || []);
}

const fetchProducts = cache(
  async (locale: SiteLocale, fallbackLocale: SiteLocale) => {
    const productData = await request(ProductsDocument, {
      locale: locale,
      fallbackLocale: [fallbackLocale],
    });
    return productData.allProducts;
  }
);

export default async function Page(props: {
  params: Promise<{ locale: SiteLocale }>;
  searchParams?: Promise<{
    type?: string;
    value?: string;
  }>;
}) {
  const { locale } = await props.params;
  const fallbackLocale = routing.defaultLocale;
  setRequestLocale(locale);

  const productData = await fetchProducts(locale, fallbackLocale);
  const searchParams = await props.searchParams;

  const query: SearchQueryProps = {
    type: searchParams?.type || "",
    value: searchParams?.value || "",
  };

  let resultProducts = productData;

  if (query.type && query.value) {
    switch (query.type) {
      case "category":
        resultProducts = resultProducts.filter(
          (product) => product.productCategory.id === query.value
        );
        break;
      case "search":
        resultProducts = resultProducts.filter((product) =>
          product.title.toLowerCase().includes(query.value.toLowerCase())
        );
        break;
      default:
        break;
    }
  }

  const showNotFoundBanner =
    query.type === "search" && resultProducts.length === 0;

  // Manually reset result to all products
  // allow users keep browsing
  if (showNotFoundBanner) {
    resultProducts = productData;
  }

  return (
    <div className="w-screen bg-gray-100 min-h-screen px-4 py-10 mt-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section className="w-full flex flex-col lg:flex-row justify-center gap-3 lg:gap-6">
        <CategoryFilter data={productData} />
        <main className="w-full lg:w-4/5 flex flex-col">
          {query.type === "search" && (
            <ProductResultBanner
              query={query.value}
              showNotFoundBanner={showNotFoundBanner}
            />
          )}
          <ProductResult data={resultProducts} />
        </main>
      </section>
    </div>
  );
}
