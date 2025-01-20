import { ProductQuery } from "@/graphql/types/graphql";
import Link from "next/link";
import ProductShare from "@/components/Product/ProductShare";

const ProductDetail: React.FC<{ data: ProductQuery["product"] }> = ({
  data,
}) => {
  if (!data) return <div>Product not found</div>;
  return (
    <div className="w-full flex flex-col md:w-1/2 gap-2 lg:gap-6">
      <header className="">
        <span className="text-sm lg:text-xl text-green-400 font-bold">
          {data.productCategory.title}
        </span>
        <h1 className="text-2xl lg:text-4xl text-green-800 font-black">
          {data.title}
        </h1>
      </header>
      <div className="flex flex-col justify-start bg-slate-100 p-2 lg:p-3 rounded-xl">
        <span className="text-sm lg:text-xl text-green-400 font-bold lg:mb-3">
          Thông tin sản phẩm
        </span>
        <p className="text-xl">{data.description}</p>
        <ul className="flex flex-col">
          <li className="flex item-center gap-1 lg:gap-3">
            <span className="text-xs lg:text-sm font-bold">Phân loại:</span>
            <span className="text-sm lg:text-lg">{data.variant}</span>
          </li>
          <li className="flex item-center gap-1 lg:gap-3">
            <span className="text-xs lg:text-sm font-bold">Khối lượng:</span>
            <span className="text-sm lg:text-lg">{data.weight} kg</span>
          </li>
          <li className="flex item-center gap-1 lg:gap-3">
            <span className="text-xs lg:text-sm font-bold">Kích thước:</span>
            <span className="text-sm lg:text-lg">
              {data.dimension.length} x {data.dimension.width} x{" "}
              {data.dimension.height} cm
            </span>
          </li>
          <li className="flex item-center gap-1 lg:gap-3">
            <span className="text-xs lg:text-sm font-bold">Đóng gói:</span>
            <span className="text-sm lg:text-lg">{data.packaging}</span>
          </li>
        </ul>
      </div>
      <div className="flex flex-col justify-start">
        <div className="flex gap-3 text-xl lg:text-3xl font-bold">
          <span className="text-green-800">Giá bán lẻ:</span>
          <span className="text-green-400">${data.retailPrice}</span>
        </div>
        <div className="flex gap-3 text-xl lg:text-3xl font-bold">
          <span className="text-green-800">Giá bán số lượng lớn:</span>
          <span className="text-green-400">Liên hệ</span>
        </div>
      </div>
      <Link
        href="#contact-form"
        scroll={false}
        className="bg-green-800 rounded-md px-9 py-3 text-white text-center text-lg lg:text-2xl font-bold"
      >
        Liên hệ mua hàng
      </Link>
      <ProductShare data={data} />
    </div>
  );
};

export default ProductDetail;
