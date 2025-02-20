import {
  ProductsDocument,
  ProductQuery,
  SiteLocale,
} from "@/graphql/types/graphql";
import ProductThumbnail from "@/components/Product/ProductThumbnail";
import { request } from "@/lib/datocms";
import { getTranslations } from "next-intl/server";

async function ProductRelated({
  product,
  locale,
  fallbackLocale,
}: {
  product: ProductQuery["product"];
  locale: SiteLocale;
  fallbackLocale: SiteLocale;
}) {
  const t = await getTranslations("product");
  const allProductData = await request(ProductsDocument, {
    locale: locale,
    fallbackLocale: [fallbackLocale],
  });

  const relatedProducts = allProductData.allProducts.filter(
    (item) =>
      item.id !== product?.id &&
      item.productCategory.title.includes(product?.productCategory.title || "")
  );

  if (!relatedProducts) return null;
  return (
    <div className="w-full flex flex-col gap-6">
      <h3 className="mr-auto font-black text-green-400 text-xl lg:text-4xl">
        {t("related_label")}
      </h3>
      <div className="w-full grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
        {relatedProducts.map((product) => (
          <ProductThumbnail key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductRelated;
