import { ProductsQuery } from "@/graphql/types/graphql";
import Link from "next/link";
import Image from "next/image";

type ProductProps = ProductsQuery["allProducts"][0];

const ProductThumbnail: React.FC<{ data: ProductProps }> = ({ data }) => {
  return (
    <div
      key={data.id}
      className="w-full h-full p-1 lg:p-3 rounded-sm lg:rounded-xl border-2 border-slate-200"
    >
      <div className={`relative w-full border-2 h-32 lg:h-60`}>
        <Image
          src={data.productImages[0].url}
          fill
          sizes="(min-width: 1024px) 50%, 100%"
          alt="product-thumbnail"
        />
      </div>
      <div className="mt-4">
        <span className="text-xs lg:text-sm opacity-80 text-green-400">
          {data.productCategory.title}
        </span>
        <h3 className="text-md lg:text-2xl font-bold">{data.title}</h3>
      </div>
      <Link
        href={`/products/${data.id}`}
        className="flex justify-center items-center mt-6 lg:mt-9 ml-auto w-fit text-sm lg:text-xl text-green-800"
      >
        Chi tiết &#8594;
      </Link>
    </div>
  );
};

export default ProductThumbnail;
