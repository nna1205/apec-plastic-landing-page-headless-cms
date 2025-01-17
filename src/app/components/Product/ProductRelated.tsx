import { ProductQueryDocument } from "@/graphql/types/graphql";
import ProductThumbnail from "@/components/Product/ProductThumbnail";
import { request } from "@/lib/datocms";

async function ProductRelated({
  productCategory,
}: {
  productCategory: string;
}) {
  const allProductData = await request(ProductQueryDocument, {});

  const relatedProducts = allProductData.allProducts.filter((product) =>
    product.productCategory.url.includes(productCategory)
  );
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-6">
      <div className="bg-green-400 p-6 rounded-xl">
        <h3 className="font-black text-xl text-white line-clamp-2 lg:text-4xl lg:mt-6">
          SẢN PHẨM LIÊN QUAN
        </h3>
      </div>
      {relatedProducts.map((product) => (
        <ProductThumbnail key={product.id} data={product} />
      ))}
    </div>
  );
}

export default ProductRelated;
