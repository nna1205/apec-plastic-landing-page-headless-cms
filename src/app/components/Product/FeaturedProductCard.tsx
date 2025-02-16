import { FeaturedProductSectionFragment } from "@/app/graphql/types/graphql";
import { Link } from "@/i18n/routing";
import DatoImage from "@/app/components/ResponsiveImage";
import { useTranslations } from "next-intl";

type FeaturedProductProps =
  FeaturedProductSectionFragment["featuredProductsList"][0]["featuredProducts"][0];

const FeaturedProductCard: React.FC<{
  data: FeaturedProductProps;
  highlight?: boolean;
}> = ({ data, highlight }) => {
  const t = useTranslations("product");

  return (
    <div className="w-full h-full p-1 rounded-sm border-2 border-slate-200 lg:p-3 lg:rounded-xl">
      <div
        className={`relative w-full overflow-hidden rounded-sm lg:rounded-xl ${
          highlight ? "h-40 lg:h-80" : "h-28 lg:h-60"
        }`}
      >
        <DatoImage
          responsiveImage={data.productImages[0].responsiveImage}
          fill
          sizes="(min-width: 1024px) 50%, 100%"
        />
      </div>
      <div className="mt-2 lg:mt-4">
        <span
          className={`${
            highlight ? "text-[10px] lg:text-xl" : "text-[10px] lg:text-sm"
          } opacity-80 text-green-400`}
        >
          {data.productCategory.title}
        </span>
        <h3
          className={`${
            highlight ? "text-md lg:text-4xl" : "text-md lg:text-2xl"
          } font-bold`}
        >
          {data.title}
        </h3>
      </div>
      <Link
        href={`/products/${data.id}`}
        className="flex justify-center items-center mt-3 ml-auto w-fit text-sm text-green-800 lg:text-xl lg:mt-9"
      >
        {t("detail_cta")} &#8594;
      </Link>
    </div>
  );
};

export default FeaturedProductCard;
