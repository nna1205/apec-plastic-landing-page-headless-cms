import ProductDetail from "@/components/Product/ProductDetail";
import ProductImageCarousel from "@/components/Product/ProductImageCarousel";
import { ProductRecord } from "@/graphql/types/graphql";

const ProductContainer = ({ product }: { product: ProductRecord }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-6 lg:gap-12 lg:flex-row">
      <ProductImageCarousel data={product.productImages} />
      <ProductDetail data={product} />
    </div>
  );
};

export default ProductContainer;
