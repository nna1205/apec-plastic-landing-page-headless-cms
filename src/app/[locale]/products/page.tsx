import CategoryFilter from "@/app/components/Category";
import ProductThumbnail from "@/app/components/Product/ProductThumbnail";
import { request } from "@/app/lib/datocms";
import {
  PageDocument,
  ProductsDocument,
  type SiteLocale,
} from "@/app/graphql/types/graphql";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { toNextMetadata } from "@/app/utils/SEO";
import { notFound } from "next/navigation";
import { PackageX } from "lucide-react";
import { useTranslations } from "next-intl";

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
    fallbackLocale: [fallbackLocale as SiteLocale],
  });

  if (!pageData.page) {
    notFound();
  }

  return toNextMetadata(pageData.page?._seoMetaTags || []);
}

const NotFoundResultBanner = ({ query }: { query: string }) => {
  const t = useTranslations("search");
  return (
    <div className="w-full flex justify-start items-center gap-3 text-center p-3 mb-3 border border-gray-400 bg-gray-200 rounded-xl">
      <PackageX size={24} />
      <div className="text-start">
        <h1 className="text-base">
          {t("result_empty_label")}{" "}
          <span className="font-bold text-green-800">
            &ldquo;{query}&rdquo;
          </span>
        </h1>
        <p className="text-xs opacity-60">{t("result_empty_description")}</p>
      </div>
    </div>
  );
};

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
  const t = await getTranslations("search");
  const productData = await request(ProductsDocument, {
    locale: locale,
    fallbackLocale: [fallbackLocale as SiteLocale],
  });
  const searchParams = await props.searchParams;

  const query: SearchQueryProps = {
    type: searchParams?.type || "",
    value: searchParams?.value || "",
  };

  const uniqueCategories = [
    ...new Map(
      productData.allProducts.map((product) => [
        product.productCategory.id,
        product.productCategory,
      ])
    ).values(),
  ];

  let resultProducts = productData.allProducts.filter((product) => {
    // If both type and value are empty strings, return all products
    if (!query.type && !query.value) {
      return true;
    } else if (query.type === "category") {
      // Filter by category if type is "category"
      return product.productCategory.url.includes(query.value.toLowerCase());
    } else {
      // Filter by product name otherwise
      return product.title.toLowerCase().includes(query.value.toLowerCase());
    }
  });

  // If search returns no results, keep all products but still show the banner
  const showNotFoundBanner =
    query.type === "search" && resultProducts.length === 0;
  if (showNotFoundBanner) {
    resultProducts = productData.allProducts;
  }

  return (
    <div className="w-screen bg-gray-100 min-h-screen px-4 py-10 mt-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {showNotFoundBanner && <NotFoundResultBanner query={query.value} />}
      <section className="w-full flex flex-col lg:flex-row justify-center gap-3 lg:gap-6">
        <CategoryFilter data={uniqueCategories} />
        <main className="w-full lg:w-4/5 flex flex-col">
          {query.type === "search" && !showNotFoundBanner && (
            <div className="flex justify-start items-center text-xl text-slate-800 mb-3 gap-1">
              <h1>
                {t("result_label")}{" "}
                <span className="font-bold text-green-800">
                  &ldquo;{query.value}&rdquo;
                </span>
              </h1>
            </div>
          )}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
            {resultProducts.map((product) => {
              return <ProductThumbnail key={product.id} data={product} />;
            })}
          </div>
        </main>
      </section>
    </div>
  );
}
