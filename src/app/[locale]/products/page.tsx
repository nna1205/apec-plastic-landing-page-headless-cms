import CategoryFilter from "@/components/Category";
import ProductThumbnail from "@/components/Product/ProductThumbnail";
import { request } from "@/lib/datocms";
import {
  PageDocument,
  ProductsDocument,
  type SiteLocale,
} from "@/graphql/types/graphql";
import { routing } from "@/../i18n/routing";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { toNextMetadata } from "@/utils/SEO";
import { notFound } from "next/navigation";

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
  const t = await getTranslations("page_title");
  const pageData = await request(PageDocument, {
    slug: slug,
    locale: locale,
    fallbackLocale: [fallbackLocale],
  });

  if (!pageData.page) {
    notFound();
  }

  const metadata = toNextMetadata(pageData.page?._seoMetaTags || []);
  return {
    ...metadata,
    title: `${pageData.page?.title} | ${t("company_name")}`,
  };
}

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
  const t = await getTranslations();
  const productData = await request(ProductsDocument, {
    locale: locale,
    fallbackLocale: [fallbackLocale],
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

  const resultProducts = productData.allProducts.filter((product) => {
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

  const showCategoryFilter = query.type === "" || query.type === "category";

  return (
    <div className="overflow-x-hidden min-h-screen px-4 py-10 my-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section className="w-full flex flex-col lg:flex-row justify-center gap-3 lg:gap-6">
        {showCategoryFilter && <CategoryFilter data={uniqueCategories} />}
        <main className="w-full lg:w-4/5 flex flex-col">
          <div className="text-3xl font-bold text-slate-800 mb-3">
            {query.type === "search" && resultProducts.length === 0 ? (
              <h1>
                {t("search.result_empty_label")}{" "}
                <span className="text-green-400">{query.value}</span>
              </h1>
            ) : (
              <h1>
                {query.type === "search" &&
                  `${t("search.result_label")}: ${query.value}`}
              </h1>
            )}
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6">
            {resultProducts.map((product) => {
              return <ProductThumbnail key={product.id} data={product} />;
            })}
          </div>
        </main>
      </section>
    </div>
  );
}
