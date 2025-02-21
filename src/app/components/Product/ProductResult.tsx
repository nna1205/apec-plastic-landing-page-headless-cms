import { ProductsQuery } from "@/graphql/types/graphql";
import ProductThumbnail from "@/components/Product/ProductThumbnail";

const ProductResult: React.FC<{ data: ProductsQuery["allProducts"] }> = ({
  data,
}) => {
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 lg:gap-4">
      {data.map((product) => (
        <ProductThumbnail key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductResult;
