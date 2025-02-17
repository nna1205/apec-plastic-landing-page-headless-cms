import { ProductsDocument, SiteLocale } from "@/graphql/types/graphql";
import ProductThumbnail from "@/components/Product/ProductThumbnail";
import { request } from "@/lib/datocms";
import { getTranslations } from "next-intl/server";

async function ProductRelated({
  productCategory,
  locale,
  fallbackLocale,
}: {
  productCategory: string | undefined;
  locale: SiteLocale;
  fallbackLocale: SiteLocale;
}) {
  const t = await getTranslations("product");
  const allProductData = await request(ProductsDocument, {
    locale: locale,
    fallbackLocale: [fallbackLocale],
  });

  const relatedProducts = allProductData.allProducts.filter((product) =>
    product.productCategory.title.includes(productCategory || "")
  );

  if (!relatedProducts) return null;
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
      <div className="bg-green-400 p-6 rounded-xl">
        <h3 className="font-black text-xl text-white line-clamp-2 lg:text-4xl lg:mt-6">
          {t("related_label")}
        </h3>
      </div>
      {relatedProducts.map((product) => (
        <ProductThumbnail key={product.id} data={product} />
      ))}
    </div>
  );
}

export default ProductRelated;
