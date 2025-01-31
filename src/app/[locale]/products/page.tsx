import CategoryFilter from "@/components/Category";
import ProductThumbnail from "@/components/Product/ProductThumbnail";
import { request } from "@/lib/datocms";
import { ProductsDocument, type SiteLocale } from "@/graphql/types/graphql";
import { getFallbackLocale } from "@/i18n/setting";

interface SearchQueryProps {
  type: string;
  value: string;
}

export default async function Page(props: {
  params: Promise<{ locale: SiteLocale }>;
  searchParams?: Promise<{
    type?: string;
    value?: string;
  }>;
}) {
  const { locale } = await props.params;
  const fallbackLocale = await getFallbackLocale();
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
      return product.title.includes(query.value.toLowerCase());
    }
  });

  const showCategoryFilter = query.type === "" || query.type === "category";

  return (
    <div className="w-screen min-h-screen px-4 py-10 my-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section className="w-full flex flex-col lg:flex-row justify-center gap-3 lg:gap-6">
        {showCategoryFilter && <CategoryFilter data={uniqueCategories} />}
        <main className="w-full lg:w-4/5 flex flex-col">
          <div className="text-3xl font-bold text-slate-800 mb-3">
            {query.type === "search" && resultProducts.length === 0 ? (
              <h1>
                Không tìm thấy kết quả giống với{" "}
                <span className="text-green-400">{query.value}</span>
              </h1>
            ) : (
              <h1>
                {query.type === "search" && `Kết quả cho: ${query.value}`}
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
