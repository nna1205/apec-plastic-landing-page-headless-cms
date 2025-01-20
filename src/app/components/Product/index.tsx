import ProductDetail from "@/components/Product/ProductDetail";
import ProductImageCarousel from "@/components/Product/ProductImageCarousel";
import { ProductQuery } from "@/graphql/types/graphql";

const ProductContainer = ({ data }: { data: ProductQuery["product"] }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-6 lg:gap-12 lg:flex-row">
      <ProductImageCarousel data={data} />
      <ProductDetail data={data} />
    </div>
  );
};

export default ProductContainer;
