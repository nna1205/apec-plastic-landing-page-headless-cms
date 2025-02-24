import { ProductQuery } from "@/graphql/types/graphql";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductShare from "@/components/Product/ProductShare";
import { useTranslations } from "next-intl";
import { memo } from "react";

const ProductDetail: React.FC<{ data: ProductQuery["product"] }> = memo(
  ({ data }) => {
    const t = useTranslations("product.detail");
    if (!data) return notFound();
    return (
      <div className="w-full flex flex-col md:w-1/2 gap-2 lg:gap-6">
        <header className="">
          <span className="text-sm lg:text-xl text-gray-600 opacity-80">
            {data.productCategory.title}
          </span>
          <h1 className="text-2xl lg:text-4xl text-green-800 font-black">
            {data.title}
          </h1>
        </header>
        <div className="flex flex-col justify-start bg-slate-100 p-2 lg:p-3 rounded-xl">
          <h2 className="text-sm lg:text-xl text-black font-bold">
            {t("title")}
          </h2>
          <p className="text-base lg:mb-3">{data.description}</p>
          <ul className="flex flex-col">
            <li className="text-sm lg:text-lg flex item-center gap-1 lg:gap-3">
              <span className="font-bold">{t("label.variant")}:</span>
              <span>{data.variant}</span>
            </li>
            <li className="text-sm lg:text-lg flex item-center gap-1 lg:gap-3">
              <span className="font-bold">{t("label.weight")}:</span>
              <span>{data.weight} kg</span>
            </li>
            <li className="text-sm lg:text-lg flex item-center gap-1 lg:gap-3">
              <span className="font-bold">{t("label.dimension")}:</span>
              <span>
                {data.dimension.length} x {data.dimension.width} x{" "}
                {data.dimension.height} cm
              </span>
            </li>
            <li className="text-sm lg:text-lg flex item-center gap-1 lg:gap-3">
              <span className="font-bold">{t("label.packaging")}:</span>
              <span>{data.packaging}</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-start">
          <div className="flex gap-3 text-xl lg:text-3xl">
            <span className="text-black">{t("label.retail_price")}:</span>
            <span className="text-green-800 font-bold">
              ${data.retailPrice}
            </span>
          </div>
          <div className="flex gap-3 text-xl lg:text-3xl">
            <span className="text-black">{t("label.wholesale_price")}:</span>
            <span className="text-green-800 font-bold">
              {data.wholesalePrice}
            </span>
          </div>
        </div>
        <Link
          href="#contact-form"
          className="bg-green-800 rounded-md px-9 py-3 text-white text-center text-lg lg:text-2xl font-bold"
        >
          {t("contact_cta")}
        </Link>
        <ProductShare data={data} />
      </div>
    );
  }
);

ProductDetail.displayName = "ProductDetail";

export default ProductDetail;
